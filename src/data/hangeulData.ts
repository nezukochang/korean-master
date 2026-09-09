// Données complètes de l'alphabet Hangeul (Consonnes, Voyelles, Tracés et Mnémotechniques)

export interface HangeulChar {
  char: string;
  name: string;
  type: 'consonant-basic' | 'consonant-tense' | 'vowel-basic' | 'vowel-complex';
  romanization: string;
  ipa: string;
  mnemonic: string;
  strokeCount: number;
  strokeDirections: string[];
  exampleWord: string;
  exampleTrans: string;
  exampleRom: string;
  audioKey: string;
}

export const CONSONANTS_BASIC: HangeulChar[] = [
  {
    char: 'ㄱ',
    name: '기역 (Giyeok)',
    type: 'consonant-basic',
    romanization: 'g / k',
    ipa: '[k / ɡ]',
    mnemonic: 'Ressemble à un Pistolet (Gun) ou à la langue bloquant le palais.',
    strokeCount: 1,
    strokeDirections: ['Vers la droite puis vers le bas en un seul angle droit ➔ 🡇'],
    exampleWord: '가방',
    exampleTrans: 'Sac',
    exampleRom: 'ga-bang',
    audioKey: '가방'
  },
  {
    char: 'ㄴ',
    name: '니은 (Nieun)',
    type: 'consonant-basic',
    romanization: 'n',
    ipa: '[n]',
    mnemonic: 'Ressemble à un Nez (Nose) ou à la langue touchant les dents supérieures.',
    strokeCount: 1,
    strokeDirections: ['Vers le bas puis vers la droite 🡇 ➔'],
    exampleWord: '나무',
    exampleTrans: 'Arbre',
    exampleRom: 'na-mu',
    audioKey: '나무'
  },
  {
    char: 'ㄷ',
    name: '디귿 (Digeut)',
    type: 'consonant-basic',
    romanization: 'd / t',
    ipa: '[t / d]',
    mnemonic: 'Ressemble à une Porte (Door) à deux battants ou un C carré.',
    strokeCount: 2,
    strokeDirections: ['Barre horizontale supérieure ➔', 'Trait descendant puis barre inférieure 🡇 ➔'],
    exampleWord: '다리',
    exampleTrans: 'Jambe / Pont',
    exampleRom: 'da-ri',
    audioKey: '다리'
  },
  {
    char: 'ㄹ',
    name: '리을 (Rieul)',
    type: 'consonant-basic',
    romanization: 'r / l',
    ipa: '[ɾ / l]',
    mnemonic: 'Ressemble à un Serpent ondulant (Rattlesnake) ou au chiffre 2.',
    strokeCount: 3,
    strokeDirections: ['Angle ㄱ ➔ 🡇', 'Barre médiane ➔', 'Angle ㄴ 🡇 ➔'],
    exampleWord: '라면',
    exampleTrans: 'Ramen / Nouilles',
    exampleRom: 'ra-myeon',
    audioKey: '라면'
  },
  {
    char: 'ㅁ',
    name: '미음 (Mieum)',
    type: 'consonant-basic',
    romanization: 'm',
    ipa: '[m]',
    mnemonic: 'Un carré fermé comme une Bouche (Mouth) fermée.',
    strokeCount: 3,
    strokeDirections: ['Trait vertical gauche 🡇', 'Angle supérieur droit ➔ 🡇', 'Fermeture inférieure ➔'],
    exampleWord: '물',
    exampleTrans: 'Eau',
    exampleRom: 'mul',
    audioKey: '물'
  },
  {
    char: 'ㅂ',
    name: '비읍 (Bieup)',
    type: 'consonant-basic',
    romanization: 'b / p',
    ipa: '[p / b]',
    mnemonic: 'Ressemble à un Seau d\'eau ou à un verre (Bucket).',
    strokeCount: 4,
    strokeDirections: ['Verticale gauche 🡇', 'Verticale droite 🡇', 'Traverse médiane ➔', 'Fermeture inférieure ➔'],
    exampleWord: '밥',
    exampleTrans: 'Riz cuit / Repas',
    exampleRom: 'bap',
    audioKey: '밥'
  },
  {
    char: 'ㅅ',
    name: '시옷 (Siot)',
    type: 'consonant-basic',
    romanization: 's / sh',
    ipa: '[s / ɕ]',
    mnemonic: 'Ressemble au toit d\'une maison (Shelter) ou à une silhouette humaine.',
    strokeCount: 2,
    strokeDirections: ['Diagonale descendante vers la gauche 🡿', 'Diagonale descendante vers la droite 🡾'],
    exampleWord: '사람',
    exampleTrans: 'Personne / Être humain',
    exampleRom: 'sa-ram',
    audioKey: '사람'
  },
  {
    char: 'ㅇ',
    name: '이응 (Ieung)',
    type: 'consonant-basic',
    romanization: 'muet / -ng',
    ipa: '[ŋ]',
    mnemonic: 'Un zéro ou cercle parfait : muet en début (place-holder), "ng" en bas.',
    strokeCount: 1,
    strokeDirections: ['Cercle tracé dans le sens antihoraire ↺'],
    exampleWord: '아이',
    exampleTrans: 'Enfant',
    exampleRom: 'a-i',
    audioKey: '아이'
  },
  {
    char: 'ㅈ',
    name: '지읒 (Jieut)',
    type: 'consonant-basic',
    romanization: 'j / ch',
    ipa: '[tɕ / dʑ]',
    mnemonic: 'Un chapeau au-dessus d\'un ㅅ, sonne comme "dj".',
    strokeCount: 2,
    strokeDirections: ['Barre horizontale supérieure puis diagonale ➔ 🡿', 'Diagonale droite 🡾'],
    exampleWord: '집',
    exampleTrans: 'Maison',
    exampleRom: 'jip',
    audioKey: '집'
  },
  {
    char: 'ㅊ',
    name: '치읓 (Chieut)',
    type: 'consonant-basic',
    romanization: 'ch',
    ipa: '[tɕʰ]',
    mnemonic: 'Ressemble à ㅈ avec une plume ou antenne sur le dessus (TCH aspiré).',
    strokeCount: 3,
    strokeDirections: ['Petit tiret supérieur ➔', 'Barre horizontale et diagonale ➔ 🡿', 'Diagonale droite 🡾'],
    exampleWord: '친구',
    exampleTrans: 'Ami(e)',
    exampleRom: 'chin-gu',
    audioKey: '친구'
  },
  {
    char: 'ㅋ',
    name: '키읔 (Kieuk)',
    type: 'consonant-basic',
    romanization: 'k',
    ipa: '[kʰ]',
    mnemonic: 'Un ㄱ avec une barre d\'air supplémentaire (K très expiré).',
    strokeCount: 2,
    strokeDirections: ['Angle ㄱ ➔ 🡇', 'Barre médiane ➔'],
    exampleWord: '커피',
    exampleTrans: 'Café',
    exampleRom: 'keo-pi',
    audioKey: '커피'
  },
  {
    char: 'ㅌ',
    name: '티읕 (Tieut)',
    type: 'consonant-basic',
    romanization: 't',
    ipa: '[tʰ]',
    mnemonic: 'Ressemble à la lettre majuscule E (T aspiré).',
    strokeCount: 3,
    strokeDirections: ['Barre supérieure ➔', 'Barre médiane ➔', 'Trait bas en angle ㄴ 🡇 ➔'],
    exampleWord: '태양',
    exampleTrans: 'Soleil',
    exampleRom: 'tae-yang',
    audioKey: '태양'
  },
  {
    char: 'ㅍ',
    name: '피읖 (Pieup)',
    type: 'consonant-basic',
    romanization: 'p',
    ipa: '[pʰ]',
    mnemonic: 'Ressemble au symbole mathématique Pi π (P aspiré).',
    strokeCount: 4,
    strokeDirections: ['Barre haute ➔', 'Verticale gauche 🡇', 'Verticale droite 🡇', 'Barre basse ➔'],
    exampleWord: '피자',
    exampleTrans: 'Pizza',
    exampleRom: 'pi-ja',
    audioKey: '피자'
  },
  {
    char: 'ㅎ',
    name: '히읗 (Hieut)',
    type: 'consonant-basic',
    romanization: 'h',
    ipa: '[h]',
    mnemonic: 'Une personne portant un chapeau haut-de-forme (H expiré).',
    strokeCount: 3,
    strokeDirections: ['Petit point supérieur 🡇', 'Barre horizontale ➔', 'Cercle inférieur ↺'],
    exampleWord: '하늘',
    exampleTrans: 'Ciel',
    exampleRom: 'ha-neul',
    audioKey: '하늘'
  }
];

