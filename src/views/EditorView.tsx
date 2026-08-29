import React from 'react';
import { AICommandBar } from '../components/AICommandBar';
import { VideoPlayer } from '../components/VideoPlayer';
import { ToolPalette } from '../components/ToolPalette';
import { InspectorPanel } from '../components/InspectorPanel';
import { Timeline } from '../components/Timeline';
import { useVideo } from '../context/VideoContext';
import { Sparkles, Wand2 } from 'lucide-react';

export const EditorView: React.FC = () => {
  const { currentProject, aiProcessingStage, aiProcessingProgress } = useVideo();

  return (
    <div className="flex flex-1 flex-col bg-[#050608] text-slate-100 p-2 md:p-3.5 gap-3 min-h-[calc(100vh-60px)]">
      {/* 1. Global AI Command Bar (Centerpiece above workspace) */}
      <div className="w-full">
        <AICommandBar />
      </div>

      {/* 2. Three-Column Center Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[460px]">
        {/* Left Column: Tool Palette (Captions, B-Roll, Zooms, Effects, Audio, Director) */}
        <div className="lg:col-span-3 h-[420px] lg:h-auto">
          <ToolPalette />
        </div>

        {/* Center Column: High Precision Video Canvas Compositor */}
        <div className="lg:col-span-6 flex flex-col">
          <VideoPlayer />
        </div>

        {/* Right Column: Smart Retention AI & Suggestions Inspector */}
        <div className="lg:col-span-3 h-[420px] lg:h-auto">
          <InspectorPanel />
        </div>
      </div>

      {/* 3. Bottom Multi-Track Professional Timeline */}
      <div className="w-full">
        <Timeline />
      </div>
    </div>
  );
};
