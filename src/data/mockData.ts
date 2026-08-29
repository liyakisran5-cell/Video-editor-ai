import {
  BrandKit,
  CaptionItem,
  CaptionStyleConfig,
  Project,
  TemplateItem,
  UserAccount,
  SmartCutSegment,
  BRollItem,
  ZoomKeyframe,
  EffectOverlay,
  ViralShortClip
} from '../types';

export const DEFAULT_USER: UserAccount = {
  id: 'usr_premium_01',
  name: 'Alex Vance',
  email: 'alex.creator@dayacuts.studio',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'creator',
  aiMinutesUsed: 74,
  aiMinutesTotal: 180,
  storageUsedGb: 18.4,
  storageTotalGb: 100,
  exportsUsed: 28,
  exportsTotal: 100,
  aiGenerationsUsed: 142,
  aiGenerationsTotal: 500,
  joinedDate: 'Jan 2026',
  role: 'admin'
};

export const DEFAULT_CAPTION_STYLE: CaptionStyleConfig = {
  preset: 'hormozi',
  fontFamily: 'Cabinet Grotesk, Montserrat, sans-serif',
  fontSize: 42,
  textColor: '#FFFFFF',
  highlightColor: '#FACC15', // Vibrant Gold
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  strokeColor: '#000000',
  strokeWidth: 6,
  shadow: true,
  uppercase: true,
  maxWordsPerLine: 4,
  animation: 'pop',
  positionY: 76,
  emojiEnabled: true
};