export const CONSONANTS_TENSE: HangeulChar[] = [
  {
    char: 'ㄲ',
    name: '쌍기역 (Ssang-giyeok)',
    type: 'consonant-tense',
    romanization: 'kk',
    ipa: '[k͈]',
    mnemonic: 'Double ㄱ : bloquer la gorge et relâcher d\'un coup sec (K sans air).',
    strokeCount: 2,
    strokeDirections: ['Premier ㄱ ➔ 🡇', 'Second ㄱ ➔ 🡇'],
    exampleWord: '꽃',
    exampleTrans: 'Fleur',
    exampleRom: 'kkot',
    audioKey: '꽃'
  },
  {
    char: 'ㄸ',
    name: '쌍디귿 (Ssang-digeut)',
    type: 'consonant-tense',
    romanization: 'tt',
    ipa: '[t͈]',
    mnemonic: 'Double ㄷ : T dur, claquant et net.',
    strokeCount: 4,
    strokeDirections: ['Premier ㄷ', 'Second ㄷ'],
    exampleWord: '떡볶이',
    exampleTrans: 'Tteokbokki (gâteaux de riz épicés)',
    exampleRom: 'tteok-bok-ki',
    audioKey: '떡볶이'
  },
  {
    char: 'ㅃ',
    name: '쌍비읍 (Ssang-bieup)',
    type: 'consonant-tense',
    romanization: 'pp',
    ipa: '[p͈]',
    mnemonic: 'Double ㅂ : P sec comme dans "pain" en français soutenu.',
    strokeCount: 8,
    strokeDirections: ['Premier ㅂ', 'Second ㅂ'],
    exampleWord: '빵',
    exampleTrans: 'Pain',
    exampleRom: 'ppang',
    audioKey: '빵'
  },
  {
    char: 'ㅆ',
    name: '쌍시옷 (Ssang-siot)',
    type: 'consonant-tense',
    romanization: 'ss',
    ipa: '[s͈]',
    mnemonic: 'Double ㅅ : S sifflant et tendu.',
    strokeCount: 4,
    strokeDirections: ['Premier ㅅ', 'Second ㅅ'],
    exampleWord: '쌀',
    exampleTrans: 'Riz non cuit',
    exampleRom: 'ssal',
    audioKey: '쌀'
  },
  {
    char: 'ㅉ',
    name: '쌍지읒 (Ssang-jieut)',
    type: 'consonant-tense',
    romanization: 'jj',
    ipa: '[tɕ͈]',
    mnemonic: 'Double ㅈ : TCH dur et appuyé.',
    strokeCount: 4,
    strokeDirections: ['Premier ㅈ', 'Second ㅈ'],
    exampleWord: '짜장면',
    exampleTrans: 'Jajangmyeon (nouilles sauce soja noire)',
    exampleRom: 'jja-jang-myeon',
    audioKey: '짜장면'
  }
];

