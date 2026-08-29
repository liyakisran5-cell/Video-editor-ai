import React, { useRef, useState } from 'react';
import {
  Scissors,
  Trash2,
  Copy,
  ZoomIn,
  ZoomOut,
  Volume2,
  Music,
  Video,
  Film,
  Type,
  Maximize2,
  Sparkles,
  Layers,
  Wand2,
  Mic,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';

export const Timeline: React.FC = () => {
  const {
    currentProject,
    currentTime,
    setCurrentTime,
    timelineZoom,
    setTimelineZoom,
    selectedClipId,
    setSelectedClipId,
    toggleSmartCut,
    toggleBRoll,
    toggleZoom,
    toggleEffect,
    applyCutAggressiveness,
    updateCaptionText,
    setActiveEditorTab
  } = useVideo();

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const [activeEditingCaptionId, setActiveEditingCaptionId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const duration = currentProject.duration || 18.0;

  // Pixels per second based on zoom level (100% = 50px/sec)
  const pxPerSec = (timelineZoom / 100) * 55;
  const totalTimelineWidth = Math.max(800, duration * pxPerSec);

  // Time to pixel
  const timeToPx = (t: number) => t * pxPerSec;
  // Pixel to time
  const pxToTime = (px: number) => Math.max(0, Math.min(duration, px / pxPerSec));

  // Handle timeline scrubber drag
  const handleTimelineClickOrDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const newTime = pxToTime(clickX);
    setCurrentTime(newTime);
  };

  const handleMouseDownScrubber = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingPlayhead(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = moveEvent.clientX - rect.left + timelineRef.current.scrollLeft;
      setCurrentTime(pxToTime(clickX));
    };

    const onMouseUp = () => {
      setIsDraggingPlayhead(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Generate ruler tick marks
  const rulerTicks = [];
  const tickInterval = timelineZoom > 150 ? 1 : timelineZoom > 80 ? 2 : 5;
  for (let s = 0; s <= Math.ceil(duration); s += tickInterval) {
    rulerTicks.push(s);
  }

  return (
    <div className="w-full flex flex-col rounded-2xl border border-slate-800/90 bg-[#08090d] shadow-2xl overflow-hidden select-none">
      {/* Timeline Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-[#0c0e14] px-3 py-2 text-xs">
        {/* Left: Tool buttons */}
        <div className="flex items-center gap-1.5">
          <button
            className="flex items-center gap-1 rounded-lg bg-slate-800 border border-slate-700/80 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white"
            title="Split clip at playhead (S)"
          >
            <Scissors className="h-3.5 w-3.5 text-indigo-400" />
            <span className="font-medium">Split (S)</span>
          </button>

          <button
            className="flex items-center gap-1 rounded-lg bg-slate-800/80 border border-slate-700/60 px-2 py-1 text-slate-400 hover:bg-rose-950/40 hover:border-rose-700/60 hover:text-rose-300"
            title="Delete selected clip (Del)"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>

          {/* Aggressiveness Smart Cut Slider */}
          <div className="hidden md:flex items-center gap-2 border-l border-slate-800 pl-3 ml-2">
            <span className="text-[11px] font-medium text-slate-400">AI Cuts:</span>
            <span className="text-[10px] text-slate-500">Natural</span>
            <input
              type="range"
              min={10}
              max={100}
              value={currentProject.cutAggressiveness || 65}
              onChange={e => applyCutAggressiveness(parseInt(e.target.value))}
              className="w-20 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-indigo-400 font-semibold">Aggressive</span>
          </div>
        </div>

        {/* Right: Zoom slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimelineZoom(z => Math.max(30, z - 20))}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="w-9 text-center font-mono text-[11px] text-slate-400">
            {timelineZoom}%
          </span>
          <button
            onClick={() => setTimelineZoom(z => Math.min(300, z + 20))}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Multi-Track Scroll Area */}
      <div
        ref={timelineRef}
        onClick={handleTimelineClickOrDrag}
        className="relative w-full overflow-x-auto overflow-y-auto max-h-[340px] bg-[#07080b] cursor-crosshair pb-6"
      >
        <div style={{ width: `${totalTimelineWidth}px` }} className="relative min-w-full">
          {/* 1. Time Ruler */}
          <div className="sticky top-0 z-20 flex h-7 w-full border-b border-slate-800 bg-[#090b10]/95 backdrop-blur-sm text-[10px] font-mono text-slate-400">
            {rulerTicks.map(s => (
              <div
                key={s}
                style={{ left: `${timeToPx(s)}px` }}
                className="absolute top-0 flex flex-col items-start border-l border-slate-700/60 pl-1 h-full"
              >
                <span>{s}s</span>
              </div>
            ))}
          </div>

          {/* Dynamic Draggable Red Playhead Needle */}
          <div
            style={{ left: `${timeToPx(currentTime)}px` }}
            className="absolute top-0 z-30 flex flex-col items-center pointer-events-none h-full"
          >
            <div
              onMouseDown={handleMouseDownScrubber}
              className="pointer-events-auto cursor-grab active:cursor-grabbing flex h-4 w-3 items-center justify-center rounded-sm bg-rose-500 shadow-md shadow-rose-500/50"
            >
              <div className="h-2 w-0.5 bg-white rounded-full" />
            </div>
            <div className="h-full w-0.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          </div>

          {/* 2. Track Rows */}
          <div className="flex flex-col gap-1.5 p-2 pt-3">
            {/* TRACK: Visual B-Roll Overlays */}
            <div className="relative flex h-10 w-full items-center rounded-xl bg-slate-900/60 border border-slate-800/80 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-slate-900/90 pr-2 text-[11px] font-semibold text-purple-400 shrink-0">
                <Film className="h-3.5 w-3.5" />
                <span>B-Roll ({currentProject.bRolls.length})</span>
              </div>

              {currentProject.bRolls.map(broll => (
                <div
                  key={broll.id}
                  onClick={e => {
                    e.stopPropagation();
                    toggleBRoll(broll.id);
                    setActiveEditorTab('b-roll');
                  }}
                  style={{
                    left: `${timeToPx(broll.start)}px`,
                    width: `${Math.max(60, timeToPx(broll.duration))}px`
                  }}
                  className={`absolute h-7 rounded-lg border px-2 flex items-center justify-between text-[10px] font-medium cursor-pointer shadow-sm transition-all ${
                    broll.applied
                      ? 'bg-purple-950/80 border-purple-500/60 text-purple-200 hover:border-purple-400'
                      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 line-through'
                  }`}
                  title={`${broll.title} (${broll.applied ? 'Applied' : 'Disabled'}) - Click to toggle`}
                >
                  <span className="truncate">{broll.title}</span>
                  <span className="text-[9px] opacity-75">{broll.duration}s</span>
                </div>
              ))}
            </div>

            {/* TRACK: Dynamic Captions */}
            <div className="relative flex h-11 w-full items-center rounded-xl bg-slate-900/60 border border-slate-800/80 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-slate-900/90 pr-2 text-[11px] font-semibold text-amber-400 shrink-0">
                <Type className="h-3.5 w-3.5" />
                <span>Captions</span>
              </div>

              {currentProject.captions.map(caption => (
                <div
                  key={caption.id}
                  onClick={e => {
                    e.stopPropagation();
                    setActiveEditingCaptionId(caption.id);
                    setEditingText(caption.text);
                    setActiveEditorTab('captions');
                  }}
                  style={{
                    left: `${timeToPx(caption.start)}px`,
                    width: `${Math.max(80, timeToPx(caption.end - caption.start))}px`
                  }}
                  className="absolute h-8 rounded-lg bg-amber-950/70 border border-amber-500/50 hover:border-amber-400 px-2 flex items-center justify-between text-[11px] font-semibold text-amber-200 cursor-pointer shadow-sm group"
                  title="Click to edit subtitle text"
                >
                  <span className="truncate max-w-[85%]">{caption.text}</span>
                  <span className="text-[9px] text-amber-400/80 opacity-0 group-hover:opacity-100">✏️</span>
                </div>
              ))}
            </div>

            {/* TRACK: Smart Zoom Keyframes */}
            <div className="relative flex h-8 w-full items-center rounded-xl bg-slate-900/60 border border-slate-800/80 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-slate-900/90 pr-2 text-[11px] font-semibold text-sky-400 shrink-0">
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Smart Zooms</span>
              </div>

              {currentProject.zooms.map(zoom => (
                <div
                  key={zoom.id}
                  onClick={e => {
                    e.stopPropagation();
                    toggleZoom(zoom.id);
                    setActiveEditorTab('zooms');
                  }}
                  style={{
                    left: `${timeToPx(zoom.time)}px`,
                    width: `${Math.max(50, timeToPx(zoom.duration))}px`
                  }}
                  className={`absolute h-6 rounded-md border px-1.5 flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer transition-all ${
                    zoom.applied
                      ? 'bg-sky-950/80 border-sky-500/60 text-sky-200 hover:border-sky-400'
                      : 'bg-slate-800/40 border-slate-700/40 text-slate-500 line-through'
                  }`}
                  title={`Zoom ${zoom.scale}x (${zoom.applied ? 'Active' : 'Disabled'})`}
                >
                  <span>🔍 {zoom.scale}x</span>
                </div>
              ))}
            </div>

            {/* TRACK: Main Video Track & Smart Cuts Splices */}
            <div className="relative flex h-14 w-full items-center rounded-xl bg-indigo-950/30 border border-indigo-900/50 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-indigo-950/90 pr-2 text-[11px] font-semibold text-indigo-300 shrink-0">
                <Video className="h-3.5 w-3.5" />
                <span>Main Video</span>
              </div>

              {/* Base Video Bar */}
              <div
                style={{ width: `${timeToPx(duration)}px` }}
                className="absolute left-0 h-10 rounded-lg bg-gradient-to-r from-indigo-900/70 via-indigo-800/70 to-indigo-900/70 border border-indigo-500/40 flex items-center px-3"
              >
                <span className="text-[11px] font-semibold text-indigo-100 truncate">
                  {currentProject.originalVideoName}
                </span>
              </div>

              {/* Overlaid Smart Cuts / Silence Gaps */}
              {currentProject.smartCuts.map(cut => (
                <div
                  key={cut.id}
                  onClick={e => {
                    e.stopPropagation();
                    toggleSmartCut(cut.id);
                  }}
                  style={{
                    left: `${timeToPx(cut.start)}px`,
                    width: `${Math.max(16, timeToPx(cut.duration))}px`
                  }}
                  className={`absolute z-10 h-10 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                    cut.removed
                      ? 'bg-rose-950/90 border-rose-500/80 text-rose-300 shadow-sm'
                      : 'bg-amber-950/50 border-amber-600/50 text-amber-300 opacity-60'
                  }`}
                  title={`${cut.reason} (${cut.duration}s) - ${cut.removed ? 'Cut (Removed)' : 'Kept'} - Click to toggle`}
                >
                  <span className="text-[9px] font-bold">✂️</span>
                </div>
              ))}
            </div>

            {/* TRACK: Audio Speech Waveform */}
            <div className="relative flex h-10 w-full items-center rounded-xl bg-slate-900/60 border border-slate-800/80 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-slate-900/90 pr-2 text-[11px] font-semibold text-emerald-400 shrink-0">
                <Volume2 className="h-3.5 w-3.5" />
                <span>Voice Audio</span>
              </div>

              {/* Mock Waveform Bars */}
              <div
                style={{ width: `${timeToPx(duration)}px` }}
                className="absolute left-0 h-6 flex items-center gap-0.5 px-1 opacity-70"
              >
                {Array.from({ length: Math.round(duration * 12) }).map((_, idx) => {
                  const barH = 4 + Math.sin(idx * 0.4) * 8 + Math.cos(idx * 0.8) * 6;
                  return (
                    <div
                      key={idx}
                      style={{ height: `${Math.max(3, barH)}px` }}
                      className="w-1 rounded-full bg-emerald-500/80"
                    />
                  );
                })}
              </div>
            </div>

            {/* TRACK: Background Music */}
            <div className="relative flex h-9 w-full items-center rounded-xl bg-slate-900/60 border border-slate-800/80 px-2 overflow-hidden">
              <div className="sticky left-0 z-10 flex items-center gap-1 bg-slate-900/90 pr-2 text-[11px] font-semibold text-pink-400 shrink-0">
                <Music className="h-3.5 w-3.5" />
                <span>Music Track</span>
              </div>

              <div
                style={{ width: `${timeToPx(duration)}px` }}
                className="absolute left-0 h-6 rounded-md bg-pink-950/50 border border-pink-500/30 flex items-center justify-between px-2 text-[10px] text-pink-200"
              >
                <span className="truncate">
                  🎵 {currentProject.audioConfig.backgroundMusicName || 'Cyber Lofi Focus Beat'}
                </span>
                <span className="font-mono text-pink-400">Vol: {currentProject.audioConfig.backgroundMusicVolume}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Caption Editor Modal */}
      {activeEditingCaptionId && (
        <div className="border-t border-slate-800 bg-[#0c0e14] p-3 flex items-center gap-2">
          <span className="text-xs font-semibold text-amber-400">Edit Subtitle:</span>
          <input
            type="text"
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
            className="flex-1 rounded-lg border border-amber-500/50 bg-slate-900 px-3 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            onClick={() => {
              updateCaptionText(activeEditingCaptionId, editingText);
              setActiveEditingCaptionId(null);
            }}
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-500"
          >
            <Check className="h-3 w-3" />
            <span>Save</span>
          </button>
          <button
            onClick={() => setActiveEditingCaptionId(null)}
            className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