export const SAMPLE_CAPTIONS_DEMO: CaptionItem[] = [
  {
    id: 'cap_1',
    start: 0.2,
    end: 2.8,
    text: "Here is the exact framework to scale your business to seven figures in 2026.",
    words: [
      { id: 'w1', word: 'HERE', start: 0.2, end: 0.6, isHighlight: false },
      { id: 'w2', word: 'IS', start: 0.6, end: 0.8, isHighlight: false },
      { id: 'w3', word: 'THE', start: 0.8, end: 1.0, isHighlight: false },
      { id: 'w4', word: 'EXACT', start: 1.0, end: 1.4, isHighlight: true, highlightColor: '#38BDF8', emoji: '🎯' },
      { id: 'w5', word: 'FRAMEWORK', start: 1.4, end: 2.0, isHighlight: true, highlightColor: '#FACC15' },
      { id: 'w6', word: 'TO', start: 2.0, end: 2.2, isHighlight: false },
      { id: 'w7', word: 'SCALE', start: 2.2, end: 2.8, isHighlight: true, highlightColor: '#4ADE80', emoji: '🚀' }
    ]
  },
  {
    id: 'cap_2',
    start: 3.0,
    end: 6.2,
    text: "Most creators waste 80% of their time on manual video editing and tedious cuts.",
    words: [
      { id: 'w8', word: 'MOST', start: 3.0, end: 3.4, isHighlight: false },
      { id: 'w9', word: 'CREATORS', start: 3.4, end: 4.0, isHighlight: true, highlightColor: '#F43F5E' },
      { id: 'w10', word: 'WASTE', start: 4.0, end: 4.5, isHighlight: true, highlightColor: '#EF4444', emoji: '⏳' },
      { id: 'w11', word: '80%', start: 4.5, end: 5.0, isHighlight: true, highlightColor: '#FACC15' },
      { id: 'w12', word: 'OF', start: 5.0, end: 5.2, isHighlight: false },
      { id: 'w13', word: 'THEIR', start: 5.2, end: 5.5, isHighlight: false },
      { id: 'w14', word: 'TIME', start: 5.5, end: 6.2, isHighlight: false }
    ]
  },
  {
    id: 'cap_3',
    start: 6.5,
    end: 9.8,
    text: "When you automate your smart cuts, captions, and b-roll with AI, your output skyrockets 10x.",
    words: [
      { id: 'w15', word: 'WHEN', start: 6.5, end: 6.8, isHighlight: false },
      { id: 'w16', word: 'YOU', start: 6.8, end: 7.0, isHighlight: false },
      { id: 'w17', word: 'AUTOMATE', start: 7.0, end: 7.6, isHighlight: true, highlightColor: '#A855F7', emoji: '⚡' },
      { id: 'w18', word: 'SMART', start: 7.6, end: 8.0, isHighlight: false },
      { id: 'w19', word: 'CUTS', start: 8.0, end: 8.4, isHighlight: false },
      { id: 'w20', word: 'OUTPUT', start: 8.4, end: 9.0, isHighlight: true, highlightColor: '#22C55E' },
      { id: 'w21', word: '10X', start: 9.0, end: 9.8, isHighlight: true, highlightColor: '#FACC15', emoji: '🔥' }
    ]
  },
  {
    id: 'cap_4',
    start: 10.1,
    end: 14.5,
    text: "Retention goes straight up because every second delivers high-signal visual dopamine.",
    words: [
      { id: 'w22', word: 'RETENTION', start: 10.1, end: 10.9, isHighlight: true, highlightColor: '#38BDF8', emoji: '📈' },
      { id: 'w23', word: 'GOES', start: 10.9, end: 11.2, isHighlight: false },
      { id: 'w24', word: 'STRAIGHT', start: 11.2, end: 11.7, isHighlight: false },
      { id: 'w25', word: 'UP', start: 11.7, end: 12.2, isHighlight: true, highlightColor: '#4ADE80' },
      { id: 'w26', word: 'HIGH', start: 12.2, end: 12.8, isHighlight: false },
      { id: 'w27', word: 'SIGNAL', start: 12.8, end: 13.5, isHighlight: true, highlightColor: '#FACC15' },
      { id: 'w28', word: 'DOPAMINE', start: 13.5, end: 14.5, isHighlight: true, highlightColor: '#EC4899', emoji: '🧠' }
    ]
  },
  {
    id: 'cap_5',
    start: 14.8,
    end: 18.0,
    text: "Hit subscribe and comment 'AI' below to get our private viral short editing cheat sheet.",
    words: [
      { id: 'w29', word: 'HIT', start: 14.8, end: 15.2, isHighlight: false },
      { id: 'w30', word: 'SUBSCRIBE', start: 15.2, end: 16.0, isHighlight: true, highlightColor: '#EF4444', emoji: '🔔' },
      { id: 'w31', word: 'COMMENT', start: 16.0, end: 16.6, isHighlight: false },
      { id: 'w32', word: 'AI', start: 16.6, end: 17.2, isHighlight: true, highlightColor: '#38BDF8', emoji: '💬' },
      { id: 'w33', word: 'BELOW', start: 17.2, end: 18.0, isHighlight: false }
    ]
  }
];

export const SAMPLE_SMART_CUTS: SmartCutSegment[] = [
  {
    id: 'cut_1',
    start: 2.8,
    end: 3.0,
    duration: 0.2,
    type: 'silence',
    reason: 'Dead air pause between hook and premise',
    removed: true,
    confidence: 0.98
  },
  {
    id: 'cut_2',
    start: 6.2,
    end: 6.5,
    duration: 0.3,
    type: 'filler-word',
    word: 'uhm',
    reason: 'Vocal filler "uhm" detected',
    removed: true,
    confidence: 0.94
  },
  {
    id: 'cut_3',
    start: 9.8,
    end: 10.1,
    duration: 0.3,
    type: 'silence',
    reason: 'Breath pause before point 3',
    removed: true,
    confidence: 0.92
  },
  {
    id: 'cut_4',
    start: 14.5,
    end: 14.8,
    duration: 0.3,
    type: 'silence',
    reason: 'Awkward pause before CTA',
    removed: true,
    confidence: 0.95
  }
];

