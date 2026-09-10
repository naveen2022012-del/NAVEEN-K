import React from 'react';
import { X, BookOpen, Shield, AlertOctagon, CheckCircle2, ExternalLink } from 'lucide-react';

interface LiteracyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiteracyGuideModal: React.FC<LiteracyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const siftSteps = [
    {
      letter: 'S',
      title: 'Stop',
      desc: 'When you feel a sudden surge of anger, panic, shock, or vindication, stop before sharing. Misinformation relies on hijacking your emotional nervous system.',
    },
    {
      letter: 'I',
      title: 'Investigate the Source',
      desc: 'Who published this? Check the "About Us" page, domain extension (.co vs .com), author credentials, and whether it is a registered newsroom or satirical outlet.',
    },
    {
      letter: 'F',
      title: 'Find Better Coverage',
      desc: 'Look for consensus. If a major world-changing event or medical breakthrough occurred, verified wires (AP, Reuters, BBC, NYT) will be actively reporting on it.',
    },
    {
      letter: 'T',
      title: 'Trace Claims, Quotes & Media',
      desc: 'Trace quotes back to their original recorded context. Many viral hoaxes take an authentic sentence, strip away the caveat, or alter the date.',
    },
  ];

  const redFlags = [
    'ALL-CAPS headlines, multiple exclamation marks ("SHARE BEFORE DELETED!!!")',
    'Miracle cure promises claiming to cure complex conditions overnight',
    'Vague attributions: "renowned doctors", "insiders say", "top experts confirm"',
    'Pressure to forward immediately to multiple groups or contacts',
    'Conspiracy framing alleging global suppression by monopolies',
    'Missing byline, anonymous author, or lack of publication date',
  ];

  const factCheckers = [
    { name: 'AP News Fact Check', url: 'https://apnews.com/hub/ap-fact-check' },
    { name: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check/' },
    { name: 'Snopes', url: 'https://www.snopes.com/' },
    { name: 'PolitiFact', url: 'https://www.politifact.com/' },
    { name: 'FactCheck.org', url: 'https://www.factcheck.org/' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Media Literacy & Verification Guide
              </h3>
              <p className="text-xs text-slate-500">
                Proven heuristic techniques used by investigative fact-checkers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800">
          {/* S.I.F.T. Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>The Four Moves: The S.I.F.T. Method (Mike Caulfield)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siftSteps.map((step) => (
                <div
                  key={step.letter}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {step.letter}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 mb-0.5">
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flag Anatomy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Anatomy of Viral Misinformation</span>
            </h4>

            <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-4">
              <ul className="space-y-2">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fact-Checking Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Authoritative Non-Partisan Fact-Checkers</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {factCheckers.map((fc) => (
                <a
                  key={fc.name}
                  href={fc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>{fc.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
