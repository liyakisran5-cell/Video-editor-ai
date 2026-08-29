import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Send,
  Mic,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Zap,
  TrendingUp,
  Volume2,
  Eye,
  Film
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';

export const AICommandBar: React.FC = () => {
  const { executeAICommand, undoAICommand, isAiCommandRunning, commandLogs } = useVideo();
  const [prompt, setPrompt] = useState('');
  const [activeResult, setActiveResult] = useState<{ summary: string; changes: string[] } | null>(null);
  const [isListening, setIsListening] = useState(false);

  const quickPrompts = [
    { label: '✂️ Remove pauses >0.5s', prompt: 'Remove all pauses and dead air longer than 0.5 seconds' },
    { label: '🔥 Make it Viral Short', prompt: 'Turn this into a viral 9:16 Short with dynamic zooms and Hormozi captions' },
    { label: '💬 Enlarged Gold Captions', prompt: 'Make the captions bigger with Alex Hormozi gold highlights' },
    { label: '🔍 Add Punch-in Zooms', prompt: 'Add dynamic punch-in zooms on key speech moments' },
    { label: '🎬 Add Stock B-Roll', prompt: 'Add contextual stock B-roll to visualize what the speaker is explaining' },
    { label: '🎙️ Studio Audio Boost', prompt: 'Enhance voice clarity, remove background noise, and normalize loudness' },
    { label: '🎥 Cinematic Letterbox', prompt: 'Make this more cinematic with slow-push camera zooms and epic score' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isAiCommandRunning) return;

    const query = prompt.trim();
    setPrompt('');
    const res = await executeAICommand(query);
    setActiveResult(res);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setPrompt(text);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const latestLog = commandLogs[0];

  return (
    <div className="w-full rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-[#0e111a]/95 to-[#090b12]/95 p-3.5 shadow-xl backdrop-blur-md">
      {/* Command Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex flex-1 items-center">
          <div className="pointer-events-none absolute left-3.5 flex items-center">
            <Wand2 className={`h-4 w-4 ${isAiCommandRunning ? 'text-pink-400 animate-spin' : 'text-indigo-400'}`} />
          </div>

          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isAiCommandRunning}
            placeholder="Ask AI to edit your video... (e.g. «Remove all pauses», «Make captions bigger», «Add B-roll»)"
            className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/90 pl-10 pr-24 text-xs md:text-sm font-medium text-slate-100 placeholder-slate-500 shadow-inner transition-all focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`absolute right-12 flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 animate-pulse'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title="Speak command"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>

          {/* Execute Submit Button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isAiCommandRunning}
            className="absolute right-2 flex h-7 items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3 text-xs font-semibold text-white shadow-md transition-all hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100"
          >
            {isAiCommandRunning ? (
              <span className="flex items-center gap-1 text-[11px]">
                <Sparkles className="h-3 w-3 animate-spin" />
                <span>Thinking...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px]">
                <span>Edit</span>
                <Send className="h-2.5 w-2.5" />
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Quick Prompts Pills */}
      <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap mr-1">
          <Zap className="h-3 w-3 text-amber-400" />
          Quick Actions:
        </span>
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isAiCommandRunning}
            onClick={() => {
              setPrompt(item.prompt);
              executeAICommand(item.prompt).then(res => setActiveResult(res));
            }}
            className="whitespace-nowrap rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:border-indigo-500/50 hover:bg-indigo-950/40 hover:text-indigo-200"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Live AI Execution Notification & Diff Banner */}
      {isAiCommandRunning && (
        <div className="mt-2 flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-2.5 px-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-spin" />
            <span className="text-xs font-medium text-indigo-200">
              AI is analyzing timeline and executing edits...
            </span>
          </div>
          <span className="text-[10px] font-mono text-indigo-400">Gemini 3.7 Engine</span>
        </div>
      )}

      {/* Active Result Banner with Changes & Undo */}
      {activeResult && !isAiCommandRunning && (
        <div className="mt-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-2.5 px-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-200">{activeResult.summary}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {activeResult.changes.map((c, i) => (
                    <span
                      key={i}
                      className="rounded bg-emerald-900/40 border border-emerald-800/40 px-1.5 py-0.5 text-[10px] text-emerald-300 font-mono"
                    >
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {latestLog && latestLog.status === 'applied' && (
                <button
                  onClick={() => {
                    undoAICommand(latestLog.id);
                    setActiveResult(null);
                  }}
                  className="flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-1 text-[10px] font-medium text-slate-300 hover:bg-slate-700"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  <span>Undo</span>
                </button>
              )}
              <button
                onClick={() => setActiveResult(null)}
                className="text-xs text-slate-400 hover:text-white px-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
