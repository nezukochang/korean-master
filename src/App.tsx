import { useState } from 'react';
import { Navbar } from './components/Navbar';
import type { ActiveTab } from './components/Navbar';
import { HangeulGrid } from './components/HangeulGrid';
import { SyllableLab } from './components/SyllableLab';
import { BatchimGuide } from './components/BatchimGuide';
import { GrammarCard } from './components/GrammarCard';
import { DialogueSimulator } from './components/DialogueSimulator';
import { FlashcardSRS } from './components/FlashcardSRS';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('hangeul');

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'hangeul':
        return <HangeulGrid />;
      case 'syllables':
        return <SyllableLab />;
      case 'phonetics':
        return <BatchimGuide />;
      case 'grammar':
        return <GrammarCard />;
      case 'dialogues':
        return <DialogueSimulator />;
      case 'srs':
        return <FlashcardSRS />;
      default:
        return <HangeulGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-800">
      {/* Navbar avec indicateurs de progression */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenu principal de l'application */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderActiveModule()}
      </main>

      {/* Pied de page informatif et guide */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-700">Korean Master (한글 마스터)</span>
            <span>— 100% Gratuit, Sans Publicité, Prêt pour Render</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Synthèse Vocale ko-KR Intégrée</span>
            <span>•</span>
            <span>PWA Hors-Ligne</span>
            <span>•</span>
            <span>Méthode Naturelle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
