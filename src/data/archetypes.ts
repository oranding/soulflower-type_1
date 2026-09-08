import { ArchetypeInfo, ArchetypeNumber, AirlineType } from '../types';

export const ARCHETYPES: Record<ArchetypeNumber, ArchetypeInfo> = {
  2: {
    number: 2,
    name: '情感劇場導演',
    airline: '討好航線',
    description: '你天生敏感又有同理心，容易把別人的需求放在自己前面，但你的成長方向是學會分清需求。',
    growthFocus: '學會分清需求，將同理心留一份給自己',
    energyQuality: '溫柔共感・細膩敏銳',
    interactionStyle: '在關係中敏察氛圍，擅長照料他人情緒',
  },
  3: {
    number: 3,
    name: '耀眼明星',
    airline: '衝突航線',
    description: '你樂觀有魅力，但容易被外在掌聲綁架，你的成長方向是建立內在穩定感。',
    growthFocus: '建立內在穩定感，不因外界掌聲而起伏',
    energyQuality: '明朗活躍・激勵人心',
    interactionStyle: '展現光彩與魅力，渴望被看見與肯定',
  },
  4: {
    number: 4,
    name: '匠心工藝師',
    airline: '衝突航線',
    description: '你追求完美，但容易被僵化壓力卡住，你的成長方向是學會允許80%就很好。',
    growthFocus: '學會允許80%就很好，擁抱過程中的彈性',
    energyQuality: '專注嚴謹・深思篤行',
    interactionStyle: '恪守原則與標準，渴望細膩無瑕的產出',
  },
  5: {
    number: 5,
    name: '魅力冒險家',
    airline: '逃避航線',
    description: '你創意十足，但常分心，你的成長方向是穩定情緒、專注落地。',
    growthFocus: '穩定情緒、專注落地，讓好點子生根發芽',
    energyQuality: '靈動多變・好奇熱忱',
    interactionStyle: '追求新鮮感與自由空間，不喜被沉悶拘束',
  },
  6: {
    number: 6,
    name: '守護騎士',
    airline: '討好航線',
    description: '你重視安全與信任，但常因擔心而過度確認，你的成長方向是把安全感放回自己身上。',
    growthFocus: '把安全感放回自己身上，建立對自我內在的信任',
    energyQuality: '忠實負責・穩重安心',
    interactionStyle: '重視約定與關係穩定，以守護他人為己任',
  },
  7: {
    number: 7,
    name: '神秘旅人',
    airline: '逃避航線',
    description: '你熱愛探索卻害怕連結，你的成長方向是找到在人際中的安心感。',
    growthFocus: '找到在人際中的安心感，勇敢建立深刻連結',
    energyQuality: '獨立思維・深刻沉靜',
    interactionStyle: '保有一方心靈淨土，在寧靜中深思與探索',
  },
  8: {
    number: 8,
    name: '愛的領袖',
    airline: '討好航線',
    description: '你優雅又追求認同，但常壓抑真實需求，你的成長方向是允許自己不完美。',
    growthFocus: '允許自己不完美，坦然接納真實脆弱的自己',
    energyQuality: '大度包容・協調凝聚',
    interactionStyle: '以愛引導與凝聚大家，渴望營造和諧群體',
  },
  9: {
    number: 9,
    name: '創意設計師',
    airline: '逃避航線',
    description: '你靈感無限，但常停在想像不敢行動，你的成長方向是把創意轉化為行動。',
    growthFocus: '把創意轉化為行動，邁出實踐的第一步',
    energyQuality: '富有想像・直覺敏銳',
    interactionStyle: '在意念中構築豐富世界，偏好以柔和方式互動',
  },
  10: {
    number: 10,
    name: '開拓先鋒',
    airline: '衝突航線',
    description: '你熱情果敢，但容易衝動自我破壞，你的成長方向是學會管理能量。',
    growthFocus: '學會管理能量，讓熱情長久持續不燃燒殆盡',
    energyQuality: '破浪前進・勇毅篤定',
    interactionStyle: '直率開創，面對阻礙勇於正面突破',
  },
};

export const AIRLINES_INFO: Record<
  AirlineType,
  {
    name: AirlineType;
    types: ArchetypeNumber[];
    theme: string;
    summary: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentColor: string;
    cardBg: string;
  }
