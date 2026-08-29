import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Wand2,
  Sliders,
  Scissors,
  Share2,
  FileText,
  Volume2,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';

export const InspectorPanel: React.FC = () => {
  const { currentProject, executeAICommand, setIsSeoModalOpen, setIsVersionsModalOpen } = useVideo();
  const report = currentProject.analysisReport;

  const scoreColor =
    report.overallScore >= 90 ? 'text-emerald-400' : report.overallScore >= 75 ? 'text-indigo-400' : 'text-amber-400';

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-800 bg-[#090b10] shadow-xl overflow-hidden text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0c0e14] p-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <TrendingUp className="h-4 w-4 text-indigo-400" />
          <span>Smart Retention AI</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsVersionsModalOpen(true)}
            className="rounded-lg bg-slate-800 border border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700"
            title="Version History"
          >
            History ({currentProject.versions.length})
          </button>
        </div>
      </div>

      {/* Body Scroll */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* 1. Retention Score Card */}
        <div className="rounded-xl border border-indigo-900/50 bg-gradient-to-br from-[#0e111d] to-[#090b14] p-3.5 space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Audience Retention Index
              </span>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Top 5% Creator Benchmark</p>
            </div>
            <div className="flex items-baseline gap-0.5 font-mono">
              <span className={`text-2xl font-black ${scoreColor}`}>{report.overallScore}</span>
              <span className="text-xs text-slate-500 font-bold">/100</span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2 pt-1">
            {[
              { label: 'Opening Hook Energy', score: report.hookScore, color: 'bg-emerald-500' },
              { label: 'Pacing & Silence Density', score: report.pacingScore, color: 'bg-indigo-500' },
              { label: 'Speech Clarity & EQ', score: report.clarityScore, color: 'bg-sky-500' },
              { label: 'Visual Stimulus Variety', score: report.retentionScore, color: 'bg-purple-500' }
            ].map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{metric.label}</span>
                  <span className="font-mono text-slate-200 font-semibold">{metric.score}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${metric.color}`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Proactive AI Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              <span>AI Suggestions</span>
            </span>
          </div>

          <div className="space-y-2">
            {report.insights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 space-y-2 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  {item.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : item.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  )}
                  <p className="text-[11px] text-slate-300 leading-relaxed">{item.message}</p>
                </div>

                {item.actionLabel && (
                  <button
                    onClick={() =>
                      executeAICommand(item.actionCommand || `Apply suggestion: ${item.message}`)
                    }
                    className="flex items-center gap-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. AI Analysis Stats Matrix */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
            Detected Moments Summary
          </span>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-2">
              <p className="font-mono text-lg font-bold text-rose-400">{report.pausesDetected}</p>
              <p className="text-[10px] text-slate-400">Pauses Cut</p>
            </div>
            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-2">
              <p className="font-mono text-lg font-bold text-amber-400">{report.fillerWordsDetected}</p>
              <p className="text-[10px] text-slate-400">Filler Words</p>
            </div>
            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-2">
              <p className="font-mono text-lg font-bold text-emerald-400">{report.strongMomentsCount}</p>
              <p className="text-[10px] text-slate-400">Hook Moments</p>
            </div>
            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-2">
              <p className="font-mono text-lg font-bold text-purple-400">{report.bRollSuggestionsCount}</p>
              <p className="text-[10px] text-slate-400">B-Roll Matches</p>
            </div>
          </div>
        </div>

        {/* 4. Viral SEO & Titles Trigger */}
        <button
          onClick={() => setIsSeoModalOpen(true)}
          className="flex w-full items-center justify-between rounded-xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 p-3 text-left hover:border-indigo-400 transition-all shadow-md group"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/30 border border-indigo-500/50 text-indigo-300">
              <Flame className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">AI Viral Titles & SEO</p>
              <p className="text-[10px] text-slate-400">Generate high-CTR tags & descriptions</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
