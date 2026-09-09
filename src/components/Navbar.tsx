import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Layers,
  Sparkles,
  BookMarked,
  MessageSquareQuote,
  Brain,
  Flame,
  Zap,
  Download,
  Menu,
  X
} from 'lucide-react';
import { storageService } from '../services/storageService';
import type { UserStats } from '../services/storageService';

export type ActiveTab = 'hangeul' | 'syllables' | 'phonetics' | 'grammar' | 'dialogues' | 'srs';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [stats, setStats] = useState<UserStats>(() => storageService.getStats());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setStats(storageService.getStats());
    };
    window.addEventListener('storage', handleStorageChange);

    // Écoute de l'événement PWA d'installation
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const navItems = [
    { id: 'hangeul', label: '1. Hangeul & Tracé', icon: BookOpen },
    { id: 'syllables', label: '2. Syllabes', icon: Layers },
    { id: 'phonetics', label: '3. Phonétique & Batchim', icon: Sparkles },
    { id: 'grammar', label: '4. Grammaire & Particules', icon: BookMarked },
    { id: 'dialogues', label: '5. Dialogues Sociaux', icon: MessageSquareQuote },
    { id: 'srs', label: '6. Flashcards SRS', icon: Brain }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Titre */}
          <div
            onClick={() => onTabChange('hangeul')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform hangul-font">
              한
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-lg leading-tight flex items-center gap-1.5">
                Korean Master
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700">
                  한글
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Du débutant au fluide</div>
            </div>
          </div>

          {/* Onglets pour écran Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as ActiveTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Widgets utilisateur (Streak, XP, PWA Install) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div
              title={`${stats.streak} jours consécutifs d'apprentissage !`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-black shadow-2xs"
            >
              <Flame size={15} className="text-amber-600 fill-amber-500" />
              <span>{stats.streak}j</span>
            </div>

            {/* XP */}
            <div
              title={`${stats.xp} points d'expérience gagnés`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200/80 text-xs font-black shadow-2xs"
            >
              <Zap size={14} className="text-purple-600 fill-purple-500" />
              <span>{stats.xp} XP</span>
            </div>

            {/* Bouton PWA si disponible */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all cursor-pointer"
              >
                <Download size={14} />
                Installer App
              </button>
            )}

            {/* Menu burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Menu déroulant mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 grid grid-cols-2 gap-1.5 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id as ActiveTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
