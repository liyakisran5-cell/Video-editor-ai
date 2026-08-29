import { BRollItem, CaptionItem, CaptionStyleConfig, EffectOverlay, ZoomKeyframe } from '../types';

export interface RenderFrameOptions {
  currentTime: number;
  duration: number;
  videoElement: HTMLVideoElement | null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5';
  captions: CaptionItem[];
  captionStyle: CaptionStyleConfig;
  bRolls: BRollItem[];
  zooms: ZoomKeyframe[];
  effects: EffectOverlay[];
  watermarkText?: string;
  isExporting?: boolean;
}

export class VideoEngine {
  /**
   * Draw complete composite frame to canvas
   */
  static renderFrame(options: RenderFrameOptions) {
    const {
      currentTime,
      duration,
      videoElement,
      canvas,
      ctx,
      aspectRatio,
      captions,
      captionStyle,
      bRolls,
      zooms,
      effects,
      watermarkText
    } = options;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, width, height);

    // 1. Calculate active zoom
    let currentScale = 1.0;
    let focusX = width / 2;
    let focusY = height / 2;

    const activeZoom = zooms.find(
      z => z.applied && currentTime >= z.time && currentTime < z.time + z.duration
    );

    if (activeZoom) {
      const elapsed = currentTime - activeZoom.time;
      if (activeZoom.type === 'punch-in') {
        currentScale = activeZoom.scale;
      } else if (activeZoom.type === 'slow-push') {
        const progress = Math.min(1, elapsed / activeZoom.duration);
        currentScale = 1.0 + (activeZoom.scale - 1.0) * progress;
      } else if (activeZoom.type === 'punch-out') {
        currentScale = 1.0;
      } else {
        currentScale = activeZoom.scale;
      }
      focusX = (activeZoom.focusPoint.x / 100) * width;
      focusY = (activeZoom.focusPoint.y / 100) * height;
    }

    // 2. Check for screen shake effect
    let shakeX = 0;
    let shakeY = 0;
    const activeShake = effects.find(
      e => e.applied && e.type === 'screen-shake' && currentTime >= e.start && currentTime < e.start + e.duration
    );
    if (activeShake) {
      const amp = activeShake.intensity * 12;
      shakeX = (Math.random() - 0.5) * amp;
      shakeY = (Math.random() - 0.5) * amp;
    }

    ctx.save();
    ctx.translate(shakeX, shakeY);

    // Apply Zoom Transform centered around focus point
    if (currentScale !== 1.0) {
      ctx.translate(focusX, focusY);
      ctx.scale(currentScale, currentScale);
      ctx.translate(-focusX, -focusY);
    }

    // 3. Render Background / Main Video
    if (videoElement && videoElement.readyState >= 2) {
      // Draw video maintaining aspect ratio cover/contain
      this.drawCoverImage(ctx, videoElement, 0, 0, width, height);
    } else {
      // Animated procedural gradient placeholder
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#090d16');
      ctx.fillRect(0, 0, width, height);

      // Draw subtle speaker avatar silhouette or visualizer circle
      ctx.fillStyle = '#312e81';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 - 40, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore(); // Restore zoom transform

    // 4. Render Active B-Roll Overlays
    const activeBRoll = bRolls.find(
      b => b.applied && currentTime >= b.start && currentTime < b.start + b.duration
    );

    if (activeBRoll) {
      this.renderBRoll(ctx, activeBRoll, width, height);
    }

    // 5. Render Active Visual Effects (Progress Bar, Spotlight, Arrows)
    this.renderEffects(ctx, effects, currentTime, duration, width, height);

    // 6. Render Dynamic Animated Captions
    const activeCaption = captions.find(
      c => currentTime >= c.start && currentTime <= c.end
    );

    if (activeCaption) {
      this.renderCaption(ctx, activeCaption, captionStyle, currentTime, width, height);
    }

    // 7. Render Watermark (if free tier or custom brand kit)
    if (watermarkText) {
      ctx.save();
      ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(watermarkText, width - 140, height - 24);
      ctx.restore();
    }
  }

