import React, { useState } from 'react';
import {
  User,
  Sparkles,
  Lock,
  Mail,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    loginWithGoogle,
    signup
  } = useAuth();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'signup') {
      await signup(name, email, password);
    } else {
      await login(email, password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0c0e16] p-6 shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {authModalMode === 'signup' ? 'Create DayaCuts Studio Account' : 'Welcome to DayaCuts AI'}
              </h3>
              <p className="text-xs text-slate-400">Next-generation automated video editing</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 1-Click Google Sign In */}
        <button
          onClick={loginWithGoogle}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/90 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[10px] uppercase font-bold text-slate-500">or with email</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {authModalMode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Creator Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900/90 pl-9 pr-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="creator@studio.com"
                className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900/90 pl-9 pr-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900/90 pl-9 pr-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{authModalMode === 'signup' ? 'Create Free Account' : 'Sign In'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Switch Mode */}
        <div className="text-center text-xs text-slate-400">
          {authModalMode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => openAuthModal('login')}
                className="font-semibold text-indigo-400 hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => openAuthModal('signup')}
                className="font-semibold text-indigo-400 hover:underline"
              >
                Sign Up (Free)
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
