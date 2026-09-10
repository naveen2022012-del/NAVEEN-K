import React from 'react';
import { X, Trash2, Clock, CheckCircle2, AlertTriangle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const getVerdictIcon = (verdict: HistoryItem['verdict']) => {
    switch (verdict) {
      case 'LIKELY_REAL':
      case 'LEANING_REAL':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'LIKELY_FAKE':
      case 'LEANING_FAKE':
        return <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">
              Analysis History ({history.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Previous Analyses */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No saved checks yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Articles you inspect will be saved here locally for quick comparison.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-0.5">{getVerdictIcon(item.verdict)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900">
                        {item.credibilityScore}% Score
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {item.headline || item.snippet.slice(0, 60) + '...'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.snippet}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectHistoryItem(item);
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg shrink-0 inline-flex items-center gap-1 transition-colors"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          History is saved locally in your browser session
        </div>
      </div>
    </div>
  );
};
