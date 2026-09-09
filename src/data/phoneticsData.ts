// Règles de prononciation secrètes et moteurs de Batchim (받침)

export interface BatchimRule {
  id: string;
  title: string;
  koreanName: string;
  description: string;
  keyRule: string;
  examples: {
    written: string;
    pronounced: string;
    translation: string;
    explanation: string;
  }[];
}

export const BATCHIM_7_SOUNDS = [
  {
    sound: '[ㄱ / k]',
    letters: ['ㄱ', 'ㅋ', 'ㄲ', 'ㄳ', 'ㄺ'],
    desc: 'Se prononce comme un "K" net dont on bloque le souffle dans la gorge.',
    example: '책 (Livre), 밖 (Dehors), 닭 (Poulet)'
  },
  {
    sound: '[ㄴ / n]',
    letters: ['ㄴ', 'ㄵ', 'ㄶ'],
    desc: 'Se prononce "N" avec la langue collée au palais.',
    example: '눈 (Yeux / Neige), 안 (Dedans)'
  },
  {
    sound: '[ㄷ / t]',
    letters: ['ㄷ', 'ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅎ'],
    desc: 'Attention : toutes ces 7 lettres se transforment en simple son [T] en fin de syllabe !',
    example: '옷 (Vêtement -> [옫]), 꽃 (Fleur -> [꼳]), 낮 (Jour -> [낟])'
  },
  {
    sound: '[ㄹ / l]',
    letters: ['ㄹ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㅀ'],
    desc: 'Un son "L" liquide où le bout de la langue touche les alvéoles supérieures.',
    example: '물 (Eau), 달 (Lune), 말 (Cheval / Parole)'
  },
  {
    sound: '[ㅁ / m]',
    letters: ['ㅁ', 'ㄻ'],
    desc: 'Un "M" franc lèvres fermées.',
    example: '엄마 (Maman), 밤 (Nuit / Châtaigne)'
  },
  {
    sound: '[ㅂ / p]',
    letters: ['ㅂ', 'ㅍ', 'ㅄ', 'ㄿ'],
    desc: 'Un "P" net lèvres scellées sans expiration.',
    example: '밥 (Riz -> [밥]), 잎 (Feuille -> [입]), 집 (Maison)'
  },
  {
    sound: '[ㅇ / ng]',
    letters: ['ㅇ'],
    desc: 'Le son nasal "NG" comme dans "parking".',
    example: '사랑 (Amour), 공항 (Aéroport), 강 (Rivière)'
  }
];

