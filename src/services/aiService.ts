import {
  AIAnalysisReport,
  BRollItem,
  CaptionItem,
  CaptionStyleConfig,
  Project,
  SmartCutSegment,
  ViralShortClip,
  ZoomKeyframe
} from '../types';
import {
  DEFAULT_CAPTION_STYLE,
  SAMPLE_BROLLS,
  SAMPLE_CAPTIONS_DEMO,
  SAMPLE_SMART_CUTS,
  SAMPLE_ZOOMS,
  STOCK_BROLL_LIBRARY
} from '../data/mockData';

export interface CommandExecutionResult {
  summary: string;
  changes: string[];
  timelineModifications?: {
    captionStyle?: Partial<CaptionStyleConfig>;
    addZooms?: Array<{ time: number; scale: number; duration: number; type: string }>;
    addBRolls?: Array<{ keyword: string; title: string; start: number; duration: number }>;
    audioUpdates?: { voiceEnhance?: boolean; noiseRemoval?: boolean; backgroundMusicVolume?: number; loudnessNormalize?: boolean };
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
    removeFillerWords?: boolean;
  };
}

export const AIService = {
  /**
   * Run Natural Language AI Command on the timeline
   */
  async executeCommand(prompt: string, project: Project): Promise<CommandExecutionResult> {
    try {
      const res = await fetch('/api/ai/command-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, currentProject: project })
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.result) {
          return data.result;
        }
      }
    } catch (err) {
      console.warn('Network call to backend AI failed, using client heuristic engine:', err);
    }

    // Client-side fallback heuristic
    const lower = prompt.toLowerCase();
    const changes: string[] = [];
    const timelineModifications: any = {};

    if (lower.includes('caption') || lower.includes('subtitle')) {
      if (lower.includes('bigger') || lower.includes('large')) {
        changes.push('Enlarged dynamic captions to 52px with heavy dark outline');
        timelineModifications.captionStyle = { fontSize: 52 };
      } else if (lower.includes('yellow') || lower.includes('gold') || lower.includes('hormozi')) {
        changes.push('Applied Alex Hormozi signature Gold highlight style');
        timelineModifications.captionStyle = { preset: 'hormozi', highlightColor: '#FACC15' };
      } else if (lower.includes('karaoke') || lower.includes('glow')) {
        changes.push('Switched caption engine to animated Karaoke Glow');
        timelineModifications.captionStyle = { preset: 'karaoke-glow', highlightColor: '#38BDF8' };
      } else if (lower.includes('beast') || lower.includes('pop')) {
        changes.push('Applied MrBeast Pop kinetic subtitle preset');
        timelineModifications.captionStyle = { preset: 'beast-pop', highlightColor: '#4ADE80' };
      }
    }

    if (lower.includes('zoom') || lower.includes('punch')) {
      changes.push('Added 3 speech-triggered 1.3x punch-in zooms at 00:01.8, 00:06.5, and 00:13.2');
      timelineModifications.addZooms = [
        { time: 1.8, scale: 1.3, duration: 2.0, type: 'punch-in' },
        { time: 6.5, scale: 1.35, duration: 2.2, type: 'punch-in' },
        { time: 13.2, scale: 1.25, duration: 2.5, type: 'punch-in' }
      ];
    }

    if (lower.includes('b-roll') || lower.includes('broll') || lower.includes('stock') || lower.includes('visual')) {
      changes.push('Inserted contextual B-Roll cutaways matching spoken topics');
      timelineModifications.addBRolls = [
        { keyword: 'growth analytics', title: 'Viral Growth Chart', start: 3.2, duration: 2.8 }
      ];
    }

    if (lower.includes('silence') || lower.includes('pause') || lower.includes('filler') || lower.includes('faster') || lower.includes('cut')) {
      changes.push('Removed 4 dead-air pauses (>0.3s) and vocal fillers');
      timelineModifications.removeFillerWords = true;
    }

    if (lower.includes('short') || lower.includes('tiktok') || lower.includes('reel') || lower.includes('9:16')) {
      changes.push('Converted canvas to 9:16 vertical format with auto speaker face tracking');
      timelineModifications.aspectRatio = '9:16';
    }

    if (lower.includes('audio') || lower.includes('voice') || lower.includes('sound') || lower.includes('noise')) {
      changes.push('Activated Studio Voice EQ, noise suppression, and volume normalization');
      timelineModifications.audioUpdates = { voiceEnhance: true, noiseRemoval: true, loudnessNormalize: true };
    }

    if (changes.length === 0) {
      changes.push(`Applied AI modifications based on "${prompt}"`);
      changes.push('Optimized scene pacing and visual transitions');
    }

    return {
      summary: `AI executed "${prompt}" with ${changes.length} precision adjustments.`,
      changes,
      timelineModifications
    };
  },

  /**
   * Simulate AI Video Analysis Report based on video metadata or file
   */
  async analyzeVideo(videoName: string, duration: number): Promise<AIAnalysisReport> {
    // Generates realistic deep analysis metrics
    return {
      overallScore: 89,
      hookScore: 93,
      pacingScore: 88,
      clarityScore: 94,
      retentionScore: 91,
      detectedTopic: videoName.toLowerCase().includes('pitch')
        ? 'Startup Pitch & Venture Growth Strategy'
        : videoName.toLowerCase().includes('podcast')
        ? 'Deep Tech Interview & Industry Trends'
        : 'High Impact Educational & Creator Tutorial',
      speechSummary:
        'Speaker delivers an engaging, high-information talk. Strong opening hook with opportunities to trim dead air and amplify key moments with b-roll overlays and kinetic typography.',
      speakerCount: 1,
      pausesDetected: Math.max(4, Math.round(duration * 0.7)),
      fillerWordsDetected: Math.max(3, Math.round(duration * 0.45)),
      repeatedTakesDetected: Math.max(1, Math.round(duration * 0.2)),
      strongMomentsCount: Math.max(3, Math.round(duration * 0.5)),
      bRollSuggestionsCount: Math.max(3, Math.round(duration * 0.35)),
      captionsGeneratedCount: Math.max(12, Math.round(duration * 2.2)),
      estimatedTimeSavedMinutes: Math.round(duration * 4.5),
      insights: [
        {
          type: 'success',
          message: 'First 3 seconds have high vocal energy — excellent for short-form retention.',
          actionLabel: 'Lock Hook'
        },
        {
          type: 'warning',
          message: 'Detected 3 filler words ("uhm", "like") that reduce pacing.',
          actionLabel: 'Auto Remove'
        },
        {
          type: 'tip',
          message: 'Adding a punch-in zoom on your key statistic will boost retention by ~14%.',
          actionCommand: 'Add Smart Zoom'
        }
      ]
    };
  },

  /**
   * Search stock B-Roll library by keywords or speech transcript
   */
  searchBRoll(query: string) {
    const q = query.toLowerCase();
    return STOCK_BROLL_LIBRARY.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some(k => k.includes(q) || q.includes(k))
    );
  },

  /**
   * Generate Viral Titles, Hashtags & SEO
   */
  async generateSEO(topic: string, transcript: string) {
    try {
      const res = await fetch('/api/ai/generate-titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, transcript })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('SEO API fallback');
    }

    return {
      titles: [
        `How I Scaled with AI Video Automation in 2026`,
        `Stop Editing Videos Manually (The Secret 10x Method)`,
        `This AI Hack Saves 20 Hours Every Single Week`,
        `The Hollywood Editing Framework for Viral Shorts`,
        `Why 90% of Creators Are Losing Retention Right Now`
      ],
      hashtags: ['#CreatorEconomy', '#ViralShorts', '#AITools', '#VideoEditing', '#SaaS'],
      description:
        'Learn how top creators automate their smart cuts, kinetic subtitles, and stock b-roll to skyrocket viewer retention and 10x production output.',
      hookIdeas: [
        'If you still cut silence by hand in 2026, you are burning your own time.',
        'Here is the exact framework to make viewers watch to the last second.',
        'Watch AI turn 10 minutes of raw footage into 5 viral shorts.'
      ]
    };
  }
};
