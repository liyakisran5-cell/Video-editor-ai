import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Scissors,
  Layers,
  Palette,
  LayoutTemplate,
  Shield,
  CreditCard,
  Download,
  RotateCcw,
  RotateCw,
  CheckCircle2,
  Cloud,
  User,
  LogOut,
  ChevronDown,
  Wand2,
  Menu,
  X,
  Flame,
  Plus,
  MessageCircle
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { getWhatsAppUrl } from '../config/contact';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentProject,
    setCurrentProject,
    canUndo,
    canRedo,
    undo,
    redo,
    saveStatus,
    setIsExportModalOpen,
    setIsUploadModalOpen
  } = useVideo();

  const { user, isAuthenticated, openAuthModal, logout, updateUserPlan } = useAuth();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(currentProject.name);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      setCurrentProject(prev => ({ ...prev, name: titleInput.trim() }));
    }
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Play },
    { id: 'dashboard', label: 'Projects', icon: Layers },
    { id: 'editor', label: 'AI Editor', icon: Scissors, highlight: true },
    { id: 'shorts', label: 'Viral Shorts', icon: Flame },
    { id: 'brand-kit', label: 'Brand Kit', icon: Palette },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'billing', label: 'Plans', icon: CreditCard },
    { id: 'admin', label: 'Admin', icon: Shield }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-md">
      <div className="flex h-15 items-center justify-between px-3 md:px-5">
        {/* Brand Logo & Project Title */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setCurrentView('landing')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-30 blur-sm group-hover:opacity-75" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit'] font-bold text-lg tracking-tight text-white">
                  DayaCuts<span className="text-indigo-400">AI</span>
                </span>
                <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                  PRO
                </span>
              </div>
            </div>
          </button>

          {/* Project Title Editor (if on editor or shorts) */}
          {(currentView === 'editor' || currentView === 'shorts') && (
            <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-4">
              {isEditingTitle ? (
                <form onSubmit={handleTitleSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)}
                    onBlur={handleTitleSubmit}
                    autoFocus
                    className="h-7 rounded border border-indigo-500 bg-slate-900 px-2 text-xs font-semibold text-white focus:outline-none"
                  />
                </form>
              ) : (
                <button
                  onClick={() => {
                    setTitleInput(currentProject.name);
                    setIsEditingTitle(true);
                  }}
                  className="group flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  title="Click to rename project"
                >
                  <span className="max-w-[200px] truncate">{currentProject.name}</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400">✏️</span>
                </button>
              )}

              {/* Cloud Sync Status */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                {saveStatus === 'saved' ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span className="text-slate-400">Saved</span>
                  </>
                ) : (
                  <>
                    <Cloud className="h-3 w-3 text-amber-400 animate-pulse" />
                    <span className="text-amber-300">Saving...</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center Nav Switcher */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/90 border border-slate-800/90 p-1 shadow-inner">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Undo / Redo in Editor */}
          {currentView === 'editor' && (
            <div className="hidden sm:flex items-center gap-1 border-r border-slate-800 pr-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                title="Undo (Ctrl+Z)"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                title="Redo (Ctrl+Y)"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* New Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/70 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">New Video</span>
          </button>

          {/* Export Video Button */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="group relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:brightness-110 active:scale-95"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>Export</span>
          </button>

          {/* Contact via WhatsApp Button */}
          <a
            id="nav-contact-whatsapp-btn"
            href={getWhatsAppUrl('Hi DayaCuts team! I want to contact you regarding the DayaCuts AI editor.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-sm"
            title="Direct WhatsApp Chat"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Contact</span>
          </a>

          {/* User Account / Auth */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-1 pr-2.5 transition-colors hover:border-slate-700"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-6 w-6 rounded-md object-cover ring-1 ring-indigo-500/40"
                />
                <span className="hidden text-xs font-medium text-slate-200 lg:inline max-w-[90px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-800 bg-[#0d0f17] p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="border-b border-slate-800/80 p-2.5 pb-3">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-indigo-950/40 border border-indigo-800/30 px-2 py-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                        {user.plan} PLAN
                      </span>
                      <button
                        onClick={() => {
                          setCurrentView('billing');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-[10px] font-semibold text-amber-400 hover:underline"
                      >
                        Upgrade ⚡
                      </button>
                    </div>
                  </div>

                  {/* Usage bar */}
                  <div className="p-2 text-[11px] space-y-1.5">
                    <div className="flex justify-between text-slate-400">
                      <span>AI Minutes:</span>
                      <span className="font-semibold text-slate-200">
                        {user.aiMinutesUsed} / {user.aiMinutesTotal} min
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${(user.aiMinutesUsed / user.aiMinutesTotal) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-1 border-t border-slate-800/80 pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      <span>My Projects</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('brand-kit');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Palette className="h-3.5 w-3.5 text-slate-400" />
                      <span>Brand Kit</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('billing');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                      <span>Subscription & Usage</span>
                    </button>
                    <a
                      href={getWhatsAppUrl('Hi DayaCuts team! I need support with my account.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Contact Support (WhatsApp)</span>
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#090b10] px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg p-2 text-xs font-medium ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800">
            <a
              href={getWhatsAppUrl('Hi DayaCuts team! I want to contact you.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 p-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/30"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
