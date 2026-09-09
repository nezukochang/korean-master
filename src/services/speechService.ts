// Service de gestion de la voix coréenne (TTS et STT)

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private koreanVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Chercher une voix coréenne (ko-KR ou ko)
    this.koreanVoice = voices.find((v) => v.lang.startsWith('ko')) || null;
  }

  public speak(text: string, rate: number = 0.85): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Synthèse vocale non supportée sur ce navigateur.');
        resolve();
        return;
      }

      // Annuler toute lecture en cours
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = rate; // Rythme d'élocution adapté pour l'apprentissage
      utterance.pitch = 1.0;

      if (this.koreanVoice) {
        utterance.voice = this.koreanVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  public listen(): Promise<{ success: boolean; transcript: string; error?: string }> {
    return new Promise((resolve) => {
      if (!this.isSpeechRecognitionSupported()) {
        resolve({ success: false, transcript: '', error: 'Microphone non supporté sur ce navigateur' });
        return;
      }

      // @ts-expect-error - Webkit prefix fallback
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve({ success: true, transcript });
      };

      recognition.onerror = (event: any) => {
        resolve({ success: false, transcript: '', error: event.error });
      };

      recognition.onend = () => {
        // En cas de fin sans résultat
      };

      try {
        recognition.start();
      } catch (err: any) {
        resolve({ success: false, transcript: '', error: err.message });
      }
    });
  }
}

export const speechService = new SpeechService();
