import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Copy,
  Check,
  X,
  Share2,
  TrendingUp,
  Tag,
  FileText
} from 'lucide-react';
import { useVideo } from '../../context/VideoContext';
import { AIService } from '../../services/aiService';

export const SeoModal: React.FC = () => {
  const { isSeoModalOpen, setIsSeoModalOpen, currentProject } = useVideo();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [seoData, setSeoData] = useState<{
    titles: string[];
    hashtags: string[];
    description: string;
    hookQuestions: string[];
  }>({
    titles: [
      'Stop Editing Videos Manually in 2026 (Do This Instead)',
      'How AI Generates 10x More Views on YouTube Shorts',
      'The 3 Secret AI Video Editing Tools Pro Creators Use'
    ],
    hashtags: ['#ViralShorts', '#VideoEditing', '#AITools', '#CreatorEconomy', '#ContentCreation'],
    description: `In this video, we break down how modern AI algorithms analyze talking head footage, eliminate dead air pauses, and craft retention-maximizing kinetic captions in seconds.\n\nSubscribe for daily creator workflows and growth strategies!`,
    hookQuestions: [
      'Did you know that 85% of viewers swipe away in the first 3 seconds?',
      'Why is manual video cutting wasting 4 hours of your week?',
      'What makes Alex Hormozi captions so addictive to watch?'
    ]
  });

  if (!isSeoModalOpen) return null;

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border border-indigo-900/50 bg-[#0a0c13] p-6 shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-500/20">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">AI Viral Titles & Metadata</h3>
              <p className="text-xs text-slate-400">
                Optimized for YouTube Shorts, TikTok & Instagram Reels algorithms
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSeoModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Viral Titles */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            High-CTR Viral Titles
          </span>

          <div className="space-y-1.5">
            {seoData.titles.map((title, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 hover:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-[10px] font-mono font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-white">{title}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(title, `title_${idx}`)}
                  className="flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700"
                >
                  {copiedField === `title_${idx}` ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-indigo-400" />
              Viral Hashtags
            </span>
            <button
              onClick={() => copyToClipboard(seoData.hashtags.join(' '), 'all_hashtags')}
              className="text-[11px] text-indigo-400 hover:underline font-medium"
            >
              {copiedField === 'all_hashtags' ? 'Copied all!' : 'Copy All Tags'}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {seoData.hashtags.map((tag, idx) => (
              <span
                key={idx}
                onClick={() => copyToClipboard(tag, `tag_${idx}`)}
                className="cursor-pointer rounded-lg bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-1 text-xs font-mono font-medium text-indigo-300 hover:bg-indigo-900/60 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* SEO Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-400" />
              Optimized Description
            </span>
            <button
              onClick={() => copyToClipboard(seoData.description, 'description')}
              className="text-[11px] text-indigo-400 hover:underline font-medium"
            >
              {copiedField === 'description' ? 'Copied!' : 'Copy Description'}
            </button>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs text-slate-300 font-mono leading-relaxed max-h-24 overflow-y-auto whitespace-pre-line">
            {seoData.description}
          </div>
        </div>
      </div>
    </div>
  );
};