export const SAMPLE_BROLLS: BRollItem[] = [
  {
    id: 'broll_1',
    start: 3.5,
    duration: 2.4,
    title: 'Financial Chart & Market Growth',
    keyword: 'scale business',
    mediaUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
    type: 'image',
    overlayType: 'cutaway',
    opacity: 0.95,
    scale: 1.0,
    applied: true
  },
  {
    id: 'broll_2',
    start: 7.2,
    duration: 2.2,
    title: 'AI High-Tech Neural Network',
    keyword: 'automate AI',
    mediaUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&auto=format&fit=crop&q=80',
    type: 'image',
    overlayType: 'picture-in-picture',
    opacity: 1.0,
    scale: 0.85,
    applied: true
  },
  {
    id: 'broll_3',
    start: 11.0,
    duration: 2.5,
    title: 'Exponential Viral Growth Curve',
    keyword: 'retention skyrocketing',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80',
    type: 'image',
    overlayType: 'cutaway',
    opacity: 0.95,
    scale: 1.0,
    applied: true
  }
];

export const SAMPLE_ZOOMS: ZoomKeyframe[] = [
  {
    id: 'zoom_1',
    time: 1.0,
    duration: 1.8,
    scale: 1.25,
    focusPoint: { x: 50, y: 40 },
    type: 'punch-in',
    applied: true
  },
  {
    id: 'zoom_2',
    time: 4.5,
    duration: 2.0,
    scale: 1.35,
    focusPoint: { x: 50, y: 38 },
    type: 'punch-in',
    applied: true
  },
  {
    id: 'zoom_3',
    time: 8.8,
    duration: 2.5,
    scale: 1.2,
    focusPoint: { x: 52, y: 42 },
    type: 'slow-push',
    applied: true
  },
  {
    id: 'zoom_4',
    time: 15.0,
    duration: 2.8,
    scale: 1.3,
    focusPoint: { x: 50, y: 40 },
    type: 'punch-in',
    applied: true
  }
];

export const SAMPLE_EFFECTS: EffectOverlay[] = [
  {
    id: 'eff_1',
    start: 0.0,
    duration: 18.0,
    type: 'progress-bar',
    intensity: 1.0,
    label: 'Retention Bar',
    applied: true
  },
  {
    id: 'eff_2',
    start: 1.2,
    duration: 0.4,
    type: 'screen-shake',
    intensity: 0.6,
    label: 'Hook Punch Impact',
    applied: true
  },
  {
    id: 'eff_3',
    start: 9.0,
    duration: 1.2,
    type: 'motion-arrow',
    intensity: 1.0,
    label: '10x Growth Arrow',
    applied: true
  }
];

