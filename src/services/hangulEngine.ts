// Moteur de calcul et composition Unicode du Hangeul (Hangeul Engine)

export const CHOSEONG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

export const JUNGSEONG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

export const JONGSEONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// Noms et romanisations de référence
export const INITIAL_NAMES: Record<string, { name: string; rom: string; ipa: string; desc: string }> = {
  'ㄱ': { name: '기역 (Giyeok)', rom: 'g/k', ipa: '[k/ɡ]', desc: 'G doux en début, K en fin' },
  'ㄲ': { name: '쌍기역 (Ssang-giyeok)', rom: 'kk', ipa: '[k͈]', desc: 'K dur et tendu (sans souffle)' },
  'ㄴ': { name: '니은 (Nieun)', rom: 'n', ipa: '[n]', desc: 'N clair' },
  'ㄷ': { name: '디귿 (Digeut)', rom: 'd/t', ipa: '[t/d]', desc: 'D en milieu, T en début' },
  'ㄸ': { name: '쌍디귿 (Ssang-digeut)', rom: 'tt', ipa: '[t͈]', desc: 'T dur et claquant' },
  'ㄹ': { name: '리을 (Rieul)', rom: 'r/l', ipa: '[ɾ/l]', desc: 'R battu espagnol (milieu) ou L (fin)' },
  'ㅁ': { name: '미음 (Mieum)', rom: 'm', ipa: '[m]', desc: 'M classique' },
  'ㅂ': { name: '비읍 (Bieup)', rom: 'b/p', ipa: '[p/b]', desc: 'B doux ou P' },
  'ㅃ': { name: '쌍비읍 (Ssang-bieup)', rom: 'pp', ipa: '[p͈]', desc: 'P sec et explosif' },
  'ㅅ': { name: '시옷 (Siot)', rom: 's/sh', ipa: '[s/ɕ]', desc: 'S (ou SH devant i et les voyelles en y)' },
  'ㅆ': { name: '쌍시옷 (Ssang-siot)', rom: 'ss', ipa: '[s͈]', desc: 'SS appuyé et sibilant' },
  'ㅇ': { name: '이응 (Ieung)', rom: 'muet / ng', ipa: '[ŋ]', desc: 'Muet au début (support), NG en bas (Batchim)' },
  'ㅈ': { name: '지읒 (Jieut)', rom: 'j/ch', ipa: '[tɕ/dʑ]', desc: 'DJ doux ou TCH' },
  'ㅉ': { name: '쌍지읒 (Ssang-jieut)', rom: 'jj', ipa: '[tɕ͈]', desc: 'TCH appuyé et sec' },
  'ㅊ': { name: '치읓 (Chieut)', rom: 'ch', ipa: '[tɕʰ]', desc: 'TCH aspiré (avec un souffle d\'air)' },
  'ㅋ': { name: '키읔 (Kieuk)', rom: 'k', ipa: '[kʰ]', desc: 'K aspiré (très marqué)' },
  'ㅌ': { name: '티읕 (Tieut)', rom: 't', ipa: '[tʰ]', desc: 'T aspiré' },
  'ㅍ': { name: '피읖 (Pieup)', rom: 'p', ipa: '[pʰ]', desc: 'P aspiré' },
  'ㅎ': { name: '히읗 (Hieut)', rom: 'h', ipa: '[h]', desc: 'H expiré comme en anglais' }
};

export const VOWEL_NAMES: Record<string, { name: string; rom: string; ipa: string; desc: string }> = {
  'ㅏ': { name: '아 (a)', rom: 'a', ipa: '[a]', desc: 'A ouvert comme en français' },
  'ㅐ': { name: '애 (ae)', rom: 'ae', ipa: '[ɛ]', desc: 'È ouvert' },
  'ㅑ': { name: '야 (ya)', rom: 'ya', ipa: '[ja]', desc: 'YA' },
  'ㅒ': { name: '얘 (yae)', rom: 'yae', ipa: '[jɛ]', desc: 'YÈ' },
  'ㅓ': { name: '어 (eo)', rom: 'eo', ipa: '[ʌ]', desc: 'O ouvert et profond (bouche ouverte, prononcer O)' },
  'ㅔ': { name: '에 (e)', rom: 'e', ipa: '[e]', desc: 'É fermé' },
  'ㅕ': { name: '여 (yeo)', rom: 'yeo', ipa: '[jʌ]', desc: 'YEO' },
  'ㅖ': { name: '예 (ye)', rom: 'ye', ipa: '[je]', desc: 'YÉ' },
  'ㅗ': { name: '오 (o)', rom: 'o', ipa: '[o]', desc: 'O rond (lèvres très avancées)' },
  'ㅘ': { name: '와 (wa)', rom: 'wa', ipa: '[wa]', desc: 'OUA' },
  'ㅙ': { name: '왜 (wae)', rom: 'wae', ipa: '[wɛ]', desc: 'OUÈ' },
  'ㅚ': { name: '외 (oe)', rom: 'oe', ipa: '[we]', desc: 'OUÉ / OE' },
  'ㅛ': { name: '요 (yo)', rom: 'yo', ipa: '[jo]', desc: 'YO' },
  'ㅜ': { name: '우 (u)', rom: 'u', ipa: '[u]', desc: 'OU français' },
  'ㅝ': { name: '워 (wo)', rom: 'wo', ipa: '[wʌ]', desc: 'OU + EO' },
  'ㅞ': { name: '웨 (we)', rom: 'we', ipa: '[we]', desc: 'OUÉ' },
  'ㅟ': { name: '위 (wi)', rom: 'wi', ipa: '[ɥi]', desc: 'OUI' },
  'ㅠ': { name: '유 (yu)', rom: 'yu', ipa: '[ju]', desc: 'YOU' },
  'ㅡ': { name: '으 (eu)', rom: 'eu', ipa: '[ɯ]', desc: 'EU sans arrondir les lèvres (sourire forcé)' },
  'ㅢ': { name: '의 (ui)', rom: 'ui', ipa: '[ɰi]', desc: 'EU-I combiné' },
  'ㅣ': { name: '이 (i)', rom: 'i', ipa: '[i]', desc: 'I standard' }
};

/**
 * Compose un bloc de syllabe Hangeul Unicode valide à partir de (Initiale, Voyelle, [Finale]).
 */
export function composeHangul(initial: string, medial: string, final: string = ''): string {
  const iIdx = CHOSEONG.indexOf(initial);
  const mIdx = JUNGSEONG.indexOf(medial);
  const fIdx = JONGSEONG.indexOf(final);

  if (iIdx === -1 || mIdx === -1) {
    return initial + medial + final;
  }

  const finalOffset = fIdx >= 0 ? fIdx : 0;
  const unicodeVal = 0xac00 + (iIdx * 21 + mIdx) * 28 + finalOffset;
  return String.fromCharCode(unicodeVal);
}

/**
 * Décompose une syllabe coréenne en ses 3 composantes (initiale, voyelle, finale).
 */
export function decomposeHangul(syllable: string): { initial: string; medial: string; final: string } | null {
  if (!syllable || syllable.length === 0) return null;
  const code = syllable.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return null; // En dehors du bloc Syllabes Hangeul

  const finalIdx = code % 28;
  const medialIdx = Math.floor((code - finalIdx) / 28) % 21;
  const initialIdx = Math.floor((code - finalIdx) / (28 * 21));

  return {
    initial: CHOSEONG[initialIdx] || '',
    medial: JUNGSEONG[medialIdx] || '',
    final: JONGSEONG[finalIdx] || ''
  };
}
