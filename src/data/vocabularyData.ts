// Vocabulaire essentiel thématisé avec audio, romanisation et astuces

export interface VocabWord {
  id: string;
  korean: string;
  romanization: string;
  french: string;
  category: string;
  exampleSentence: string;
  exampleTrans: string;
  batchim: string;
}

export const ESSENTIAL_VOCABULARY: VocabWord[] = [
  // 1. Politesse & Expressions Clés
  {
    id: 'v1',
    korean: '안녕하세요',
    romanization: 'An-nyeong-ha-se-yo',
    french: 'Bonjour / Bonsoir',
    category: 'Politesse',
    exampleSentence: '안녕하세요, 만나서 반갑습니다.',
    exampleTrans: 'Bonjour, ravi de vous rencontrer.',
    batchim: '요 (aucun)'
  },
  {
    id: 'v2',
    korean: '감사합니다',
    romanization: 'Gam-sa-ham-ni-da',
    french: 'Merci beaucoup',
    category: 'Politesse',
    exampleSentence: '도와주셔서 정말 감사합니다.',
    exampleTrans: 'Merci infiniment pour votre aide.',
    batchim: '다 (aucun)'
  },
  {
    id: 'v3',
    korean: '죄송합니다',
    romanization: 'Joe-song-ham-ni-da',
    french: 'Pardon / Je suis désolé(e)',
    category: 'Politesse',
    exampleSentence: '늦어서 정말 죄송합니다.',
    exampleTrans: 'Je suis vraiment désolé(e) d\'être en retard.',
    batchim: '다 (aucun)'
  },
  {
    id: 'v4',
    korean: '실례합니다',
    romanization: 'Sil-lye-ham-ni-da',
    french: 'Excusez-moi (pour interpeller ou passer)',
    category: 'Politesse',
    exampleSentence: '실례합니다, 길 좀 물어볼게요.',
    exampleTrans: 'Excusez-moi, je voudrais vous demander mon chemin.',
    batchim: '다 (aucun)'
  },
  {
    id: 'v5',
    korean: '괜찮아요',
    romanization: 'Gwaen-chan-a-yo',
    french: 'Ça va / Pas de problème / Tout est bon',
    category: 'Politesse',
    exampleSentence: '저는 정말 괜찮아요, 걱정 마세요.',
    exampleTrans: 'Je vais très bien, ne vous inquiétez pas.',
    batchim: '요 (aucun)'
  },

  // 2. Chiffres & Compteurs
  {
    id: 'v6',
    korean: '일, 이, 삼, 사, 오',
    romanization: 'il, i, sam, sa, o',
    french: '1, 2, 3, 4, 5 (Sino-coréen - prix & dates)',
    category: 'Nombres',
    exampleSentence: '오천 원이에요 (5 000 wons).',
    exampleTrans: 'Cela fait 5 000 wons.',
    batchim: 'Variables'
  },
  {
    id: 'v7',
    korean: '하나, 둘, 셋, 넷',
    romanization: 'ha-na, dul, set, net',
    french: '1, 2, 3, 4 (Coréen natif - objets & verres)',
    category: 'Nombres',
    exampleSentence: '커피 하나 주세요.',
    exampleTrans: 'Un café s\'il vous plaît.',
    batchim: 'Variables'
  },

  // 3. Restaurant & Nourriture
  {
    id: 'v8',
    korean: '물',
    romanization: 'Mul',
    french: 'Eau',
    category: 'Restaurant',
    exampleSentence: '시원한 물 좀 주세요.',
    exampleTrans: 'Donnez-moi de l\'eau fraîche s\'il vous plaît.',
    batchim: 'ㄹ'
  },
  {
    id: 'v9',
    korean: '밥',
    romanization: 'Bap',
    french: 'Riz cuit / Repas',
    category: 'Restaurant',
    exampleSentence: '밥 먹었어요?',
    exampleTrans: 'Avez-vous mangé ? (Formule courante d\'attention bienveillante)',
    batchim: 'ㅂ'
  },
  {
    id: 'v10',
    korean: '맛있어요',
    romanization: 'Ma-si-sseo-yo',
    french: 'C\'est délicieux',
    category: 'Restaurant',
    exampleSentence: '이 음식 진짜 맛있어요!',
    exampleTrans: 'Ce plat est vraiment délicieux !',
    batchim: '요 (aucun)'
  },
  {
    id: 'v11',
    korean: '메뉴판',
    romanization: 'Me-nyu-pan',
    french: 'Carte du menu',
    category: 'Restaurant',
    exampleSentence: '메뉴판 보여주세요.',
    exampleTrans: 'Montrez-moi le menu s\'il vous plaît.',
    batchim: 'ㄴ'
  },

  // 4. Verbes Clés du Quotidien
  {
    id: 'v12',
    korean: '가다 (가요)',
    romanization: 'Ga-da (ga-yo)',
    french: 'Aller',
    category: 'Verbes',
    exampleSentence: '지금 집에 가요.',
    exampleTrans: 'Je rentre à la maison maintenant.',
    batchim: 'aucun'
  },
  {
    id: 'v13',
    korean: '오다 (와요)',
    romanization: 'O-da (wa-yo)',
    french: 'Venir',
    category: 'Verbes',
    exampleSentence: '친구가 한국에 와요.',
    exampleTrans: 'Mon ami(e) vient en Corée.',
    batchim: 'aucun'
  },
  {
    id: 'v14',
    korean: '먹다 (먹어요)',
    romanization: 'Meok-da (meo-geo-yo)',
    french: 'Manger',
    category: 'Verbes',
    exampleSentence: '점심을 맛있게 먹었어요.',
    exampleTrans: 'J\'ai bien mangé mon déjeuner.',
    batchim: 'ㄱ'
  },
  {
    id: 'v15',
    korean: '마시다 (마셔요)',
    romanization: 'Ma-si-da (ma-syeo-yo)',
    french: 'Boire',
    category: 'Verbes',
    exampleSentence: '녹차를 마셔요.',
    exampleTrans: 'Je bois du thé vert.',
    batchim: 'aucun'
  },
  {
    id: 'v16',
    korean: '하다 (해요)',
    romanization: 'Ha-da (hae-yo)',
    french: 'Faire',
    category: 'Verbes',
    exampleSentence: '한국어 공부를 해요.',
    exampleTrans: 'J\'étudie la langue coréenne.',
    batchim: 'aucun'
  }
];