> = {
  討好航線: {
    name: '討好航線',
    types: [2, 6, 8],
    theme: '關係與連結・給予與守護',
    summary: '傾向透過敏察他人、照料需求或維持群體穩定來建立歸屬感。學習焦點在於「回歸自己，守護內在邊界」。',
    badgeBg: 'bg-[#EAF3EC]',
    badgeText: 'text-[#2D5A3C]',
    badgeBorder: 'border-[#A3C9AE]',
    accentColor: '#437A52',
    cardBg: 'bg-[#F2F7F3]',
  },
  衝突航線: {
    name: '衝突航線',
    types: [3, 4, 10],
    theme: '標準與突破・意志與前行',
    summary: '傾向透過明確的主張、自我標準、追求卓越或直接行動來確認價值。學習焦點在於「包容彈性，安頓內在身心」。',
    badgeBg: 'bg-[#FBF0E6]',
    badgeText: 'text-[#8A481B]',
    badgeBorder: 'border-[#E6BA9A]',
    accentColor: '#9C5824',
    cardBg: 'bg-[#FAF4ED]',
  },
  逃避航線: {
    name: '逃避航線',
    types: [5, 7, 9],
    theme: '空間與自由・探索與想像',
    summary: '傾向藉由保持心理界限、探索新奇、抽離紛擾或在想像中沈澱來保護心靈。學習焦點在於「勇敢落地，踏實連結」。',
    badgeBg: 'bg-[#EBF3F5]',
    badgeText: 'text-[#245866]',
    badgeBorder: 'border-[#A1C9D2]',
    accentColor: '#366F7E',
    cardBg: 'bg-[#F2F7F9]',
  },
};

export function getAirlineDynamics(a1: AirlineType, a2: AirlineType): {
  relationshipType: string;
  insight: string;
  dialogueTip: string;
} {
  if (a1 === a2) {
    switch (a1) {
      case '討好航線':
        return {
          relationshipType: '同航線共振：雙倍溫柔與彼此照顧',
          insight: '你們都極富同理心，非常在意對方的感受與需求，相處氛圍溫暖體貼。但需要留意雙方是否都在默默隱忍自己的真實想法。',
          dialogueTip: '試著主動對彼此說：「不用擔心麻煩我，直接告訴我你現在最想要什麼吧！」',
        };
      case '衝突航線':
        return {
          relationshipType: '同航線共振：強強對話與目標驅動',
          insight: '你們做事目標明確、標準清晰且行動力十足，能激發彼此的潛能。需留意意見不合時的直率強度，避免無意間形成角力。',
          dialogueTip: '在討論分歧時先暫停三秒鐘，互相確認：「我們共同的目標是什麼？我們是同一隊的。」',
        };
      case '逃避航線':
        return {
          relationshipType: '同航線共振：尊重空間與靈魂自由',
          insight: '你們彼此都非常理解「需要個人沈靜空間」的珍貴，不會互相過度捆綁。需留意當遇上需要面對的問題時，別雙雙退回自己的安全洞穴。',
          dialogueTip: '約定一個固定的對話時間，讓交流安心著陸，在保有自我的同時持續牽著手。',
        };
    }
  }

  // Mixed airlines
  const pair = [a1, a2].sort().join(' + ');

  if (pair === '討好航線 + 衝突航線') {
    return {
      relationshipType: '互補交織：溫度與力道的交響',
      insight: '討好航線帶來人際的溫度、包容與傾聽；衝突航線帶來推進的動力、標準與開拓。衝突方給予討好方堅定的力量，討好方則潤滑了衝突方的稜角。',
      dialogueTip: '衝突方可放慢語調給予肯定，討好方可大膽直率表達心中底線。',
    };
  } else if (pair === '逃避航線 + 討好航線') {
    return {
      relationshipType: '互補交織：空間與陪伴的調和',
      insight: '討好航線熱情關照，逃避航線需要呼吸留白。如果討好方過度關心，逃避方容易退縮；但若理解彼此特質，這是一段既能深刻陪伴又能各自獨立的美好關係。',
      dialogueTip: '討好方給予足夠的等待與信任，逃避方在退回沈澱前先給予一句明確安心的回應。',
    };
  } else {
    // 衝突航線 + 逃避航線
    return {
      relationshipType: '互補交織：行動推進與深思遠見',
      insight: '衝突航線善於破局直行，逃避航線善於跳脫思維尋找新視角。衝突方能帶動逃避方落地實踐，逃避方則提醒衝突方避免盲衝，看見更廣袤的風景。',
      dialogueTip: '衝突方多留一點時間傾聽逃避方的洞察，逃避方試著在衝突方的節奏中邁出小步嘗試。',
    };
  }
}