export const VOWELS_BASIC: HangeulChar[] = [
  {
    char: 'ㅏ',
    name: '아 (a)',
    type: 'vowel-basic',
    romanization: 'a',
    ipa: '[a]',
    mnemonic: 'Le trait vertical regarde vers la droite (lumière Yang, positif) : A.',
    strokeCount: 2,
    strokeDirections: ['Long trait vertical descendant 🡇', 'Petit trait court vers la droite ➔'],
    exampleWord: '아버지',
    exampleTrans: 'Père',
    exampleRom: 'a-beo-ji',
    audioKey: '아버지'
  },
  {
    char: 'ㅑ',
    name: '야 (ya)',
    type: 'vowel-basic',
    romanization: 'ya',
    ipa: '[ja]',
    mnemonic: 'Deux traits vers la droite ajoutent le son "Y" : YA.',
    strokeCount: 3,
    strokeDirections: ['Long trait vertical 🡇', 'Premier tiret droit ➔', 'Second tiret droit ➔'],
    exampleWord: '야구',
    exampleTrans: 'Baseball',
    exampleRom: 'ya-gu',
    audioKey: '야구'
  },
  {
    char: 'ㅓ',
    name: '어 (eo)',
    type: 'vowel-basic',
    romanization: 'eo',
    ipa: '[ʌ]',
    mnemonic: 'Le trait regarde vers la gauche (intérieur Yin) : O ouvert (gorge relâchée).',
    strokeCount: 2,
    strokeDirections: ['Petit tiret court vers la droite ➔', 'Long trait vertical 🡇'],
    exampleWord: '어머니',
    exampleTrans: 'Mère',
    exampleRom: 'eo-meo-ni',
    audioKey: '어머니'
  },
  {
    char: 'ㅕ',
    name: '여 (yeo)',
    type: 'vowel-basic',
    romanization: 'yeo',
    ipa: '[jʌ]',
    mnemonic: 'Deux traits intérieurs : YEO.',
    strokeCount: 3,
    strokeDirections: ['Deux tirets vers la droite', 'Long trait vertical 🡇'],
    exampleWord: '여권',
    exampleTrans: 'Passeport',
    exampleRom: 'yeo-gwon',
    audioKey: '여권'
  },
  {
    char: 'ㅗ',
    name: '오 (o)',
    type: 'vowel-basic',
    romanization: 'o',
    ipa: '[o]',
    mnemonic: 'Le soleil au-dessus de l\'horizon : O bien rond (lèvres en avant).',
    strokeCount: 2,
    strokeDirections: ['Petit trait vertical descendant 🡇', 'Longue barre horizontale ➔'],
    exampleWord: '오늘',
    exampleTrans: 'Aujourd\'hui',
    exampleRom: 'o-neul',
    audioKey: '오늘'
  },
  {
    char: 'ㅛ',
    name: '요 (yo)',
    type: 'vowel-basic',
    romanization: 'yo',
    ipa: '[jo]',
    mnemonic: 'Deux rayons montant au-dessus de l\'horizon : YO.',
    strokeCount: 3,
    strokeDirections: ['Deux petits traits verticaux 🡇 🡇', 'Longue barre horizontale ➔'],
    exampleWord: '요리',
    exampleTrans: 'Cuisine',
    exampleRom: 'yo-ri',
    audioKey: '요리'
  },
  {
    char: 'ㅜ',
    name: '우 (u)',
    type: 'vowel-basic',
    romanization: 'u',
    ipa: '[u]',
    mnemonic: 'Le trait descend sous terre : OU français profond.',
    strokeCount: 2,
    strokeDirections: ['Longue barre horizontale ➔', 'Petit trait vertical vers le bas 🡇'],
    exampleWord: '우유',
    exampleTrans: 'Lait',
    exampleRom: 'u-yu',
    audioKey: '우유'
  },
  {
    char: 'ㅠ',
    name: '유 (yu)',
    type: 'vowel-basic',
    romanization: 'yu',
    ipa: '[ju]',
    mnemonic: 'Deux gouttes descendant de l\'horizon : YOU.',
    strokeCount: 3,
    strokeDirections: ['Longue barre horizontale ➔', 'Deux traits verticaux vers le bas 🡇 🡇'],
    exampleWord: '유리',
    exampleTrans: 'Verre (matière)',
    exampleRom: 'yu-ri',
    audioKey: '유리'
  },
  {
    char: 'ㅡ',
    name: '으 (eu)',
    type: 'vowel-basic',
    romanization: 'eu',
    ipa: '[ɯ]',
    mnemonic: 'Ligne plate représentant la Terre : prononcez "eu" en souriant fort.',
    strokeCount: 1,
    strokeDirections: ['Un seul trait horizontal de gauche à droite ➔'],
    exampleWord: '은행',
    exampleTrans: 'Banque',
    exampleRom: 'eun-haeng',
    audioKey: '은행'
  },
  {
    char: 'ㅣ',
    name: '이 (i)',
    type: 'vowel-basic',
    romanization: 'i',
    ipa: '[i]',
    mnemonic: 'L\'être humain debout entre ciel et terre : son "I" net.',
    strokeCount: 1,
    strokeDirections: ['Un seul trait vertical de haut en bas 🡇'],
    exampleWord: '이름',
    exampleTrans: 'Nom / Prénom',
    exampleRom: 'i-reum',
    audioKey: '이름'
  }
];

