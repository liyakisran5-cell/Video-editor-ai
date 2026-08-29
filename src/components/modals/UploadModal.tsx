import React, { useRef, useState } from 'react';
import {
  Upload,
  Video,
  Sparkles,
  FileVideo,
  X,
  CheckCircle2,
  Zap,
  Play,
  Film
} from 'lucide-react';
import { useVideo } from '../../context/VideoContext';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, handleUploadAndStartAI } = useVideo();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  if (!isUploadModalOpen) return null;

  const sampleVideos = [
    {
      name: 'Talking Head Founder Pitch.mp4',
      category: 'SaaS / Tech',
      duration: 18.0,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      desc: 'Speech with natural pauses, filler words, and key product points.'
    },
    {
      name: 'Podcast Deep Dive Discussion.mp4',
      category: 'Podcast / Interview',
      duration: 24.5,
      url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      desc: 'Dual speaker conversation with technical insights and strong hooks.'
    },
    {
      name: 'Fitness Workout Coach Reel.mp4',
      category: 'Fitness / Lifestyle',
      duration: 15.0,
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      desc: 'High energy coach routine with explosive keyword moments.'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadAndStartAI(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadAndStartAI(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0b0d14] p-6 shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Upload Video for AI Editing</h3>
              <p className="text-xs text-slate-400">MP4, MOV, WebM up to 4K 60fps</p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-indigo-500 bg-indigo-950/40 scale-[1.01]'
              : 'border-slate-700 bg-slate-900/60 hover:border-indigo-500/60 hover:bg-slate-900'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 mb-3 border border-indigo-500/30">
            <FileVideo className="h-6 w-6" />
          </div>

          <p className="font-semibold text-white text-sm">
            Drag and drop your raw video file here
          </p>
          <p className="text-xs text-slate-400 mt-1">
            or <span className="text-indigo-400 underline font-medium">browse local files</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-3">
            AI automatically transcribes audio, detects silences, cuts dead air & generates kinetic captions.
          </p>
        </div>

        {/* Or Try Sample Videos */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Or Try A Pro Sample Clip (Instant AI Analysis)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {sampleVideos.map((sample, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleUploadAndStartAI({
                    name: sample.name,
                    url: sample.url,
                    duration: sample.duration
                  })
                }
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-left hover:border-indigo-500/50 hover:bg-slate-850 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-white group-hover:text-indigo-300">
                      {sample.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{sample.desc}</p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                  {sample.duration}s
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