export const SAMPLE_VIRAL_SHORTS: ViralShortClip[] = [
  {
    id: 'short_1',
    title: 'The 10x Content Machine Framework',
    hook: 'Why 80% of creators fail before reaching 100K subs',
    start: 0.0,
    end: 18.0,
    duration: 18.0,
    score: 96,
    hashtags: ['#CreatorEconomy', '#ViralHacks', '#AITools', '#VideoEditing', '#Shorts'],
    description: 'Stop wasting hours manually cutting silence. Here is how modern creators 10x their production speed.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'short_2',
    title: 'Automate or Die in 2026',
    hook: 'This single AI hack saves 15 hours every single week',
    start: 3.0,
    end: 14.5,
    duration: 11.5,
    score: 92,
    hashtags: ['#SaaS', '#ArtificialIntelligence', '#GrowthMarketing', '#CapCutAlternative'],
    description: 'The secret to ultra-high audience retention revealed.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'short_3',
    title: 'High-Signal Retention Blueprint',
    hook: 'How to make viewers watch your video until the very last second',
    start: 6.5,
    end: 18.0,
    duration: 11.5,
    score: 88,
    hashtags: ['#YouTubeShorts', '#ViralTips', '#Algorithm', '#VideoProduction'],
    description: 'Add dynamic zooms and smart captions automatically.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80'
  }
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj_founder_pitch',
    name: 'Scaling to $100K MRR with AI Video Engine',
    description: 'Executive talking head breakdown with smart cuts, punch-in zooms, b-roll overlays, and Hormozi captions.',
    createdAt: '2 hours ago',
    updatedAt: 'Just now',
    duration: 18.0,
    aspectRatio: '16:9',
    category: 'talking-head',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    originalVideoName: 'raw_founder_pitch_take3_4k.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    resolution: '1080p',
    fps: 60,
    isAnalyzed: true,
    isAiEdited: true,
    cutAggressiveness: 65,
    clips: [
      {
        id: 'clip_main_1',
        trackId: 'video',
        start: 0,
        duration: 18.0,
        sourceStart: 0,
        sourceDuration: 18.0,
        name: 'Main Speaker Cam (Enhanced)',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
      backgroundMusicName: 'Cyber Lofi Focus Beat (120 BPM)',
      backgroundMusicVolume: 18
    },
    analysisReport: {
      overallScore: 91,
      hookScore: 94,
      pacingScore: 89,
      clarityScore: 95,
      retentionScore: 92,
      detectedTopic: 'SaaS Growth & AI Automation Frameworks',
      speechSummary: 'Speaker delivers a high-urgency blueprint for automating video editing workflows to 10x output and audience retention.',
      speakerCount: 1,
      pausesDetected: 14,
      fillerWordsDetected: 8,
      repeatedTakesDetected: 4,
      strongMomentsCount: 9,
      bRollSuggestionsCount: 6,
      captionsGeneratedCount: 33,
      estimatedTimeSavedMinutes: 85,
      insights: [
        {
          type: 'success',
          message: 'Hook clarity is in the top 5% of tested videos (0-3s high energy).',
          actionLabel: 'Keep Hook Boost'
        },
        {
          type: 'warning',
          message: 'Detected a 1.2s dead-air gap around 0:06. Removed automatically.',
          actionLabel: 'Preview Cut'
        },
        {
          type: 'tip',
          message: 'Suggested stock chart B-Roll at 00:03.5 to illustrate 7-figure revenue.',
          actionCommand: 'Enhance B-Roll'
        }
      ]
    },
    viralShorts: SAMPLE_VIRAL_SHORTS,
    versions: [
      {
        id: 'ver_1',
        name: 'Version 1 — Raw Upload',
        timestamp: '10:15 AM',
        description: 'Original uncut raw footage with pauses and fillers.',
        cutsCount: 0,
        clipsCount: 1,
        author: 'Manual Edit'
      },
      {
        id: 'ver_2',
        name: 'Version 2 — AI Clean Smart Cut',
        timestamp: '10:16 AM',
        description: 'Removed 14 pauses, 8 filler words, and normalized audio loudness.',
        cutsCount: 18,
        clipsCount: 4,
        author: 'AI Auto-Director'
      },
      {
        id: 'ver_3',
        name: 'Version 3 — Dynamic Viral Overhaul',
        timestamp: '10:18 AM',
        description: 'Added Hormozi captions, punch zooms, b-roll overlays, and lofi beat.',
        cutsCount: 22,
        clipsCount: 9,
        author: 'AI Auto-Director'
      }
    ]
  },
  {
    id: 'proj_podcast_ep12',
    name: 'Deep Tech Podcast: The Future of Quantum Agents',
    description: 'Two-speaker discussion reframed with active speaker detection and auto-switch.',
    createdAt: '1 day ago',
    updatedAt: '3 hours ago',
    duration: 32.0,
    aspectRatio: '16:9',
    category: 'podcast',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    originalVideoName: 'podcast_studio_ep12_raw.mov',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    resolution: '4K',
    fps: 30,
    isAnalyzed: true,
    isAiEdited: true,
    cutAggressiveness: 50,
    clips: [],
    captions: [],
    captionStyle: { ...DEFAULT_CAPTION_STYLE, preset: 'beast-pop', highlightColor: '#38BDF8' },
    smartCuts: [],
    bRolls: [],
    zooms: [],
    effects: [],
    audioConfig: {
      volume: 100,
      noiseRemoval: true,
      voiceEnhance: true,
      loudnessNormalize: true,
      autoDucking: true,
      duckingAmount: 70,
      backgroundMusicVolume: 12
    },
    analysisReport: {
      overallScore: 86,
      hookScore: 88,
      pacingScore: 84,
      clarityScore: 92,
      retentionScore: 85,
      detectedTopic: 'Quantum Computing and LLM reasoning architectures',
      speechSummary: 'Interview exploring breakthroughs in quantum hardware interfaces and agent autonomy.',
      speakerCount: 2,
      pausesDetected: 22,
      fillerWordsDetected: 15,
      repeatedTakesDetected: 6,
      strongMomentsCount: 11,
      bRollSuggestionsCount: 8,
      captionsGeneratedCount: 52,
      estimatedTimeSavedMinutes: 120,
      insights: []
    },
    viralShorts: [],
    versions: []
  },
  {
    id: 'proj_fitness_motivation',
    name: 'Discipline Over Motivation — 60s High Energy Reel',
    description: 'High-intensity athletic cut with cinematic speed ramps and kinetic typography.',
    createdAt: '3 days ago',
    updatedAt: 'Yesterday',
    duration: 24.0,
    aspectRatio: '9:16',
    category: 'motivational',
    originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    originalVideoName: 'gym_workout_raw_4k.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    resolution: '1080p',
    fps: 60,
    isAnalyzed: true,
    isAiEdited: true,
    cutAggressiveness: 80,
    clips: [],
    captions: [],
    captionStyle: { ...DEFAULT_CAPTION_STYLE, preset: 'cyber-neon', highlightColor: '#A855F7' },
    smartCuts: [],
    bRolls: [],
    zooms: [],
    effects: [],
    audioConfig: {
      volume: 100,
      noiseRemoval: true,
      voiceEnhance: true,
      loudnessNormalize: true,
      autoDucking: false,
      duckingAmount: 40,
      backgroundMusicVolume: 45
    },
    analysisReport: {
      overallScore: 94,
      hookScore: 98,
      pacingScore: 95,
      clarityScore: 90,
      retentionScore: 96,
      detectedTopic: 'High Performance & Mental Resilience',
      speechSummary: 'Intense monologue on overcoming mental friction through unwavering physical discipline.',
      speakerCount: 1,
      pausesDetected: 7,
      fillerWordsDetected: 2,
      repeatedTakesDetected: 1,
      strongMomentsCount: 14,
      bRollSuggestionsCount: 10,
      captionsGeneratedCount: 42,
      estimatedTimeSavedMinutes: 95,
      insights: []
    },
    viralShorts: [],
    versions: []
  }
];

