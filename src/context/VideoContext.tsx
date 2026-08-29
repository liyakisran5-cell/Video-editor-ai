import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  AspectRatio,
  BrandKit,
  CaptionItem,
  CaptionStyleConfig,
  Project,
  SmartCutSegment,
  BRollItem,
  ZoomKeyframe,
  EffectOverlay,
  TemplateItem,
  AICommandLog
} from '../types';
import {
  DEFAULT_BRAND_KITS,
  DEFAULT_CAPTION_STYLE,
  DEMO_PROJECTS,
  SAMPLE_BROLLS,
  SAMPLE_CAPTIONS_DEMO,
  SAMPLE_EFFECTS,
  SAMPLE_SMART_CUTS,
  SAMPLE_ZOOMS,
  TEMPLATES_LIST
} from '../data/mockData';
import { AIService } from '../services/aiService';
import { useAuth } from './AuthContext';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'editor'
  | 'shorts'
  | 'brand-kit'
  | 'templates'
  | 'admin'
  | 'billing';

export type EditorTab =
  | 'captions'
  | 'b-roll'
  | 'zooms'
  | 'effects'
  | 'audio'
  | 'director'
  | 'suggestions';

export type AIProcessingStage =
  | 'UPLOADING'
  | 'ANALYZING'
  | 'TRANSCRIBING'
  | 'FINDING_BEST_MOMENTS'
  | 'REMOVING_SILENCE'
  | 'CREATING_CUTS'
  | 'ADDING_CAPTIONS'
  | 'ADDING_BROLL'
  | 'COMPLETED'
  | null;

