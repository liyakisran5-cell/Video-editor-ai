import React from 'react';
import {
  Flame,
  Sparkles,
  Smartphone,
  Play,
  Scissors,
  Download,
  Share2,
  TrendingUp,
  Clock,
  Wand2,
  Copy,
  Check
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';

export const ShortsView: React.FC = () => {
  const { currentProject, setAspectRatio, setCurrentView, setIsExportModalOpen } = useVideo();

  const shorts = currentProject.viralShorts || [];

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Flame className="h-5 w-5" />
            </div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
              AI Viral Shorts Generator
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automatically extracted high-retention moments formatted for TikTok, Reels & YouTube Shorts.
          </p>
        </div>

        <button
          onClick={() => {
            setAspectRatio('9:16');
            setCurrentView('editor');
          }}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Smartphone className="h-4 w-4" />
          <span>Open 9:16 Vertical Editor</span>
        </button>
      </div>

      {/* Shorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shorts.map((short, idx) => (
          <div
            key={short.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-4 shadow-xl hover:border-rose-500/50 transition-all group"
          >
            {/* 9:16 Aspect Thumbnail Mockup */}
            <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black max-h-[380px]">
              <img
                src={short.thumbnailUrl}
                alt={short.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Viral Score Pill */}
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-rose-950/90 border border-rose-500/60 px-2.5 py-1 text-xs font-bold text-rose-300 backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Viral Score: {short.score}%</span>
              </div>

              {/* Time Range */}
              <div className="absolute bottom-3 left-3 rounded-md bg-black/80 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                {short.start}s – {short.end}s ({short.duration}s)
              </div>

              {/* Overlay Hook */}
              <div className="absolute bottom-10 inset-x-3 text-center">
                <span className="rounded bg-yellow-400 text-black px-2 py-0.5 font-black text-xs uppercase shadow-md">
                  {short.hook}
                </span>
              </div>
            </div>

            {/* Short Details */}
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">{short.title}</h3>
              <p className="text-xs text-slate-400">{short.description}</p>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {short.hashtags.map((h, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
              <button
                onClick={() => {
                  setAspectRatio('9:16');
                  setCurrentView('editor');
                }}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                <Scissors className="h-3.5 w-3.5" />
                <span>Edit Clip</span>
              </button>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Short</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
