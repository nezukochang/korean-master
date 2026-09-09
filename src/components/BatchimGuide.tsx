import React, { useState } from 'react';
import { BATCHIM_7_SOUNDS, PHONETIC_MUTATION_RULES } from '../data/phoneticsData';
import type { BatchimRule } from '../data/phoneticsData';
import { AudioButton } from './AudioButton';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BatchimGuide: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<BatchimRule>(PHONETIC_MUTATION_RULES[0]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-amber-100 mb-3">
            <Sparkles size={14} className="text-amber-300" />
            Module 2 • Le Secret de la Prononciation Réelle
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Les Règles du Batchim & Mutations Sonores
          </h2>
          <p className="mt-2 text-sm sm:text-base text-orange-100 leading-relaxed">
            Le piège numéro 1 des débutants en coréen est de lire les mots exactement comme ils sont écrits.
            Dans la vraie vie en Corée, les sons s'adoucissent, se lient et se transforment pour être prononcés avec fluidité !
          </p>
        </div>
      </div>

      {/* Section 1 : Les 7 Sons Représentatifs du Batchim */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
            1
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            La Règle d'Or : 27 Batchims réduits à seulement 7 sons !
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Même si une syllabe se termine par ㅅ, ㅆ, ㅈ, ㅊ, ㄷ, ㅌ ou ㅎ, ils se prononcent TOUS comme un son <strong>[ㄷ / t]</strong> en fin de mot.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BATCHIM_7_SOUNDS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black text-amber-600 bg-amber-100/70 px-2.5 py-0.5 rounded-lg">
                    {item.sound}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.letters.length} graphies
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 my-2">
                  {item.letters.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-bold text-sm hangul-font"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-medium text-slate-500">
                Exemples : <span className="text-slate-800 font-semibold">{item.example}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 : Les 5 Grandes Lois Phonétiques */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">
            2
          </span>
          <h3 className="text-xl font-bold text-slate-800">
            Les 5 Mutations Sonores Indispensables
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Sélectionnez une règle pour comprendre pourquoi les Coréens prononcent ainsi :
        </p>

        {/* Onglets des règles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PHONETIC_MUTATION_RULES.map((rule) => (
            <button
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedRule.id === rule.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {rule.title}
            </button>
          ))}
        </div>

        {/* Fiche de la règle sélectionnée */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900">{selectedRule.title}</h4>
              <span className="text-xs text-rose-600 font-semibold">({selectedRule.koreanName})</span>
            </div>
            <div className="text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
              Formule : {selectedRule.keyRule}
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            {selectedRule.description}
          </p>

          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Comparatif Visuel & Audio : Écrit vs Réellement Prononcé
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedRule.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-slate-400">Orthographe</span>
                    <span className="text-xs font-bold uppercase text-rose-600">Prononciation</span>
                  </div>

                  <div className="flex items-center justify-between my-2">
                    <span className="text-2xl font-black text-slate-700 hangul-font">
                      {ex.written}
                    </span>
                    <ArrowRight size={18} className="text-rose-400" />
                    <span className="text-xl font-black text-rose-600 hangul-font">
                      {ex.pronounced.split(' ')[0]}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">{ex.pronounced}</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">« {ex.translation} »</div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-600 leading-tight pr-2">{ex.explanation}</p>
                  <AudioButton text={ex.written} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
