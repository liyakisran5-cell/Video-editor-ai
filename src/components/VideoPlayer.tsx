import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Smartphone,
  Tv,
  Square,
  Sparkles,
  Layers,
  Settings,
  Crop,
  Eye,
  Sliders
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { VideoEngine } from '../services/videoEngine';
import { AspectRatio } from '../types';

export const VideoPlayer: React.FC = () => {
  const {
    currentProject,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    volume,
    setVolume,
    setAspectRatio,
    activeBrandKit
  } = useVideo();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFaceTrackBox, setShowFaceTrackBox] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Play / Pause toggler
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Keyboard shortcut listener (Space = play/pause, Left/Right = skip 2s)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setCurrentTime(t => Math.max(0, t - 2));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setCurrentTime(t => Math.min(currentProject.duration, t + 2));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject.duration]);

  // Main playback animation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        setCurrentTime(t => {
          const next = t + delta * playbackSpeed;
          if (next >= currentProject.duration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }

      // Sync HTML video element current time if available
      if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.3) {
        videoRef.current.currentTime = currentTime;
      }

      // Draw canvas frame
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          VideoEngine.renderFrame({
            currentTime,
            duration: currentProject.duration,
            videoElement: videoRef.current,
            canvas: canvasRef.current,
            ctx,
            aspectRatio: currentProject.aspectRatio,
            captions: currentProject.captions,
            captionStyle: currentProject.captionStyle,
            bRolls: currentProject.bRolls,
            zooms: currentProject.zooms,
            effects: currentProject.effects,
            watermarkText: activeBrandKit?.watermarkText
          });

          // Optional AI Face Tracking Overlay
          if (showFaceTrackBox && currentProject.aspectRatio === '9:16') {
            const w = canvasRef.current.width;
            const h = canvasRef.current.height;
            ctx.save();
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            const boxW = w * 0.45;
            const boxH = boxW * 1.3;
            const boxX = (w - boxW) / 2;
            const boxY = h * 0.18;
            ctx.strokeRect(boxX, boxY, boxW, boxH);

            ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
            ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
            ctx.fillText('⚡ AI Face Tracking', boxX + 6, boxY - 6);
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    isPlaying,
    currentTime,
    playbackSpeed,
    currentProject,
    showFaceTrackBox,
    activeBrandKit
  ]);

  // Format time (00:00.0)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins.toString().padStart(2, '0')}:${parseFloat(secs) < 10 ? '0' : ''}${secs}`;
  };

  // Dimensions based on aspect ratio
  const getCanvasDimensions = () => {
    switch (currentProject.aspectRatio) {
      case '9:16':
        return { width: 720, height: 1280, styleAspect: 'aspect-[9/16]' };
      case '1:1':
        return { width: 1080, height: 1080, styleAspect: 'aspect-square' };
      case '4:5':
        return { width: 864, height: 1080, styleAspect: 'aspect-[4/5]' };
      case '16:9':
      default:
        return { width: 1280, height: 720, styleAspect: 'aspect-video' };
    }
  };

  const { width: cWidth, height: cHeight, styleAspect } = getCanvasDimensions();

  const aspectOptions: Array<{ id: AspectRatio; label: string; icon: any }> = [
    { id: '16:9', label: '16:9 Landscape', icon: Tv },
    { id: '9:16', label: '9:16 Shorts/Reels', icon: Smartphone },
    { id: '1:1', label: '1:1 Square', icon: Square },
    { id: '4:5', label: '4:5 Portrait', icon: Smartphone }
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-between rounded-2xl border border-slate-800 bg-[#06070a] p-3 shadow-2xl overflow-hidden"
    >
      {/* Hidden Source Video Element */}
      <video
        ref={videoRef}
        src={currentProject.originalVideoUrl}
        crossOrigin="anonymous"
        playsInline
        muted={isMuted || volume === 0}
        className="hidden"
      />

      {/* Top Overlay Controls Bar (Aspect Ratio & AI Mode Badges) */}
      <div className="w-full flex items-center justify-between pb-2 text-xs border-b border-slate-800/80 mb-2">
        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-900/90 border border-slate-800 p-0.5">
          {aspectOptions.map(opt => {
            const Icon = opt.icon;
            const isActive = currentProject.aspectRatio === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setAspectRatio(opt.id)}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={opt.label}
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{opt.id}</span>
              </button>
            );
          })}
        </div>

        {/* AI Badges */}
        <div className="flex items-center gap-2">
          {currentProject.isAiEdited && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>AI Auto-Edit Active</span>
            </span>
          )}

          <button
            onClick={() => setShowFaceTrackBox(!showFaceTrackBox)}
            className={`rounded-lg px-2 py-1 text-[11px] font-medium border transition-colors ${
              showFaceTrackBox
                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
                : 'border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
            title="Toggle AI Face Recognition grid"
          >
            Facecam Lock
          </button>
        </div>
      </div>

      {/* Center Video Canvas Viewport */}
      <div className="relative flex w-full flex-1 items-center justify-center min-h-[300px] max-h-[460px] py-1">
        <div
          className={`relative max-h-full max-w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800/80 bg-black ${styleAspect}`}
        >
          <canvas
            ref={canvasRef}
            width={cWidth}
            height={cHeight}
            className="h-full w-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Center Play Button Overlay on Pause */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="group absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/85 backdrop-blur-md text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
            >
              <Play className="h-6 w-6 translate-x-0.5 fill-white" />
            </button>
          )}

          {/* Active Zoom & Cutaway indicator badge */}
          <div className="pointer-events-none absolute bottom-3 left-3 flex flex-col gap-1">
            {currentProject.zooms.some(
              z => z.applied && currentTime >= z.time && currentTime < z.time + z.duration
            ) && (
              <span className="rounded-md bg-indigo-900/80 border border-indigo-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-200 backdrop-blur-sm">
                🔍 PUNCH-IN ZOOM 1.3X
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Player Scrub & Transport Controls */}
      <div className="w-full mt-2 rounded-xl bg-slate-900/90 border border-slate-800/90 p-2.5 space-y-2">
        {/* Mini progress bar */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={0}
            max={currentProject.duration || 18}
            step={0.05}
            value={currentTime}
            onChange={e => {
              const val = parseFloat(e.target.value);
              setCurrentTime(val);
              if (videoRef.current) videoRef.current.currentTime = val;
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all"
          />
        </div>

        {/* Transport Toolbar */}
        <div className="flex items-center justify-between">
          {/* Left: Playback buttons & Timecode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTime(t => Math.max(0, t - 2))}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              title="Skip back 2s (Left Arrow)"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white translate-x-0.5" />}
            </button>

            <button
              onClick={() => setCurrentTime(t => Math.min(currentProject.duration, t + 2))}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              title="Skip forward 2s (Right Arrow)"
            >
              <RotateCw className="h-4 w-4" />
            </button>

            {/* Timecode */}
            <div className="flex items-center gap-1 font-mono text-xs text-slate-300 ml-1">
              <span className="font-semibold text-white">{formatTime(currentTime)}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{formatTime(currentProject.duration)}</span>
            </div>
          </div>

          {/* Right: Speed, Volume, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700/80 px-1 py-0.5 text-xs text-slate-300">
              {[1, 1.25, 1.5, 2].map(spd => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                    playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="rounded p-1 text-slate-400 hover:text-white"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-rose-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-slate-300" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={e => {
                  setVolume(parseInt(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-14 h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
