import React, { useState } from 'react';
import {
  CreditCard,
  Sparkles,
  Zap,
  Check,
  HardDrive,
  Download,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/mockData';
import { getWhatsAppUrl } from '../config/contact';

export const BillingView: React.FC = () => {
  const { user, updateUserPlan } = useAuth();
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handlePlanSelect = (planId: 'free' | 'pro' | 'creator' | 'business') => {
    updateUserPlan(planId);
    setSuccessBanner(`Successfully switched to the ${planId.toUpperCase()} plan!`);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* Top Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CreditCard className="h-5 w-5" />
          </div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
            Subscription & AI Usage
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your rendering credits, storage limits, and workspace membership.
        </p>
      </div>

      {successBanner && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Current Quota Cards */}
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">AI Processing Minutes</span>
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="font-['Outfit'] text-2xl font-black text-white">
              {user.aiMinutesUsed} <span className="text-sm font-normal text-slate-400">/ {user.aiMinutesTotal} min</span>
            </p>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${(user.aiMinutesUsed / user.aiMinutesTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Video Exports Balance</span>
              <Download className="h-4 w-4 text-pink-400" />
            </div>
            <p className="font-['Outfit'] text-2xl font-black text-white">
              {user.exportsUsed} <span className="text-sm font-normal text-slate-400">/ {user.exportsTotal} exported</span>
            </p>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-pink-500"
                style={{ width: `${(user.exportsUsed / user.exportsTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Cloud Project Storage</span>
              <HardDrive className="h-4 w-4 text-purple-400" />
            </div>
            <p className="font-['Outfit'] text-2xl font-black text-white">
              {user.storageUsedGb} <span className="text-sm font-normal text-slate-400">/ {user.storageTotalGb} GB</span>
            </p>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: `${(user.storageUsedGb / user.storageTotalGb) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Available Plans Switcher */}
      <div className="space-y-4">
        <h2 className="font-['Outfit'] text-xl font-bold text-white">Available Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map(plan => {
            const isCurrentPlan = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                  isCurrentPlan
                    ? 'bg-gradient-to-b from-indigo-950/80 to-[#0c0e18] border-indigo-500 shadow-2xl ring-1 ring-indigo-500/50'
                    : 'bg-[#0b0d14] border-slate-800 hover:border-slate-700'
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black shadow-md">
                    Current Active Plan
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="my-5 flex items-baseline gap-1">
                    <span className="font-['Outfit'] text-4xl font-extrabold text-white">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-400">/month</span>
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-300">
                    <div className="font-semibold text-indigo-300">
                      ⚡ {plan.aiMinutes} AI Minutes / mo
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {plan.id === 'business' && !isCurrentPlan ? (
                  <a
                    id={`billing-plan-btn-${plan.id}`}
                    href={getWhatsAppUrl(`Hello DayaCuts! I want to activate the ${plan.name} ($${plan.priceMonthly}/mo) plan.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-1.5 w-full rounded-xl py-2.5 text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Contact Sales on WhatsApp</span>
                  </a>
                ) : (
                  <button
                    id={`billing-plan-btn-${plan.id}`}
                    disabled={isCurrentPlan}
                    onClick={() => handlePlanSelect(plan.id as any)}
                    className={`mt-6 w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                      isCurrentPlan
                        ? 'bg-slate-800 text-slate-500 cursor-default border border-slate-700/60'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110'
                    }`}
                  >
                    {isCurrentPlan ? 'Active Plan' : `Switch to ${plan.name}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Enterprise & Direct Contact Card */}
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-[#0a120e] to-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-['Outfit'] font-bold text-white text-base">
                Have questions or need custom minutes?
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Chat directly with the DayaCuts team on WhatsApp for instant assistance, customized quotas, or priority onboarding.
              </p>
            </div>
          </div>
          <a
            id="billing-whatsapp-cta"
            href={getWhatsAppUrl('Hi DayaCuts team! I need custom limits / instant support with my subscription.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-4 w-4 fill-white text-emerald-500" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
