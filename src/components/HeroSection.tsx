import React from 'react';
import { ShieldCheck, User, GraduationCap, Hash, ArrowRight, Sparkles, Edit3 } from 'lucide-react';
import { StudentProfile } from '../types';

interface HeroSectionProps {
  profile: StudentProfile;
  onOpenPortal: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenPortal,
  onOpenAuth,
}) => {
  return (
    <div className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-emerald-50/70 via-white/80 to-slate-50/50 border-b border-slate-200/60 overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-emerald-200/25 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium bg-emerald-100/80 text-emerald-900 border border-emerald-300/60 shadow-2xs mb-5">
        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
        <span className="font-semibold">NLP & Artificial Intelligence</span>
        <span className="text-emerald-400">•</span>
        <span className="text-amber-700 font-bold">Forensic Verification</span>
      </div>

      {/* Main Hero Title matching screenshot */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1b4332] tracking-tight leading-tight max-w-4xl mx-auto mb-3">
        AI Fake News Detection System
      </h1>

      {/* Subtitle with colored emphasis */}
      <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium mb-6">
        Key misinformation challenges & viral hoaxes —{' '}
        <span className="text-[#c2410c] font-bold">solved by AI</span>
      </p>

      {/* Student Profile Credentials Bar */}
      <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 bg-white border border-slate-200/90 shadow-2xs rounded-full px-5 py-2.5 mb-7 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center gap-1.5 font-medium">
          <User className="w-4 h-4 text-slate-400" />
          <span>Name:</span>
          <strong className="text-emerald-950 font-bold">{profile.name}</strong>
        </div>

        <span className="text-slate-300 hidden sm:inline">|</span>

        <div className="flex items-center gap-1.5 font-medium">
          <GraduationCap className="w-4 h-4 text-slate-400" />
          <span>Class:</span>
          <strong className="text-emerald-950 font-bold">{profile.className}</strong>
        </div>

        <span className="text-slate-300 hidden sm:inline">|</span>

        <div className="flex items-center gap-1.5 font-medium">
          <Hash className="w-3.5 h-3.5 text-amber-600" />
          <span>Reg No:</span>
          <strong className="text-[#c2410c] font-bold font-mono">{profile.regNo}</strong>
        </div>

        <button
          type="button"
          onClick={onOpenAuth}
          className="ml-1 text-slate-400 hover:text-emerald-800 p-1 rounded-full hover:bg-slate-100 transition-colors"
          title="Edit student credentials"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="mb-10">
        <button
          type="button"
          onClick={onOpenPortal}
          className="bg-[#1b4332] hover:bg-[#143326] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Open Detection Portal (Analyze News)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full text-center">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-3xl sm:text-4xl font-black text-[#1b4332] mb-1">
            8
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            Core Misinformation Types
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Classified & Handled
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-3xl sm:text-4xl font-black text-[#1b4332] mb-1">
            100%
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            AI-Powered Solutions
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Automated Evaluation
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-2xl sm:text-3xl font-black text-[#1b4332] mb-1">
            NLP + LLM
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            Forensic Claim Analysis
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Gemini 3.8 Reasoning
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="text-2xl sm:text-3xl font-black text-[#1b4332] mb-1">
            Predictive
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-700">
            Credibility & Bias Scoring
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Multi-Vector Diagnostics
          </div>
        </div>
      </div>
    </div>
  );
};
