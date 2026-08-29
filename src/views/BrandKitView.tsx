import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Type,
  Check,
  Plus,
  Trash2,
  Image,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { BrandKit, CaptionPreset } from '../types';

export const BrandKitView: React.FC = () => {
  const { brandKits, activeBrandKit, setActiveBrandKit, applyBrandKitToProject } = useVideo();
  const [selectedKit, setSelectedKit] = useState<BrandKit>(activeBrandKit);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSave = () => {
    applyBrandKitToProject(selectedKit);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Palette className="h-5 w-5" />
            </div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
              Brand Kit & Visual Identity
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain consistent creator typography, colors, watermark logos, and subtitle animations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Check className="h-4 w-4" />
          <span>Apply to Current Video</span>
        </button>
      </div>

      {saveBanner && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>Brand Kit applied to current timeline project successfully!</span>
        </div>
      )}

      {/* Main Kit Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Brand Kit Presets List */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Saved Brand Kits
          </span>

          <div className="space-y-2">
            {brandKits.map(kit => {
              const isSelected = selectedKit.id === kit.id;
              return (
                <button
                  key={kit.id}
                  onClick={() => setSelectedKit(kit)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/50 shadow-md'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: kit.accentColor }}
                      className="h-8 w-8 rounded-lg border border-white/20 flex items-center justify-center font-bold text-black text-xs"
                    >
                      {kit.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-white">{kit.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {kit.fontFamily} • {kit.captionPreset}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check className="h-4 w-4 text-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Kit Configuration Form */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#0d0f18] p-6 space-y-6">
          {/* Kit Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Brand Kit Name</label>
            <input
              type="text"
              value={selectedKit.name}
              onChange={e => setSelectedKit({ ...selectedKit, name: e.target.value })}
              className="mt-1.5 h-9 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Colors Palette */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Color Palette</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-400">Primary Brand</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedKit.primaryColor}
                    onChange={e => setSelectedKit({ ...selectedKit, primaryColor: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-xs text-slate-300">{selectedKit.primaryColor}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400">Secondary Color</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedKit.secondaryColor}
                    onChange={e => setSelectedKit({ ...selectedKit, secondaryColor: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-xs text-slate-300">{selectedKit.secondaryColor}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400">Accent Highlight</span>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedKit.accentColor}
                    onChange={e => setSelectedKit({ ...selectedKit, accentColor: e.target.value })}
                    className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="font-mono text-xs text-slate-300">{selectedKit.accentColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Caption Preset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Font Family</label>
              <select
                value={selectedKit.fontFamily}
                onChange={e => setSelectedKit({ ...selectedKit, fontFamily: e.target.value })}
                className="mt-1.5 h-9 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
                <option value="Outfit">Outfit (Bold Display)</option>
                <option value="Montserrat">Montserrat (Impact Heavy)</option>
                <option value="Cinzel">Cinzel (Cinematic Serif)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Default Subtitle Style</label>
              <select
                value={selectedKit.captionPreset}
                onChange={e => setSelectedKit({ ...selectedKit, captionPreset: e.target.value as any })}
                className="mt-1.5 h-9 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="hormozi">Alex Hormozi Gold Highlights</option>
                <option value="beast-pop">MrBeast Pop Animated</option>
                <option value="minimal-clean">Clean Minimalist Subtitles</option>
                <option value="cyber-neon">Cyberpunk Neon Glow</option>
              </select>
            </div>
          </div>

          {/* Watermark Branding */}
          <div>
            <label className="text-xs font-semibold text-slate-300">Watermark Text / Brand Tag</label>
            <input
              type="text"
              value={selectedKit.watermarkText || ''}
              onChange={e => setSelectedKit({ ...selectedKit, watermarkText: e.target.value })}
              placeholder="e.g. @MyChannel"
              className="mt-1.5 h-9 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Live Preview Box */}
          <div className="rounded-xl border border-slate-800 bg-black p-4 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500">Live Brand Preview</span>
            <div
              style={{
                fontFamily: selectedKit.fontFamily,
                color: selectedKit.accentColor
              }}
              className="font-black text-xl tracking-tight uppercase"
            >
              SCALE YOUR CREATOR ENGINE 🚀
            </div>
            {selectedKit.watermarkText && (
              <p className="text-[10px] font-mono text-slate-500">{selectedKit.watermarkText}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
