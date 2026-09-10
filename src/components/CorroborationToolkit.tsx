import React from 'react';
import { 
  Compass, 
  ExternalLink, 
  Search, 
  CheckSquare, 
  Building2, 
  ShieldAlert 
} from 'lucide-react';

interface CorroborationToolkitProps {
  recommendedChecks: string[];
  crossCheckQueries: string[];
  sourceReputation?: {
    domain?: string;
    rating?: string;
    notes?: string;
  };
}

export const CorroborationToolkit: React.FC<CorroborationToolkitProps> = ({
  recommendedChecks,
  crossCheckQueries,
  sourceReputation,
}) => {
  const handleOpenSearch = (query: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenSnopes = (query: string) => {
    const url = `https://www.snopes.com/search/${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
          <Compass className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Corroboration & Cross-Checking Toolkit
          </h3>
          <p className="text-xs text-slate-500">
            Actionable verification steps and recommended queries to cross-reference with primary wires
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Checks Checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Recommended Investigative Steps</span>
          </h4>

          <ul className="space-y-2.5">
            {recommendedChecks.map((check, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/70"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fact-Check Search Queries */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>1-Click Fact-Checking Queries</span>
            </h4>

            <div className="space-y-2 mb-4">
              {crossCheckQueries.map((query, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                >
                  <span className="text-xs font-mono text-slate-800 truncate flex-1">
                    {query}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenSearch(query)}
                      className="px-2 py-1 text-[11px] font-semibold bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 inline-flex items-center gap-1 cursor-pointer"
                      title="Search in Google"
                    >
                      <Search className="w-3 h-3" />
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenSnopes(query)}
                      className="px-2 py-1 text-[11px] font-semibold bg-white hover:bg-slate-200 border border-slate-200 rounded text-slate-700 inline-flex items-center gap-1 cursor-pointer"
                      title="Search on Snopes"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Snopes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Source Domain Reputation Card */}
          {sourceReputation && (sourceReputation.domain || sourceReputation.rating) && (
            <div className="p-3 bg-slate-900 text-white rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Domain / Origin Context</span>
                </span>
                {sourceReputation.rating && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {sourceReputation.rating}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-mono">
                {sourceReputation.domain || 'Direct User Submission'}
              </p>
              {sourceReputation.notes && (
                <p className="text-[11px] text-slate-400 mt-1">
                  {sourceReputation.notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
