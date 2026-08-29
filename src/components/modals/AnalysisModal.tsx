import React from 'react';
import {
  Sparkles,
  Scissors,
  Wand2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Volume2,
  Film,
  Maximize2,
  X,
  ArrowRight
} from 'lucide-react';
import { useVideo } from '../../context/VideoContext';

export const AnalysisModal: React.FC = () => {
  const {
    isAnalysisModalOpen,
    setIsAnalysisModalOpen,
    currentProject,
    applyAIAutoEdit,
    setCurrentView
  } = useVideo();

  if (!isAnalysisModalOpen) return null;

  const report = currentProject.analysisReport;

  const pipelineSteps = [
    { name: 'Speech Transcription & Alignment', icon: Volume2, done: true, detail: '100% word-level sync' },
    { name: 'Silence & Dead Air Detection', icon: Scissors, done: true, detail: `${report.pausesDetected} pauses detected` },
    { name: 'Filler Word Identification', icon: AlertCircle, done: true, detail: `${report.fillerWordsDetected} filler words tagged` },
    { name: 'Kinetic Caption Formatting', icon: Wand2, done: true, detail: 'Hormozi style ready' },
    { name: 'Smart Zooms & Keyframes', icon: Maximize2, done: true, detail: '4 dynamic punch-ins' },
    { name: 'Stock B-Roll Suggestions', icon: Film, done: true, detail: `${report.bRollSuggestionsCount} stock visuals found` }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border border-indigo-900/60 bg-[#0a0c13] p-6 shadow-2xl space-y-5"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">AI Video Analysis Complete</h3>
              <p className="text-xs text-slate-400">
                Processed <span className="text-indigo-300 font-semibold">{currentProject.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnalysisModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Retention & Score Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Retention Score
            </span>
            <p className="font-mono text-2xl font-black text-emerald-400 mt-1">
              {report.overallScore}/100
            </p>
            <span className="text-[10px] text-emerald-300">High Viral Potential</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Dead Air Time
            </span>
            <p className="font-mono text-2xl font-black text-rose-400 mt-1">
              {report.silenceDurationSeconds}s
            </p>
            <span className="text-[10px] text-rose-300">Can be trimmed automatically</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pacing Improvement
            </span>
            <p className="font-mono text-2xl font-black text-indigo-400 mt-1">+42%</p>
            <span className="text-[10px] text-indigo-300">Estimated watch-time boost</span>
          </div>
        </div>

        {/* Pipeline Breakdown Steps */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Detected Automated Edits
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/90 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-950 text-indigo-400">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-200">{step.name}</p>
                      <p className="text-[10px] text-slate-400">{step.detail}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              setIsAnalysisModalOpen(false);
              setCurrentView('editor');
            }}
            className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Review Manually in Editor
          </button>

          <button
            onClick={() => applyAIAutoEdit(65)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Apply 1-Click AI Auto-Edit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
