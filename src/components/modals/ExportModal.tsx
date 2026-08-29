import React, { useState } from 'react';
import {
  Download,
  Video,
  CheckCircle2,
  Sparkles,
  X,
  FileText,
  Layers,
  Settings,
  Share2,
  Clock,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { useVideo } from '../../context/VideoContext';
import { useAuth } from '../../context/AuthContext';

export const ExportModal: React.FC = () => {
  const { isExportModalOpen, setIsExportModalOpen, currentProject } = useVideo();
  const { user, incrementUsage } = useAuth();

  const [resolution, setResolution] = useState<'1080p' | '4k' | '720p'>('1080p');
  const [fps, setFps] = useState<30 | 60>(60);
  const [format, setFormat] = useState<'mp4' | 'webm' | 'gif'>('mp4');
  const [burnCaptions, setBurnCaptions] = useState(true);
  const [exportSrt, setExportSrt] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportDone, setExportDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (!isExportModalOpen) return null;

  const handleStartExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportDone(false);

    // Simulate real frame-by-frame rendering with high visual precision
    for (let p = 0; p <= 100; p += 5) {
      setExportProgress(p);
      await new Promise(r => setTimeout(r, 90));
    }

    // Create a real downloadable dummy video blob / text file
    const exportMetadata = {
      project: currentProject.name,
      exportedAt: new Date().toISOString(),
      resolution,
      fps,
      aspectRatio: currentProject.aspectRatio,
      duration: `${currentProject.duration}s`,
      captionsCount: currentProject.captions.length,
      bRollsCount: currentProject.bRolls.length,
      smartCutsCount: currentProject.smartCuts.filter(c => c.removed).length
    };

    const blob = new Blob([JSON.stringify(exportMetadata, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    setIsExporting(false);
    setExportDone(true);
    incrementUsage(0, 1);
  };

  const handleDownloadSrt = () => {
    let srtContent = '';
    currentProject.captions.forEach((c, idx) => {
      const formatSrtTime = (sec: number) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);
        const ms = Math.floor((sec % 1) * 1000);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
      };

      srtContent += `${idx + 1}\n`;
      srtContent += `${formatSrtTime(c.start)} --> ${formatSrtTime(c.end)}\n`;
      srtContent += `${c.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name}_subtitles.srt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0a0c13] p-6 shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Export Video</h3>
              <p className="text-xs text-slate-400">
                Format: <span className="font-semibold text-indigo-300">{currentProject.aspectRatio}</span> • {currentProject.duration}s duration
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsExportModalOpen(false);
              setExportDone(false);
              setIsExporting(false);
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* If Rendering / Exporting */}
        {isExporting && (
          <div className="rounded-xl border border-indigo-900/50 bg-indigo-950/20 p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/40">
                <Sparkles className="h-8 w-8 text-indigo-400 animate-spin" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Rendering Frame by Frame...</h4>
              <p className="text-xs text-slate-400 mt-1">
                Applying kinetic captions, dynamic zooms, stock overlays and voice polish
              </p>
            </div>
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Compositing Video</span>
                <span className="font-bold text-indigo-400">{exportProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* If Export Completed */}
        {exportDone && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Video Export Ready!</h4>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                Full {resolution.toUpperCase()} {fps}fps video compiled successfully.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <a
                href={downloadUrl || '#'}
                download={`${currentProject.name}_rendered.${format}`}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 hover:brightness-110"
              >
                <Download className="h-4 w-4" />
                <span>Download Video ({format.toUpperCase()})</span>
              </a>

              <button
                onClick={handleDownloadSrt}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                <span>Download .SRT Subtitles</span>
              </button>
            </div>
          </div>
        )}

        {/* Standard Export Form Settings */}
        {!isExporting && !exportDone && (
          <div className="space-y-4">
            {/* Resolution Selector */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Resolution & Quality
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { id: '720p', label: '720p HD', desc: 'Fast Web' },
                  { id: '1080p', label: '1080p FHD', desc: 'Social Standard' },
                  { id: '4k', label: '4K UHD', desc: 'Crisp Master' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setResolution(opt.id as any)}
                    className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                      resolution === opt.id
                        ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-xs">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Framerate & Format */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Framerate
                </label>
                <div className="mt-1.5 flex gap-2">
                  {[30, 60].map(f => (
                    <button
                      key={f}
                      onClick={() => setFps(f as any)}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold ${
                        fps === f
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f} FPS
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Container Format
                </label>
                <div className="mt-1.5 flex gap-2">
                  {['mp4', 'webm', 'gif'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt as any)}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold uppercase ${
                        format === fmt
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Burn-in Kinetic Captions</span>
                <input
                  type="checkbox"
                  checked={burnCaptions}
                  onChange={e => setBurnCaptions(e.target.checked)}
                  className="h-4 w-4 rounded accent-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Export Separate .SRT Subtitle File</span>
                <input
                  type="checkbox"
                  checked={exportSrt}
                  onChange={e => setExportSrt(e.target.checked)}
                  className="h-4 w-4 rounded accent-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                <span className="text-slate-400">Export Balance:</span>
                <span className="font-semibold text-slate-200">
                  {user ? `${user.exportsUsed} / ${user.exportsTotal} exports used` : '3 exports free'}
                </span>
              </div>
            </div>

            {/* Start Export Button */}
            <button
              onClick={handleStartExport}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Start Cloud Rendering & Export</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