export const TEMPLATES_LIST: TemplateItem[] = [
  {
    id: 'tmpl_viral_shorts',
    name: 'Hormozi Viral Short',
    category: 'talking-head',
    aspectRatio: '9:16',
    durationExample: '30–60s',
    description: 'High-energy cuts with bold yellow keyword highlights, emoji popups, punch-in zooms, and viral retention progress bar.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'hormozi',
    recommendedMusic: 'Energetic Trap Beat',
    features: ['Auto Face Tracking', 'Emoji Highlights', '0.2s Silence Cut', 'Dynamic Zooms']
  },
  {
    id: 'tmpl_mrbeast_pop',
    name: 'MrBeast High-Pacing Explainer',
    category: 'tech-review',
    aspectRatio: '16:9',
    durationExample: '1–3m',
    description: 'Ultra-fast pacing, comic sound effects, visual arrows, spotlight effects, and high-contrast color pop.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'beast-pop',
    recommendedMusic: 'Upbeat Arcade Pop',
    features: ['Aggressive Cuts', 'Motion Graphics', 'Sound FX Stingers', '10x B-Roll Density']
  },
  {
    id: 'tmpl_podcast_clip',
    name: 'Podcast Split Highlights',
    category: 'podcast',
    aspectRatio: '9:16',
    durationExample: '45–90s',
    description: 'Automatic two-speaker split screen framing, studio vocal EQ normalization, and clean karaoke subtitle highlights.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'karaoke-glow',
    recommendedMusic: 'Ambient Studio Lofi',
    features: ['Dual Speaker Split', 'Studio Vocal EQ', 'Word-by-word Karaoke', 'Auto B-roll']
  },
  {
    id: 'tmpl_cinematic_story',
    name: 'Cinematic Minimalist Story',
    category: 'motivational',
    aspectRatio: '16:9',
    durationExample: '2–5m',
    description: 'Slow push camera glides, high-fidelity letterbox, ambient atmospheric score, and elegant serif typography.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'cinematic-serif',
    recommendedMusic: 'Deep Hans Zimmer Strings',
    features: ['Cinematic Color Grade', 'Slow Push Zooms', 'Auto Music Ducking', '4K Master']
  },
  {
    id: 'tmpl_product_saas',
    name: 'SaaS & Tech Product Demo',
    category: 'product-promo',
    aspectRatio: '16:9',
    durationExample: '60–120s',
    description: 'Crisp UI zoom highlights, cursor motion smoothing, cyber glow captions, and high-impact feature callouts.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'cyber-neon',
    recommendedMusic: 'Modern Tech Corporate Synth',
    features: ['UI Spotlight', 'Feature Callouts', 'Brand Kit Colors', '60 FPS Smooth']
  },
  {
    id: 'tmpl_gaming_montage',
    name: 'Gaming Clip & Reaction Montage',
    category: 'gaming',
    aspectRatio: '9:16',
    durationExample: '20–45s',
    description: 'Facecam top/bottom framing, kill/highlight sound effects, screen shake on audio peaks, and neon animated text.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    captionPreset: 'bungee-box',
    recommendedMusic: 'Cyberpunk Bass Drops',
    features: ['Facecam Auto Pin', 'Screen Shake FX', 'Peak Audio Trigger', 'Meme Stickers']
  }
];

