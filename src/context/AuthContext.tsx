import React, { createContext, useContext, useState } from 'react';
import { UserAccount } from '../types';
import { DEFAULT_USER } from '../data/mockData';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateUserPlan: (plan: 'free' | 'pro' | 'creator' | 'business') => void;
  incrementUsage: (aiMinutes?: number, exports?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(DEFAULT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string) => {
    setUser({
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email ? email.split('@')[0] : DEFAULT_USER.name
    });
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = async () => {
    setUser({
      ...DEFAULT_USER,
      name: 'Google Creator User',
      email: 'creator.studio@gmail.com'
    });
    setIsAuthModalOpen(false);
  };

  const signup = async (name: string, email: string) => {
    setUser({
      ...DEFAULT_USER,
      name: name || 'New Creator',
      email: email || 'creator@dayacuts.studio',
      plan: 'pro',
      aiMinutesUsed: 2,
      aiMinutesTotal: 60,
      exportsUsed: 0
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserPlan = (plan: 'free' | 'pro' | 'creator' | 'business') => {
    if (!user) return;
    const totals = {
      free: { minutes: 15, storage: 5, exports: 3 },
      pro: { minutes: 60, storage: 30, exports: 25 },
      creator: { minutes: 180, storage: 100, exports: 100 },
      business: { minutes: 600, storage: 500, exports: 999 }
    };
    setUser({
      ...user,
      plan,
      aiMinutesTotal: totals[plan].minutes,
      storageTotalGb: totals[plan].storage,
      exportsTotal: totals[plan].exports
    });
  };

  const incrementUsage = (aiMinutes = 1, exports = 0) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        aiMinutesUsed: Math.min(prev.aiMinutesTotal, prev.aiMinutesUsed + aiMinutes),
        exportsUsed: Math.min(prev.exportsTotal, prev.exportsUsed + exports)
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateUserPlan,
        incrementUsage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
