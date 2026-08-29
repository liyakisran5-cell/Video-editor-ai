import React from 'react';
import {
  History,
  RotateCcw,
  Sparkles,
  User,
  Clock,
  X,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { useVideo } from '../../context/VideoContext';

export const VersionsModal: React.FC = () => {
  const { isVersionsModalOpen, setIsVersionsModalOpen, currentProject } = useVideo();

  if (!isVersionsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0a0c13] p-6 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-indigo-400 border border-slate-700">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Timeline Version History</h3>
              <p className="text-xs text-slate-400">
                Automatic snapshots created at every AI command and cut
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVersionsModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Versions Timeline List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {currentProject.versions.map((ver, idx) => (
            <div
              key={ver.id}
              className={`rounded-xl border p-3.5 space-y-2 transition-all ${
                idx === 0
                  ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{ver.name}</span>
                  {idx === 0 && (
                    <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 text-[9px] font-bold text-indigo-300">
                      CURRENT
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{ver.timestamp}</span>
              </div>

              <p className="text-[11px] text-slate-300">{ver.description}</p>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span>✂️ {ver.cutsCount} Cuts</span>
                  <span>🎬 {ver.clipsCount} Elements</span>
                  <span className="text-indigo-400 font-medium">By: {ver.author}</span>
                </div>

                {idx !== 0 && (
                  <button
                    onClick={() => {
                      alert(`Restored to ${ver.name}`);
                      setIsVersionsModalOpen(false);
                    }}
                    className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 font-medium"
                  >
                    <RotateCcw className="h-2.5 w-2.5" />
                    <span>Restore</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
