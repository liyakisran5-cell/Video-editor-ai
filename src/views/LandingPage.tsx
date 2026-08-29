import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Scissors,
  Layers,
  Wand2,
  TrendingUp,
  Volume2,
  Film,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Flame,
  Maximize2,
  Tv,
  Smartphone,
  Check,
  HelpCircle,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/mockData';
import { getWhatsAppUrl } from '../config/contact';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsUploadModalOpen, selectProject, projects } = useVideo();
  const { openAuthModal } = useAuth();

  const [isAnnual, setIsAnnual] = useState(true);
  const [beforeAfterMode, setBeforeAfterMode] = useState<'after' | 'before'>('after');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does DayaCuts AI remove dead air and pauses?',
      a: 'DayaCuts analyzes the raw audio waveform with millisecond precision, detecting silent pauses, hesitations, and filler words (um, uh, like). It creates seamless micro-splices while preserving natural conversational cadence.'
    },
    {
      q: 'Can I customize the generated captions and colors?',
      a: 'Yes! Choose from popular creator presets like Alex Hormozi Gold, MrBeast Pop, or Clean Minimal, and fine-tune font sizes, highlight colors, word animations, and emoji triggers directly in the timeline editor.'
    },
    {
      q: 'What video resolutions and formats are supported?',
      a: 'DayaCuts exports up to 4K Ultra HD at 60 FPS in MP4 (H.264), WebM, and ProRes. You can switch aspect ratios between 16:9, 9:16 Shorts, and 1:1 with auto face-tracking.'
    },
    {
      q: 'Does it work with my natural language commands?',
      a: 'Yes! Use the AI Command Bar to type or speak commands like "Remove all pauses over 0.5s", "Add punch zooms on key verbs", or "Make this a viral 9:16 short". Powered by Google Gemini 3.7.'
    }
  ];

  return (
    <div className="flex flex-col bg-[#06070a] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background glow meshes */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
            <span>Introducing DayaCuts AI 3.0 — The $100/mo SaaS Video Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-['Outfit'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turn Raw Footage Into{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Viral Masterpieces
            </span>{' '}
            In Seconds.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            The AI-first video studio that automatically cuts silences, generates kinetic Hormozi captions,
            adds smart facecam zooms, and matches 4K stock B-roll with 1 click.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
            >
              <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Upload Video & Auto-Edit (Free)</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => selectProject(projects[0].id)}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-semibold text-slate-200 backdrop-blur-md hover:bg-slate-800 hover:text-white transition-all"
            >
              <Play className="h-4 w-4 text-indigo-400 fill-indigo-400" />
              <span>Explore Live Studio Demo</span>
            </button>

            <a
              id="hero-whatsapp-btn"
              href={getWhatsAppUrl('Hello DayaCuts! I want to inquire about custom plans and video editing features.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm font-semibold text-emerald-300 backdrop-blur-md hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-200">4.9/5 Rating</span>
            </div>
            <span className="text-slate-700">•</span>
            <span>Used by 45,000+ Creators & Agencies</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-semibold">✓ No credit card required</span>
          </div>

          {/* 2. INTERACTIVE BEFORE & AFTER PREVIEW HERO PLAYER */}
          <div className="mt-12 relative mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-[#0a0c13] p-3 md:p-4 shadow-2xl">
            {/* Switcher Tab Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-rose-500" />
                <span className="flex h-3 w-3 rounded-full bg-amber-500" />
                <span className="flex h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-xs text-slate-400">DayaCuts Compositor Engine</span>
              </div>

              {/* Before / After Switcher */}
              <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
                <button
                  onClick={() => setBeforeAfterMode('before')}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    beforeAfterMode === 'before'
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Raw Boring Video
                </button>
                <button
                  onClick={() => setBeforeAfterMode('after')}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    beforeAfterMode === 'after'
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AI Edited (Viral)</span>
                </button>
              </div>
            </div>

            {/* Simulated Frame Canvas */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center mt-3 border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80"
                alt="Video Frame"
                className={`h-full w-full object-cover transition-transform duration-700 ${
                  beforeAfterMode === 'after' ? 'scale-110' : 'scale-100 grayscale-[40%]'
                }`}
              />

              {/* Overlays if "After" mode */}
              {beforeAfterMode === 'after' ? (
                <>
                  {/* B-Roll Picture-in-Picture */}
                  <div className="absolute top-4 right-4 h-24 w-36 rounded-xl border border-indigo-500/60 overflow-hidden shadow-2xl bg-black">
                    <img
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80"
                      alt="B-Roll Stock"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 rounded bg-black/80 px-1 text-[9px] font-mono text-purple-300">
                      🎬 B-Roll: Growth
                    </div>
                  </div>

                  {/* Hormozi Kinetic Subtitles */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <span className="rounded-lg bg-yellow-400 text-black px-3 py-1 font-black text-xl sm:text-2xl uppercase tracking-wide shadow-2xl">
                      SCALE 10X REVENUE 🔥
                    </span>
                  </div>

                  {/* Progress Bar Effect */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-3/4 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 shadow-md" />

                  {/* Zoom badge */}
                  <div className="absolute top-4 left-4 rounded-md bg-indigo-950/80 border border-indigo-500/40 px-2 py-1 text-[10px] font-mono font-bold text-indigo-300 backdrop-blur-sm">
                    🔍 DYNAMIC PUNCH-IN (1.3X)
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                  <span className="rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 text-xs font-mono text-slate-300 mb-2">
                    Raw Video (With 3.2s awkward pauses & zero captions)
                  </span>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Viewers average drop-off at 00:03. Click "AI Edited" above to see the transformation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE 6 AI WORKFLOW ADVANTAGES */}
      <section className="py-20 bg-[#08090d] border-y border-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The 6-in-1 AI Engine
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Everything Pro Editors Do Manually, Automated.
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              No complex timelines, no manual cutting, no keyframe math.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Scissors,
                title: 'Smart Silence & Filler Cuts',
                desc: 'Instantly identifies pauses, dead air, false starts, and repeated takes. Cuts with frame precision.',
                badge: '✂️ 8-Step Heuristic'
              },
              {
                icon: Wand2,
                title: 'Kinetic Hormozi Captions',
                desc: 'Word-by-word highlighted subtitles with auto-emojis and viral influencer typography presets.',
                badge: '💬 98% Accuracy'
              },
              {
                icon: Maximize2,
                title: 'AI Facecam Punch Zooms',
                desc: 'Detects speaker face position and applies dynamic punch-in zooms on high-energy speech sentences.',
                badge: '🔍 Auto-Track'
              },
              {
                icon: Film,
                title: 'Contextual Stock B-Roll',
                desc: 'Matches words to a library of 100K+ 4K royalty-free videos, inserting cutaways and PIP automatically.',
                badge: '🎬 4K Library'
              },
              {
                icon: Volume2,
                title: 'AI Voice Clarity & EQ',
                desc: 'Removes background noise (-18dB), normalizes loudness, and ducks background music during speech.',
                badge: '🎙️ Studio Polish'
              },
              {
                icon: Flame,
                title: '1-Click Viral Shorts Repurposer',
                desc: 'Extracts the highest-scoring 15–60s hook segments, reformats to 9:16 vertical, and generates viral titles.',
                badge: '⚡ Multi-Clip'
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800 bg-[#0d0f18]/80 p-6 space-y-4 hover:border-indigo-500/40 hover:bg-[#10131f] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] font-mono text-slate-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-20 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Simple Transparent Pricing
          </span>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Invest in 10x More Views & Saved Hours
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Switch plans anytime. Cancel with 1 click.
          </p>

          {/* Billing Switcher */}
          <div className="mt-6 inline-flex items-center rounded-full bg-slate-900 border border-slate-800 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                !isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-1.5 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map(plan => {
            const price = isAnnual ? Math.round(plan.priceMonthly * 0.8) : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-indigo-950/80 to-[#0c0e18] border-indigo-500 shadow-2xl ring-1 ring-indigo-500/50'
                    : 'bg-[#0b0d14] border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="my-5 flex items-baseline gap-1">
                    <span className="font-['Outfit'] text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/month</span>
                  </div>

                  <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs text-slate-300">
                    <div className="font-semibold text-indigo-300">
                      ⚡ {plan.aiMinutes} AI Minutes / mo
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {plan.id === 'business' ? (
                  <a
                    id={`plan-btn-${plan.id}`}
                    href={getWhatsAppUrl(`Hi DayaCuts team! I am interested in subscribing to the ${plan.name} ($${price}/mo) plan.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-1.5 w-full rounded-xl py-2.5 text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{plan.buttonLabel}</span>
                  </a>
                ) : (
                  <button
                    id={`plan-btn-${plan.id}`}
                    onClick={() => openAuthModal('signup')}
                    className={`mt-6 w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110'
                        : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {plan.buttonLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-4 w-full border-t border-slate-900">
        <div className="text-center mb-10">
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOTER CTA */}
      <footer className="border-t border-slate-800 bg-[#040508] py-12 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <span className="font-['Outfit'] text-base font-bold text-white">DayaCuts AI Video Studio</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-1">
            <a
              id="footer-whatsapp-link"
              href={getWhatsAppUrl('Hello DayaCuts! I need help and support with the app.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Contact Support on WhatsApp</span>
            </a>
          </div>
          <p>© 2026 DayaCuts Studio Inc. Built for professional video creators, agencies & founders.</p>
        </div>
      </footer>
    </div>
  );
};