export const DEFAULT_BRAND_KITS: BrandKit[] = [
  {
    id: 'bk_1',
    name: 'Apex Studio (Primary)',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    logoPosition: 'top-right',
    primaryColor: '#6366F1', // Indigo
    accentColor: '#FACC15', // Gold
    fontFamily: 'Cabinet Grotesk',
    captionPreset: 'hormozi',
    watermarkText: 'DAYACUTS.STUDIO'
  },
  {
    id: 'bk_2',
    name: 'Minimalist Black & White',
    logoPosition: 'top-left',
    primaryColor: '#FFFFFF',
    accentColor: '#38BDF8',
    fontFamily: 'Plus Jakarta Sans',
    captionPreset: 'minimal-clean',
    watermarkText: 'VANCE'
  }
];

export const STOCK_BROLL_LIBRARY = [
  {
    id: 'stock_1',
    title: 'Financial Chart & Stocks Rising',
    category: 'Business & Finance',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    keywords: ['stock', 'chart', 'money', 'revenue', 'growth', 'finance', 'scale', 'profit']
  },
  {
    id: 'stock_2',
    title: 'Modern Laptop & High-Tech Coding',
    category: 'Technology & AI',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    keywords: ['laptop', 'code', 'software', 'ai', 'tech', 'screen', 'computer', 'developer']
  },
  {
    id: 'stock_3',
    title: 'Dubai Futuristic Skyline & Luxury City',
    category: 'Travel & Luxury',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    keywords: ['dubai', 'skyline', 'city', 'buildings', 'luxury', 'travel', 'architecture']
  },
  {
    id: 'stock_4',
    title: 'Neural Network & AI Hologram',
    category: 'Technology & AI',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    keywords: ['neural', 'ai', 'future', 'robot', 'algorithm', 'intelligence', 'automate']
  },
  {
    id: 'stock_5',
    title: 'Audience Cheering & Conference Stage',
    category: 'Events & Speech',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    keywords: ['stage', 'crowd', 'conference', 'audience', 'speech', 'applause', 'presentation']
  },
  {
    id: 'stock_6',
    title: 'Rocket Launch & Space Mission',
    category: 'Inspiration & Speed',
    url: 'https://images.unsplash.com/photo-1517976487541-b0e6878e1b12?w=800&auto=format&fit=crop&q=80',
    keywords: ['rocket', 'launch', 'speed', 'moon', 'skyrocket', 'growth', 'exponential']
  },
  {
    id: 'stock_7',
    title: 'Athletic Runner & High Speed Action',
    category: 'Fitness & Motivation',
    url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    keywords: ['run', 'fitness', 'speed', 'athlete', 'workout', 'discipline', 'energy']
  },
  {
    id: 'stock_8',
    title: 'Handshake & Global Enterprise Agreement',
    category: 'Business & Finance',
    url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80',
    keywords: ['deal', 'handshake', 'meeting', 'contract', 'partnership', 'team']
  }
];

