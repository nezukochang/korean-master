// Dialogues immersifs en société coréenne et étiquette culturelle

export interface DialogueTurn {
  speaker: string;
  isUser: boolean;
  korean: string;
  romanization: string;
  french: string;
  notes?: string;
}

export interface Scenario {
  id: string;
  title: string;
  icon: string;
  badge: string;
  location: string;
  culturalTip: {
    title: string;
    description: string;
  };
  turns: DialogueTurn[];
  practiceChallenge: {
    prompt: string;
    expectedKorean: string;
    hint: string;
  };
}

export const SOCIETAL_SCENARIOS: Scenario[] = [
  {
    id: 'cafe-order',
    title: 'Commander au Café / Starbucks',
    icon: 'Coffee',
    badge: 'Essentiel Quotidien',
    location: 'Café branché à Hongdae, Séoul',
    culturalTip: {
      title: 'L\'amour national pour le Iced Americano (아아)',
      description: 'En Corée, même au cœur de l\'hiver sous -10°C, les gens commandent des cafés glacés. On dit souvent "얼죽아" (mort de froid mais fidèle au café glacé !). Tendez toujours votre carte bancaire ou recevez votre gobelet avec les DEUX MAINS pour montrer le respect.'
    },
    turns: [
      {
        speaker: 'Barista',
        isUser: false,
        korean: '어서 오세요! 주문하시겠어요?',
        romanization: 'Eo-seo o-se-yo! Ju-mun-ha-si-ge-sseo-yo?',
        french: 'Bienvenue ! Que souhaitez-vous commander ?',
        notes: 'Salutation chaleureuse standard dans tous les commerces.'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '아이스 아메리카노 한 잔 주세요.',
        romanization: 'A-i-seu a-me-ri-ka-no han jan ju-se-yo.',
        french: 'Un café Americano glacé s\'il vous plaît.',
        notes: '한 잔 (han jan) = un verre / une tasse. 주세요 (ju-se-yo) = donnez-moi s\'il vous plaît.'
      },
      {
        speaker: 'Barista',
        isUser: false,
        korean: '드시고 가세요, 아니면 포장이세요?',
        romanization: 'Deu-si-go ga-se-yo, a-ni-myeon po-jang-i-se-yo?',
        french: 'Sur place ou à emporter ?'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '포장해 주세요. 영수증은 버려 주세요.',
        romanization: 'Po-jang-hae ju-se-yo. Yeong-su-jeung-eun beo-ryeo ju-se-yo.',
        french: 'À emporter s\'il vous plaît. Vous pouvez jeter le ticket de caisse.'
      },
      {
        speaker: 'Barista',
        isUser: false,
        korean: '네, 결제 도와드리겠습니다. 5,000원입니다.',
        romanization: 'Ne, gyeol-je do-wa-deu-ri-ge-sseum-ni-da. O-cheon-won-im-ni-da.',
        french: 'Très bien, je prends votre paiement. Cela fait 5 000 wons.'
      }
    ],
    practiceChallenge: {
      prompt: 'Comment demandez-vous "Deux cafés latte chauds s\'il vous plaît" ?',
      expectedKorean: '따뜻한 라떼 두 잔 주세요',
      hint: 'Utilisez "두 잔" (deux tasses) et "주세요" (s\'il vous plaît).'
    }
  },
  {
    id: 'restaurant-bbq',
    title: 'Au Restaurant Traditionnel (Samgyeopsal / BBQ)',
    icon: 'Utensils',
    badge: 'Vie Sociale',
    location: 'Restaurant animé de viandes grillées à Gangnam',
    culturalTip: {
      title: 'Comment appeler le serveur sans hésiter',
      description: 'En Corée, les serveurs ne viennent pas vous interrompre toutes les 5 minutes. Sur chaque table se trouve souvent un bouton d\'appel (벨) ! S\'il n\'y en a pas, levez la main et dites distinctement "여기요!" (Yeo-gi-yo! = "Ici s\'il vous plaît !") ou "사장님!" (Sa-jang-nim! = "Patron !"). Tous les accompagnements (반찬 - banchan) et l\'eau sont gratuits et rechargeables à volonté.'
    },
    turns: [
      {
        speaker: 'Vous',
        isUser: true,
        korean: '여기요! 삼겹살 2인분 주세요.',
        romanization: 'Yeo-gi-yo! Sam-gyeop-sal i-in-bun ju-se-yo.',
        french: 'Excusez-moi ! Deux portions de poitrine de porc grillée (samgyeopsal) s\'il vous plaît.'
      },
      {
        speaker: 'Serveur',
        isUser: false,
        korean: '네! 음료는 뭐로 드릴까요?',
        romanization: 'Ne! Eum-ryo-neun mwo-ro deu-ril-kka-yo?',
        french: 'Entendu ! Que désirez-vous comme boisson ?'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '물하고 사이다 하나 주세요. 덜 맵게 해 주세요.',
        romanization: 'Mul-ha-go sa-i-da ha-na ju-se-yo. Deol maep-ge hae ju-se-yo.',
        french: 'De l\'eau et un cidre (limonade coréenne) s\'il vous plaît. Faites-le moins piquant s\'il vous plaît.'
      },
      {
        speaker: 'Serveur',
        isUser: false,
        korean: '네, 알겠습니다. 맛있게 드세요!',
        romanization: 'Ne, al-ge-sseum-ni-da. Ma-si-kke deu-se-yo!',
        french: 'Parfait, c\'est noté. Bon appétit !'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '잘 먹겠습니다! 정말 맛있어요.',
        romanization: 'Jal meok-ge-sseum-ni-da! Jeong-mal ma-si-sseo-yo.',
        french: 'Merci pour ce repas ! C\'est vraiment délicieux.'
      }
    ],
    practiceChallenge: {
      prompt: 'Comment demander "Encore un peu de kimchi s\'il vous plaît" ?',
      expectedKorean: '김치 좀 더 주세요',
      hint: '"더 주세요" (deo ju-se-yo) signifie "donnez-m\'en encore un peu plus svp".'
    }
  },
  {
    id: 'subway-travel',
    title: 'Prendre le Métro & T-Money',
    icon: 'Train',
    badge: 'Déplacements',
    location: 'Station de métro Myeongdong',
    culturalTip: {
      title: 'Le respect dans les transports en commun',
      description: 'Le métro de Séoul est l\'un des plus modernes et propres au monde. Il est strictement interdit d\'occuper les sièges réservés aux personnes âgées ou femmes enceintes (aux extrémités des rames), même s\'ils sont vides ! On évite également de parler fort au téléphone.'
    },
    turns: [
      {
        speaker: 'Vous',
        isUser: true,
        korean: '실례합니다, 홍대입구역은 어느 쪽이에요?',
        romanization: 'Sil-lye-ham-ni-da, Hong-dae-ip-gu-yeok-eun eo-neu jjo-gi-e-yo?',
        french: 'Excusez-moi, de quel côté se trouve la station Hongdae ?'
      },
      {
        speaker: 'Passant',
        isUser: false,
        korean: '2호선을 타셔야 해요. 저쪽 계단으로 내려가세요.',
        romanization: 'I-ho-seon-eul ta-syeo-ya hae-yo. Jeo-jjok gye-dan-eu-ro nae-ryeo-ga-se-yo.',
        french: 'Vous devez prendre la ligne 2. Descendez par ces escaliers là-bas.'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '티머니 카드는 어디서 충전해요?',
        romanization: 'Ti-meo-ni ka-deu-neun eo-di-seo chung-jeon-hae-yo?',
        french: 'Où puis-je recharger ma carte T-Money ?'
      },
      {
        speaker: 'Passant',
        isUser: false,
        korean: '개찰구 옆에 자동 발매기가 있어요. 편의점에서도 돼요.',
        romanization: 'Gae-chal-gu yeo-pe ja-dong bal-mae-gi-ga i-sseo-yo. Pyeon-ui-jeom-e-seo-do dwae-yo.',
        french: 'Il y a des bornes automatiques à côté des portillons. Vous pouvez aussi le faire en supérette.'
      },
      {
        speaker: 'Vous',
        isUser: true,
        korean: '친절하게 알려주셔서 감사합니다!',
        romanization: 'Chin-jeol-ha-ge al-lyeo-ju-syeo-seo gam-sa-ham-ni-da!',
        french: 'Merci beaucoup pour vos explications bienveillantes !'
      }
    ],
    practiceChallenge: {
      prompt: 'Comment dire "Où sont les toilettes s\'il vous plaît ?"',
      expectedKorean: '화장실이 어디예요?',
      hint: '화장실 (toilettes) + 어디예요 (où est-ce ?).'
    }
  }
];
