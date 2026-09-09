import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { srsService } from '../services/srsService';
import type { Flashcard } from '../services/srsService';
import { AudioButton } from './AudioButton';
import {
  Brain,
  RotateCw,
  CheckCircle2,
  PlusCircle,
  Layers
} from 'lucide-react';
import { storageService } from '../services/storageService';

export const FlashcardSRS: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(() => srsService.getCards());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Nouvelles cartes
  const [newKorean, setNewKorean] = useState('');
  const [newTrans, setNewTrans] = useState('');
  const [newRom, setNewRom] = useState('');

  const currentCard = cards[currentIndex];

  const handleRate = (rating: 0 | 1 | 2 | 3) => {
    if (!currentCard) return;

    const updated = srsService.rateCard(currentCard.id, rating);
    setCards([...updated]);
    setIsFlipped(false);
    storageService.addXP(10);

    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKorean || !newTrans) return;

    srsService.addCard({
      korean: newKorean,
      translation: newTrans,
      romanization: newRom || newKorean,
      category: 'vocab'
    });

    setCards(srsService.getCards());
    setNewKorean('');
    setNewTrans('');
    setNewRom('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Entête pédagogique */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-teal-100 mb-3">
            <Brain size={14} className="text-amber-300" />
            Module 5 • Mémoire Long Terme
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Moteur de Répétition Espacée (SRS)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-teal-100 leading-relaxed">
            Basé sur la courbe de l'oubli d'Ebbinghaus et l'algorithme SM-2, ce système vous réinterroge au moment précis
            où votre cerveau s'apprête à oublier une phrase ou un mot.
          </p>
        </div>
      </div>

      {/* Barre d'état de la session */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <Layers size={16} className="text-teal-600" />
          <span>
            Carte <strong>{currentIndex + 1}</strong> sur {cards.length}
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors cursor-pointer"
        >
          <PlusCircle size={14} />
          Ajouter une carte perso
        </button>
      </div>

      {/* Carte Flashcard */}
      {!sessionCompleted && currentCard ? (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl border-2 border-slate-200 hover:border-teal-400 p-8 shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer text-center select-none"
          >
            {/* Haut de la carte */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-bold tracking-wider px-2 py-1 bg-slate-100 rounded-md">
                {currentCard.category}
              </span>
              <span className="flex items-center gap-1">
                <RotateCw size={13} />
                Cliquez pour retourner
              </span>
            </div>

            {/* Centre de la carte */}
            <div className="my-6">
              {!isFlipped ? (
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 hangul-font">
                    {currentCard.korean}
                  </div>
                  <div className="mt-4">
                    <AudioButton text={currentCard.korean} size="md" />
                  </div>
                  <div className="mt-6 text-xs font-medium text-slate-400">
                    Comment le prononcez-vous et que signifie-t-il ?
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-2xl sm:text-3xl font-bold text-teal-700">
                    {currentCard.translation}
                  </div>
                  <div className="text-sm font-semibold text-slate-500 mt-2">
                    {currentCard.romanization}
                  </div>
                  {currentCard.notes && (
                    <div className="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 inline-block max-w-md">
                      💡 {currentCard.notes}
                    </div>
                  )}
                  <div className="mt-4">
                    <AudioButton text={currentCard.korean} size="sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Bas de la carte */}
            <div className="text-[11px] text-slate-400">
              Répétitions réussies : <strong>{currentCard.repetitions}</strong> | Prochaine échéance : {currentCard.dueDate}
            </div>
          </div>

          {/* Boutons d'évaluation SM-2 (visibles une fois la carte retournée) */}
          {isFlipped ? (
            <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-2">
              <button
                onClick={() => handleRate(0)}
                className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs sm:text-sm border border-rose-200 transition-all cursor-pointer flex flex-col items-center"
              >
                <span>À Revoir</span>
                <span className="text-[10px] font-normal text-rose-500 mt-0.5">Demain (1j)</span>
              </button>
              <button
                onClick={() => handleRate(1)}
                className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm border border-amber-200 transition-all cursor-pointer flex flex-col items-center"
              >
                <span>Difficile</span>
                <span className="text-[10px] font-normal text-amber-600 mt-0.5">2-3 jours</span>
              </button>
              <button
                onClick={() => handleRate(2)}
                className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm border border-blue-200 transition-all cursor-pointer flex flex-col items-center"
              >
                <span>Bien</span>
                <span className="text-[10px] font-normal text-blue-500 mt-0.5">4-5 jours</span>
              </button>
              <button
                onClick={() => handleRate(3)}
                className="p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs sm:text-sm border border-teal-200 transition-all cursor-pointer flex flex-col items-center"
              >
                <span>Facile</span>
                <span className="text-[10px] font-normal text-teal-600 mt-0.5">7+ jours</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 text-xs text-slate-400">
              Retournez d'abord la carte pour auto-évaluer votre mémoire.
            </div>
          )}
        </div>
      ) : (
        /* Écran de session terminée */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Félicitations ! Session de Révision Terminée !
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Vous avez stimulé vos connexions synaptiques pour ancrer ces expressions dans votre mémoire à long terme.
          </p>
          <button
            onClick={restartSession}
            className="py-3 px-6 rounded-xl font-bold text-sm bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-200 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCw size={16} />
            Recommencer une série
          </button>
        </div>
      )}

      {/* Modal d'ajout de carte personnalisée */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Ajouter une Carte au Paquet</h3>
            <p className="text-xs text-slate-500 mb-5">
              Enregistrez un nouveau mot ou une expression que vous voulez mémoriser.
            </p>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Texte en Coréen (Hangeul) *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: 커피"
                  value={newKorean}
                  onChange={(e) => setNewKorean(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Traduction en Français *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Café"
                  value={newTrans}
                  onChange={(e) => setNewTrans(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Romanisation (Optionnel)</label>
                <input
                  type="text"
                  placeholder="ex: keo-pi"
                  value={newRom}
                  onChange={(e) => setNewRom(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-200 cursor-pointer"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
