export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:5';

export type VideoCategory =
  | 'talking-head'
  | 'podcast'
  | 'tech-review'
  | 'motivational'
  | 'gaming'
  | 'product-promo'
  | 'education'
  | 'faceless';

export type ProjectCategory = VideoCategory | 'short' | 'tutorial' | 'ad' | 'all';

export type CaptionPreset =
  | 'hormozi'
  | 'beast-pop'
  | 'minimal-clean'
  | 'karaoke-glow'
  | 'cyber-neon'
  | 'bungee-box'
  | 'tiktok-classic'
  | 'cinematic-serif';

export interface CaptionWord {
  id: string;
  word: string;
  start: number; // in seconds
  end: number;
  isHighlight?: boolean;
  highlightColor?: string;
  emoji?: string;
}

export interface CaptionItem {
  id: string;
  start: number;
  end: number;
  text: string;
  words: CaptionWord[];
  speaker?: string;
  positionY?: number; // percentage from top, default 75
}

export interface CaptionStyleConfig {
  preset: CaptionPreset;
  fontFamily: string;
  fontSize: number;
  textColor: string;
  highlightColor: string;
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth: number;
  shadow: boolean;
  uppercase: boolean;
  maxWordsPerLine: number;
  animation: 'pop' | 'bounce' | 'fade' | 'slide-up' | 'glow' | 'karaoke';
  positionY: number; // 0-100%
  emojiEnabled: boolean;
}

export interface SmartCutSegment {
  id: string;
  start: number;
  end: number;
  duration: number;
  type: 'silence' | 'filler-word' | 'repeated-take' | 'bad-take' | 'low-energy';
  reason: string;
  word?: string;
  removed: boolean; // if applied/removed from video
  confidence: number;
}

export interface BRollItem {
  id: string;
  start: number;
  duration: number;
  title: string;
  keyword: string;
  mediaUrl: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
  overlayType: 'cutaway' | 'picture-in-picture' | 'split-screen';
  opacity: number;
  scale: number;
  applied: boolean;
}

export interface ZoomKeyframe {
  id: string;
  time: number; // in seconds
  duration: number;
  scale: number; // 1.0 = normal, 1.25 = punch in, 1.5 = tight zoom
  focusPoint: { x: number; y: number }; // 0-100 percentage
  type: 'punch-in' | 'punch-out' | 'slow-push' | 'face-track';
  applied: boolean;
}

export interface EffectOverlay {
  id: string;
  start: number;
  duration: number;
  type:
    | 'progress-bar'
    | 'screen-shake'
    | 'spotlight'
    | 'vignette'
    | 'motion-arrow'
    | 'sound-ring'
    | 'blur-background'
    | 'speed-ramp';
  intensity: number;
  label?: string;
  applied: boolean;
}

export interface AudioTrackConfig {
  volume: number; // 0-100
  noiseRemoval: boolean;
  voiceEnhance: boolean;
  loudnessNormalize: boolean;
  autoDucking: boolean;
  duckingAmount: number; // 0-100
  backgroundMusicUrl?: string;
  backgroundMusicName?: string;
  backgroundMusicVolume: number;
}

export interface AIAnalysisReport {
  overallScore: number; // 0-100
  hookScore: number;
  pacingScore: number;
  clarityScore: number;
  retentionScore: number;
  detectedTopic: string;
  speechSummary: string;
  speakerCount: number;
  pausesDetected: number;
  fillerWordsDetected: number;
  repeatedTakesDetected: number;
  strongMomentsCount: number;
  bRollSuggestionsCount: number;
  captionsGeneratedCount: number;
  estimatedTimeSavedMinutes: number;
  insights: {
    type: 'success' | 'warning' | 'tip';
    message: string;
    actionLabel?: string;
    actionCommand?: string;
  }[];
}

export interface ViralShortClip {
  id: string;
  title: string;
  hook: string;
  start: number;
  end: number;
  duration: number;
  score: number; // 0-100 virality score
  hashtags: string[];
  description: string;
  aspectRatio: '9:16';
  thumbnailUrl: string;
}

export interface VideoVersion {
  id: string;
  name: string;
  timestamp: string;
  description: string;
  cutsCount: number;
  clipsCount: number;
  author: 'AI Auto-Director' | 'User Prompt' | 'Manual Edit';
}

export interface TimelineClip {
  id: string;
  trackId: 'video' | 'b-roll' | 'captions' | 'zooms' | 'effects' | 'audio' | 'music';
  start: number; // Timeline start time
  duration: number;
  sourceStart: number;
  sourceDuration: number;
  name: string;
  mediaUrl?: string;
  color?: string;
  volume?: number;
  speed?: number;
  scale?: number;
  muted?: boolean;
  locked?: boolean;
  metadata?: Record<string, any>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  duration: number; // in seconds
  aspectRatio: AspectRatio;
  category: VideoCategory;
  originalVideoUrl: string;
  originalVideoName: string;
  thumbnailUrl: string;
  resolution: '720p' | '1080p' | '1440p' | '4K';
  fps: number;
  
  // Data tracks & configs
  clips: TimelineClip[];
  captions: CaptionItem[];
  captionStyle: CaptionStyleConfig;
  smartCuts: SmartCutSegment[];
  bRolls: BRollItem[];
  zooms: ZoomKeyframe[];
  effects: EffectOverlay[];
  audioConfig: AudioTrackConfig;
  analysisReport: AIAnalysisReport;
  viralShorts: ViralShortClip[];
  versions: VideoVersion[];
  
  // State flags
  isAnalyzed: boolean;
  isAiEdited: boolean;
  cutAggressiveness: number; // 0 (natural) - 100 (aggressive)
}

export interface BrandKit {
  id: string;
  name: string;
  logoUrl?: string;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  introBumperUrl?: string;
  outroBumperUrl?: string;
  captionPreset: CaptionPreset;
  watermarkText?: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: VideoCategory;
  aspectRatio: AspectRatio;
  durationExample: string;
  description: string;
  thumbnailUrl: string;
  captionPreset: CaptionPreset;
  recommendedMusic: string;
  features: string[];
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  plan: 'free' | 'pro' | 'creator' | 'business';
  aiMinutesUsed: number;
  aiMinutesTotal: number;
  storageUsedGb: number;
  storageTotalGb: number;
  exportsUsed: number;
  exportsTotal: number;
  aiGenerationsUsed: number;
  aiGenerationsTotal: number;
  joinedDate: string;
  role: 'admin' | 'creator' | 'member';
}

export interface AICommandLog {
  id: string;
  prompt: string;
  timestamp: string;
  changesSummary: string[];
  status: 'applied' | 'undone';
}

export interface ExportConfig {
  resolution: '720p' | '1080p' | '1440p' | '4K';
  format: 'mp4' | 'webm' | 'mov';
  fps: 24 | 30 | 60;
  aspectRatio: AspectRatio;
  includeWatermark: boolean;
  quality: 'draft' | 'standard' | 'ultra';
}
