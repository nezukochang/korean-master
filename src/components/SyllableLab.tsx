import React, { useState } from 'react';
import { CHOSEONG, JUNGSEONG, JONGSEONG, composeHangul } from '../services/hangulEngine';
import { AudioButton } from './AudioButton';
import { Sparkles, Layers, ArrowRight, BookOpen } from 'lucide-react';

export const SyllableLab: React.FC = () => {
  const [initial, setInitial] = useState('ㅎ');
  const [medial, setMedial] = useState('ㅏ');
  const [final, setFinal] = useState('ㄴ');

  const composedSyllable = composeHangul(initial, medial, final);

  // Mots prédéfinis pour s'entraîner
  const PRESET_WORDS = [
    { title: '한국 (Corée)', s1: ['ㅎ', 'ㅏ', 'ㄴ'], s2: ['ㄱ', 'ㅜ', 'ㄱ'] },
    { title: '김치 (Kimchi)', s1: ['ㄱ', 'ㅣ', 'ㅁ'], s2: ['ㅊ', 'ㅣ', ''] },
    { title: '사랑 (Amour)', s1: ['ㅅ', 'ㅏ', ''], s2: ['ㄹ', 'ㅏ', 'ㅇ'] },
    { title: '감사 (Merci)', s1: ['ㄱ', 'ㅏ', 'ㅁ'], s2: ['ㅅ', 'ㅏ', ''] },
    { title: '커피 (Café)', s1: ['ㅋ', 'ㅓ', ''], s2: ['ㅍ', 'ㅣ', ''] }
  ];

  // Déterminer la position visuelle de la voyelle
  const isHorizontalVowel = ['ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ'].includes(medial);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-purple-100 mb-3">
            <Layers size={14} className="text-amber-300" />
            Module 2 • Architecture Syllabique
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Laboratoire d'Assemblage des Syllabes Hangeul
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-100 leading-relaxed">
            En coréen, on n'aligne jamais les lettres les unes après les autres. On les empile dans un **bloc carré imaginaire** :
            <strong className="text-white ml-1">Consonne Initiale (Haut/Gauche) + Voyelle (Droite/Dessous) + Batchim optionnel (Bas)</strong>.
          </p>
        </div>
      </div>

      {/* Zone de démonstration interactive */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Formule visuelle de décomposition */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
          {/* Bloc Consonne Initiale */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-3xl sm:text-4xl font-black text-indigo-700 hangul-font shadow-inner">
              {initial}
            </div>
            <span className="text-[11px] font-bold text-indigo-600 mt-2 uppercase tracking-wide">
              1. Initiale
            </span>
            <span className="text-[10px] text-slate-400">초성</span>
          </div>

          <span className="text-2xl font-bold text-slate-300">+</span>

          {/* Bloc Voyelle */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-pink-50 border-2 border-pink-200 flex items-center justify-center text-3xl sm:text-4xl font-black text-pink-600 hangul-font shadow-inner">
              {medial}
            </div>
            <span className="text-[11px] font-bold text-pink-600 mt-2 uppercase tracking-wide">
              2. Voyelle
            </span>
            <span className="text-[10px] text-slate-400">중성</span>
          </div>

          <span className="text-2xl font-bold text-slate-300">+</span>

          {/* Bloc Finale / Batchim */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-3xl sm:text-4xl font-black text-amber-700 hangul-font shadow-inner">
              {final || '—'}
            </div>
            <span className="text-[11px] font-bold text-amber-600 mt-2 uppercase tracking-wide">
              3. Finale (Batchim)
            </span>
            <span className="text-[10px] text-slate-400">종성</span>
          </div>

          <ArrowRight className="text-slate-400 hidden sm:block mx-1" size={24} />

          {/* Résultat assemblé */}
          <div className="flex flex-col items-center bg-slate-900 text-white p-5 rounded-3xl shadow-xl ring-4 ring-indigo-50 min-w-[140px]">
            <div className="text-6xl sm:text-7xl font-black hangul-font tracking-wider leading-none my-1">
              {composedSyllable}
            </div>
            <span className="text-xs text-indigo-300 font-semibold mt-2">
              Bloc Syllabique
            </span>
            <div className="mt-3">
              <AudioButton text={composedSyllable} size="md" className="bg-indigo-600 text-white hover:bg-indigo-500 border-none" />
            </div>
          </div>
        </div>

        {/* Note anatomique sur la disposition */}
        <div className="w-full lg:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
            <Sparkles size={16} className="text-indigo-600" />
            Structure du bloc :
          </div>
          <p>
            {isHorizontalVowel ? (
              <span>
                La voyelle <strong>{medial}</strong> est horizontale. La consonne initiale <strong>{initial}</strong> se place donc <strong>AU-DESSUS</strong> de la voyelle.
              </span>
            ) : (
              <span>
                La voyelle <strong>{medial}</strong> est verticale. La consonne initiale <strong>{initial}</strong> se place donc <strong>À GAUCHE</strong> de la voyelle.
              </span>
            )}
          </p>
          {final && (
            <p className="pt-2 border-t border-slate-200">
              Le Batchim <strong>{final}</strong> se loge toujours tout en bas comme fondation.
            </p>
          )}
        </div>
      </div>

      {/* Sélecteurs des composantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Choix de l'initiale */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>1. Initiale (초성)</span>
            <span className="text-xs font-normal text-slate-400">19 consonnes</span>
          </h3>
          <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {CHOSEONG.map((c) => (
              <button
                key={c}
                onClick={() => setInitial(c)}
                className={`py-2 text-lg font-bold rounded-xl transition-all hangul-font cursor-pointer ${
                  initial === c
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Choix de la voyelle */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>2. Voyelle (중성)</span>
            <span className="text-xs font-normal text-slate-400">21 voyelles</span>
          </h3>
          <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {JUNGSEONG.map((v) => (
              <button
                key={v}
                onClick={() => setMedial(v)}
                className={`py-2 text-lg font-bold rounded-xl transition-all hangul-font cursor-pointer ${
                  medial === v
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Choix de la finale (Batchim) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>3. Batchim (종성)</span>
            <span className="text-xs font-normal text-slate-400">Optionnel</span>
          </h3>
          <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
            <button
              onClick={() => setFinal('')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                final === ''
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Aucun
            </button>
            {JONGSEONG.filter(Boolean).map((j) => (
              <button
                key={j}
                onClick={() => setFinal(j)}
                className={`py-2 text-lg font-bold rounded-xl transition-all hangul-font cursor-pointer ${
                  final === j
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mots modèles pour s'entraîner en 1 clic */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BookOpen size={16} className="text-indigo-600" />
          Exemples de Mots Célèbres à Charger Immédiatement :
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {PRESET_WORDS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInitial(item.s1[0]);
                setMedial(item.s1[1]);
                setFinal(item.s1[2]);
              }}
              className="p-3 text-left rounded-2xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/70 hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="font-bold text-slate-800 group-hover:text-indigo-700 text-sm">
                {item.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Bloc 1: {item.s1.join('+')}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
