// Moteur de Répétition Espacée (Spaced Repetition System - Algorithme SM-2 simplifié)

export interface Flashcard {
  id: string;
  korean: string;
  translation: string;
  romanization: string;
  category: 'alphabet' | 'vocab' | 'expression' | 'grammar';
  notes?: string;
  interval: number; // en jours
  repetitions: number;
  easeFactor: number;
  dueDate: string; // ISO date string YYYY-MM-DD
}

const SRS_STORAGE_KEY = 'korean_master_srs_cards';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'card-1',
    korean: '안녕하세요',
    translation: 'Bonjour / Comment allez-vous ? (Poli)',
    romanization: 'An-nyeong-ha-se-yo',
    category: 'expression',
    notes: 'La salutation la plus commune en Corée, toujours accompagnée d\'une légère inclinaison de la tête.',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-2',
    korean: '감사합니다',
    translation: 'Merci beaucoup (Formel poli)',
    romanization: 'Gam-sa-ham-ni-da',
    category: 'expression',
    notes: 'Attention à la nasalisation : 합 se prononce "ham" devant 니다.',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-3',
    korean: '죄송합니다',
    translation: 'Pardon / Excusez-moi (Formel)',
    romanization: 'Joe-song-ham-ni-da',
    category: 'expression',
    notes: 'Pour s\'excuser sincèrement d\'une erreur ou d\'une bousculade.',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-4',
    korean: '물 좀 주세요',
    translation: 'De l\'eau s\'il vous plaît',
    romanization: 'Mul jom ju-se-yo',
    category: 'vocab',
    notes: 'Indispensable au restaurant ! "좀" (un peu) adoucit la demande.',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-5',
    korean: '얼마예요?',
    translation: 'Combien ça coûte ?',
    romanization: 'Eol-ma-ye-yo?',
    category: 'vocab',
    notes: 'La phrase reine pour le marché de Dongdaemun ou les boutiques.',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-6',
    korean: '한국어',
    translation: 'La langue coréenne',
    romanization: 'Han-gu-geo',
    category: 'vocab',
    notes: 'Liaison obligatoire : le ㄱ de 국 glisse sur le 어 -> [한구거].',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'card-7',
    korean: '네 / 아니요',
    translation: 'Oui / Non',
    romanization: 'Ne / A-ni-yo',
    category: 'expression',
    notes: '"네" s\'emploie aussi très couramment pour ponctuer et signifier "je vous écoute".',
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split('T')[0]
  }
];

export const srsService = {
  getCards(): Flashcard[] {
    try {
      const data = localStorage.getItem(SRS_STORAGE_KEY);
      if (!data) {
        this.saveCards(INITIAL_FLASHCARDS);
        return INITIAL_FLASHCARDS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_FLASHCARDS;
    }
  },

  saveCards(cards: Flashcard[]): void {
    try {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Erreur sauvegarde SRS:', e);
    }
  },

  getDueCards(): Flashcard[] {
    const today = new Date().toISOString().split('T')[0];
    const cards = this.getCards();
    return cards.filter((c) => c.dueDate <= today);
  },

  /**
   * Notation de la révision :
   * 0 : À revoir (Again)
   * 1 : Difficile (Hard)
   * 2 : Bien (Good)
   * 3 : Facile (Easy)
   */
  rateCard(cardId: string, rating: 0 | 1 | 2 | 3): Flashcard[] {
    const cards = this.getCards();
    const card = cards.find((c) => c.id === cardId);
    if (!card) return cards;

    if (rating === 0) {
      card.repetitions = 0;
      card.interval = 1;
    } else {
      if (card.repetitions === 0) {
        card.interval = 1;
      } else if (card.repetitions === 1) {
        card.interval = 3;
      } else {
        const factor = rating === 3 ? 1.3 : rating === 1 ? 0.85 : 1.0;
        card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (3 - rating) * 0.1));
        card.interval = Math.round(card.interval * card.easeFactor * factor);
      }
      card.repetitions += 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + card.interval);
    card.dueDate = nextDate.toISOString().split('T')[0];

    this.saveCards(cards);
    return cards;
  },

  addCard(newCard: Omit<Flashcard, 'id' | 'interval' | 'repetitions' | 'easeFactor' | 'dueDate'>): void {
    const cards = this.getCards();
    const card: Flashcard = {
      ...newCard,
      id: 'card-' + Date.now(),
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString().split('T')[0]
    };
    cards.push(card);
    this.saveCards(cards);
  }
};