export const PHONETIC_MUTATION_RULES: BatchimRule[] = [
  {
    id: 'liaison',
    title: '1. La Règle de la Liaison (연음 법칙)',
    koreanName: 'Yeon-eum Beop-chik',
    description: 'Lorsqu\'une syllabe se termine par un Batchim et que la suivante commence par "ㅇ" (qui est muet), la consonne finale glisse et se prononce sur la voyelle suivante !',
    keyRule: 'Consonne finale + ㅇ ➔ La consonne prend la place du ㅇ à l\'oral.',
    examples: [
      {
        written: '한국어',
        pronounced: '한구거 [Han-gu-geo]',
        translation: 'Langue coréenne',
        explanation: 'Le "ㄱ" de 국 glisse sur le "어" pour former [구거].'
      },
      {
        written: '옷이',
        pronounced: '오시 [O-si]',
        translation: 'Le vêtement (sujet)',
        explanation: 'Le "ㅅ" de 옷 glisse sur "이" et redevient un son "S" -> [오시].'
      },
      {
        written: '음악',
        pronounced: '으막 [Eu-mak]',
        translation: 'Musique',
        explanation: 'Le "ㅁ" de 음 glisse sur "악" -> [으막].'
      }
    ]
  },
  {
    id: 'nasalization',
    title: '2. La Règle de Nasalisation (비음화)',
    koreanName: 'Bi-eum-hwa',
    description: 'Lorsque les sons durs [ㄱ, ㄷ, ㅂ] rencontrent un "ㄴ" ou un "ㅁ", ils s\'adoucissent automatiquement par le nez pour devenir [ㅇ, ㄴ, ㅁ]. C\'est la règle la plus fréquente en coréen courant !',
    keyRule: 'ㅂ + ㄴ ➔ [ㅁ + ㄴ]  |  ㄱ + ㄴ ➔ [ㅇ + ㄴ]',
    examples: [
      {
        written: '감사합니다',
        pronounced: '감사함니다 [Gam-sa-ham-ni-da]',
        translation: 'Merci beaucoup',
        explanation: 'Le "ㅂ" de 합 devant le "ㄴ" de 니다 devient un son "M" [함니다].'
      },
      {
        written: '백만',
        pronounced: '뱅만 [Baeng-man]',
        translation: 'Un million',
        explanation: 'Le "ㄱ" de 백 devant le "ㅁ" de 만 devient un son nasal [뱅만].'
      },
      {
        written: '입니다',
        pronounced: '임니다 [Im-ni-da]',
        translation: 'Être (forme polie formelle)',
        explanation: 'Se prononce toujours [임니다], jamais "ip-ni-da".'
      }
    ]
  },
  {
    id: 'aspiration',
    title: '3. La Règle de l\'Aspiration (격음화)',
    koreanName: 'Gyeok-eum-hwa',
    description: 'Lorsque les consonnes [ㄱ, ㄷ, ㅂ, ㅈ] rencontrent la lettre soufflée "ㅎ" (avant ou après), elles fusionnent et explosent en consonnes aspirées : [ㅋ, ㅌ, ㅍ, ㅊ].',
    keyRule: 'ㄱ+ㅎ ➔ ㅋ  |  ㄷ+ㅎ ➔ ㅌ  |  ㅂ+ㅎ ➔ ㅍ  |  ㅈ+ㅎ ➔ ㅊ',
    examples: [
      {
        written: '축하',
        pronounced: '추카 [Chu-ka]',
        translation: 'Félicitations',
        explanation: 'ㄱ + ㅎ fusionnent pour donner le son explosif ㅋ -> [추카].'
      },
      {
        written: '좋다',
        pronounced: '조타 [Jo-ta]',
        translation: 'Être bon / bien',
        explanation: 'ㅎ + ㄷ fusionnent en ㅌ -> [조타].'
      },
      {
        written: '어떻게',
        pronounced: '어떠케 [Eo-tteo-ke]',
        translation: 'Comment ?',
        explanation: 'ㅎ + ㄱ deviennent ㅋ -> [어떠케].'
      }
    ]
  },
  {
    id: 'tensification',
    title: '4. La Règle de Renforcement / Tension (경음화)',
    koreanName: 'Gyeong-eum-hwa',
    description: 'Après les sons de blocage [ㄱ, ㄷ, ㅂ], les consonnes suivantes [ㄱ, ㄷ, ㅂ, ㅅ, ㅈ] se tendent et deviennent doubles [ㄲ, ㄸ, ㅃ, ㅆ, ㅉ].',
    keyRule: 'Arrêt de souffle ➔ La consonne suivante claque fermement.',
    examples: [
      {
        written: '학교',
        pronounced: '학꾜 [Hak-kkyo]',
        translation: 'École',
        explanation: 'Le 교 devient dur et tendu [꾜] à cause du Batchim ㄱ.'
      },
      {
        written: '식당',
        pronounced: '식땅 [Sik-ttang]',
        translation: 'Restaurant',
        explanation: 'Le 당 devient [땅] avec un T percutant.'
      }
    ]
  },
  {
    id: 'palatalization',
    title: '5. La Palatalisation (구개음화)',
    koreanName: 'Gu-gae-eum-hwa',
    description: 'Les consonnes finales ㄷ et ㅌ suivies de la voyelle "이" se transforment en son "J" [ㅈ] ou "CH" [ㅊ] pour faciliter le mouvement de la langue.',
    keyRule: 'ㄷ + 이 ➔ [지]  |  ㅌ + 이 ➔ [치]',
    examples: [
      {
        written: '같이',
        pronounced: '가치 [Ga-chi]',
        translation: 'Ensemble',
        explanation: 'ㅌ + 이 se prononce [가치], jamais "gat-i".'
      },
      {
        written: '맏이',
        pronounced: '마지 [Ma-ji]',
        translation: 'L\'aîné(e) de la famille',
        explanation: 'ㄷ + 이 se prononce naturellement [마지].'
      }
    ]
  }
];
