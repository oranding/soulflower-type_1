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
          relationshipType: '雙重委屈的沉默循環',
          insight: '兩個討好型在一起，常常會陷入「我先讓，你也讓」的表面和諧——雙方都害怕造成對方負擔，都習慣把自己的需求往後放。這種關係初期很少有衝突，但危險的地方在於：當兩個人都在等對方先開口說出真實感受，最後可能演變成兩個人都在委屈，卻沒有人先打破沉默，委屈越積越多，直到某一方先撐不住。',
          dialogueTip: '練習主動問對方：「你剛剛說沒關係，是真的沒關係，還是在讓我？」也練習誠實回答這個問題，而不是自動說「沒關係」。',
        };
      case '衝突航線':
        return {
          relationshipType: '兩套標準的正面對撞',
          insight: '兩個衝突型在一起，行動力跟目標感通常很強，能一起把事情做成——但因為雙方都習慣用自己的標準判斷對錯、都不容易退讓，一旦意見不同，很容易從「討論」升級成「較勁」。表面上是在爭對錯，底層其實常常是「誰的方式才是對的、誰要聽誰的」這種掌控權的角力，如果沒有意識到這一點，關係容易在一次次的正面交鋒中互相消耗。',
          dialogueTip: '吵起來的時候先問自己：「我現在是想解決問題，還是想贏？」也試著明確跟對方說：「我不是要證明你錯，我是想把事情做好。」',
        };
      case '逃避航線':
        return {
          relationshipType: '各自安好的疏離風險',
          insight: '兩個逃避型在一起，通常很少吵架，也很懂得給彼此空間，相處起來輕鬆自在——但這也是風險所在：當關係裡出現真正需要面對的問題時，雙方都傾向往後退、都不想是那個先開口的人，問題可能就這樣被擱置、被繞過，一年一年累積下來，關係看起來平靜，實際上兩人的距離已經越拉越遠，直到某一天才發現彼此已經很久沒有真正談過心。',
          dialogueTip: '定期約定一個「一定要談」的時間，不是等到問題大到躲不掉才被迫面對，而是主動創造一個安全的、有預期心理的談話空間。',
        };
    }
  }

  // Mixed airlines
  const pair = [a1, a2].sort().join(' + ');

  if (pair === '討好航線 + 衝突航線') {
    return {
      relationshipType: '溫度與力道的角力',
      insight: '討好方習慣把關係的和諧放在第一位，衝突方習慣把「把事情做對」放在第一位——衝突來臨時，討好方容易一再退讓、把委屈吞下去，直到某天突然情緒潰堤，讓衝突方措手不及；衝突方則容易把討好方的沉默誤讀成「沒意見」，直到關係已經出現裂痕才發現對方其實一直在忍耐。',
      dialogueTip: '討好方練習在還沒到臨界點前就說出真實感受，衝突方練習在對方沉默時主動確認「你真的沒問題嗎」，而不是預設沉默等於同意。',
    };
  } else if (pair === '逃避航線 + 討好航線') {
    return {
      relationshipType: '追與逃的循環',
      insight: '這是臨床上最常見、也最容易卡住的組合之一。討好方害怕被拋下，壓力一來會更用力地靠近、追問、想確認關係還在；逃避方害怕被吞沒，壓力一來會更用力地抽離、沉默、想要喘息空間。討好方越追，逃避方越想逃；逃避方越逃，討好方越慌張地追——如果沒有意識到這個循環，雙方都會在關係裡感覺筋疲力盡，卻說不出問題出在哪裡。',
      dialogueTip: '討好方練習在對方沉默時，先穩住自己的焦慮，而不是立刻追問；逃避方練習在想抽離之前，先說一句「我需要一點時間，但我沒有要離開」。',
    };
  } else {
    // 衝突航線 + 逃避航線
    return {
      relationshipType: '直球對決與消音抽離',
      insight: '衝突方習慣正面處理、快速解決，遇到問題時會想立刻攤開來講清楚；逃避方習慣先躲開、先讓自己冷靜，面對正面衝撞時，第一反應是關閉溝通。這往往會讓衝突方覺得「他根本不在乎、不想解決」，逃避方則覺得「他一直逼我，我沒有喘息的空間」——雙方都覺得自己在努力，卻用著讓對方更受傷的方式。',
      dialogueTip: '衝突方練習給對方一段「先冷靜」的空間，而不是追著要答案；逃避方練習在抽離前先說明「我不是不處理，我需要先讓自己平靜下來」。',
    };
  }
}
