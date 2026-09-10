import React from 'react';
import { 
  FileCheck2, 
  Flame, 
  Users, 
  BrainCircuit, 
  Scale 
} from 'lucide-react';
import { ScoreBreakdown } from '../types';

interface ScoreBreakdownCardsProps {
  scores: ScoreBreakdown;
}

export const ScoreBreakdownCards: React.FC<ScoreBreakdownCardsProps> = ({ scores }) => {
  const metrics = [
    {
      id: 'metric-factuality',
      title: 'Factuality & Verifiability',
      value: scores.factuality,
      description: 'Empirical falsifiability, testable assertions & objective data presence.',
      icon: FileCheck2,
      invertColor: false, // higher is better
    },
    {
      id: 'metric-sensationalism',
      title: 'Sensationalism Index',
      value: scores.sensationalism,
      description: 'Emotional urgency, panic-inducing rhetoric & clickbait framing.',
      icon: Flame,
      invertColor: true, // lower is better (less sensationalism is good)
    },
    {
      id: 'metric-attribution',
      title: 'Source Attribution',
      value: scores.sourceAttribution,
      description: 'Named identifiable experts, institutions & peer-reviewed citations.',
      icon: Users,
      invertColor: false, // higher is better
    },
    {
      id: 'metric-logic',
      title: 'Logical Coherence',
      value: scores.logicalConsistency,
      description: 'Sound deduction; absence of conspiracy leaps and false dichotomies.',
      icon: BrainCircuit,
      invertColor: false, // higher is better
    },
    {
      id: 'metric-neutrality',
      title: 'Journalistic Balance',
      value: scores.biasNeutrality,
      description: 'Even-handed perspective vs emotionally loaded partisan polemics.',
      icon: Scale,
      invertColor: false, // higher is better
    },
  ];

  const getScoreColor = (val: number, invert: boolean) => {
    // If inverted (e.g. Sensationalism), high is bad, low is good
    const effectiveGood = invert ? 100 - val : val;
    if (effectiveGood >= 75) return { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' };
    if (effectiveGood >= 50) return { bar: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' };
    return { bar: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50' };
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Forensic Dimensions & Credibility Metrics
          </h3>
          <p className="text-xs text-slate-500">
            Multi-vector computational analysis across five core journalistic veracity criteria
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {metrics.map((m) => {
          const Icon = m.icon;
          const color = getScoreColor(m.value, m.invertColor);
          return (
            <div
              key={m.id}
              id={m.id}
              className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`px-2 py-0.5 rounded text-xs font-bold ${color.bg} ${color.text}`}>
                    {m.value}%
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                  {m.title}
                </h4>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                  {m.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color.bar} transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(100, Math.max(0, m.value))}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                  <span>{m.invertColor ? 'Calm' : 'Low'}</span>
                  <span>{m.invertColor ? 'High Panic' : 'High'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
