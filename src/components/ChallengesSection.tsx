import React, { useState, useMemo } from 'react';
import { Search, AlertTriangle, Cpu, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { MISINFORMATION_CHALLENGES } from '../data/challenges';
import { MisinformationChallenge } from '../types';

interface ChallengesSectionProps {
  onSelectChallenge: (challenge: MisinformationChallenge) => void;
  activeChallengeId: string | null;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  onSelectChallenge,
  activeChallengeId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const set = new Set<string>();
    MISINFORMATION_CHALLENGES.forEach((c) => set.add(c.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredChallenges = useMemo(() => {
    return MISINFORMATION_CHALLENGES.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.problem.toLowerCase().includes(q) ||
        item.aiSolution.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="challenges-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] tracking-tight">
            8 Misinformation Challenges & AI Solutions
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore real-world challenges encountered in digital media and corresponding machine-learning interventions.
          </p>
        </div>

        {/* Search input on the right, matching screenshot */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, claims, AI..."
            className="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap mr-1">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#1b4332] text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat === 'ALL' ? 'All 8 Challenges' : cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredChallenges.map((challenge) => {
          const isActive = activeChallengeId === challenge.id;
          return (
            <div
              key={challenge.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                isActive
                  ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                  : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 flex-1">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-[#1b4332] text-xs font-black border border-emerald-200/60">
                    #{challenge.number}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100 truncate">
                    {challenge.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-[#1b4332] transition-colors">
                  {challenge.title}
                </h3>

                {/* Problem Section */}
                <div className="mb-3.5 bg-rose-50/50 border border-rose-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800 uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    Field Challenge / Risk
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {challenge.problem}
                  </p>
                </div>

                {/* AI Solution Section */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    <Cpu className="w-3 h-3 text-emerald-600" />
                    AI Machine Learning Solution
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {challenge.aiSolution}
                  </p>
                </div>

                {/* Tech Badge */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{challenge.modelTech}</span>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectChallenge(challenge)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-50 hover:bg-[#1b4332] text-slate-700 hover:text-white border border-slate-200 group-hover:border-[#1b4332]'
                  }`}
                >
                  <span>Test in AI Detector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No challenges matching "{searchQuery}"</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-2 text-xs text-emerald-700 hover:underline font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
