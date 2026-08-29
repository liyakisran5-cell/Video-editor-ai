import React from 'react';
import {
  LayoutTemplate,
  Sparkles,
  Play,
  ArrowRight,
  Tv,
  Smartphone,
  Square,
  CheckCircle2,
  Film
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { TEMPLATES_LIST } from '../data/mockData';
import { TemplateItem } from '../types';

export const TemplatesView: React.FC = () => {
  const { createProjectFromTemplate } = useVideo();

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <LayoutTemplate className="h-5 w-5" />
          </div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            Creator Template Library
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pre-engineered pacing curves, typography styles, and B-roll workflows for every content niche.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES_LIST.map(tmpl => (
          <div
            key={tmpl.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-4 shadow-xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all group"
          >
            {/* Thumbnail Header */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
              <img
                src={tmpl.thumbnailUrl}
                alt={tmpl.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Aspect Ratio Badge */}
              <div className="absolute top-2.5 left-2.5 rounded bg-black/80 border border-slate-700 px-2 py-0.5 text-[10px] font-mono font-bold text-white">
                {tmpl.aspectRatio}
              </div>

              {/* Category Badge */}
              <div className="absolute top-2.5 right-2.5 rounded-full bg-indigo-950/90 border border-indigo-500/50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                {tmpl.category}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">{tmpl.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-1 pt-1">
                {tmpl.features.map((f, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[10px] text-slate-300 font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={() => createProjectFromTemplate(tmpl)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Use This AI Template</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
