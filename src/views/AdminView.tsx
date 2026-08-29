import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Server,
  Users,
  HardDrive,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  RefreshCw,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminView: React.FC = () => {
  const { user } = useAuth();
  const [activeJobs, setActiveJobs] = useState([
    { id: 'job_9912', user: 'Alex Vance', video: 'SaaS Pitch v3.mp4', stage: 'Transcribing & Aligning', progress: 84, elapsed: '1.2s' },
    { id: 'job_9913', user: 'Sarah Lin', video: 'Podcast Episode 42.mp4', stage: 'Detecting 14 Dead Air Pauses', progress: 45, elapsed: '3.4s' },
    { id: 'job_9914', user: 'Marcus Cole', video: 'Fitness Reel Hook.mov', stage: 'Compositing Hormozi Captions', progress: 96, elapsed: '0.8s' }
  ]);

  const [platformUsers, setPlatformUsers] = useState([
    { id: 'u_1', name: 'Alex Vance', email: 'alex@creatorflow.io', plan: 'creator', minutesUsed: 42, minutesTotal: 180, status: 'Active' },
    { id: 'u_2', name: 'Sarah Lin', email: 'sarah@podstudio.com', plan: 'pro', minutesUsed: 54, minutesTotal: 60, status: 'Active' },
    { id: 'u_3', name: 'Marcus Cole', email: 'marcus@fitbrand.co', plan: 'business', minutesUsed: 120, minutesTotal: 600, status: 'Active' },
    { id: 'u_4', name: 'Elena Rostova', email: 'elena@dayamedia.org', plan: 'creator', minutesUsed: 89, minutesTotal: 180, status: 'Active' }
  ]);

  return (
    <div className="flex-1 bg-[#06070a] p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
              Platform Admin & Infrastructure
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor real-time AI processing queues, Gemini 3.7 pipeline latency, and user quotas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">All Systems Operational</span>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gemini AI Engine</span>
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="font-['Outfit'] text-2xl font-bold text-white">Gemini 3.7</p>
          <p className="text-[10px] text-emerald-400 font-mono">⚡ 410ms avg inference</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Transcoding Queue</span>
            <Activity className="h-4 w-4 text-amber-400" />
          </div>
          <p className="font-['Outfit'] text-2xl font-bold text-white">3 Active Jobs</p>
          <p className="text-[10px] text-slate-400">Worker load: 14%</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total AI Minutes MTD</span>
            <Clock className="h-4 w-4 text-purple-400" />
          </div>
          <p className="font-['Outfit'] text-2xl font-bold text-white">12,480 min</p>
          <p className="text-[10px] text-indigo-400">+28% vs last month</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Platform Users</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="font-['Outfit'] text-2xl font-bold text-white">45,210</p>
          <p className="text-[10px] text-emerald-400">890 active today</p>
        </div>
      </div>

      {/* Live Active Jobs Queue */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-sm">Live AI Video Processing Queue</h3>
          <span className="text-xs text-slate-400 font-mono">Auto-refreshed</span>
        </div>

        <div className="space-y-3">
          {activeJobs.map(job => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-400">{job.id}</span>
                  <span className="text-slate-300 font-semibold">{job.video}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({job.user})</span>
                </div>
                <span className="font-mono text-slate-400">{job.elapsed}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Stage: {job.stage}</span>
                <span className="font-mono font-bold text-indigo-300">{job.progress}%</span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Accounts Management */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d0f18] p-5 space-y-4">
        <h3 className="font-bold text-white text-sm">User Subscriptions & Quotas</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="pb-3">Creator Name</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">AI Minutes Used</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {platformUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-900/40">
                  <td className="py-3">
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-[10px] text-slate-500">{u.email}</p>
                  </td>
                  <td className="py-3">
                    <span className="rounded-full bg-indigo-950 border border-indigo-800 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase">
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3 font-mono">
                    {u.minutesUsed} / {u.minutesTotal} min
                  </td>
                  <td className="py-3">
                    <span className="text-emerald-400 font-medium">● {u.status}</span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert(`Granted 30 bonus AI minutes to ${u.name}`)}
                      className="rounded bg-slate-800 border border-slate-700 px-2.5 py-1 text-[10px] font-semibold text-indigo-300 hover:bg-slate-700"
                    >
                      +30 Min
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
