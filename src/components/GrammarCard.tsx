import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GRAMMAR_LESSONS } from '../data/grammarData';
import type { GrammarLesson } from '../data/grammarData';
import { AudioButton } from './AudioButton';
import { BookMarked, CheckCircle2, HelpCircle, Sparkles, Check, X } from 'lucide-react';
import { storageService } from '../services/storageService';

export const GrammarCard: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleSelectAnswer = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
  };

  const handleCheckQuiz = () => {
    if (selectedAnswer === null) return;
    setIsAnswerChecked(true);

    if (selectedAnswer === activeLesson.quiz.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
      storageService.addXP(15);
      storageService.markLessonComplete(activeLesson.id);
    }
  };

  const switchLesson = (lesson: GrammarLesson) => {
    setActiveLesson(lesson);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-emerald-100 mb-3">
            <BookMarked size={14} className="text-amber-300" />
            Module 3 • Syntaxe & Particules
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Grammaire Fondamentale & Niveaux de Politesse
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-150 leading-relaxed">
            Comprendre la grammaire coréenne ne demande pas d'apprendre des listes fastidieuses : c'est un jeu de briques Lego (Sujet - Objet - Verbe)
            reliées par des particules et modulées par le respect d'autrui.
          </p>
        </div>
      </div>

      {/* Navigation des leçons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {GRAMMAR_LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => switchLesson(lesson)}
            className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
              activeLesson.id === lesson.id
                ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-100'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-emerald-700">{lesson.title.split('.')[0]}</div>
            <div className="font-bold text-slate-800 text-sm mt-0.5 line-clamp-1">
              {lesson.title.split('. ')[1]}
            </div>
            <div className="text-xs text-slate-500 mt-1 line-clamp-1">{lesson.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Contenu de la leçon sélectionnée */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
            {activeLesson.subtitle}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{activeLesson.title}</h3>
          <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {activeLesson.explanation}
          </p>
        </div>

        {/* Formule clé */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="text-emerald-600 shrink-0" size={20} />
          <div>
            <div className="text-xs font-bold text-emerald-900 uppercase">Structure de base :</div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-950 font-mono mt-0.5">
              {activeLesson.formula}
            </div>
          </div>
        </div>

        {/* Exemples décortiqués */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Exemples Analysés Mot à Mot
          </h4>
          <div className="space-y-3">
            {activeLesson.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-900 hangul-font">
                      {ex.korean}
                    </span>
                    <AudioButton text={ex.korean} size="sm" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{ex.romanization}</div>
                  <div className="text-sm font-bold text-emerald-800 mt-1">« {ex.translation} »</div>
                  <div className="text-xs text-slate-600 mt-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/60 inline-block">
                    🔍 <strong>Décomposition :</strong> {ex.breakdown}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz de validation immédiate */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-emerald-600" />
            <h4 className="text-base font-bold text-slate-900">Quiz Rapide : Vérifiez votre compréhension</h4>
          </div>

          <p className="text-sm text-slate-800 font-semibold mb-4">{activeLesson.quiz.question}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeLesson.quiz.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === activeLesson.quiz.correctIndex;

              let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

              if (isAnswerChecked) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-100 border-rose-400 text-rose-900';
                } else {
                  style = 'opacity-50 border-slate-200 text-slate-400';
                }
              } else if (isSelected) {
                style = 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswerChecked}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span>{opt}</span>
                  {isAnswerChecked && isCorrect && <Check size={16} className="text-emerald-600 shrink-0" />}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <X size={16} className="text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!isAnswerChecked ? (
              <button
                onClick={handleCheckQuiz}
                disabled={selectedAnswer === null}
                className={`py-2.5 px-6 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedAnswer !== null
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Vérifier ma réponse
              </button>
            ) : (
              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 w-full flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Explication :</strong> {activeLesson.quiz.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