interface VideoContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  projects: Project[];
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  currentTime: number;
  setCurrentTime: (time: number | ((prev: number) => number)) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean | ((prev: boolean) => boolean)) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  volume: number;
  setVolume: (vol: number) => void;
  timelineZoom: number;
  setTimelineZoom: (zoom: number | ((prev: number) => number)) => void;
  activeEditorTab: EditorTab;
  setActiveEditorTab: (tab: EditorTab) => void;
  selectedClipId: string | null;
  setSelectedClipId: (id: string | null) => void;

  // Modals
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isAnalysisModalOpen: boolean;
  setIsAnalysisModalOpen: (open: boolean) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isSeoModalOpen: boolean;
  setIsSeoModalOpen: (open: boolean) => void;
  isVersionsModalOpen: boolean;
  setIsVersionsModalOpen: (open: boolean) => void;

  // AI Pipeline
  aiProcessingStage: AIProcessingStage;
  aiProcessingProgress: number;
  isAiCommandRunning: boolean;
  commandLogs: AICommandLog[];

  // Brand Kits & Templates
  brandKits: BrandKit[];
  activeBrandKit: BrandKit;
  setActiveBrandKit: (kit: BrandKit) => void;
  applyBrandKitToProject: (kit: BrandKit) => void;

  // Action Methods
  handleUploadAndStartAI: (file: File | { name: string; url: string; duration: number }) => Promise<void>;
  applyAIAutoEdit: (aggressiveness?: number) => void;
  executeAICommand: (prompt: string) => Promise<{ summary: string; changes: string[] }>;
  undoAICommand: (logId: string) => void;
  toggleSmartCut: (cutId: string) => void;
  applyCutAggressiveness: (val: number) => void;
  updateCaptionStyle: (style: Partial<CaptionStyleConfig>) => void;
  updateCaptionText: (captionId: string, text: string) => void;
  addBRollItem: (item: Omit<BRollItem, 'id'>) => void;
  toggleBRoll: (brollId: string) => void;
  removeBRoll: (brollId: string) => void;
  addZoomKeyframe: (zoom: Omit<ZoomKeyframe, 'id'>) => void;
  toggleZoom: (zoomId: string) => void;
  toggleEffect: (effectId: string) => void;
  setAspectRatio: (aspect: AspectRatio) => void;
  updateAudioConfig: (config: Partial<Project['audioConfig']>) => void;
  applyDirectorMode: (mode: 'cinematic' | 'viral' | 'podcast' | 'motivational') => void;
  selectProject: (projectId: string) => void;
  createProjectFromTemplate: (template: TemplateItem) => void;
  duplicateProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  saveStatus: 'saved' | 'saving' | 'unsaved';
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { incrementUsage } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [currentProject, setCurrentProjectState] = useState<Project>(DEMO_PROJECTS[0]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(100);
  const [timelineZoom, setTimelineZoom] = useState<number>(100);
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>('captions');
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);
  const [isVersionsModalOpen, setIsVersionsModalOpen] = useState<boolean>(false);

  // AI Pipeline
  const [aiProcessingStage, setAiProcessingStage] = useState<AIProcessingStage>(null);
  const [aiProcessingProgress, setAiProcessingProgress] = useState<number>(0);
  const [isAiCommandRunning, setIsAiCommandRunning] = useState<boolean>(false);
  const [commandLogs, setCommandLogs] = useState<AICommandLog[]>([]);

  // Brand Kits
  const [brandKits, setBrandKits] = useState<BrandKit[]>(DEFAULT_BRAND_KITS);
  const [activeBrandKit, setActiveBrandKit] = useState<BrandKit>(DEFAULT_BRAND_KITS[0]);

  // Undo / Redo history stacks
  const [history, setHistory] = useState<Project[]>([DEMO_PROJECTS[0]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Push project state with auto-save simulation
  const setCurrentProject = (newProject: Project | ((prev: Project) => Project)) => {
    setCurrentProjectState(prev => {
      const next = typeof newProject === 'function' ? newProject(prev) : newProject;
      setHistory(h => [...h.slice(0, historyIndex + 1), next]);
      setHistoryIndex(i => i + 1);
      
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 600);

      // Also update in projects array
      setProjects(all => all.map(p => (p.id === next.id ? next : p)));
      return next;
    });
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(i => i - 1);
      setCurrentProjectState(prev);
      setProjects(all => all.map(p => (p.id === prev.id ? prev : p)));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(i => i + 1);
      setCurrentProjectState(next);
      setProjects(all => all.map(p => (p.id === next.id ? next : p)));
    }
  };

  // Switch active project
  const selectProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      setCurrentProjectState(proj);
      setCurrentTime(0);
      setIsPlaying(false);
      setCurrentView('editor');
    }
  };

  // Upload and run 8-step AI analysis pipeline
  const handleUploadAndStartAI = async (file: File | { name: string; url: string; duration: number }) => {
    setIsUploadModalOpen(false);
    setAiProcessingProgress(5);
    setAiProcessingStage('UPLOADING');

    const stages: Array<{ stage: AIProcessingStage; progress: number; delay: number }> = [
      { stage: 'UPLOADING', progress: 15, delay: 600 },
      { stage: 'ANALYZING', progress: 30, delay: 800 },
      { stage: 'TRANSCRIBING', progress: 48, delay: 800 },
      { stage: 'FINDING_BEST_MOMENTS', progress: 62, delay: 700 },
      { stage: 'REMOVING_SILENCE', progress: 74, delay: 600 },
      { stage: 'CREATING_CUTS', progress: 85, delay: 600 },
      { stage: 'ADDING_CAPTIONS', progress: 93, delay: 500 },
      { stage: 'ADDING_BROLL', progress: 98, delay: 500 },
      { stage: 'COMPLETED', progress: 100, delay: 400 }
    ];

    for (const step of stages) {
      setAiProcessingStage(step.stage);
      setAiProcessingProgress(step.progress);
      await new Promise(r => setTimeout(r, step.delay));
    }

    const duration = 'duration' in file ? file.duration : 18.0;
    const url = 'url' in file ? file.url : URL.createObjectURL(file as File);
    const name = file.name;

    const analysisReport = await AIService.analyzeVideo(name, duration);

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
      description: 'AI analyzed project ready for automated smart cuts and kinetic styling.',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      duration,
      aspectRatio: '16:9',
      category: 'talking-head',
      originalVideoUrl: url,
      originalVideoName: name,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      resolution: '1080p',
      fps: 60,
      isAnalyzed: true,
      isAiEdited: false,
      cutAggressiveness: 65,
      clips: [
        {
          id: `clip_${Date.now()}`,
          trackId: 'video',
          start: 0,
          duration,
          sourceStart: 0,
          sourceDuration: duration,
          name: 'Main Video Track',
          mediaUrl: url,
          volume: 100,
          speed: 1.0,
          scale: 1.0
        }
      ],
      captions: SAMPLE_CAPTIONS_DEMO,
      captionStyle: DEFAULT_CAPTION_STYLE,
      smartCuts: SAMPLE_SMART_CUTS,
      bRolls: SAMPLE_BROLLS,
      zooms: SAMPLE_ZOOMS,
      effects: SAMPLE_EFFECTS,
      audioConfig: {
        volume: 100,
        noiseRemoval: true,
        voiceEnhance: true,
        loudnessNormalize: true,
        autoDucking: true,
        duckingAmount: 65,
        backgroundMusicName: 'Cyber Lofi Focus Beat',
        backgroundMusicVolume: 18
      },
      analysisReport,
      viralShorts: [
        {
          id: `short_${Date.now()}_1`,
          title: 'Top AI Growth Secrets Revealed',
          hook: 'Why manual video editing is dead in 2026',
          start: 0,
          end: Math.min(duration, 15),
          duration: Math.min(duration, 15),
          score: 95,
          hashtags: ['#ViralVideo', '#AITools', '#CreatorEconomy', '#Shorts'],
          description: 'Automate your video editing with AI.',
          aspectRatio: '9:16',
          thumbnailUrl:
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80'
        }
      ],
      versions: [
        {
          id: `v_1_${Date.now()}`,
          name: 'Version 1 — Original Raw',
          timestamp: 'Just now',
          description: 'Raw uploaded footage with natural pauses',
          cutsCount: 0,
          clipsCount: 1,
          author: 'Manual Edit'
        }
      ]
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentProjectState(newProject);
    setAiProcessingStage(null);
    setIsAnalysisModalOpen(true);
    incrementUsage(1);
  };

  // 1-Click AI Auto Edit
  const applyAIAutoEdit = (aggressiveness = 65) => {
    setCurrentProject(prev => {
      const updatedSmartCuts = prev.smartCuts.map(c => ({ ...c, removed: true }));
      const updatedBRolls = prev.bRolls.map(b => ({ ...b, applied: true }));
      const updatedZooms = prev.zooms.map(z => ({ ...z, applied: true }));
      const updatedEffects = prev.effects.map(e => ({ ...e, applied: true }));

      const newVersion = {
        id: `v_${Date.now()}`,
        name: `Version ${prev.versions.length + 1} — AI Auto-Director Edit`,
        timestamp: 'Just now',
        description: `Applied ${updatedSmartCuts.length} cuts, ${updatedBRolls.length} B-Rolls, and ${updatedZooms.length} zooms.`,
        cutsCount: updatedSmartCuts.length,
        clipsCount: prev.clips.length + updatedBRolls.length,
        author: 'AI Auto-Director' as const
      };

      return {
        ...prev,
        isAiEdited: true,
        cutAggressiveness: aggressiveness,
        smartCuts: updatedSmartCuts,
        bRolls: updatedBRolls,
        zooms: updatedZooms,
        effects: updatedEffects,
        versions: [newVersion, ...prev.versions]
      };
    });

    setIsAnalysisModalOpen(false);
    setCurrentView('editor');
  };

  // Natural Language AI Command Bar Execution
  const executeAICommand = async (prompt: string) => {
    setIsAiCommandRunning(true);
    try {
      const result = await AIService.executeCommand(prompt, currentProject);

      setCurrentProject(prev => {
        let next = { ...prev };
        const mods = result.timelineModifications;

        if (mods?.captionStyle) {
          next.captionStyle = { ...next.captionStyle, ...mods.captionStyle };
        }

        if (mods?.aspectRatio) {
          next.aspectRatio = mods.aspectRatio;
        }

        if (mods?.audioUpdates) {
          next.audioConfig = { ...next.audioConfig, ...mods.audioUpdates };
        }

        if (mods?.addZooms && mods.addZooms.length > 0) {
          const newZooms: ZoomKeyframe[] = mods.addZooms.map((z, idx) => ({
            id: `zoom_cmd_${Date.now()}_${idx}`,
            time: z.time,
            duration: z.duration || 2.0,
            scale: z.scale || 1.3,
            focusPoint: { x: 50, y: 40 },
            type: (z.type as any) || 'punch-in',
            applied: true
          }));
          next.zooms = [...next.zooms, ...newZooms];
        }

        if (mods?.addBRolls && mods.addBRolls.length > 0) {
          const newBRolls: BRollItem[] = mods.addBRolls.map((b, idx) => ({
            id: `broll_cmd_${Date.now()}_${idx}`,
            start: b.start,
            duration: b.duration || 2.5,
            title: b.title || 'Stock Visual',
            keyword: b.keyword || 'context',
            mediaUrl:
              'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
            thumbnailUrl:
              'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
            type: 'image',
            overlayType: 'cutaway',
            opacity: 0.95,
            scale: 1.0,
            applied: true
          }));
          next.bRolls = [...next.bRolls, ...newBRolls];
        }

        if (mods?.removeFillerWords) {
          next.smartCuts = next.smartCuts.map(c => ({ ...c, removed: true }));
        }

        const newVersion = {
          id: `v_cmd_${Date.now()}`,
          name: `Version ${next.versions.length + 1} — «${prompt.slice(0, 24)}...»`,
          timestamp: 'Just now',
          description: result.summary,
          cutsCount: next.smartCuts.filter(c => c.removed).length,
          clipsCount: next.clips.length + next.bRolls.filter(b => b.applied).length,
          author: 'User Prompt' as const
        };

        next.versions = [newVersion, ...next.versions];
        return next;
      });

      const logItem: AICommandLog = {
        id: `cmd_${Date.now()}`,
        prompt,
        timestamp: 'Just now',
        changesSummary: result.changes,
        status: 'applied'
      };
      setCommandLogs(logs => [logItem, ...logs]);
      incrementUsage(1);

      return { summary: result.summary, changes: result.changes };
    } finally {
      setIsAiCommandRunning(false);
    }
  };

  const undoAICommand = (logId: string) => {
    undo();
    setCommandLogs(logs =>
      logs.map(l => (l.id === logId ? { ...l, status: 'undone' } : l))
    );
  };

  // Smart Cuts Toggle & Aggressiveness Slider
  const toggleSmartCut = (cutId: string) => {
    setCurrentProject(prev => ({
      ...prev,
      smartCuts: prev.smartCuts.map(c =>
        c.id === cutId ? { ...c, removed: !c.removed } : c
      )
    }));
  };

  const applyCutAggressiveness = (val: number) => {
    setCurrentProject(prev => {
      // 0 = keep everything, 100 = remove even small 0.1s pauses
      const threshold = 1.0 - (val / 100) * 0.8; // between 1.0s and 0.2s
      const updated = prev.smartCuts.map(c => ({
        ...c,
        removed: c.duration >= threshold
      }));
      return {
        ...prev,
        cutAggressiveness: val,
        smartCuts: updated
      };
    });
  };

  // Captions styling
  const updateCaptionStyle = (style: Partial<CaptionStyleConfig>) => {
    setCurrentProject(prev => ({
      ...prev,
      captionStyle: { ...prev.captionStyle, ...style }
    }));
  };

  const updateCaptionText = (captionId: string, text: string) => {
    setCurrentProject(prev => ({
      ...prev,
      captions: prev.captions.map(c =>
        c.id === captionId ? { ...c, text } : c
      )
    }));
  };

  // B-Rolls
  const addBRollItem = (item: Omit<BRollItem, 'id'>) => {
    const newItem: BRollItem = {
      ...item,
      id: `broll_${Date.now()}`
    };
    setCurrentProject(prev => ({
      ...prev,
      bRolls: [...prev.bRolls, newItem]
    }));
  };

  const toggleBRoll = (brollId: string) => {
    setCurrentProject(prev => ({
      ...prev,
      bRolls: prev.bRolls.map(b =>
        b.id === brollId ? { ...b, applied: !b.applied } : b
      )
    }));
  };

  const removeBRoll = (brollId: string) => {
    setCurrentProject(prev => ({
      ...prev,
      bRolls: prev.bRolls.filter(b => b.id !== brollId)
    }));
  };

  // Zooms
  const addZoomKeyframe = (zoom: Omit<ZoomKeyframe, 'id'>) => {
    const newZoom: ZoomKeyframe = {
      ...zoom,
      id: `zoom_${Date.now()}`
    };
    setCurrentProject(prev => ({
      ...prev,
      zooms: [...prev.zooms, newZoom]
    }));
  };

  const toggleZoom = (zoomId: string) => {
    setCurrentProject(prev => ({
      ...prev,
      zooms: prev.zooms.map(z =>
        z.id === zoomId ? { ...z, applied: !z.applied } : z
      )
    }));
  };

  // Effects
  const toggleEffect = (effectId: string) => {
    setCurrentProject(prev => ({
      ...prev,
      effects: prev.effects.map(e =>
        e.id === effectId ? { ...e, applied: !e.applied } : e
      )
    }));
  };

  // Aspect Ratio
  const setAspectRatio = (aspect: AspectRatio) => {
    setCurrentProject(prev => ({
      ...prev,
      aspectRatio: aspect
    }));
  };

  // Audio Config
  const updateAudioConfig = (config: Partial<Project['audioConfig']>) => {
    setCurrentProject(prev => ({
      ...prev,
      audioConfig: { ...prev.audioConfig, ...config }
    }));
  };

  // AI Director Presets
  const applyDirectorMode = (mode: 'cinematic' | 'viral' | 'podcast' | 'motivational') => {
    if (mode === 'cinematic') {
      executeAICommand('Make this cinematic with letterbox, slow push zooms, and Hans Zimmer score');
    } else if (mode === 'viral') {
      executeAICommand('Turn into a viral short with Alex Hormozi captions, punch zooms, and retention progress bar');
    } else if (mode === 'podcast') {
      executeAICommand('Enhance studio voice, remove background noise, and set dual speaker split styling');
    } else if (mode === 'motivational') {
      executeAICommand('Add intense kinetic typography, screen shake on key moments, and epic workout b-roll');
    }
  };

  // Brand Kit Application
  const applyBrandKitToProject = (kit: BrandKit) => {
    setActiveBrandKit(kit);
    setCurrentProject(prev => ({
      ...prev,
      captionStyle: {
        ...prev.captionStyle,
        preset: kit.captionPreset,
        highlightColor: kit.accentColor,
        fontFamily: kit.fontFamily
      }
    }));
  };

  // Create Project from Template
  const createProjectFromTemplate = (tmpl: TemplateItem) => {
    const newProj: Project = {
      ...DEMO_PROJECTS[0],
      id: `proj_tmpl_${Date.now()}`,
      name: `${tmpl.name} Draft`,
      description: tmpl.description,
      aspectRatio: tmpl.aspectRatio,
      category: tmpl.category,
      captionStyle: {
        ...DEFAULT_CAPTION_STYLE,
        preset: tmpl.captionPreset
      }
    };
    setProjects(prev => [newProj, ...prev]);
    setCurrentProjectState(newProj);
    setCurrentView('editor');
  };

  const duplicateProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;
    const duplicated: Project = {
      ...proj,
      id: `proj_${Date.now()}`,
      name: `${proj.name} (Copy)`,
      createdAt: 'Just now',
      updatedAt: 'Just now'
    };
    setProjects(prev => [duplicated, ...prev]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProject.id === projectId && projects.length > 1) {
      const fallback = projects.find(p => p.id !== projectId) || DEMO_PROJECTS[0];
      setCurrentProjectState(fallback);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        currentView,
        setCurrentView,
        projects,
        currentProject,
        setCurrentProject,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        volume,
        setVolume,
        timelineZoom,
        setTimelineZoom,
        activeEditorTab,
        setActiveEditorTab,
        selectedClipId,
        setSelectedClipId,

        isUploadModalOpen,
        setIsUploadModalOpen,
        isAnalysisModalOpen,
        setIsAnalysisModalOpen,
        isExportModalOpen,
        setIsExportModalOpen,
        isSeoModalOpen,
        setIsSeoModalOpen,
        isVersionsModalOpen,
        setIsVersionsModalOpen,

        aiProcessingStage,
        aiProcessingProgress,
        isAiCommandRunning,
        commandLogs,

        brandKits,
        activeBrandKit,
        setActiveBrandKit,
        applyBrandKitToProject,

        handleUploadAndStartAI,
        applyAIAutoEdit,
        executeAICommand,
        undoAICommand,
        toggleSmartCut,
        applyCutAggressiveness,
        updateCaptionStyle,
        updateCaptionText,
        addBRollItem,
        toggleBRoll,
        removeBRoll,
        addZoomKeyframe,
        toggleZoom,
        toggleEffect,
        setAspectRatio,
        updateAudioConfig,
        applyDirectorMode,
        selectProject,
        createProjectFromTemplate,
        duplicateProject,
        deleteProject,

        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        saveStatus
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
