import React, { useState } from 'react';
import {
  ALL_HANGEUL_CHARS,
  CONSONANTS_BASIC,
  CONSONANTS_TENSE,
  VOWELS_BASIC,
  VOWELS_COMPLEX
} from '../data/hangeulData';
import type { HangeulChar } from '../data/hangeulData';
import { AudioButton } from './AudioButton';
import { StrokeCanvas } from './StrokeCanvas';
import { PenTool, Check, Sparkles, Filter } from 'lucide-react';
import { storageService } from '../services/storageService';

export const HangeulGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cons-basic' | 'cons-tense' | 'vowel-basic' | 'vowel-complex'>('all');
  const [activeChar, setActiveChar] = useState<HangeulChar | null>(null);
  const [stats, setStats] = useState(storageService.getStats());

  const getFilteredList = (): HangeulChar[] => {
    switch (filter) {
      case 'cons-basic':
        return CONSONANTS_BASIC;
      case 'cons-tense':
        return CONSONANTS_TENSE;
      case 'vowel-basic':
        return VOWELS_BASIC;
      case 'vowel-complex':
        return VOWELS_COMPLEX;
      default:
        return ALL_HANGEUL_CHARS;
    }
  };

  const toggleMastery = (char: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = storageService.toggleMasteredChar(char);
    setStats({ ...updated });
  };

  const chars = getFilteredList();

  return (
    <div className="space-y-6">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-indigo-100 mb-3">
            <Sparkles size={14} className="text-amber-300" />
            Module 1 • Les Fondations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            L'Alphabet Hangeul (한글) & Atelier d'Écriture
          </h2>
          <p className="mt-2 text-sm sm:text-base text-indigo-150 leading-relaxed">
            Créé en 1443 par le roi Sejong le Grand, le Hangeul est reconnu par l'UNESCO comme l'alphabet le plus logique au monde.
            Cliquez sur n'importe quelle lettre pour écouter son son, découvrir son moyen mnémotechnique et vous entraîner à la calligraphier.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-indigo-200">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg">
              🎯 <strong>{stats.masteredChars.length}</strong> / {ALL_HANGEUL_CHARS.length} lettres maîtrisées
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg">
              ✨ Cliquez sur <PenTool size={12} className="inline ml-1" /> pour tracer
            </span>
          </div>
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 px-2">
          <Filter size={14} />
          Filtrer par type :
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Toutes ({ALL_HANGEUL_CHARS.length})
          </button>
          <button
            onClick={() => setFilter('cons-basic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'cons-basic'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Consonnes Simples (14)
          </button>
          <button
            onClick={() => setFilter('cons-tense')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'cons-tense'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Consonnes Doubles (5)
          </button>
          <button
            onClick={() => setFilter('vowel-basic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'vowel-basic'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Voyelles Simples (10)
          </button>
          <button
            onClick={() => setFilter('vowel-complex')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'vowel-complex'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Diphtongues (5)
          </button>
        </div>
      </div>

      {/* Grille des lettres */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {chars.map((item) => {
          const isMastered = stats.masteredChars.includes(item.char);
          return (
            <div
              key={item.char}
              onClick={() => setActiveChar(item)}
              className={`group relative bg-white rounded-2xl p-4 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between ${
                isMastered
                  ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/15'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Badge supérieur */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.strokeCount} {item.strokeCount > 1 ? 'traits' : 'trait'}
                </span>
                <button
                  onClick={(e) => toggleMastery(item.char, e)}
                  title={isMastered ? 'Marqué comme maîtrisé' : 'Marquer comme appris'}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isMastered
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-300 hover:bg-slate-200 hover:text-slate-500'
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </button>
              </div>

              {/* Lettre centrale */}
              <div className="my-3 text-center">
                <div className="text-5xl font-black text-slate-800 hangul-font group-hover:scale-105 transition-transform">
                  {item.char}
                </div>
                <div className="text-sm font-bold text-indigo-600 mt-1">{item.romanization}</div>
                <div className="text-xs text-slate-500 font-medium truncate">{item.name}</div>
              </div>

              {/* Exemple & actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-1">
                <div className="text-[11px] text-slate-500 truncate">
                  Ex: <span className="font-semibold text-slate-700">{item.exampleWord}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AudioButton text={item.char} size="sm" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveChar(item);
                    }}
                    title="Tracer cette lettre"
                    className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                  >
                    <PenTool size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Zone de dessin du caractère actif */}
      {activeChar && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl animate-in fade-in zoom-in duration-200">
            <StrokeCanvas charData={activeChar} onClose={() => setActiveChar(null)} />
          </div>
        </div>
      )}
    </div>
  );
};
