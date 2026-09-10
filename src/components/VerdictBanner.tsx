import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Smile, 
  Copy, 
  Check, 
  Share2, 
  FileDown 
} from 'lucide-react';
import { AnalysisVerdict, NewsAnalysisResponse } from '../types';

interface VerdictBannerProps {
  result: NewsAnalysisResponse;
  headline?: string;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ result, headline }) => {
  const [copied, setCopied] = useState(false);

  const getVerdictMeta = (verdict: AnalysisVerdict) => {
    switch (verdict) {
      case 'LIKELY_REAL':
        return {
          label: 'Likely Real News',
          subLabel: 'High credibility, verifiable facts & transparent sourcing',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          borderColor: 'border-emerald-200',
          accentColor: '#10b981', // emerald-500
          icon: CheckCircle2,
          textColor: 'text-emerald-950',
          scoreBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          statusTone: 'bg-emerald-600',
        };
      case 'LEANING_REAL':
        return {
          label: 'Leaning Real / Credible',
          subLabel: 'Mostly credible reporting; minor corroboration recommended',
          badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
          borderColor: 'border-teal-200',
          accentColor: '#0d9488', // teal-600
          icon: CheckCircle2,
          textColor: 'text-teal-950',
          scoreBadge: 'bg-teal-50 text-teal-800 border-teal-200',
          statusTone: 'bg-teal-600',
        };
      case 'UNVERIFIED_OR_MIXED':
        return {
          label: 'Unverified or Mixed Claims',
          subLabel: 'Contains disputed assertions, missing context, or lacks proof',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          borderColor: 'border-amber-200',
          accentColor: '#f59e0b', // amber-500
          icon: HelpCircle,
          textColor: 'text-amber-950',
          scoreBadge: 'bg-amber-50 text-amber-800 border-amber-200',
          statusTone: 'bg-amber-500',
        };
      case 'LEANING_FAKE':
        return {
          label: 'Leaning Fake / Misleading',
          subLabel: 'Significant misinformation traits, spin, or cherry-picked quotes',
          badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
          borderColor: 'border-orange-200',
          accentColor: '#ea580c', // orange-600
          icon: AlertTriangle,
          textColor: 'text-orange-950',
          scoreBadge: 'bg-orange-50 text-orange-800 border-orange-200',
          statusTone: 'bg-orange-600',
        };
      case 'LIKELY_FAKE':
        return {
          label: 'Likely Fake / Fabricated',
          subLabel: 'Severe misinformation markers, panic triggers & unsubstantiated claims',
          badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
          borderColor: 'border-rose-200',
          accentColor: '#e11d48', // rose-600
          icon: XCircle,
          textColor: 'text-rose-950',
          scoreBadge: 'bg-rose-50 text-rose-800 border-rose-200',
          statusTone: 'bg-rose-600',
        };
      case 'SATIRE_PARODY':
        return {
          label: 'Satirical or Parody',
          subLabel: 'Intentional humorous exaggeration or theatrical social satire',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          borderColor: 'border-purple-200',
          accentColor: '#9333ea', // purple-600
          icon: Smile,
          textColor: 'text-purple-950',
          scoreBadge: 'bg-purple-50 text-purple-800 border-purple-200',
          statusTone: 'bg-purple-600',
        };
      default:
        return {
          label: 'Unverified Assessment',
          subLabel: 'Insufficient evidence to verify certainty',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
          borderColor: 'border-slate-200',
          accentColor: '#64748b',
          icon: HelpCircle,
          textColor: 'text-slate-900',
          scoreBadge: 'bg-slate-50 text-slate-700 border-slate-200',
          statusTone: 'bg-slate-600',
        };
    }
  };

  const meta = getVerdictMeta(result.verdict);
  const VerdictIcon = meta.icon;

  // SVG circle calculations for circular meter
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.credibilityScore / 100) * circumference;

  const handleCopySummary = async () => {
    const textToCopy = `AI Fake News Detection Report
Verdict: ${meta.label} (${result.verdictTitle})
Credibility Score: ${result.credibilityScore}/100 (Confidence: ${result.confidenceScore}%)
Headline: ${headline || 'N/A'}
Summary: ${result.summary}
Analyzed: ${new Date(result.timestamp).toLocaleString()}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleDownloadReport = () => {
    const reportData = {
      title: 'AI Fake News Detection Report',
      timestamp: result.timestamp,
      headline: headline || 'N/A',
      verdict: result.verdict,
      verdictTitle: result.verdictTitle,
      credibilityScore: result.credibilityScore,
      confidenceScore: result.confidenceScore,
      summary: result.summary,
      scores: result.scores,
      keyClaims: result.keyClaims,
      flags: result.flags,
      detectedPatterns: result.detectedPatterns,
      recommendedChecks: result.recommendedChecks,
      crossCheckQueries: result.crossCheckQueries,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake-news-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="verdict-banner-card" className={`bg-white rounded-2xl border ${meta.borderColor} shadow-sm overflow-hidden mb-8`}>
      {/* Top status indicator bar */}
      <div className={`h-1.5 w-full ${meta.statusTone}`} />

      <div className="p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Main Verdict Heading */}
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${meta.badgeBg}`}>
              <VerdictIcon className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide border ${meta.badgeBg}`}>
                  {meta.label}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Confidence: {result.confidenceScore}%
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {result.verdictTitle}
              </h2>

              <p className="text-sm text-slate-600 mt-1">
                {meta.subLabel}
              </p>
            </div>
          </div>

          {/* Circular Credibility Score Meter */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={meta.accentColor}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                  {result.credibilityScore}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div className="pr-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-0.5">
                Authenticity Score
              </span>
              <p className="text-sm font-bold text-slate-900">
                {result.credibilityScore >= 80 ? 'Authoritative' :
                 result.credibilityScore >= 60 ? 'Moderately Reliable' :
                 result.credibilityScore >= 40 ? 'Dubious / Disputed' :
                 result.credibilityScore >= 20 ? 'High Risk / Misleading' : 'Fabricated Hoax'}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">
                Forensic weighted evaluation
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Forensic Executive Summary
          </h3>
          <p className="text-base text-slate-800 leading-relaxed font-normal">
            {result.summary}
          </p>

          {/* Headline Analysis Callout if available */}
          {result.headlineAnalysis && headline && (
            <div className={`mt-4 p-3.5 rounded-xl border text-sm flex items-start gap-3 ${
              result.headlineAnalysis.isClickbait 
                ? 'bg-amber-50 border-amber-200 text-amber-900' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                result.headlineAnalysis.isClickbait ? 'text-amber-600' : 'text-slate-400'
              }`} />
              <div className="text-xs leading-relaxed">
                <span className="font-bold mr-1">
                  Headline Critique ({result.headlineAnalysis.isClickbait ? 'Clickbait Sensationalism Detected' : 'Standard Journalistic Tone'}):
                </span>
                {result.headlineAnalysis.notes}
              </div>
            </div>
          )}

          {/* Action Bar: Copy Summary & Export */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium">Detected Signatures:</span>
              {result.detectedPatterns.map((pattern, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200"
                >
                  {pattern}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="copy-summary-btn"
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>

              <button
                id="download-report-btn"
                type="button"
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Download JSON Report"
              >
                <FileDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
