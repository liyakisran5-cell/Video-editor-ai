/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider, useVideo } from './context/VideoContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { EditorView } from './views/EditorView';
import { ShortsView } from './views/ShortsView';
import { BrandKitView } from './views/BrandKitView';
import { TemplatesView } from './views/TemplatesView';
import { BillingView } from './views/BillingView';
import { AdminView } from './views/AdminView';

// Modals
import { UploadModal } from './components/modals/UploadModal';
import { AnalysisModal } from './components/modals/AnalysisModal';
import { ExportModal } from './components/modals/ExportModal';
import { SeoModal } from './components/modals/SeoModal';
import { VersionsModal } from './components/modals/VersionsModal';
import { AuthModal } from './components/modals/AuthModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const AppContent: React.FC = () => {
  const { currentView } = useVideo();

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardView />;
      case 'editor':
        return <EditorView />;
      case 'shorts':
        return <ShortsView />;
      case 'brand-kit':
        return <BrandKitView />;
      case 'templates':
        return <TemplatesView />;
      case 'billing':
        return <BillingView />;
      case 'admin':
        return <AdminView />;
      default:
        return <EditorView />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050608] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky App Header */}
      <Navbar />

      {/* Main Viewport */}
      <main className="flex flex-1 flex-col">{renderActiveView()}</main>

      {/* Global Interactive Modals */}
      <UploadModal />
      <AnalysisModal />
      <ExportModal />
      <SeoModal />
      <VersionsModal />
      <AuthModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <AppContent />
      </VideoProvider>
    </AuthProvider>
  );
}