  /**
   * Render B-Roll Overlay
   */
  private static renderBRoll(ctx: CanvasRenderingContext2D, broll: BRollItem, width: number, height: number) {
    ctx.save();
    ctx.globalAlpha = broll.opacity || 0.95;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = broll.mediaUrl;

    if (broll.overlayType === 'cutaway') {
      // Full screen cutaway with subtle border
      if (img.complete && img.naturalWidth > 0) {
        this.drawCoverImage(ctx, img, 0, 0, width, height);
      } else {
        // Placeholder B-Roll badge
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
      }

      // Cutaway Badge
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, 20, 20, 240, 36, 8, true, true);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`🎬 B-Roll: ${broll.keyword}`, 32, 43);
    } else if (broll.overlayType === 'picture-in-picture') {
      // Picture-in-picture box in top right
      const pipW = width * 0.38;
      const pipH = pipW * 0.62;
      const pipX = width - pipW - 24;
      const pipY = 24;

      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 18;

      ctx.save();
      this.roundRect(ctx, pipX, pipY, pipW, pipH, 12, false, false);
      ctx.clip();

      if (img.complete && img.naturalWidth > 0) {
        this.drawCoverImage(ctx, img, pipX, pipY, pipW, pipH);
      } else {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(pipX, pipY, pipW, pipH);
      }
      ctx.restore();

      // Border around PIP
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2;
      this.roundRect(ctx, pipX, pipY, pipW, pipH, 12, false, true);
    }

    ctx.restore();
  }

  /**
   * Render Dynamic Captions
   */
  private static renderCaption(
    ctx: CanvasRenderingContext2D,
    caption: CaptionItem,
    style: CaptionStyleConfig,
    currentTime: number,
    width: number,
    height: number
  ) {
    ctx.save();

    const posY = (style.positionY / 100) * height;
    const baseFontSize = Math.max(18, Math.round((style.fontSize / 720) * height));

    ctx.font = `800 ${baseFontSize}px "${style.fontFamily}", "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Word by word calculation
    const words = caption.words || [];
    if (words.length > 0) {
      // Calculate total text width to center properly
      let totalWidth = 0;
      const wordMetrics = words.map(w => {
        const text = style.uppercase ? w.word.toUpperCase() : w.word;
        const wWidth = ctx.measureText(text + ' ').width;
        totalWidth += wWidth;
        return { text, width: wWidth, word: w };
      });

      let currentX = width / 2 - totalWidth / 2;

      wordMetrics.forEach(({ text, width: wWidth, word }) => {
        const isCurrentWord = currentTime >= word.start && currentTime <= word.end;
        const isPastWord = currentTime > word.end;

        ctx.save();

        let wordColor = style.textColor || '#FFFFFF';
        let wordScale = 1.0;
        let strokeColor = style.strokeColor || '#000000';

        if (isCurrentWord) {
          wordColor = word.highlightColor || style.highlightColor || '#FACC15';
          wordScale = style.animation === 'pop' ? 1.15 : 1.05;

          if (style.preset === 'hormozi') {
            // Draw highlight box behind active word
            ctx.fillStyle = '#FACC15';
            const boxPadding = 6;
            this.roundRect(
              ctx,
              currentX,
              posY - baseFontSize * 0.65 - boxPadding / 2,
              wWidth - 4,
              baseFontSize * 1.3 + boxPadding,
              6,
              true,
              false
            );
            wordColor = '#000000';
            strokeColor = 'transparent';
          } else if (style.preset === 'cyber-neon') {
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 16;
          }
        } else if (word.isHighlight) {
          wordColor = word.highlightColor || style.highlightColor;
        }

        // Apply scale transform centered on word
        if (wordScale !== 1.0) {
          ctx.translate(currentX + wWidth / 2, posY);
          ctx.scale(wordScale, wordScale);
          ctx.translate(-(currentX + wWidth / 2), -posY);
        }

        // Stroke
        if (style.strokeWidth > 0 && strokeColor !== 'transparent') {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = Math.max(2, Math.round((style.strokeWidth / 720) * height));
          ctx.lineJoin = 'round';
          ctx.strokeText(text, currentX + wWidth / 2, posY);
        }

        // Shadow
        if (style.shadow) {
          ctx.shadowColor = 'rgba(0,0,0,0.85)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 3;
        }

        // Fill text
        ctx.fillStyle = wordColor;
        ctx.fillText(text, currentX + wWidth / 2, posY);

        // Emoji
        if (style.emojiEnabled && word.emoji && isCurrentWord) {
          ctx.font = `${Math.round(baseFontSize * 1.2)}px sans-serif`;
          ctx.fillText(word.emoji, currentX + wWidth / 2, posY - baseFontSize * 1.2);
        }

        ctx.restore();
        currentX += wWidth;
      });
    } else {
      // Fallback simple line text
      const displayText = style.uppercase ? caption.text.toUpperCase() : caption.text;

      if (style.strokeWidth > 0) {
        ctx.strokeStyle = style.strokeColor || '#000000';
        ctx.lineWidth = Math.max(2, Math.round((style.strokeWidth / 720) * height));
        ctx.strokeText(displayText, width / 2, posY);
      }

      ctx.fillStyle = style.textColor || '#FFFFFF';
      ctx.fillText(displayText, width / 2, posY);
    }

    ctx.restore();
  }

  /**
   * Render Visual Effects
   */
  private static renderEffects(
    ctx: CanvasRenderingContext2D,
    effects: EffectOverlay[],
    currentTime: number,
    duration: number,
    width: number,
    height: number
  ) {
    effects.forEach(eff => {
      if (!eff.applied) return;

      if (eff.type === 'progress-bar') {
        const progress = Math.min(1, Math.max(0, currentTime / (duration || 1)));
        const barH = 5;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, height - barH, width, barH);

        const grad = ctx.createLinearGradient(0, 0, width * progress, 0);
        grad.addColorStop(0, '#6366F1');
        grad.addColorStop(0.5, '#EC4899');
        grad.addColorStop(1, '#FACC15');

        ctx.fillStyle = grad;
        ctx.fillRect(0, height - barH, width * progress, barH);
      }

      if (eff.type === 'motion-arrow' && currentTime >= eff.start && currentTime < eff.start + eff.duration) {
        ctx.save();
        ctx.fillStyle = '#22C55E';
        ctx.shadowColor = '#22C55E';
        ctx.shadowBlur = 12;
        ctx.font = '800 36px sans-serif';
        ctx.fillText('⬆ 10X', width * 0.78, height * 0.35);
        ctx.restore();
      }
    });
  }

  /**
   * Helper to draw image like background-size: cover
   */
  private static drawCoverImage(
    ctx: CanvasRenderingContext2D,
    img: CanvasImageSource,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const sourceWidth = (img as HTMLVideoElement).videoWidth || (img as HTMLImageElement).naturalWidth || w;
    const sourceHeight = (img as HTMLVideoElement).videoHeight || (img as HTMLImageElement).naturalHeight || h;

    const sourceAspect = sourceWidth / sourceHeight;
    const destAspect = w / h;

    let sx = 0;
    let sy = 0;
    let sWidth = sourceWidth;
    let sHeight = sourceHeight;

    if (sourceAspect > destAspect) {
      // Source is wider than dest
      sWidth = sourceHeight * destAspect;
      sx = (sourceWidth - sWidth) / 2;
    } else {
      // Source is taller than dest
      sHeight = sourceWidth / destAspect;
      sy = (sourceHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  }

  /**
   * Helper to draw rounded rectangle
   */
  private static roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fill: boolean,
    stroke: boolean
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
}
