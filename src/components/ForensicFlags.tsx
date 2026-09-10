import React from 'react';
import { Flag, AlertOctagon, AlertTriangle, CheckCircle2, Quote } from 'lucide-react';
import { FlagItem } from '../types';

interface ForensicFlagsProps {
  flags: FlagItem[];
}

export const ForensicFlags: React.FC<ForensicFlagsProps> = ({ flags }) => {
  if (!flags || flags.length === 0) {
    return null;
  }

  const redFlags = flags.filter((f) => f.type === 'red');
  const yellowFlags = flags.filter((f) => f.type === 'yellow');
  const greenFlags = flags.filter((f) => f.type === 'green');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
          <Flag className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Forensic Markers & Linguistic Flags
          </h3>
          <p className="text-xs text-slate-500">
            Detected rhetorical patterns, emotional manipulation triggers, and evidentiary citations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Red Flags */}
        <div className="bg-rose-50/60 rounded-xl p-4 border border-rose-200/70">
          <div className="flex items-center gap-1.5 mb-3 text-rose-800 font-bold text-xs uppercase tracking-wide">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Red Flags ({redFlags.length})</span>
          </div>
          {redFlags.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No severe deception markers detected.</p>
          ) : (
            <div className="space-y-2.5">
              {redFlags.map((flag, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-rose-200 shadow-xs">
                  <span className="text-[11px] font-bold text-rose-700 block mb-1">
                    {flag.category}
                  </span>
                  {flag.quote && (
                    <div className="flex items-start gap-1.5 text-[11px] font-mono text-slate-600 bg-rose-50/50 px-2 py-1 rounded mb-1.5 border border-rose-100">
                      <Quote className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                      <span className="italic">"{flag.quote}"</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {flag.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Yellow Flags */}
        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/70">
          <div className="flex items-center gap-1.5 mb-3 text-amber-800 font-bold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Cautionary Flags ({yellowFlags.length})</span>
          </div>
          {yellowFlags.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No notable bias or cautionary indicators.</p>
          ) : (
            <div className="space-y-2.5">
              {yellowFlags.map((flag, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-amber-200 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-800 block mb-1">
                    {flag.category}
                  </span>
                  {flag.quote && (
                    <div className="flex items-start gap-1.5 text-[11px] font-mono text-slate-600 bg-amber-50/50 px-2 py-1 rounded mb-1.5 border border-amber-100">
                      <Quote className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span className="italic">"{flag.quote}"</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {flag.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Green Flags */}
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/70">
          <div className="flex items-center gap-1.5 mb-3 text-emerald-800 font-bold text-xs uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Green Flags ({greenFlags.length})</span>
          </div>
          {greenFlags.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Lacks verified primary source citations.</p>
          ) : (
            <div className="space-y-2.5">
              {greenFlags.map((flag, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-emerald-200 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                    {flag.category}
                  </span>
                  {flag.quote && (
                    <div className="flex items-start gap-1.5 text-[11px] font-mono text-slate-600 bg-emerald-50/50 px-2 py-1 rounded mb-1.5 border border-emerald-100">
                      <Quote className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="italic">"{flag.quote}"</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {flag.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