export const VOWELS_COMPLEX: HangeulChar[] = [
  {
    char: 'ㅐ',
    name: '애 (ae)',
    type: 'vowel-complex',
    romanization: 'ae',
    ipa: '[ɛ]',
    mnemonic: 'ㅏ + ㅣ = È ouvert comme dans "mer".',
    strokeCount: 3,
    strokeDirections: ['ㅏ puis ㅣ'],
    exampleWord: '애기',
    exampleTrans: 'Bébé',
    exampleRom: 'ae-gi',
    audioKey: '애기'
  },
  {
    char: 'ㅔ',
    name: '에 (e)',
    type: 'vowel-complex',
    romanization: 'e',
    ipa: '[e]',
    mnemonic: 'ㅓ + ㅣ = É fermé comme dans "café".',
    strokeCount: 3,
    strokeDirections: ['ㅓ puis ㅣ'],
    exampleWord: '에어컨',
    exampleTrans: 'Climatiseur',
    exampleRom: 'e-eo-keon',
    audioKey: '에어컨'
  },
  {
    char: 'ㅘ',
    name: '와 (wa)',
    type: 'vowel-complex',
    romanization: 'wa',
    ipa: '[wa]',
    mnemonic: 'ㅗ + ㅏ = OUA.',
    strokeCount: 4,
    strokeDirections: ['ㅗ puis ㅏ'],
    exampleWord: '와인',
    exampleTrans: 'Vin',
    exampleRom: 'wa-in',
    audioKey: '와인'
  },
  {
    char: 'ㅝ',
    name: '워 (wo)',
    type: 'vowel-complex',
    romanization: 'wo',
    ipa: '[wʌ]',
    mnemonic: 'ㅜ + ㅓ = OU + O ouvert.',
    strokeCount: 4,
    strokeDirections: ['ㅜ puis ㅓ'],
    exampleWord: '원',
    exampleTrans: 'Won (monnaie coréenne)',
    exampleRom: 'won',
    audioKey: '원'
  },
  {
    char: 'ㅢ',
    name: '의 (ui)',
    type: 'vowel-complex',
    romanization: 'ui',
    ipa: '[ɰi]',
    mnemonic: 'ㅡ + ㅣ = EU + I (se prononce aussi "é" pour la particule de possession).',
    strokeCount: 2,
    strokeDirections: ['ㅡ puis ㅣ'],
    exampleWord: '의사',
    exampleTrans: 'Médecin',
    exampleRom: 'ui-sa',
    audioKey: '의사'
  }
];

export const ALL_HANGEUL_CHARS: HangeulChar[] = [
  ...CONSONANTS_BASIC,
  ...CONSONANTS_TENSE,
  ...VOWELS_BASIC,
  ...VOWELS_COMPLEX
];
