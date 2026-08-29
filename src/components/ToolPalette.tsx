import React, { useState } from 'react';
import {
  Type,
  Film,
  Maximize2,
  Sparkles,
  Volume2,
  Wand2,
  Lightbulb,
  Search,
  Plus,
  Trash2,
  Check,
  Flame,
  Zap,
  Sliders,
  Music,
  Smile,
  Shield,
  Eye
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { STOCK_BROLL_LIBRARY, STOCK_MUSIC_TRACKS } from '../data/mockData';
import { CaptionPreset } from '../types';

export const ToolPalette: React.FC = () => {
  const {
    activeEditorTab,
    setActiveEditorTab,
    currentProject,
    updateCaptionStyle,
    addBRollItem,
    removeBRoll,
    toggleBRoll,
    addZoomKeyframe,
    toggleZoom,
    toggleEffect,
    updateAudioConfig,
    applyDirectorMode,
    executeAICommand
  } = useVideo();

  const [brollSearch, setBrollSearch] = useState('');
  const [customBrollPrompt, setCustomBrollPrompt] = useState('');

  const captionPresets: Array<{ id: CaptionPreset; label: string; desc: string; sample: string; color: string }> = [
    { id: 'hormozi', label: 'Alex Hormozi Gold', desc: 'Bold boxed highlights & high retention energy', sample: 'SCALE 10X 🔥', color: '#FACC15' },
    { id: 'beast-pop', label: 'MrBeast Pop', desc: 'Kinetic bounce & high saturation pop', sample: 'INSANE! 🚀', color: '#4ADE80' },
    { id: 'karaoke-glow', label: 'Karaoke Glow', desc: 'Smooth word-by-word electric glow', sample: 'Word By Word ✨', color: '#38BDF8' },
    { id: 'cyber-neon', label: 'Cyberpunk Neon', desc: 'Futuristic glowing outline & drop shadow', sample: 'NEO MATRIX ⚡', color: '#A855F7' },
    { id: 'minimal-clean', label: 'Clean Minimal', desc: 'Crisp sans-serif for professional SaaS', sample: 'Pure Signal', color: '#FFFFFF' },
    { id: 'bungee-box', label: 'Bungee Boxed', desc: 'Impactful display text with dark backing', sample: 'LEVEL UP 🎮', color: '#FB923C' },
    { id: 'cinematic-serif', label: 'Cinematic Serif', desc: 'Elegant letterboxed documentary style', sample: 'The Journey', color: '#E2E8F0' }
  ];

  const filteredStock = STOCK_BROLL_LIBRARY.filter(
    s =>
      s.title.toLowerCase().includes(brollSearch.toLowerCase()) ||
      s.category.toLowerCase().includes(brollSearch.toLowerCase()) ||
      s.keywords.some(k => k.includes(brollSearch.toLowerCase()))
  );

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-800 bg-[#090b10] shadow-xl overflow-hidden">
      {/* Top Tool Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-[#0c0e14] p-1.5 gap-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'captions', label: 'Captions', icon: Type },
          { id: 'b-roll', label: 'B-Roll', icon: Film },
          { id: 'zooms', label: 'Smart Zoom', icon: Maximize2 },
          { id: 'effects', label: 'Effects', icon: Sparkles },
          { id: 'audio', label: 'Audio AI', icon: Volume2 },
          { id: 'director', label: 'AI Director', icon: Wand2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeEditorTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveEditorTab(tab.id as any)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs">
        {/* TAB 1: CAPTIONS */}
        {activeEditorTab === 'captions' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Caption Style Presets
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {captionPresets.map(preset => {
                  const isSelected = currentProject.captionStyle.preset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => updateCaptionStyle({ preset: preset.id, highlightColor: preset.color })}
                      className={`flex items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">{preset.label}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</p>
                      </div>
                      <div
                        style={{ color: preset.color }}
                        className="rounded-lg bg-black/80 border border-slate-800 px-2 py-1 font-black text-xs"
                      >
                        {preset.sample}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Tuning */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3 space-y-3">
              <span className="text-[11px] font-bold text-slate-300">Fine-Tune Typography</span>

              {/* Font Size */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Font Size:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={24}
                    max={64}
                    value={currentProject.captionStyle.fontSize}
                    onChange={e => updateCaptionStyle({ fontSize: parseInt(e.target.value) })}
                    className="w-24 h-1 bg-slate-700 rounded accent-indigo-500"
                  />
                  <span className="w-8 font-mono text-[11px] text-slate-200">
                    {currentProject.captionStyle.fontSize}px
                  </span>
                </div>
              </div>

              {/* Position Y */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Vertical Position:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={currentProject.captionStyle.positionY}
                    onChange={e => updateCaptionStyle({ positionY: parseInt(e.target.value) })}
                    className="w-24 h-1 bg-slate-700 rounded accent-indigo-500"
                  />
                  <span className="w-8 font-mono text-[11px] text-slate-200">
                    {currentProject.captionStyle.positionY}%
                  </span>
                </div>
              </div>

              {/* Highlight Color */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Highlight Color:</span>
                <div className="flex items-center gap-1.5">
                  {['#FACC15', '#4ADE80', '#38BDF8', '#EC4899', '#A855F7', '#FFFFFF'].map(c => (
                    <button
                      key={c}
                      onClick={() => updateCaptionStyle({ highlightColor: c })}
                      style={{ backgroundColor: c }}
                      className={`h-5 w-5 rounded-full border-2 transition-transform ${
                        currentProject.captionStyle.highlightColor === c ? 'border-white scale-110 shadow-md' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Emojis Toggle */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Smile className="h-4 w-4 text-amber-400" />
                  <span>Auto Emojis on High-Energy Words</span>
                </div>
                <input
                  type="checkbox"
                  checked={currentProject.captionStyle.emojiEnabled}
                  onChange={e => updateCaptionStyle({ emojiEnabled: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 accent-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: B-ROLL */}
        {activeEditorTab === 'b-roll' && (
          <div className="space-y-4">
            {/* Natural language B-Roll insert */}
            <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/30 p-3 space-y-2">
              <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-300">
                <Wand2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>AI Prompt B-Roll</span>
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customBrollPrompt}
                  onChange={e => setCustomBrollPrompt(e.target.value)}
                  placeholder="e.g. «Show a luxury Dubai skyline here»"
                  className="h-8 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!customBrollPrompt.trim()) return;
                    executeAICommand(`Add B-Roll visual of ${customBrollPrompt.trim()} at current time`);
                    setCustomBrollPrompt('');
                  }}
                  className="rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-indigo-500"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Current Active Project B-Rolls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Timeline B-Rolls ({currentProject.bRolls.length})
                </span>
              </div>

              <div className="space-y-1.5">
                {currentProject.bRolls.map(b => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={b.thumbnailUrl}
                        alt={b.title}
                        className="h-10 w-14 rounded-md object-cover border border-slate-700"
                      />
                      <div>
                        <p className="font-semibold text-slate-200 truncate max-w-[140px]">{b.title}</p>
                        <p className="text-[10px] text-slate-400">
                          {b.start}s – {(b.start + b.duration).toFixed(1)}s ({b.overlayType})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBRoll(b.id)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          b.applied ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {b.applied ? 'Active' : 'Off'}
                      </button>
                      <button
                        onClick={() => removeBRoll(b.id)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Stock Library */}
            <div>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  value={brollSearch}
                  onChange={e => setBrollSearch(e.target.value)}
                  placeholder="Search 100K+ 4K stock visuals..."
                  className="h-8 w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-8 pr-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredStock.map(stock => (
                  <div
                    key={stock.id}
                    className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 hover:border-indigo-500/60 transition-all"
                  >
                    <img
                      src={stock.url}
                      alt={stock.title}
                      className="h-20 w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-1.5">
                      <p className="font-semibold text-slate-200 truncate">{stock.title}</p>
                      <p className="text-[9px] text-slate-400">{stock.category}</p>
                      <button
                        onClick={() =>
                          addBRollItem({
                            start: 2.0,
                            duration: 2.5,
                            title: stock.title,
                            keyword: stock.keywords[0],
                            mediaUrl: stock.url,
                            thumbnailUrl: stock.url,
                            type: 'image',
                            overlayType: 'cutaway',
                            opacity: 0.95,
                            scale: 1.0,
                            applied: true
                          })
                        }
                        className="mt-1 flex w-full items-center justify-center gap-1 rounded bg-indigo-600/80 hover:bg-indigo-500 py-1 text-[10px] font-semibold text-white"
                      >
                        <Plus className="h-2.5 w-2.5" />
                        <span>Insert B-Roll</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART ZOOM */}
        {activeEditorTab === 'zooms' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Zoom Dynamic Presets
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { name: 'Subtle', scale: 1.15, desc: 'Gentle slow push for documentaries' },
                  { name: 'Normal', scale: 1.25, desc: 'Balanced YouTube explainer standard' },
                  { name: 'Dynamic', scale: 1.35, desc: 'Fast punch-ins on speech inflections' },
                  { name: 'Viral Hyper', scale: 1.5, desc: 'Ultra punchy TikTok & Reels retention' }
                ].map((zm, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      addZoomKeyframe({
                        time: 3.0,
                        duration: 2.0,
                        scale: zm.scale,
                        focusPoint: { x: 50, y: 40 },
                        type: 'punch-in',
                        applied: true
                      })
                    }
                    className="flex flex-col items-start rounded-xl border border-slate-800 bg-slate-900/80 p-2.5 text-left hover:border-indigo-500/50 hover:bg-slate-850 transition-all"
                  >
                    <span className="font-bold text-indigo-300">{zm.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">{zm.scale}x scale</span>
                    <span className="text-[9px] text-slate-500 mt-1">{zm.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current zooms list */}
            <div>
              <span className="text-[11px] font-bold text-slate-400">Active Zoom Keyframes</span>
              <div className="mt-1.5 space-y-1.5">
                {currentProject.zooms.map(z => (
                  <div
                    key={z.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-950 border border-sky-800 text-sky-300 font-mono text-xs">
                        {z.scale}x
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">
                          {z.time}s ({z.duration}s duration)
                        </p>
                        <p className="text-[10px] text-slate-400">{z.type}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleZoom(z.id)}
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                        z.applied ? 'bg-sky-950 text-sky-300 border border-sky-800' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {z.applied ? 'Enabled' : 'Muted'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VISUAL EFFECTS */}
        {activeEditorTab === 'effects' && (
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Retention & Engagement Effects
            </span>

            <div className="space-y-2">
              {[
                { id: 'eff_1', label: 'Dynamic Retention Progress Bar', desc: 'Visual timeline progress gradient on bottom edge', type: 'progress-bar' },
                { id: 'eff_2', label: 'Hook Screen Shake Impact', desc: 'Subtle punch impact on first 3 seconds of high-energy speech', type: 'screen-shake' },
                { id: 'eff_3', label: '10x Growth Visual Indicator', desc: 'Animated green arrow callout on key stats', type: 'motion-arrow' }
              ].map(eff => {
                const active = currentProject.effects.some(e => e.type === eff.type && e.applied);
                return (
                  <div
                    key={eff.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-200">{eff.label}</p>
                      <p className="text-[10px] text-slate-400">{eff.desc}</p>
                    </div>

                    <button
                      onClick={() => toggleEffect(eff.id)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        active ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {active ? 'ON' : 'OFF'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: AUDIO AI */}
        {activeEditorTab === 'audio' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Studio Audio Enhancement
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">AI Voice Clarity Boost</p>
                  <p className="text-[10px] text-slate-400">Studio mic equalization & warmth</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentProject.audioConfig.voiceEnhance}
                  onChange={e => updateAudioConfig({ voiceEnhance: e.target.checked })}
                  className="h-4 w-4 rounded accent-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Noise Suppression (-18dB)</p>
                  <p className="text-[10px] text-slate-400">Eliminates room echo & fan hiss</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentProject.audioConfig.noiseRemoval}
                  onChange={e => updateAudioConfig({ noiseRemoval: e.target.checked })}
                  className="h-4 w-4 rounded accent-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Smart Auto-Ducking</p>
                  <p className="text-[10px] text-slate-400">Lowers background music when speaker talks</p>
                </div>
                <input
                  type="checkbox"
                  checked={currentProject.audioConfig.autoDucking}
                  onChange={e => updateAudioConfig({ autoDucking: e.target.checked })}
                  className="h-4 w-4 rounded accent-indigo-500"
                />
              </div>
            </div>

            {/* Background Music Mood Selector */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                AI Suggested Background Music
              </span>
              <div className="mt-2 space-y-1.5">
                {STOCK_MUSIC_TRACKS.map(trk => {
                  const isCurrent = currentProject.audioConfig.backgroundMusicName === trk.name;
                  return (
                    <button
                      key={trk.id}
                      onClick={() => updateAudioConfig({ backgroundMusicName: trk.name })}
                      className={`flex w-full items-center justify-between rounded-xl border p-2 text-left transition-all ${
                        isCurrent
                          ? 'bg-pink-950/60 border-pink-500 text-pink-200 ring-1 ring-pink-500/50'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-xs">{trk.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {trk.category} • {trk.bpm} BPM • {trk.mood}
                        </p>
                      </div>
                      {isCurrent && <Check className="h-3.5 w-3.5 text-pink-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AI DIRECTOR */}
        {activeEditorTab === 'director' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                <span className="font-bold text-white text-xs">AI Director Modes</span>
              </div>
              <p className="text-[11px] text-indigo-200/80">
                Re-architect cuts, pacing, music, captions, and visual intensity with 1 click.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                {
                  mode: 'viral' as const,
                  title: '⚡ Viral Retention Mode',
                  desc: 'Hormozi gold captions, 0.2s silence cuts, punch zooms every 4s, retention bar'
                },
                {
                  mode: 'cinematic' as const,
                  title: '🎬 Hollywood Cinematic Mode',
                  desc: 'Letterbox 2.39:1 aspect, slow push glides, Hans Zimmer score, serif captions'
                },
                {
                  mode: 'podcast' as const,
                  title: '🎙️ Studio Podcast Highlight',
                  desc: 'Active speaker tracking, vocal presence boost, dual split-screen framing'
                },
                {
                  mode: 'motivational' as const,
                  title: '🔥 High-Energy Motivation',
                  desc: 'Punchy speed ramps, screen shake on key verbs, high-contrast B-roll'
                }
              ].map(item => (
                <button
                  key={item.mode}
                  onClick={() => applyDirectorMode(item.mode)}
                  className="flex flex-col items-start rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-left hover:border-indigo-500 hover:bg-slate-850 transition-all shadow-md group"
                >
                  <span className="font-bold text-slate-100 group-hover:text-indigo-300">
                    {item.title}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
