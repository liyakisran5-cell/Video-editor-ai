import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Copy,
  Clock,
  Sparkles,
  Film,
  Scissors,
  CheckCircle2,
  Tv,
  Smartphone,
  Play,
  TrendingUp,
  HardDrive,
  CreditCard,
  Flame
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { ProjectCategory } from '../types';

export const DashboardView: React.FC = () => {
  const {
    projects,
    selectProject,
    setIsUploadModalOpen,
    duplicateProject,
    deleteProject
  } = useVideo();
  const { user, updateUserPlan } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'score' | 'duration'>('newest');

  const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'talking-head', label: 'Talking Head' },
    { id: 'short', label: 'Viral Shorts' },
    { id: 'podcast', label: 'Podcasts' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'ad', label: 'Video Ads' }
  ];

  const filteredProjects = projects
    .filter(p => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.analysisReport.overallScore - a.analysisReport.overallScore;
      if (sortBy === 'duration') return b.duration - a.duration;
      return 0; // Default newest
    });

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* 1. Top Header & User Usage Metric Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            Creator Studio Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your AI analyzed projects, viral shorts, and automated cuts.
          </p>
        </div>

        {/* Quick Usage Summary Pill */}
        {user && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-[#0d0f18] p-3 shadow-inner">
            <div className="flex items-center gap-2 border-r border-slate-800 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="text-[10px] text-slate-400">AI Minutes</p>
                <p className="font-bold text-white font-mono">
                  {user.aiMinutesUsed} / {user.aiMinutesTotal} min
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-r border-slate-800 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-950 border border-purple-800 text-purple-400">
                <HardDrive className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="text-[10px] text-slate-400">Cloud Storage</p>
                <p className="font-bold text-white font-mono">
                  {user.storageUsedGb} / {user.storageTotalGb} GB
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>New AI Video</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="h-9 w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="h-9 rounded-xl border border-slate-800 bg-slate-900 px-3 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="newest">Sort: Newest</option>
            <option value="score">Sort: Highest Retention</option>
            <option value="duration">Sort: Duration</option>
          </select>
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Upload Card Prompt */}
        <div
          onClick={() => setIsUploadModalOpen(true)}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/30 p-6 text-center cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-950/20 transition-all group min-h-[260px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-white text-sm mt-3">Upload New Raw Footage</h3>
          <p className="text-xs text-slate-400 mt-1">
            AI automatically cuts dead air, adds kinetic captions & B-roll
          </p>
        </div>

        {/* Project Items */}
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0d0f18] shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all"
          >
            {/* Thumbnail Header */}
            <div
              onClick={() => selectProject(proj.id)}
              className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
            >
              <img
                src={proj.thumbnailUrl}
                alt={proj.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Aspect Ratio Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/80 border border-slate-700 px-2 py-0.5 text-[10px] font-mono font-bold text-white backdrop-blur-sm">
                {proj.aspectRatio === '9:16' ? (
                  <Smartphone className="h-3 w-3 text-pink-400" />
                ) : (
                  <Tv className="h-3 w-3 text-indigo-400" />
                )}
                <span>{proj.aspectRatio}</span>
              </div>

              {/* Retention Score Pill */}
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300 backdrop-blur-sm">
                <TrendingUp className="h-3 w-3" />
                <span>{proj.analysisReport.overallScore}/100</span>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                {proj.duration}s
              </div>

              {/* Hover Play Icon */}
              <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                  <Play className="h-4 w-4 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-4 space-y-3">
              <div>
                <h3
                  onClick={() => selectProject(proj.id)}
                  className="font-bold text-white text-sm truncate hover:text-indigo-300 cursor-pointer"
                >
                  {proj.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{proj.description}</p>
              </div>

              {/* AI Metadata Badges */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
                <div className="flex items-center gap-1">
                  <Scissors className="h-3.5 w-3.5 text-rose-400" />
                  <span>{proj.smartCuts.filter(c => c.removed).length} Cuts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film className="h-3.5 w-3.5 text-purple-400" />
                  <span>{proj.bRolls.length} B-Roll</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>{proj.captionStyle.preset}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <button
                  onClick={() => selectProject(proj.id)}
                  className="flex items-center gap-1 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                >
                  <span>Open Studio</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => duplicateProject(proj.id)}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                    title="Duplicate project"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="rounded p-1.5 text-slate-400 hover:bg-rose-950/40 hover:text-rose-400"
                    title="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
