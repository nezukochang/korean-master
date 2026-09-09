// Gestionnaire de persistance locale pour la progression de l'apprenant

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  masteredChars: string[];
  xp: number;
  quizzesCompleted: number;
}

const STATS_KEY = 'korean_master_stats';

const DEFAULT_STATS: UserStats = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  masteredChars: [],
  xp: 50,
  quizzesCompleted: 0
};

export const storageService = {
  getStats(): UserStats {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (!data) return DEFAULT_STATS;
      const parsed: UserStats = JSON.parse(data);
      return this.verifyStreak(parsed);
    } catch {
      return DEFAULT_STATS;
    }
  },

  saveStats(stats: UserStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Erreur sauvegarde stats:', e);
    }
  },

  verifyStreak(stats: UserStats): UserStats {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate === today) {
      return stats;
    }

    const last = new Date(stats.lastActiveDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      stats.streak += 1;
    } else if (diffDays > 1) {
      stats.streak = 1; // Série brisée mais on repart
    }

    stats.lastActiveDate = today;
    this.saveStats(stats);
    return stats;
  },

  addXP(amount: number): UserStats {
    const stats = this.getStats();
    stats.xp += amount;
    this.saveStats(stats);
    return stats;
  },

  markLessonComplete(lessonId: string): UserStats {
    const stats = this.getStats();
    if (!stats.completedLessons.includes(lessonId)) {
      stats.completedLessons.push(lessonId);
      stats.xp += 25;
      this.saveStats(stats);
    }
    return stats;
  },

  toggleMasteredChar(char: string): UserStats {
    const stats = this.getStats();
    const idx = stats.masteredChars.indexOf(char);
    if (idx >= 0) {
      stats.masteredChars.splice(idx, 1);
    } else {
      stats.masteredChars.push(char);
      stats.xp += 10;
    }
    this.saveStats(stats);
    return stats;
  }
};
