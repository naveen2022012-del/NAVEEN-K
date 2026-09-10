import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ListChecks 
} from 'lucide-react';
import { ClaimAnalysis } from '../types';

interface ClaimInspectorProps {
  claims: ClaimAnalysis[];
}

export const ClaimInspector: React.FC<ClaimInspectorProps> = ({ claims }) => {
  const [expandedClaimId, setExpandedClaimId] = useState<string | null>(claims[0]?.id || null);

  const getVerdictBadge = (verdict: ClaimAnalysis['verdict']) => {
    switch (verdict) {
      case 'VERIFIED':
        return {
          icon: CheckCircle,
          label: 'Verified Fact',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'DISPUTED_OR_MISLEADING':
        return {
          icon: AlertCircle,
          label: 'Misleading Context / Disputed',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'FABRICATED':
        return {
          icon: XCircle,
          label: 'Fabricated / False Claim',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
        };
      case 'UNVERIFIED':
      default:
        return {
          icon: HelpCircle,
          label: 'Unsubstantiated / Unverified',
          badge: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedClaimId(expandedClaimId === id ? null : id);
  };

  if (!claims || claims.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <ListChecks className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Deconstructed Claim-by-Claim Verification
            </h3>
            <p className="text-xs text-slate-500">
              Granular evaluation of specific assertions extracted from the content
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
          {claims.length} {claims.length === 1 ? 'Claim' : 'Claims'} Analyzed
        </span>
      </div>

      <div className="space-y-3">
        {claims.map((claim, index) => {
          const isExpanded = expandedClaimId === claim.id;
          const meta = getVerdictBadge(claim.verdict);
          const Icon = meta.icon;

          return (
            <div
              key={claim.id || index}
              id={`claim-card-${claim.id || index}`}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
            >
              <button
                type="button"
                onClick={() => toggleExpand(claim.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-0.5 shrink-0">
                    <Icon className={`w-4 h-4 ${
                      claim.verdict === 'VERIFIED' ? 'text-emerald-600' :
                      claim.verdict === 'FABRICATED' ? 'text-rose-600' :
                      claim.verdict === 'DISPUTED_OR_MISLEADING' ? 'text-amber-600' : 'text-slate-500'
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${meta.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Confidence: {claim.confidence}%
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      "{claim.claim}"
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 bg-white">
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed border border-slate-200/80">
                    <span className="font-bold text-slate-900 block mb-1">
                      Forensic Verification Rationale:
                    </span>
                    {claim.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
