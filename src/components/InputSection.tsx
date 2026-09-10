import React, { useState } from 'react';
import { Search, Link2, FileText, Clipboard, Trash2, ArrowRight, Loader2, Globe, AlertCircle, Sparkles } from 'lucide-react';
import { SAMPLE_NEWS_ARTICLES } from '../data/sampleNews';
import { SampleNewsItem } from '../types';

interface InputSectionProps {
  headline: string;
  setHeadline: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  sourceUrl: string;
  setSourceUrl: (val: string) => void;
  sourceName: string;
  setSourceName: (val: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onSelectSample: (sample: SampleNewsItem) => void;
  activeSampleId: string | null;
}

export const InputSection: React.FC<InputSectionProps> = ({
  headline,
  setHeadline,
  text,
  setText,
  sourceUrl,
  setSourceUrl,
  sourceName,
  setSourceName,
  onAnalyze,
  isAnalyzing,
  onSelectSample,
  activeSampleId,
}) => {
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlFetchError, setUrlFetchError] = useState<string | null>(null);
  const [showAdvancedSource, setShowAdvancedSource] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handlePasteClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        if (!text) {
          setText(clipboardText);
        } else {
          setText(text + '\n\n' + clipboardText);
        }
      }
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleClear = () => {
    setHeadline('');
    setText('');
    setSourceUrl('');
    setSourceName('');
    setUrlFetchError(null);
  };

  const handleFetchUrl = async () => {
    if (!sourceUrl || !sourceUrl.startsWith('http')) {
      setUrlFetchError('Please enter a complete URL starting with http:// or https://');
      return;
    }

    setIsFetchingUrl(true);
    setUrlFetchError(null);

    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sourceUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract article from URL');
      }

      if (data.title && !headline) {
        setHeadline(data.title);
      }
      if (data.content) {
        setText(data.content);
      }
      if (data.domain && !sourceName) {
        setSourceName(data.domain);
      }
    } catch (err: any) {
      setUrlFetchError(err.message || 'Could not fetch page. You can copy & paste the article text directly.');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-8">
      {/* Sample Selector Pills */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Test Examples (1-Click Auto-Scan)
          </label>
          <span className="text-xs text-emerald-600 font-medium">Click any example to analyze instantly</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {SAMPLE_NEWS_ARTICLES.map((sample) => {
            const isActive = activeSampleId === sample.id;
            const badgeColor =
              sample.label === 'Real'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : sample.label === 'Fake'
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : sample.label === 'Satire'
                ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';

            return (
              <button
                key={sample.id}
                id={`sample-btn-${sample.id}`}
                type="button"
                onClick={() => onSelectSample(sample)}
                className={`text-left text-xs font-medium px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'ring-2 ring-slate-900 border-transparent bg-slate-900 text-white'
                    : `${badgeColor}`
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  sample.label === 'Real' ? 'bg-emerald-500' :
                  sample.label === 'Fake' ? 'bg-rose-500' :
                  sample.label === 'Satire' ? 'bg-purple-500' : 'bg-amber-500'
                }`} />
                <span className="font-semibold">[{sample.label}]</span>
                <span className="truncate max-w-[200px] sm:max-w-[240px]">{sample.headline.slice(0, 42)}...</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Form */}
      <div className="space-y-4">
        {/* Headline Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="news-headline" className="text-sm font-semibold text-slate-800">
              News Headline or Post Title
            </label>
            <span className="text-xs text-slate-400">Optional but recommended for clickbait analysis</span>
          </div>
          <input
            id="news-headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. BREAKING: Scientists Discover Breakthrough That Cures All Diseases..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            disabled={isAnalyzing}
          />
        </div>

        {/* Content Body Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="news-content" className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              Article Body, Social Media Post, or WhatsApp Forward <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                id="paste-clipboard-btn"
                type="button"
                onClick={handlePasteClipboard}
                className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste</span>
              </button>
              {(text || headline) && (
                <button
                  id="clear-input-btn"
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-500 hover:text-rose-600 inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-rose-50 transition-colors"
                  title="Clear all fields"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          <textarea
            id="news-content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Paste the full news article, viral claim, WhatsApp chain message, tweet, or statement here to assess authenticity, detect emotional manipulation, extract factual assertions, and verify credibility..."
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-y"
            disabled={isAnalyzing}
          />

          <div className="flex items-center justify-between text-xs text-slate-400 mt-1.5 px-1">
            <span>
              {wordCount} words &bull; {charCount} characters
            </span>
            <span className={charCount < 30 ? 'text-amber-600 font-medium' : 'text-slate-400'}>
              {charCount < 30 ? 'Minimum 30 characters recommended for accurate forensic analysis' : 'Ready for forensic scan'}
            </span>
          </div>
        </div>

        {/* Optional URL & Source Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvancedSource(!showAdvancedSource)}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{showAdvancedSource ? 'Hide URL / Source context' : '+ Add Article URL or Publisher Source (Optional)'}</span>
          </button>

          {showAdvancedSource && (
            <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="source-url" className="text-xs font-medium text-slate-700 block mb-1">
                    Article Link / Website URL
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      id="source-url"
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://example.com/news-story"
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <button
                      id="fetch-url-btn"
                      type="button"
                      onClick={handleFetchUrl}
                      disabled={isFetchingUrl || !sourceUrl}
                      className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      {isFetchingUrl ? <Loader2 className="w-3 h-3 animate-spin" /> : <Link2 className="w-3 h-3" />}
                      <span>Fetch</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="source-name" className="text-xs font-medium text-slate-700 block mb-1">
                    Publisher / Outlet / Social Platform
                  </label>
                  <input
                    id="source-name"
                    type="text"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    placeholder="e.g. Reuters, WhatsApp, Facebook, Anonymous Blog"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {urlFetchError && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{urlFetchError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Button Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            AI examines claim falsifiability, emotional triggers, sourcing veracity, and fallacy patterns.
          </p>

          <button
            id="analyze-news-btn"
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing || text.trim().length < 15}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1b4332] hover:bg-[#143326] active:bg-emerald-950 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                <span>Performing Forensic Analysis...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-emerald-300" />
                <span>Analyze Credibility</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
