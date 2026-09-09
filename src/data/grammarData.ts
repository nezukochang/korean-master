// Grammaire coréenne vivante, structure des phrases et particules

export interface GrammarLesson {
  id: string;
  title: string;
  subtitle: string;
  explanation: string;
  formula: string;
  examples: {
    korean: string;
    romanization: string;
    translation: string;
    breakdown: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'sov-structure',
    title: '1. L\'Ordre des Mots : Sujet - Objet - Verbe (SOV)',
    subtitle: 'Pourquoi le verbe est toujours à la toute fin en coréen',
    explanation: 'Contrairement au français (Sujet - Verbe - Objet : "Je mange une pomme"), le coréen place toujours l\'action à la fin : "Moi - pomme - mange". Tant que le verbe n\'est pas prononcé, la phrase n\'est pas terminée !',
    formula: '[Sujet + Particule] + [Objet + Particule] + [Verbe conjugué]',
    examples: [
      {
        korean: '저는 사과를 먹어요.',
        romanization: 'Jeo-neun sa-gwa-reul meo-geo-yo.',
        translation: 'Je mange une pomme.',
        breakdown: '저(Moi) + 는(thème) + 사과(pomme) + 를(objet) + 먹어요(manger).'
      },
      {
        korean: '민수가 물을 마셔요.',
        romanization: 'Min-su-ga mu-reul ma-syeo-yo.',
        translation: 'Minsu boit de l\'eau.',
        breakdown: '민수(Minsu) + 가(sujet) + 물(eau) + 을(objet) + 마셔요(boire).'
      }
    ],
    quiz: {
      question: 'Comment traduiriez-vous "Je bois du café" selon l\'ordre coréen ?',
      options: ['Je - Bois - Café', 'Je - Café - Bois', 'Café - Je - Bois', 'Bois - Je - Café'],
      correctIndex: 1,
      explanation: 'En coréen, le verbe se place toujours en dernier : Sujet + Objet + Verbe (저는 커피를 마셔요).'
    }
  },
  {
    id: 'particles-topic-subject',
    title: '2. Thème vs Sujet : 은/는 contre 이/가',
    subtitle: 'La plus grande énigme des débutants enfin résolue !',
    explanation: '• 은/는 marque le THÈME général de la conversation ("En ce qui concerne...") ou le contraste.\n• 이/가 marque le SUJET spécifique qui fait l\'action ou répond à "Qui ? Qu\'est-ce qui ?".\nAstuce de choix phonétique : si le mot finit par une consonne (Batchim), on utilise 은 ou 이. S\'il finit par une voyelle, on utilise 는 ou 가.',
    formula: 'Consonne finale + 은 / 이  |  Voyelle finale + 는 / 가',
    examples: [
      {
        korean: '저는 프랑스 사람이에요.',
        romanization: 'Jeo-neun peu-rang-seu sa-ram-i-e-yo.',
        translation: 'Moi, je suis français(e).',
        breakdown: '저 finit par une voyelle -> 는 (En ce qui me concerne, je suis français).'
      },
      {
        korean: '이것이 맛있어요.',
        romanization: 'I-geo-si ma-si-sseo-yo.',
        translation: 'C\'est CECI qui est délicieux.',
        breakdown: '이것 finit par un Batchim -> 이 (Focalisation précise).'
      }
    ],
    quiz: {
      question: 'Pour dire "Le livre (책 - finit par Batchim ㄱ)" comme thème, que choisit-on ?',
      options: ['책는', '책은', '책를', '책가'],
      correctIndex: 1,
      explanation: '책 se terminant par la consonne finale ㄱ, on utilise la particule de thème "은" -> 책은.'
    }
  },
  {
    id: 'particles-object',
    title: '3. La Particule d\'Objet Direct : 을 / 를',
    subtitle: 'Désigner ce sur quoi porte l\'action',
    explanation: 'Cette particule se colle au mot qui subit l\'action (le COD). Si le mot se termine par un Batchim, on prend 을 (facilite la liaison). S\'il se termine par une voyelle, on prend 를.',
    formula: 'Batchim + 을  |  Voyelle + 를',
    examples: [
      {
        korean: '한국어를 배워요.',
        romanization: 'Han-gu-geo-reul bae-wo-yo.',
        translation: 'J\'apprends le coréen.',
        breakdown: '한국어 (finit par la voyelle ㅓ) + 를 + 배워요 (apprendre).'
      },
      {
        korean: '밥을 먹어요.',
        romanization: 'Ba-beul meo-geo-yo.',
        translation: 'Je mange du riz / Je prends mon repas.',
        breakdown: '밥 (finit par le Batchim ㅂ) + 을 + 먹어요.'
      }
    ],
    quiz: {
      question: 'Comment marquer l\'objet pour "film" (영화 - finit par voyelle ㅏ) ?',
      options: ['영화를', '영화을', '영화은', '영화가'],
      correctIndex: 0,
      explanation: '영화 se termine par une voyelle, on ajoute donc "를" : 영화를 봐요 (Je regarde un film).'
    }
  },
  {
    id: 'politeness-levels',
    title: '4. Les Niveaux de Politesse : Jondaenmal vs Banmal',
    subtitle: 'La clé pour être respectueux en société coréenne',
    explanation: 'En Corée, on ne parle pas de la même façon selon l\'âge, le statut et le degré d\'intimité :\n\n1. Formel poli (하십시오체 : ~습니다) : Entretiens, télévision, personnes très âgées, armée.\n2. Informel poli (해요체 : ~아요/어요) : LE style roi ! C\'est celui que vous utiliserez avec 95% des gens (au café, aux collègues, aux inconnus).\n3. Familier (반말 : ~아/어) : Réservé UNIQUEMENT aux amis très proches du même âge ou aux enfants. L\'utiliser avec un inconnu est une grave impolitesse.',
    formula: 'Verbe + ~아요/어요 (Poli courant)  vs  Verbe + ~습니다 (Formel)',
    examples: [
      {
        korean: '반갑습니다 (Formel) / 반가워요 (Poli courant)',
        romanization: 'Ban-gap-seum-ni-da / Ban-ga-wo-yo',
        translation: 'Ravi de vous rencontrer !',
        breakdown: 'La première formule est idéale lors d\'une toute première rencontre.'
      },
      {
        korean: '감사합니다 (Formel) / 고마워요 (Poli courant)',
        romanization: 'Gam-sa-ham-ni-da / Go-ma-wo-yo',
        translation: 'Merci',
        breakdown: '감사합니다 est toujours un choix sûr et élégant partout.'
      }
    ],
    quiz: {
      question: 'Quel niveau de politesse devez-vous utiliser en arrivant dans un restaurant ou chez un commerçant à Séoul ?',
      options: [
        'Le 반말 (familier sans terminaison polie)',
        'Le 해요체 ou le 하십시오체 (terminaisons en ~요 ou ~습니다)',
        'Aucune importance, tous les styles sont acceptés',
        'Le tutoiement direct'
      ],
      correctIndex: 1,
      explanation: 'En société avec des commerçants ou des inconnus, on utilise toujours les formes polies (해요체 ou 하십시오체) pour témoigner son respect.'
    }
  }
];
