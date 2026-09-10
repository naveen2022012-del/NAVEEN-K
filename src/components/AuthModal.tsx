import React, { useState } from 'react';
import { X, LogIn, UserPlus, Shield, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onUpdateProfile,
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState(currentProfile.name);
  const [className, setClassName] = useState(currentProfile.className);
  const [regNo, setRegNo] = useState(currentProfile.regNo);
  const [email, setEmail] = useState('naveen2022012@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || 'Ranjith',
      className: className.trim() || 'B.Tech IT - B',
      regNo: regNo.trim() || '25108090',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1b4332] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-700/60 flex items-center justify-center border border-emerald-400/30">
              <Shield className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Fake News Detection Portal</h2>
              <p className="text-xs text-emerald-200 uppercase tracking-wider font-medium">
                Student & Researcher Access
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'login'
                ? 'bg-white text-[#1b4332] border-b-2 border-[#1b4332]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'signup'
                ? 'bg-white text-[#1b4332] border-b-2 border-[#1b4332]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register / Credentials
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h3 className="text-base font-bold text-slate-800">Authenticated Successfully</h3>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as <span className="font-semibold text-emerald-700">{name}</span> ({regNo})
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g. Ranjith or Naveen"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class / Dept
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="e.g. B.Tech IT - B"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Register Number
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  placeholder="e.g. 25108090"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="student@college.edu"
              />
            </div>

            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Security Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="••••••••"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1b4332] hover:bg-[#143326] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                {tab === 'login' ? 'Login to Portal' : 'Save & Register Profile'}
              </button>
            </div>

            {/* Quick pre-set toggle between Ranjith & Naveen */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Quick switch profile:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setName('Ranjith');
                    setClassName('B.Tech IT - B');
                    setRegNo('25108090');
                  }}
                  className="text-emerald-700 hover:underline font-medium"
                >
                  Ranjith (25108090)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setName('Naveen');
                    setClassName('B.Tech IT - B');
                    setRegNo('2022012');
                  }}
                  className="text-emerald-700 hover:underline font-medium"
                >
                  Naveen (2022012)
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
