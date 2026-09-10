import React from 'react';
import { ShieldCheck, History, BookOpen, Sparkles, LayoutGrid, LogIn, RefreshCw } from 'lucide-react';

interface NavbarProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenGuide: () => void;
  onOpenAuth: () => void;
  onScrollToChallenges: () => void;
  onScrollToDetector: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  studentName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  historyCount,
  onOpenHistory,
  onOpenGuide,
  onOpenAuth,
  onScrollToChallenges,
  onScrollToDetector,
  onReset,
  isAnalyzing,
  studentName,
}) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Branding matching screenshot */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
              AI Fake News Detection System
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                AI FORENSIC MEDIA INTELLIGENCE
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Gemini 3.8
              </span>
            </div>
          </div>
        </div>

        {/* Right Navigation matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Challenges button with grid icon */}
          <button
            type="button"
            onClick={onScrollToChallenges}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
            <span>Challenges</span>
          </button>

          {/* Verification Guide */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Verification Guide</span>
          </button>

          {/* History */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors relative"
            title="Scan History"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#1b4332] text-white rounded-full text-[10px] font-semibold">
                {historyCount}
              </span>
            )}
          </button>

          {/* Login / Sign Up button matching screenshot */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1b4332] hover:bg-[#143326] rounded-lg shadow-2xs transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="truncate max-w-[100px] sm:max-w-none">
              {studentName ? studentName : 'Login / Sign Up'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

