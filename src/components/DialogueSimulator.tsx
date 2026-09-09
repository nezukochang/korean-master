import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SOCIETAL_SCENARIOS } from '../data/dialoguesData';
import type { Scenario } from '../data/dialoguesData';
import { AudioButton } from './AudioButton';
import {
  MessageSquareQuote,
  Sparkles,
  Coffee,
  Utensils,
  Train,
  Mic,
  Eye,
  EyeOff,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';

export const DialogueSimulator: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SOCIETAL_SCENARIOS[0]);
  const [showRomanization, setShowRomanization] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState<string | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee size={20} className="text-amber-600" />;
      case 'Utensils':
        return <Utensils size={20} className="text-rose-600" />;
      case 'Train':
        return <Train size={20} className="text-blue-600" />;
      default:
        return <MessageSquareQuote size={20} className="text-indigo-600" />;
    }
  };

  const handleVoiceTest = async () => {
    setIsListening(true);
    setSpeechResult(null);

    const res = await speechService.listen();
    setIsListening(false);

    if (res.success && res.transcript) {
      setSpeechResult(res.transcript);
      setChallengeCompleted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      storageService.addXP(20);
    } else {
      setSpeechResult(res.error || 'Aucun son détecté. Essayez de parler plus près.');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-violet-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-blue-100 mb-3">
            <MessageSquareQuote size={14} className="text-amber-300" />
            Module 4 • Immersion Sociale & Pratique Réelle
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulateur de Conversations en Société
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Parler une langue, c'est savoir réagir en situation réelle. Écoutez des répliques authentiques avec l'intonation naturelle
            de Séoul et découvrez les codes culturels essentiels pour une intégration fluide.
          </p>
        </div>
      </div>

      {/* Sélecteur de scénario */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SOCIETAL_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setActiveScenario(sc);
              setSpeechResult(null);
              setChallengeCompleted(false);
            }}
            className={`p-4 rounded-2xl text-left transition-all border flex items-center gap-3 cursor-pointer ${
              activeScenario.id === sc.id
                ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-100'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">
              {getScenarioIcon(sc.icon)}
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                {sc.badge}
              </span>
              <div className="font-bold text-slate-900 text-sm">{sc.title}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Scénario actif */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Barre supérieure du lieu + contrôles */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lieu de la scène :
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              {getScenarioIcon(activeScenario.icon)}
              {activeScenario.location}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowRomanization(!showRomanization)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showRomanization
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-slate-200/80 border-transparent text-slate-500'
              }`}
            >
              {showRomanization ? <Eye size={13} /> : <EyeOff size={13} />}
              Romanisation
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showTranslation
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-slate-200/80 border-transparent text-slate-500'
              }`}
            >
              {showTranslation ? <Eye size={13} /> : <EyeOff size={13} />}
              Traduction
            </button>
          </div>
        </div>

        {/* Encadré Conseil d'Étiquette Culturelle */}
        <div className="p-4 sm:p-6 bg-amber-50/70 border-b border-amber-200/70 flex items-start gap-3">
          <Sparkles className="text-amber-600 shrink-0 mt-0.5" size={18} />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-amber-900 uppercase tracking-wide">
              Code Social & Culturel : {activeScenario.culturalTip.title}
            </span>
            <p className="text-amber-950 mt-1 leading-relaxed">
              {activeScenario.culturalTip.description}
            </p>
          </div>
        </div>

        {/* Bulles de dialogue façon messagerie */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {activeScenario.turns.map((turn, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${turn.isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[11px] font-bold text-slate-400 mb-1 px-2">
                {turn.speaker}
              </div>
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs border ${
                  turn.isUser
                    ? 'bg-indigo-600 text-white border-indigo-700 rounded-tr-xs'
                    : 'bg-slate-100 text-slate-900 border-slate-200/80 rounded-tl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base sm:text-lg font-bold hangul-font">
                    {turn.korean}
                  </span>
                  <AudioButton
                    text={turn.korean}
                    size="sm"
                    className={
                      turn.isUser
                        ? 'bg-white/20 text-white hover:bg-white/30 border-transparent'
                        : undefined
                    }
                  />
                </div>

                {showRomanization && (
                  <div
                    className={`text-xs mt-1 ${
                      turn.isUser ? 'text-indigo-200' : 'text-slate-500'
                    }`}
                  >
                    {turn.romanization}
                  </div>
                )}

                {showTranslation && (
                  <div
                    className={`text-xs sm:text-sm font-semibold mt-1.5 pt-1.5 border-t ${
                      turn.isUser
                        ? 'border-indigo-500 text-white'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {turn.french}
                  </div>
                )}

                {turn.notes && (
                  <div
                    className={`text-[11px] mt-2 italic ${
                      turn.isUser ? 'text-indigo-150' : 'text-slate-500'
                    }`}
                  >
                    💡 {turn.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Défi Pratique & Test Vocal */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={16} className="text-indigo-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              Défi de Prononciation Orale
            </h4>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {activeScenario.practiceChallenge.prompt}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                💡 Indice : {activeScenario.practiceChallenge.hint}
              </p>
              <div className="mt-2 text-xs font-bold text-indigo-700 flex items-center gap-2">
                Réponse attendue : <span className="text-sm">{activeScenario.practiceChallenge.expectedKorean}</span>
                <AudioButton text={activeScenario.practiceChallenge.expectedKorean} size="sm" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
              <button
                onClick={handleVoiceTest}
                disabled={isListening}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                }`}
              >
                <Mic size={15} />
                {isListening ? 'Parlez en coréen...' : 'Tester ma voix'}
              </button>
            </div>
          </div>

          {speechResult && (
            <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-600 shrink-0" />
              <div>
                <strong>Votre parole détectée :</strong> « {speechResult} »
                {challengeCompleted && (
                  <span className="text-emerald-700 font-bold ml-2">
                    Bravo ! Défi réussi (+20 XP).
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
