/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChallengesSection } from './components/ChallengesSection';
import { InputSection } from './components/InputSection';
import { VerdictBanner } from './components/VerdictBanner';
import { ScoreBreakdownCards } from './components/ScoreBreakdownCards';
import { ClaimInspector } from './components/ClaimInspector';
import { ForensicFlags } from './components/ForensicFlags';
import { CorroborationToolkit } from './components/CorroborationToolkit';
import { HistoryModal } from './components/HistoryModal';
import { LiteracyGuideModal } from './components/LiteracyGuideModal';
import { AuthModal } from './components/AuthModal';
import { NewsAnalysisResponse, HistoryItem, SampleNewsItem, MisinformationChallenge, StudentProfile } from './types';
import { SAMPLE_NEWS_ARTICLES } from './data/sampleNews';
import { runLocalAnalysis } from './utils/localAnalyzer';
import { ShieldCheck, AlertCircle, ArrowDown, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'ai_fake_news_history_v1';
const PROFILE_KEY = 'ai_fake_news_student_profile_v1';

export default function App() {
  const [headline, setHeadline] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [sourceName, setSourceName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<NewsAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Student credentials matching screenshot (Ranjith / Naveen)
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Ranjith',
      className: 'B.Tech IT - B',
      regNo: '25108090',
    };
  });

  const detectorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const handleUpdateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    } catch {}
  };

  // Save history to localStorage
  const saveHistoryItem = (result: NewsAnalysisResponse, itemHeadline: string, itemText: string) => {
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      headline: itemHeadline,
      snippet: itemText.slice(0, 120),
      verdict: result.verdict,
      credibilityScore: result.credibilityScore,
      timestamp: new Date().toISOString(),
      result,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.slice(0, 19)]; // Keep latest 20
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage write errors
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const runAnalysisWithData = async (
    targetHeadline: string,
    targetText: string,
    targetSourceName: string,
    targetSourceUrl: string
  ) => {
    if (!targetText.trim() || targetText.trim().length < 15) {
      setError('Please provide at least 15 characters of news content or claims to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      let data: NewsAnalysisResponse;

      try {
        const response = await fetch('/api/analyze-news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            headline: targetHeadline.trim(),
            text: targetText.trim(),
            sourceUrl: targetSourceUrl.trim(),
            sourceName: targetSourceName.trim(),
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server status ${response.status}`);
        }

        data = await response.json();
      } catch (networkOrApiErr) {
        // Fallback for static environments like GitHub Pages where /api/* backend is not hosted
        console.warn('Backend server not reachable, executing browser-based forensic evaluation engine:', networkOrApiErr);
        data = runLocalAnalysis(targetText, targetHeadline, targetSourceName, targetSourceUrl);
      }

      setAnalysisResult(data);
      saveHistoryItem(data, targetHeadline, targetText);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the content.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    await runAnalysisWithData(headline, text, sourceName, sourceUrl);
  };

  const handleSelectSample = (sample: SampleNewsItem, autoRun = true) => {
    setActiveSampleId(sample.id);
    setActiveChallengeId(null);
    setHeadline(sample.headline);
    setText(sample.content);
    setSourceName(sample.sourceName);
    setSourceUrl('');
    setError(null);
    if (autoRun) {
      runAnalysisWithData(sample.headline, sample.content, sample.sourceName, '');
    }
  };

  const handleSelectChallenge = (challenge: MisinformationChallenge) => {
    setActiveChallengeId(challenge.id);
    setActiveSampleId(null);
    setHeadline(challenge.sampleHeadline);
    setText(challenge.sampleContent);
    setSourceName(challenge.sampleSourceName);
    setSourceUrl('');
    setError(null);

    // Scroll smoothly to detector section
    detectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Run live analysis immediately
    runAnalysisWithData(challenge.sampleHeadline, challenge.sampleContent, challenge.sampleSourceName, '');
  };

  const handleReset = () => {
    setHeadline('');
    setText('');
    setSourceUrl('');
    setSourceName('');
    setAnalysisResult(null);
    setActiveSampleId(null);
    setActiveChallengeId(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setHeadline(item.headline);
    setText(item.snippet);
    setAnalysisResult(item.result);
    setActiveSampleId(null);
    setActiveChallengeId(null);
    setError(null);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToDetector = () => {
    detectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToChallenges = () => {
    const el = document.getElementById('challenges-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-[#1b4332] selection:text-white">
      {/* Navigation Header matching screenshot */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onScrollToChallenges={scrollToChallenges}
        onScrollToDetector={scrollToDetector}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
        studentName={profile.name}
      />

      {/* Main Hero Section matching user screenshot */}
      <HeroSection
        profile={profile}
        onOpenPortal={scrollToDetector}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 8 Challenges & AI Solutions matching screenshot */}
      <ChallengesSection
        onSelectChallenge={handleSelectChallenge}
        activeChallengeId={activeChallengeId}
      />

      {/* Live AI Detection Portal */}
      <main ref={detectorRef} id="detector-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Detection Portal Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1b4332] text-white">
                Live Verification Portal
              </span>
              <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Gemini 3.8 Powered
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
              News Authenticity & Veracity Scanner
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Input any custom article, headline, viral WhatsApp chain forward, or select from the 8 field challenges above to run deep forensic veracity checks.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <InputSection
          headline={headline}
          setHeadline={setHeadline}
          text={text}
          setText={setText}
          sourceUrl={sourceUrl}
          setSourceUrl={setSourceUrl}
          sourceName={sourceName}
          setSourceName={setSourceName}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          onSelectSample={handleSelectSample}
          activeSampleId={activeSampleId}
        />

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-900 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Analysis Notice</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Results Display */}
        <div ref={resultsRef}>
          {analysisResult && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Primary Verdict & Credibility Gauge */}
              <VerdictBanner result={analysisResult} headline={headline} />

              {/* 5-Dimensional Forensic Scores */}
              <ScoreBreakdownCards scores={analysisResult.scores} />

              {/* Claim-by-Claim Breakdown */}
              <ClaimInspector claims={analysisResult.keyClaims} />

              {/* Red / Yellow / Green Flags */}
              <ForensicFlags flags={analysisResult.flags} />

              {/* Actionable Corroboration & Cross-Checking Queries */}
              <CorroborationToolkit
                recommendedChecks={analysisResult.recommendedChecks}
                crossCheckQueries={analysisResult.crossCheckQueries}
                sourceReputation={analysisResult.sourceReputation}
              />
            </div>
          )}
        </div>

        {/* Empty State / Initial Guidance if no result yet */}
        {!analysisResult && !isAnalyzing && (
          <div className="border border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center bg-white/60">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1b4332] flex items-center justify-center mx-auto mb-3 border border-emerald-200">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Awaiting Content for Forensic Verification
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
              Click any of the <strong className="text-emerald-800">8 Field Challenges</strong> above, or choose a quick preset example to instantly see real-time AI fact-checking in action.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_NEWS_ARTICLES[0])}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors shadow-2xs"
              >
                Try Preset: Cancer Cure Hoax (Fake)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_NEWS_ARTICLES[1])}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors shadow-2xs"
              >
                Try Preset: NASA Exoplanet (Real)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">AI Fake News Detection System</span>
            <span>&bull;</span>
            <span className="text-emerald-700 font-medium">Student Project: {profile.name} ({profile.regNo})</span>
          </div>

          <p className="text-center sm:text-right text-[11px] text-slate-400">
            Powered by Gemini 3.8 Flash • Automated Claim Decomposition & Epistemic Verification
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentProfile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
      />

      <LiteracyGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