export const STOCK_MUSIC_TRACKS = [
  {
    id: 'mus_1',
    name: 'Cyber Lofi Focus Beat',
    category: 'Motivational',
    bpm: 120,
    duration: '2:45',
    mood: 'Chill & Focused'
  },
  {
    id: 'mus_2',
    name: 'Epic Hans Zimmer Orchestral Climax',
    category: 'Cinematic',
    bpm: 95,
    duration: '3:20',
    mood: 'Inspiring & Powerful'
  },
  {
    id: 'mus_3',
    name: 'High-Retention TikTok Hyperpop Trap',
    category: 'Energetic',
    bpm: 140,
    duration: '1:50',
    mood: 'Viral & Punchy'
  },
  {
    id: 'mus_4',
    name: 'Minimal Tech Ambient Pulse',
    category: 'Corporate',
    bpm: 110,
    duration: '3:05',
    mood: 'Professional & Clean'
  },
  {
    id: 'mus_5',
    name: 'Dark Cyberpunk Bassline Drive',
    category: 'Gaming',
    bpm: 130,
    duration: '2:15',
    mood: 'Intense & Action'
  }
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Starter / Free',
    priceMonthly: 0,
    description: 'Perfect for trying out AI editing on personal clips.',
    aiMinutes: 15,
    popular: false,
    buttonLabel: 'Get Started Free',
    features: [
      '15 AI processing minutes/mo',
      '720p HD export with watermark',
      'Basic silence & dead air cutting',
      'Standard subtitle presets',
      '5 GB Cloud Storage'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    priceMonthly: 29,
    description: 'For growing YouTube and TikTok content creators.',
    aiMinutes: 60,
    popular: false,
    buttonLabel: 'Upgrade to Pro',
    features: [
      '60 AI processing minutes/mo',
      '1080p 60fps Full HD export',
      'No watermark & custom branding',
      'Alex Hormozi & Beast caption styles',
      'Dynamic face-tracking punch zooms',
      '30 GB Cloud Storage'
    ]
  },
  {
    id: 'creator',
    name: 'Creator Studio',
    priceMonthly: 59,
    description: 'For high-volume creators, podcasters & channels.',
    aiMinutes: 180,
    popular: true,
    buttonLabel: 'Start 7-Day Free Trial',
    features: [
      '180 AI processing minutes/mo',
      '4K Ultra HD 60fps export',
      'Full 100K+ 4K B-roll library access',
      'Studio noise cancellation (-18dB)',
      '1-Click viral shorts generator',
      'Brand Kits & custom font uploads',
      '100 GB Cloud Storage'
    ]
  },
  {
    id: 'business',
    name: 'Agency & Business',
    priceMonthly: 129,
    description: 'For media teams, agencies & enterprise video scale.',
    aiMinutes: 600,
    popular: false,
    buttonLabel: 'Contact Sales / Subscribe',
    features: [
      '600 AI processing minutes/mo',
      '4K ProRes export + .SRT / EDL',
      'Gemini 3.7 priority queue latency',
      'Multi-seat team collaboration',
      'Unlimited Brand Kits & templates',
      '500 GB Dedicated Fast Storage',
      'Dedicated account manager'
    ]
  }
];

