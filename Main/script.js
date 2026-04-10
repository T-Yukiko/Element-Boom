const ELEMENTS = {
  metal: { id: "metal", name: "金", label: "金属", symbol: "金", css: "element-metal", description: "稳健防御，适合抵挡高伤害招式。" },
  wood: { id: "wood", name: "木", label: "木灵", symbol: "木", css: "element-wood", description: "兼顾伤害与回复，适合拉回节奏。" },
  water: { id: "water", name: "水", label: "寒潮", symbol: "水", css: "element-water", description: "高额冲击，并有机会冻结 Boss。" },
  fire: { id: "fire", name: "火", label: "烈焰", symbol: "火", css: "element-fire", description: "最直接的爆发伤害。" },
  earth: { id: "earth", name: "土", label: "磐岩", symbol: "土", css: "element-earth", description: "提供护盾，用来硬抗强力攻击。" },
  aether: { id: "aether", name: "以太", label: "★", symbol: "★", css: "element-aether", description: "一种神秘的元素，有意想不到的作用。" },
};

const ELEMENT_ORDER = ["metal", "wood", "water", "fire", "earth", "aether"];
const ENHANCEABLE_ELEMENTS = ["metal", "wood", "water", "fire", "earth"];
const MAX_DIE_FACE_LEVEL = 3;
const BASE_PLAYER_HP = 100;
const MAX_BOSS_HP = 200;
const MAX_TURNS = 6;
const DICE_COUNT = 5;
const TOTAL_REROLLS = 5;
const FIRST_LEVEL_CLEAR_GOLD = 4;
const THIRD_LEVEL_CLEAR_GOLD = 6;
const COIN_BAG_GOLD = 5;
const TREASURE_DRAW_COUNT = 3;
const SHOP_ITEM_PRICE = 4;
const SHOP_SKILL_CARD_PRICE = 6;
const SHOP_RELIC_PRICE = 10;
const MAP_THEMES = ["theme-forest", "theme-tundra", "theme-lava", "theme-castle"];
const NODE_KEYS = {
  forest_1_1: "forest_1_1",
  forest_1_2: "forest_1_2",
  forest_1_3: "forest_1_3",
  forest_1_4: "forest_1_4",
  forest_1_5: "forest_1_5",
  forest_1_6: "forest_1_6",
};

const ELEMENT_TIER_NAMES = {
  metal: ["金", "钢", "陨"],
  wood: ["木", "森", "苍"],
  water: ["水", "冰", "霜"],
  fire: ["火", "炎", "焱"],
  earth: ["土", "岩", "磐"],
  aether: ["以太"],
};

const MAP_PAGES = [
  {
    id: "forest",
    name: "迷雾森林",
    subtitle: "古树、残碑与潮湿石径交织成最初的试炼路线。",
    hint: "点击 1-1 进入 Boss 战。首通后开启 1-2 宝箱，宝箱领取后开放 1-3 迅猛狼群。",
    points: [{ x: 12, y: 78 }, { x: 24, y: 62 }, { x: 39, y: 70 }, { x: 53, y: 54 }, { x: 67, y: 63 }, { x: 80, y: 46 }, { x: 66, y: 28 }, { x: 48, y: 34 }, { x: 29, y: 20 }, { x: 14, y: 36 }],
  },
  {
    id: "tundra",
    name: "冰雪荒原",
    subtitle: "寒风切过废土，后续章节将在这里继续展开。",
    hint: "该章节暂未开放，先完成迷雾森林的内容。",
    points: [{ x: 14, y: 74 }, { x: 30, y: 60 }, { x: 47, y: 68 }, { x: 63, y: 52 }, { x: 80, y: 58 }, { x: 74, y: 36 }, { x: 56, y: 26 }, { x: 38, y: 34 }, { x: 24, y: 18 }, { x: 12, y: 28 }],
  },
  {
    id: "lava",
    name: "熔岩地窟",
    subtitle: "灼热裂谷深处仍在等待新的敌人与事件。",
    hint: "该章节暂未开放。",
    points: [{ x: 14, y: 80 }, { x: 28, y: 66 }, { x: 42, y: 74 }, { x: 58, y: 58 }, { x: 74, y: 68 }, { x: 82, y: 46 }, { x: 68, y: 32 }, { x: 50, y: 24 }, { x: 34, y: 34 }, { x: 20, y: 18 }],
  },
  {
    id: "castle",
    name: "末日城堡",
    subtitle: "终章地图已预留，等待后续扩展。",
    hint: "该章节暂未开放。",
    points: [{ x: 16, y: 82 }, { x: 28, y: 68 }, { x: 40, y: 76 }, { x: 52, y: 62 }, { x: 64, y: 70 }, { x: 76, y: 54 }, { x: 68, y: 34 }, { x: 52, y: 22 }, { x: 36, y: 30 }, { x: 22, y: 18 }],
  },
];

const ITEM_DEFS = {
  blue_pill: { id: "blue_pill", name: "蓝色药丸", short: "行动 +1", icon: "B", css: "blue", description: "战斗内使用，额外获得 1 次出骰机会。" },
  red_pill: { id: "red_pill", name: "红色药丸", short: "重掷 +2", icon: "R", css: "red", description: "战斗内使用，增加 2 次重掷次数。" },
  green_pill: { id: "green_pill", name: "绿色药丸", short: "回复 50%", icon: "G", css: "green", description: "战斗内使用，恢复 50 点生命。" },
  yellow_pill: { id: "yellow_pill", name: "黄色药丸", short: "冻结行动", icon: "Y", css: "yellow", description: "战斗内使用，冻结 Boss 下一次行动。" },
};

const RELIC_DEFS = {
  wolf_tooth: {
    id: "wolf_tooth",
    name: "迅猛狼之牙",
    short: "全伤害 +10",
    icon: "牙",
    description: "整轮游戏生效。你造成的所有伤害提升 10 点。",
  },
  wolf_skin: {
    id: "wolf_skin",
    name: "迅猛狼之皮",
    short: "生命上限 +50",
    icon: "皮",
    description: "整轮游戏生效。生命上限永久提升 50 点。",
  },
  wolf_eye: {
    id: "wolf_eye",
    name: "迅猛狼之眼",
    short: "重掷 +1",
    icon: "瞳",
    description: "整轮游戏生效。所有关卡的基础重掷次数永久 +1。",
  },
};

const SHOP_RELIC_DEFS = {
  hero_chain: {
    id: "hero_chain",
    name: "勇者之链",
    short: "每关出骰 +1",
    icon: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="chainGold" x1="0" x2="1">
            <stop offset="0%" stop-color="#fff1bf" />
            <stop offset="100%" stop-color="#d7a84f" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#chainGold)" stroke-width="6" stroke-linecap="round">
          <path d="M22 22c4-4 10-4 14 0s4 10 0 14l-8 8c-4 4-10 4-14 0s-4-10 0-14" />
          <path d="M42 42c-4 4-10 4-14 0s-4-10 0-14l8-8c4-4 10-4 14 0s4 10 0 14" />
        </g>
      </svg>
    `,
    description: "永久生效。每个战斗关会在基础出骰次数上额外增加 1 次行动回合。",
  },
  starlight_eye: {
    id: "starlight_eye",
    name: "星光之眼",
    short: "开局必有三同",
    icon: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <radialGradient id="starEyeCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fefefe" />
            <stop offset="55%" stop-color="#9ad4ff" />
            <stop offset="100%" stop-color="#436bba" />
          </radialGradient>
        </defs>
        <path d="M8 32c7-10 15-15 24-15s17 5 24 15c-7 10-15 15-24 15S15 42 8 32Z" fill="none" stroke="#dcecff" stroke-width="4"/>
        <circle cx="32" cy="32" r="10" fill="url(#starEyeCore)" />
        <path d="M32 16l2.5 6.5L41 25l-6.5 2.5L32 34l-2.5-6.5L23 25l6.5-2.5Z" fill="#fff3b5" opacity="0.95"/>
      </svg>
    `,
    description: "永久生效。每次战斗开始时，初始骰子池一定至少出现 3 颗相同的骰子。",
  },
  night_cloak: {
    id: "night_cloak",
    name: "暗夜斗篷",
    short: "首伤免疫",
    icon: `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="cloakNight" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#bcc6ff" />
            <stop offset="45%" stop-color="#5360a8" />
            <stop offset="100%" stop-color="#171d38" />
          </linearGradient>
        </defs>
        <path d="M32 10c6 7 12 10 18 11-1 17-5 27-18 33C19 48 15 38 14 21c6-1 12-4 18-11Z" fill="url(#cloakNight)" />
        <path d="M32 10v44" stroke="rgba(255,255,255,0.28)" stroke-width="2" />
        <circle cx="43" cy="20" r="3" fill="#eef3ff" />
      </svg>
    `,
    description: "永久生效。每个战斗关中，你受到的第一次伤害会被完全免疫。",
  },
};

const BATTLE_CONFIGS = {
  [NODE_KEYS.forest_1_1]: {
    nodeKey: NODE_KEYS.forest_1_1,
    heroEyebrow: "第一关 / Boss Battle",
    heroTitle: "元素骰境：石像守卫",
    heroSubtitle: "在 6 回合内击碎石像守卫，利用 5 枚元素骰子拼出技能，压制 Boss 节奏。",
    bossName: "石像守卫",
    bossMaxHp: 200,
    plays: 6,
    rerolls: 5,
    rewardType: "treasure",
    rewardGold: FIRST_LEVEL_CLEAR_GOLD,
    introLog: "战斗开始。石像守卫从遗迹中苏醒，你先手行动。",
    chooseBossAction() {
      const roll = Math.random();
      if (roll < 0.5) return { id: "attack", label: "普通攻击", value: 20 };
      if (roll < 0.7) return { id: "slam", label: "蓄力重击", value: 50 };
      return { id: "heal", label: "生命恢复", value: 30 };
    },
  },
  [NODE_KEYS.forest_1_3]: {
    nodeKey: NODE_KEYS.forest_1_3,
    heroEyebrow: "第三关 / 狼群试炼",
    heroTitle: "元素骰境：迅猛狼群",
    heroSubtitle: "三只迅猛狼会轮番上阵。每只狼 80 生命，全部击败才算胜利。",
    bossName: "迅猛狼群",
    bossMaxHp: 80,
    bossCount: 3,
    plays: 10,
    rerolls: 10,
    rewardType: "wolf_relic",
    rewardGold: THIRD_LEVEL_CLEAR_GOLD,
    introLog: "第三关开始。迅猛狼群正分批扑杀而来，必须连续击败三只狼才能脱身。",
    chooseBossAction() {
      const pattern = [
        { id: "attack", label: "利爪撕咬", value: 30 },
        { id: "attack", label: "利爪撕咬", value: 30 },
        { id: "heal", label: "野性咆哮", value: 20 },
      ];
      return { ...pattern[state.bossPatternIndex % pattern.length] };
    },
  },
};

const TREASURE_POOL = [
  { id: "blue_pill", type: "item" },
  { id: "red_pill", type: "item" },
  { id: "green_pill", type: "item" },
  { id: "yellow_pill", type: "item" },
  { id: "mid_skill_card", type: "skill_card" },
  { id: "coin_bag", type: "coins" },
];

const MEDIUM_SKILLS = {
  metal4: { id: "metal4", element: "metal", count: 4, name: "钢铁穿刺", description: "四个金：造成 60 点伤害，并返还 1 次出骰机会。", resolve: () => ({ damageBoss: 60, refundPlay: 1 }) },
  wood4: { id: "wood4", element: "wood", count: 4, name: "光合治愈", description: "四个木：恢复 50 点生命。", resolve: () => ({ healPlayer: 50 }) },
  water4: { id: "water4", element: "water", count: 4, name: "寒冰壁障", description: "四个水：获得 80 点护盾，持续 3 次 Boss 行动。", resolve: () => ({ shield: 80, shieldTurns: 3 }) },
  fire4: { id: "fire4", element: "fire", count: 4, name: "烈焰裁决", description: "四个火：自身失去 30 点生命，对 Boss 造成 150 点伤害。", resolve: () => ({ selfDamage: 30, damageBoss: 150 }) },
  earth4: { id: "earth4", element: "earth", count: 4, name: "巨石封印", description: "四个土：Boss 造成的伤害永久降低 20 点。", resolve: () => ({ reduceBossDamage: 20 }) },
};

const dom = {
  heroEyebrow: document.querySelector("#heroEyebrow"),
  heroTitle: document.querySelector("#heroTitle"),
  heroSubtitle: document.querySelector("#heroSubtitle"),
  mapView: document.querySelector("#mapView"),
  eventView: document.querySelector("#eventView"),
  shopView: document.querySelector("#shopView"),
  libraryView: document.querySelector("#libraryView"),
  battleView: document.querySelector("#battleView"),
  mapButton: document.querySelector("#mapButton"),
  pauseButton: document.querySelector("#pauseButton"),
  helpButton: document.querySelector("#helpButton"),
  restartButton: document.querySelector("#restartButton"),
  audioButton: document.querySelector("#audioButton"),
  mapRegionTitle: document.querySelector("#mapRegionTitle"),
  mapRegionText: document.querySelector("#mapRegionText"),
  mapCard: document.querySelector("#mapCard"),
  mapPageTitle: document.querySelector("#mapPageTitle"),
  mapPageMeta: document.querySelector("#mapPageMeta"),
  mapPrevButton: document.querySelector("#mapPrevButton"),
  mapNextButton: document.querySelector("#mapNextButton"),
  mapChapterRow: document.querySelector("#mapChapterRow"),
  mapScene: document.querySelector("#mapScene"),
  mapPathSvg: document.querySelector("#mapPathSvg"),
  mapNodes: document.querySelector("#mapNodes"),
  mapHint: document.querySelector("#mapHint"),
  goldCount: document.querySelector("#goldCount"),
  eventEyebrow: document.querySelector("#eventEyebrow"),
  eventTitle: document.querySelector("#eventTitle"),
  eventText: document.querySelector("#eventText"),
  eventBackButton: document.querySelector("#eventBackButton"),
  eventStatus: document.querySelector("#eventStatus"),
  rewardChoices: document.querySelector("#rewardChoices"),
  shopEyebrow: document.querySelector("#shopEyebrow"),
  shopTitle: document.querySelector("#shopTitle"),
  shopText: document.querySelector("#shopText"),
  shopStatus: document.querySelector("#shopStatus"),
  shopConsumables: document.querySelector("#shopConsumables"),
  shopSkillCard: document.querySelector("#shopSkillCard"),
  shopRelics: document.querySelector("#shopRelics"),
  shopBackButton: document.querySelector("#shopBackButton"),
  shopLeaveButton: document.querySelector("#shopLeaveButton"),
  libraryEyebrow: document.querySelector("#libraryEyebrow"),
  libraryTitle: document.querySelector("#libraryTitle"),
  libraryText: document.querySelector("#libraryText"),
  libraryStatus: document.querySelector("#libraryStatus"),
  libraryChoices: document.querySelector("#libraryChoices"),
  libraryBackButton: document.querySelector("#libraryBackButton"),
  turnCounter: document.querySelector("#turnCounter"),
  bossPortrait: document.querySelector(".boss-portrait"),
  playerHpLabel: document.querySelector("#playerHpLabel"),
  playerHpBar: document.querySelector("#playerHpBar"),
  bossHpLabel: document.querySelector("#bossHpLabel"),
  bossHpBar: document.querySelector("#bossHpBar"),
  metalState: document.querySelector("#metalState"),
  shieldState: document.querySelector("#shieldState"),
  freezeState: document.querySelector("#freezeState"),
  bossState: document.querySelector("#bossState"),
  bossIntent: document.querySelector("#bossIntent"),
  rerollCounter: document.querySelector("#rerollCounter"),
  playCounter: document.querySelector("#playCounter"),
  diceGrid: document.querySelector("#diceGrid"),
  rerollButton: document.querySelector("#rerollButton"),
  playButton: document.querySelector("#playButton"),
  clearButton: document.querySelector("#clearButton"),
  comboTitle: document.querySelector("#comboTitle"),
  comboDescription: document.querySelector("#comboDescription"),
  selectionSummary: document.querySelector("#selectionSummary"),
  itemBar: document.querySelector("#itemBar"),
  relicBar: document.querySelector("#relicBar"),
  skillList: document.querySelector("#skillList"),
  mediumSkillList: document.querySelector("#mediumSkillList"),
  phaseBadge: document.querySelector("#phaseBadge"),
  battleLog: document.querySelector("#battleLog"),
  fxStage: document.querySelector("#fxStage"),
  forecastCard: document.querySelector(".forecast-card"),
  forecastIcon: document.querySelector("#forecastIcon"),
  forecastTitle: document.querySelector("#forecastTitle"),
  forecastText: document.querySelector("#forecastText"),
  forecastBadge: document.querySelector("#forecastBadge"),
  guideTitle: document.querySelector("#guideTitle"),
  guideText: document.querySelector("#guideText"),
  toast: document.querySelector("#toast"),
  helpPanel: document.querySelector("#helpPanel"),
  closeHelpButton: document.querySelector("#closeHelpButton"),
  pauseOverlay: document.querySelector("#pauseOverlay"),
  resumeButton: document.querySelector("#resumeButton"),
  pauseHelpButton: document.querySelector("#pauseHelpButton"),
  overlay: document.querySelector("#overlay"),
  overlayEyebrow: document.querySelector("#overlayEyebrow"),
  overlayTitle: document.querySelector("#overlayTitle"),
  overlayText: document.querySelector("#overlayText"),
  overlayButton: document.querySelector("#overlayButton"),
};

const state = {
  currentView: "map",
  mapPage: 0,
  currentBattleKey: null,
  currentBattleConfig: null,
  currentEvent: null,
  eventChoices: [],
  shopStockRelics: [],
  shopSkillCardPurchased: false,
  completedNodes: new Set(),
  gold: 0,
  inventory: { blue_pill: 0, red_pill: 0, green_pill: 0, yellow_pill: 0 },
  relics: new Set(),
  shopRelics: new Set(),
  learnedMediumSkills: new Set(),
  runBonusMaxHp: 0,
  audioEnabled: true,
  paused: false,
  gameOver: false,
  overlayAction: "reset",
  bossTimerId: null,
  playerHp: BASE_PLAYER_HP,
  playerMaxHp: BASE_PLAYER_HP,
  bossHp: MAX_BOSS_HP,
  bossMaxHp: MAX_BOSS_HP,
  bossName: "石像守卫",
  bossWave: 1,
  bossCount: 1,
  bossPatternIndex: 0,
  bossDamageBoost: 1,
  turn: 1,
  rerollsLeft: TOTAL_REROLLS,
  playsLeft: MAX_TURNS,
  selectedDice: new Set(),
  dice: [],
  diceBlueprints: Array.from({ length: DICE_COUNT }, (_, index) => createDieBlueprint(index)),
  phase: "player",
  metalGuard: false,
  shieldHp: 0,
  shieldTurns: 0,
  bossFrozen: false,
  bossDamageReduction: 0,
  cloakGuard: false,
  nextBossAction: null,
};

const MASTER_VOLUME = 0.95;
let audioContext = null;
let masterGain = null;
let compressor = null;

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function applyStaticCopy() {
  document.title = "元素骰境：石像守卫";
  setText(".gold-display span", "金币");
  setText("#mapButton", "返回地图");
  setText("#pauseButton", "暂停");
  setText("#helpButton", "帮助");
  setText("#restartButton", "重新开始");
  setText("#audioButton", "音效：开");
  setText(".map-overview-card .board-label", "远征路线");
  const overviewPills = document.querySelectorAll(".map-overview-pill");
  if (overviewPills[0]) overviewPills[0].textContent = "4 张地图";
  if (overviewPills[1]) overviewPills[1].textContent = "每页 10 个地点";
  if (overviewPills[2]) overviewPills[2].textContent = "当前开放第 1 页";
  setText("#eventBackButton", "返回地图");
  setText(".forecast-card .board-label", "Boss 预告");
  setText(".guide-card .board-label", "新手提示");
  setText(".board-card .board-label", "当前骰池");
  setText("#rerollButton", "重掷所选骰子");
  setText("#playButton", "打出所选骰子");
  setText("#clearButton", "清空选择");
  const phaseBadges = document.querySelectorAll(".phase-badge");
  if (phaseBadges[0]) phaseBadges[0].textContent = "战斗内生效";
  if (phaseBadges[1]) phaseBadges[1].textContent = "玩家回合";
  if (phaseBadges[2]) phaseBadges[2].textContent = "战斗内生效";
  if (phaseBadges[3]) phaseBadges[3].textContent = "整局生效";
  setText(".rules-card .board-label", "技能列表");
  setText(".medium-skill-card .board-label", "已学中级技能");
  setText(".boss-rules-card .board-label", "Boss 规则");
  setText(".log-card .board-label", "战斗日志");
  setText("#closeHelpButton", "关闭");
  setText("#resumeButton", "继续战斗");
  setText("#pauseHelpButton", "查看帮助");
  setText("#overlayButton", "再来一局");
  const bossRules = document.querySelectorAll(".boss-rules-card li");
  if (bossRules[0]) bossRules[0].innerHTML = "<strong>普通攻击</strong>：20 伤害，50% 概率";
  if (bossRules[1]) bossRules[1].innerHTML = "<strong>蓄力重击</strong>：50 伤害，20% 概率";
  if (bossRules[2]) bossRules[2].innerHTML = "<strong>生命恢复</strong>：回复 30 生命，30% 概率";
  if (bossRules[3]) bossRules[3].innerHTML = "<strong>失败条件</strong>：玩家生命归零，或第 6 回合结束后 Boss 仍存活";
  const helpBlocks = document.querySelectorAll(".help-block");
  if (helpBlocks[0]) {
    helpBlocks[0].querySelector("h4").textContent = "基础规则";
    helpBlocks[0].querySelector("p").textContent = "每次你打出一批骰子后，只有被选中的那些会重新刷新，未选中的骰子会留在场上。";
  }
  if (helpBlocks[1]) {
    helpBlocks[1].querySelector("h4").textContent = "应对重击";
    helpBlocks[1].querySelector("p").textContent = "看到 Boss 预告蓄力重击时，优先凑三个金或三个土，稳住血线。";
  }
  if (helpBlocks[2]) {
    helpBlocks[2].querySelector("h4").textContent = "抢节奏";
    helpBlocks[2].querySelector("p").textContent = "Boss 准备回血时，是你打火、水或五以太终结的好机会。";
  }
  if (helpBlocks[3]) {
    helpBlocks[3].querySelector("h4").textContent = "收尾建议";
    helpBlocks[3].querySelector("p").textContent = "水和火适合压血，木能续航，土和金能保命，五个以太则直接终结战斗。";
  }
}

function randomElement() {
  return ELEMENT_ORDER[Math.floor(Math.random() * ELEMENT_ORDER.length)];
}

function cloneDieTiers(tiers = {}) {
  return Object.fromEntries(ELEMENT_ORDER.map((elementId) => [
    elementId,
    elementId === "aether"
      ? 1
      : Math.max(1, Math.min(MAX_DIE_FACE_LEVEL, tiers[elementId] || 1)),
  ]));
}

function createDieBlueprint(index) {
  return {
    id: `die-${index + 1}`,
    tiers: cloneDieTiers(),
  };
}

function ensureDieBlueprints() {
  if (Array.isArray(state.diceBlueprints) && state.diceBlueprints.length === DICE_COUNT) return;
  state.diceBlueprints = Array.from({ length: DICE_COUNT }, (_, index) => createDieBlueprint(index));
}

function createDie(index, blueprint = state.diceBlueprints?.[index]) {
  const safeBlueprint = blueprint || createDieBlueprint(index);
  return {
    id: safeBlueprint.id || `die-${index + 1}`,
    face: randomElement(),
    tiers: cloneDieTiers(safeBlueprint.tiers),
  };
}

function getDieFaceLevel(die, faceId = die?.face) {
  if (!die || !faceId || faceId === "aether") return 1;
  return Math.max(1, Math.min(MAX_DIE_FACE_LEVEL, die.tiers?.[faceId] || 1));
}

function getDieFaceTierName(faceId, level = 1) {
  const names = ELEMENT_TIER_NAMES[faceId] || [ELEMENTS[faceId]?.label || faceId];
  return names[Math.max(1, Math.min(level, names.length)) - 1] || names[0];
}

function getDieFaceDisplayLabel(die, faceId = die?.face) {
  return getDieFaceTierName(faceId, getDieFaceLevel(die, faceId));
}

function syncDieBlueprintsFromDice(dice = state.dice) {
  ensureDieBlueprints();
  dice.forEach((die, index) => {
    if (!state.diceBlueprints[index]) state.diceBlueprints[index] = createDieBlueprint(index);
    state.diceBlueprints[index].id = die.id;
    state.diceBlueprints[index].tiers = cloneDieTiers(die.tiers);
  });
}

function upgradeDieFace(dieId, elementId, amount = 1) {
  if (!ENHANCEABLE_ELEMENTS.includes(elementId)) return 0;
  ensureDieBlueprints();
  const blueprint = state.diceBlueprints.find((die) => die.id === dieId);
  if (!blueprint) return 0;
  const currentLevel = blueprint.tiers?.[elementId] || 1;
  const nextLevel = Math.max(1, Math.min(MAX_DIE_FACE_LEVEL, currentLevel + amount));
  if (nextLevel === currentLevel) return currentLevel;
  blueprint.tiers[elementId] = nextLevel;
  const liveDie = state.dice.find((die) => die.id === dieId);
  if (liveDie) liveDie.tiers[elementId] = nextLevel;
  return nextLevel;
}

function clearBossTimer() {
  if (state.bossTimerId) {
    window.clearTimeout(state.bossTimerId);
    state.bossTimerId = null;
  }
}

function hasCompleted(nodeKey) {
  return state.completedNodes.has(nodeKey);
}

function completeNode(nodeKey) {
  state.completedNodes.add(nodeKey);
}

function addGold(amount) {
  state.gold += amount;
  dom.goldCount.textContent = String(state.gold);
}

function addItem(itemId, count = 1) {
  state.inventory[itemId] = (state.inventory[itemId] || 0) + count;
}

function consumeItem(itemId) {
  if (!state.inventory[itemId]) return false;
  state.inventory[itemId] -= 1;
  return true;
}

function healPlayer(amount) {
  const before = state.playerHp;
  state.playerHp = Math.min(state.playerMaxHp, state.playerHp + amount);
  return state.playerHp - before;
}

function healBoss(amount) {
  state.bossHp = Math.min(state.bossMaxHp, state.bossHp + amount);
}

function damageBoss(amount) {
  state.bossHp = Math.max(0, state.bossHp - amount);
}

function damagePlayer(rawDamage) {
  let damage = Math.max(0, rawDamage - state.bossDamageReduction);
  if (state.metalGuard) {
    state.metalGuard = false;
    return 0;
  }
  if (state.shieldHp > 0) {
    const absorbed = Math.min(state.shieldHp, damage);
    state.shieldHp -= absorbed;
    damage -= absorbed;
  }
  state.playerHp = Math.max(0, state.playerHp - damage);
  return damage;
}

function consumeShieldTurn() {
  if (state.shieldTurns <= 0) return;
  state.shieldTurns -= 1;
  if (state.shieldTurns <= 0) {
    state.shieldTurns = 0;
    state.shieldHp = 0;
  }
}

function addLog(type, message) {
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.innerHTML = message;
  dom.battleLog.prepend(entry);
}

let toastTimer = null;
function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => dom.toast.classList.remove("show"), 1800);
}

function getCombatantAnchor(selector, side = "center") {
  const node = document.querySelector(selector);
  if (!node) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const rect = node.getBoundingClientRect();
  const anchors = {
    center: { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.5 },
    left: { x: rect.left + rect.width * 0.2, y: rect.top + rect.height * 0.5 },
    right: { x: rect.left + rect.width * 0.8, y: rect.top + rect.height * 0.5 },
    top: { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.24 },
  };
  return anchors[side] || anchors.center;
}

function applyTransientClass(selector, className, duration = 900) {
  const node = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!node) return;
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
  window.setTimeout(() => node.classList.remove(className), duration);
}

function createFxNode(className, styleMap = {}) {
  const node = document.createElement("div");
  node.className = className;
  Object.assign(node.style, styleMap);
  return node;
}

function showBattleFloat(targetSelector, text, kind = "damage") {
  const anchor = getCombatantAnchor(targetSelector, "top");
  const float = createFxNode(`battle-float ${kind}`, {
    left: `${anchor.x}px`,
    top: `${anchor.y}px`,
  });
  float.textContent = text;
  dom.fxStage.append(float);
  window.setTimeout(() => float.remove(), 1100);
}

function showSkillEffect(type, title, subtitle) {
  const wrapper = createFxNode(`skill-fx ${type}`);
  const banner = createFxNode("skill-banner");
  banner.innerHTML = `<strong>${title}</strong><span>${subtitle}</span>`;
  wrapper.append(banner);
  for (let index = 0; index < 14; index += 1) {
    const angle = (Math.PI * 2 * index) / 14;
    const distance = 90 + Math.random() * 150;
    const particle = createFxNode(`skill-particle ${type}`, {
      "--angle": `${angle}rad`,
      "--distance": `${distance}px`,
      animationDelay: `${index * 26}ms`,
    });
    wrapper.append(particle);
  }
  dom.fxStage.append(wrapper);
  window.setTimeout(() => wrapper.remove(), 1300);
}

function runSkillTrajectory(type, target = "boss") {
  const start = target === "player" ? getCombatantAnchor(".boss-card", "left") : getCombatantAnchor(".player-card", "right");
  const end = target === "player" ? getCombatantAnchor(".player-card", "center") : getCombatantAnchor(".boss-card", "center");
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const layer = createFxNode("travel-fx");
  const line = createFxNode(`travel-line ${type}`, {
    left: `${start.x}px`,
    top: `${start.y}px`,
    width: `${length}px`,
    transform: `rotate(${angle}deg) scaleX(0.15)`,
  });
  const core = createFxNode(`travel-core ${type}`, {
    left: `${start.x}px`,
    top: `${start.y}px`,
  });
  const bloom = createFxNode(`impact-bloom ${type}`, {
    left: `${end.x}px`,
    top: `${end.y}px`,
  });
  layer.append(line, core, bloom);
  dom.fxStage.append(layer);
  line.animate(
    [
      { opacity: 0, transform: `rotate(${angle}deg) scaleX(0.15)` },
      { opacity: 1, transform: `rotate(${angle}deg) scaleX(1)` },
      { opacity: 0, transform: `rotate(${angle}deg) scaleX(1)` },
    ],
    { duration: 520, easing: "ease-out" },
  );
  core.animate(
    [
      { opacity: 0, transform: "translate(0, 0) scale(0.5)" },
      { opacity: 1, transform: `translate(${dx}px, ${dy}px) scale(1)` },
      { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(1.15)` },
    ],
    { duration: 560, easing: "ease-out" },
  );
  bloom.animate(
    [
      { opacity: 0, transform: "scale(0.35)" },
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(1.2)" },
    ],
    { duration: 460, delay: 180, easing: "ease-out" },
  );
  applyTransientClass(target === "player" ? ".player-card" : ".boss-card", "cast-glow");
  applyTransientClass(target === "player" ? ".player-card" : ".boss-card", "impact", 500);
  window.setTimeout(() => layer.remove(), 900);
}

function setThemeClass(node, pageId) {
  MAP_THEMES.forEach((theme) => node.classList.remove(theme));
  node.classList.add(`theme-${pageId}`);
}

function currentNodeDefinitions() {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: () => showToast("已通过"),
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通过" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: () => showToast("已通过"),
    },
  };
}

function updateHeroForView() {
  if (state.currentView === "map") {
    const page = MAP_PAGES[state.mapPage];
    dom.heroEyebrow.textContent = `世界地图 / 第 ${state.mapPage + 1} 页`;
    dom.heroTitle.textContent = `元素骰境：${page.name}`;
    dom.heroSubtitle.textContent = page.subtitle;
    return;
  }
  if (state.currentView === "event") {
    dom.heroEyebrow.textContent = "地点事件 / 宝箱";
    dom.heroTitle.textContent = "迷雾森林：林间宝箱";
    dom.heroSubtitle.textContent = "从 3 种随机奖励中选择 1 种带走，奖励会永久保留到后续流程。";
    return;
  }
  if (state.currentView === "library") {
    dom.heroEyebrow.textContent = "奖励关 / 大图书馆";
    dom.heroTitle.textContent = "迷雾森林：大图书馆";
    dom.heroSubtitle.textContent = "在篝火、古籍与秘火铸炉之间作出一次永久选择，只能领取其中一项馈赠。";
    return;
  }
  const battle = state.currentBattleConfig || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  dom.heroEyebrow.textContent = battle.heroEyebrow;
  dom.heroTitle.textContent = battle.heroTitle;
  dom.heroSubtitle.textContent = battle.heroSubtitle;
}

function renderMap(animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem" ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>` : def?.icon === "chest" ? `<div class="map-node-icon-chest"></div>` : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
}

function setView(view) {
  state.currentView = view;
  dom.mapView.classList.toggle("hidden-view", view !== "map");
  dom.eventView.classList.toggle("hidden-view", view !== "event");
  dom.battleView.classList.toggle("hidden-view", view !== "battle");
  dom.mapButton.classList.toggle("hidden-control", view === "map");
  updateHeroForView();
}

function availableMediumSkills() {
  return Object.values(MEDIUM_SKILLS).filter((skill) => !state.learnedMediumSkills.has(skill.id));
}

function randomPick(array, count) {
  const pool = [...array];
  const result = [];
  while (pool.length && result.length < count) {
    result.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return result;
}

function currentPlayerMaxHp() {
  return BASE_PLAYER_HP + state.runBonusMaxHp + (state.relics.has("wolf_skin") ? 50 : 0);
}

function currentBaseRerolls() {
  const base = state.currentBattleConfig?.rerolls ?? TOTAL_REROLLS;
  return base + (state.relics.has("wolf_eye") ? 1 : 0);
}

function currentBasePlays() {
  return state.currentBattleConfig?.plays ?? MAX_TURNS;
}

function playerDamageBonus() {
  return state.relics.has("wolf_tooth") ? 10 : 0;
}

function bossDisplayName() {
  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    return `迅猛狼群 第 ${state.bossWave} / ${state.bossCount} 只`;
  }
  return state.bossName;
}

function relicEffectText(relic) {
  return relic ? relic.description : "";
}

function renderBossPortrait() {
  if (!dom.bossPortrait) return;
  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    dom.bossPortrait.classList.add("wolf-pack");
    dom.bossPortrait.innerHTML = `
      <svg class="wolf-illustration" viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <linearGradient id="wolfFur" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="56%" stop-color="#e7eaee" />
            <stop offset="100%" stop-color="#bcc2c9" />
          </linearGradient>
          <linearGradient id="wolfShade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#fefefe" />
            <stop offset="100%" stop-color="#aeb5bc" />
          </linearGradient>
          <linearGradient id="wolfDark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2c3138" />
            <stop offset="100%" stop-color="#0d0f13" />
          </linearGradient>
        </defs>
        <path class="wolf-shadow" d="M28 188 C74 176, 160 176, 204 190" />
        <path class="wolf-tail-shape" d="M148 94 C182 80, 212 88, 214 104 C214 118, 190 120, 169 115 C188 122, 202 136, 194 148 C184 158, 152 143, 128 122 Z" />
        <path class="wolf-body-shape" d="M72 68 C97 54, 132 56, 152 76 C166 90, 170 114, 162 133 C152 157, 124 170, 94 168 C64 166, 44 148, 40 124 C36 98, 48 78, 72 68 Z" />
        <path class="wolf-chest-shape" d="M84 92 C92 78, 108 74, 118 82 C126 92, 124 116, 114 130 C104 144, 88 144, 80 132 C74 120, 76 106, 84 92 Z" />
        <path class="wolf-neck-shape" d="M66 82 C72 62, 90 44, 110 42 C126 42, 138 50, 140 62 C142 76, 132 88, 118 96 C102 104, 78 106, 66 82 Z" />
        <path class="wolf-head-shape" d="M48 28 C62 18, 82 18, 96 26 C104 32, 108 44, 106 56 C104 74, 88 84, 68 84 C48 82, 34 70, 34 54 C34 44, 38 34, 48 28 Z" />
        <path class="wolf-muzzle-shape" d="M86 40 C98 42, 110 50, 118 60 C122 66, 120 72, 112 74 C98 78, 78 74, 72 64 C68 56, 74 40, 86 40 Z" />
        <path class="wolf-jaw-shape" d="M82 66 C98 70, 110 76, 116 88 C112 96, 102 102, 88 100 C74 98, 66 90, 68 82 C70 76, 74 70, 82 66 Z" />
        <path class="wolf-ear-left-shape" d="M52 22 L64 2 L74 26 Z" />
        <path class="wolf-ear-right-shape" d="M74 24 L92 10 L90 34 Z" />
        <path class="wolf-leg-back-shape" d="M116 152 C126 150, 134 156, 134 166 L130 204 C128 210, 120 212, 116 206 L114 170 C114 162, 112 156, 116 152 Z" />
        <path class="wolf-leg-back2-shape" d="M146 146 C154 146, 160 154, 158 164 L152 205 C150 211, 142 213, 138 208 L138 168 C138 160, 140 150, 146 146 Z" />
        <path class="wolf-leg-front-shape" d="M74 150 C82 144, 94 146, 98 156 L94 206 C92 212, 84 214, 80 208 L76 170 C74 162, 70 156, 74 150 Z" />
        <path class="wolf-leg-front2-shape" d="M96 144 C106 140, 116 146, 118 156 L114 206 C112 212, 104 214, 100 208 L98 168 C98 160, 94 150, 96 144 Z" />
        <ellipse class="wolf-eye-shape" cx="66" cy="46" rx="3.4" ry="4.1" />
        <ellipse class="wolf-eye-shape" cx="78" cy="49" rx="2.8" ry="3.4" />
        <path class="wolf-brow" d="M58 40 C64 36, 70 36, 76 40" />
        <path class="wolf-nose-shape" d="M112 66 C116 66, 120 68, 120 72 C120 76, 116 78, 112 78 C108 78, 104 76, 104 72 C104 68, 108 66, 112 66 Z" />
        <path class="wolf-fang-left" d="M94 84 L98 98 L92 98 Z" />
        <path class="wolf-fang-right" d="M104 88 L108 102 L102 102 Z" />
        <path class="wolf-snarl" d="M84 82 C94 88, 102 90, 112 88" />
      </svg>
      <span>${bossDisplayName()}</span>
    `;
    return;
  }
  dom.bossPortrait.classList.remove("wolf-pack");
  dom.bossPortrait.innerHTML = `
    <div class="boss-horn boss-horn-left"></div>
    <div class="boss-horn boss-horn-right"></div>
    <div class="boss-shoulder boss-shoulder-left"></div>
    <div class="boss-shoulder boss-shoulder-right"></div>
    <div class="boss-upperarm boss-upperarm-left"></div>
    <div class="boss-upperarm boss-upperarm-right"></div>
    <div class="boss-forearm boss-forearm-left"></div>
    <div class="boss-forearm boss-forearm-right"></div>
    <div class="boss-fist boss-fist-left"></div>
    <div class="boss-fist boss-fist-right"></div>
    <div class="boss-neck"></div>
    <div class="boss-core"></div>
    <div class="boss-lava boss-lava-chest"></div>
    <div class="boss-lava boss-lava-left"></div>
    <div class="boss-lava boss-lava-right"></div>
    <div class="boss-face">
      <span class="boss-eye boss-eye-left"></span>
      <span class="boss-eye boss-eye-right"></span>
      <span class="boss-mouth"></span>
    </div>
    <span>${bossDisplayName()}</span>
  `;
}

function setBattleConfig(nodeKey) {
  const config = BATTLE_CONFIGS[nodeKey] || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  state.currentBattleKey = nodeKey;
  state.currentBattleConfig = config;
  state.bossName = config.bossName;
  state.bossMaxHp = config.bossMaxHp;
  state.bossCount = config.bossCount || 1;
  state.bossWave = 1;
  state.bossPatternIndex = 0;
  state.bossDamageBoost = 1;
}

function maybeAdvanceBossWave() {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_3) return false;
  if (state.bossWave >= state.bossCount) return false;
  state.bossWave += 1;
  state.bossHp = state.bossMaxHp;
  state.phase = "player";
  state.bossFrozen = false;
  state.bossDamageReduction = 0;
  state.bossPatternIndex = 0;
  state.bossDamageBoost = 1;
  state.nextBossAction = chooseBossAction();
  state.selectedDice.clear();
  addLog("system", `第 <strong>${state.bossWave}</strong> 只迅猛狼扑了上来。`);
  addLog("boss", `新的敌意浮现：<strong>${state.nextBossAction.label}</strong>。`);
  showToast(`第 ${state.bossWave} 只迅猛狼登场，你可以继续行动。`);
  renderDice();
  syncBattleUi();
  return true;
}

function grantRandomWolfRelic() {
  const pool = Object.keys(RELIC_DEFS).filter((id) => !state.relics.has(id));
  const fallback = Object.keys(RELIC_DEFS);
  const chosenId = (pool.length ? pool : fallback)[Math.floor(Math.random() * (pool.length ? pool.length : fallback.length))];
  state.relics.add(chosenId);
  showToast(`获得圣物：${RELIC_DEFS[chosenId].name}`);
  addLog("system", `你获得了圣物 <strong>${RELIC_DEFS[chosenId].name}</strong>：${RELIC_DEFS[chosenId].description}`);
  return RELIC_DEFS[chosenId];
}

function renderEventStatus() {
  const inventory = Object.values(ITEM_DEFS).filter((item) => state.inventory[item.id] > 0);
  dom.eventStatus.innerHTML = `
    <article class="event-status-card">
      <span class="event-status-label">当前金币</span>
      <strong>${state.gold}</strong>
      <p>首关通关后可在事件里持续累积资源。</p>
    </article>
    <article class="event-status-card">
      <span class="event-status-label">已学中级技能</span>
      <strong>${state.learnedMediumSkills.size}</strong>
      <p>${state.learnedMediumSkills.size ? "后续四同元素组合会触发新效果。" : "还没有学会中级技能。"}</p>
    </article>
    <article class="event-status-card">
      <span class="event-status-label">现有道具</span>
      <div class="event-chip-row">
        ${inventory.length ? inventory.map((item) => `<span class="event-chip ${item.css}">${item.name} x${state.inventory[item.id]}</span>`).join("") : '<span class="event-chip muted">暂无战斗道具</span>'}
      </div>
      <p>宝箱内的奖励会直接加入库存。</p>
    </article>
  `;
}

function rewardMeta(choice) {
  if (choice.type === "item") {
    const item = ITEM_DEFS[choice.id];
    return { css: `reward-card reward-${item.css}`, icon: item.icon, name: item.name, description: item.description, meta: "战斗消耗品", detail: item.short };
  }
  if (choice.type === "skill_card") {
    return { css: "reward-card reward-skill", icon: "技", name: "中级技能卡", description: `从当前可学习的 ${availableMediumSkills().length} 个四同元素技能里随机学会 1 个。`, meta: "永久成长", detail: "随机四同技能" };
  }
  return { css: "reward-card reward-coin", icon: "$", name: "小型钱袋", description: `直接获得 ${COIN_BAG_GOLD} 枚金币。`, meta: "金币奖励", detail: `+${COIN_BAG_GOLD} 金币` };
}

function renderEventChoices() {
  dom.rewardChoices.innerHTML = "";
  state.eventChoices.forEach((choice) => {
    const meta = rewardMeta(choice);
    const card = document.createElement("button");
    card.type = "button";
    card.className = meta.css;
    card.innerHTML = `<div class="reward-icon">${meta.icon}</div><div class="reward-meta">${meta.meta}</div><div class="reward-detail">${meta.detail}</div><h3>${meta.name}</h3><p>${meta.description}</p>`;
    card.addEventListener("click", () => claimTreasureReward(choice));
    dom.rewardChoices.append(card);
  });
}

function openTreasureEvent() {
  if (!hasCompleted(NODE_KEYS.forest_1_1)) {
    showToast("先完成 1-1，才能打开这个宝箱。");
    return;
  }
  if (hasCompleted(NODE_KEYS.forest_1_2)) {
    showToast("这个宝箱已经领取过了。");
    return;
  }
  state.currentEvent = "forest_treasure";
  if (!state.eventChoices.length) state.eventChoices = randomPick(TREASURE_POOL, TREASURE_DRAW_COUNT);
  dom.eventEyebrow.textContent = "地点事件 / 宝箱";
  dom.eventTitle.textContent = "林间宝箱";
  dom.eventText.textContent = "残破石碑旁的古旧宝箱打开了。它会展示 3 种奖励，你只能带走其中 1 种。";
  renderEventStatus();
  renderEventChoices();
  setView("event");
}

function learnRandomMediumSkill() {
  const pool = availableMediumSkills();
  if (!pool.length) {
    addGold(COIN_BAG_GOLD);
    return { toast: `技能池已学满，自动转化为 ${COIN_BAG_GOLD} 金币。`, log: `中级技能卡转化为了 <strong>${COIN_BAG_GOLD}</strong> 枚金币。` };
  }
  const learned = pool[Math.floor(Math.random() * pool.length)];
  state.learnedMediumSkills.add(learned.id);
  return { toast: `你学会了中级技能：${learned.name}。`, log: `你永久学会了中级技能 <strong>${learned.name}</strong>。` };
}

function enhancedFaceCount() {
  ensureDieBlueprints();
  return state.diceBlueprints.reduce((total, die) => total + ENHANCEABLE_ELEMENTS.filter((elementId) => (die.tiers?.[elementId] || 1) > 1).length, 0);
}

function libraryStatusCards() {
  return [
    {
      label: "生命上限",
      value: `${currentPlayerMaxHp()}`,
      text: `基础 ${BASE_PLAYER_HP}，当前额外上限 ${state.runBonusMaxHp}。`,
    },
    {
      label: "中级技能",
      value: `${state.learnedMediumSkills.size}`,
      text: availableMediumSkills().length ? `仍有 ${availableMediumSkills().length} 个未学会的四同技能。` : "已经学会全部中级技能。",
    },
    {
      label: "骰面精炼",
      value: `${enhancedFaceCount()}`,
      text: "统计所有已经被强化到二级或三级的非以太骰面。",
    },
  ];
}

function renderLibraryStatus() {
  dom.libraryStatus.innerHTML = libraryStatusCards().map((card) => `
    <article class="library-status-card">
      <span class="event-status-label">${card.label}</span>
      <strong>${card.value}</strong>
      <p>${card.text}</p>
    </article>
  `).join("");
}

function eligibleForgeBlueprints() {
  ensureDieBlueprints();
  return state.diceBlueprints.filter((die) => ENHANCEABLE_ELEMENTS.filter((elementId) => (die.tiers?.[elementId] || 1) < MAX_DIE_FACE_LEVEL).length >= 2);
}

function randomPickFrom(values) {
  if (!values.length) return null;
  return values[Math.floor(Math.random() * values.length)];
}

function refineRandomDieFaces() {
  const die = randomPickFrom(eligibleForgeBlueprints());
  if (!die) return null;
  const upgradableFaces = ENHANCEABLE_ELEMENTS.filter((elementId) => (die.tiers?.[elementId] || 1) < MAX_DIE_FACE_LEVEL);
  const selectedFaces = randomPick(upgradableFaces, 2);
  const upgrades = selectedFaces.map((elementId) => {
    const nextLevel = upgradeDieFace(die.id, elementId, 1);
    return {
      elementId,
      level: nextLevel,
      tierName: getDieFaceTierName(elementId, nextLevel),
    };
  });
  return {
    dieId: die.id,
    dieLabel: `第 ${Number((die.id || "").split("-")[1] || 0)} 颗骰子`,
    upgrades,
  };
}

function libraryChoiceMeta(choiceId) {
  if (choiceId === "campfire") {
    return {
      css: "library-choice fire",
      icon: "火",
      meta: "安眠修复",
      detail: "永久生命上限 +30",
      name: "篝火休眠",
      description: "在馆心的静火旁沉睡片刻，让这一轮旅程的生命上限永久提高 30 点。",
      bullets: ["直接提升后续容错", "与狼皮生命上限叠加", "本轮旅程永久生效"],
      disabled: false,
      foot: "稳健的长期增益",
    };
  }
  if (choiceId === "reading") {
    const remaining = availableMediumSkills().length;
    return {
      css: "library-choice book",
      icon: "书",
      meta: "知识赐福",
      detail: remaining ? `剩余可学 ${remaining}` : "已无可学技能",
      name: "古籍阅读",
      description: "从未掌握的四同技能里随机学会 1 个，不会与已经学会的技能重复。",
      bullets: ["永久加入技能池", "不会重复抽到旧技能", remaining ? "提升组合上限" : "当前已学完全部中级技能"],
      disabled: remaining === 0,
      foot: remaining ? "适合补足流派深度" : "当前没有新书可读",
    };
  }
  const forgeable = eligibleForgeBlueprints().length;
  return {
    css: "library-choice forge",
    icon: "炉",
    meta: "秘火精炼",
    detail: forgeable ? `可精炼骰子 ${forgeable}` : "暂无可精炼骰子",
    name: "精炼铸骰",
    description: "随机选取一颗骰子，永久强化它的两个非以太面。二级面视作两个同属性面，三级面视作三个。",
    bullets: ["一次奖励提升两个面", "强化会跨后续战斗保留", forgeable ? "越早拿越赚" : "当前没有可继续提升的骰子"],
    disabled: forgeable === 0,
    foot: "让爆发更稳定地出现",
  };
}

function renderLibraryChoices() {
  dom.libraryChoices.innerHTML = "";
  ["campfire", "reading", "forge"].forEach((choiceId) => {
    const meta = libraryChoiceMeta(choiceId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = meta.css;
    button.disabled = meta.disabled || hasCompleted(NODE_KEYS.forest_1_6);
    button.innerHTML = `
      <div class="library-choice-top">
        <div class="library-choice-icon">${meta.icon}</div>
        <div class="library-choice-meta">${meta.meta}</div>
      </div>
      <div class="library-choice-detail">${meta.detail}</div>
      <div>
        <h3>${meta.name}</h3>
        <p>${meta.description}</p>
      </div>
      <ul class="library-choice-list">
        ${meta.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
      <div class="library-choice-foot">
        <span>${meta.foot}</span>
        <span>${button.disabled ? "不可领取" : "点击领取"}</span>
      </div>
    `;
    button.addEventListener("click", () => claimLibraryReward(choiceId));
    dom.libraryChoices.append(button);
  });
}

function openGreatLibrary() {
  if (!hasCompleted(NODE_KEYS.forest_1_5)) {
    showToast("先完成 1-5，才能进入大图书馆。");
    return;
  }
  if (dom.libraryEyebrow) dom.libraryEyebrow.textContent = "奖励关 / 大图书馆";
  if (dom.libraryTitle) dom.libraryTitle.textContent = "迷雾森林：大图书馆";
  if (dom.libraryText) dom.libraryText.textContent = "书塔、炉火与月色同时为你敞开。三项馈赠中只能领取其一，选择会永久影响这一轮后续战斗。";
  renderLibraryStatus();
  renderLibraryChoices();
  setView("library");
}

function claimLibraryReward(choiceId) {
  if (hasCompleted(NODE_KEYS.forest_1_6)) {
    showToast("大图书馆的馈赠已经领取过了。");
    return;
  }

  let toastMessage = "";
  if (choiceId === "campfire") {
    state.runBonusMaxHp += 30;
    state.playerMaxHp = currentPlayerMaxHp();
    state.playerHp = Math.min(state.playerMaxHp, state.playerHp + 30);
    toastMessage = "生命上限永久提升 30。";
  } else if (choiceId === "reading") {
    if (!availableMediumSkills().length) {
      showToast("当前没有可学习的新中级技能。");
      renderLibraryChoices();
      return;
    }
    const result = learnRandomMediumSkill();
    toastMessage = result.toast;
  } else {
    const result = refineRandomDieFaces();
    if (!result) {
      showToast("当前没有可继续精炼的骰子。");
      renderLibraryChoices();
      return;
    }
    const detail = result.upgrades.map((item) => item.tierName).join(" / ");
    toastMessage = `${result.dieLabel} 完成精炼：${detail}`;
  }

  completeNode(NODE_KEYS.forest_1_6);
  renderLibraryStatus();
  renderLibraryChoices();
  renderSkillsPanel();
  renderMap();
  showToast(toastMessage);
  returnToMap();
}

function claimTreasureReward(choice) {
  if (!state.currentEvent) return;
  if (choice.type === "item") {
    addItem(choice.id, 1);
    showToast(`获得 ${ITEM_DEFS[choice.id].name}。`);
    addLog("system", `你从宝箱里拿到了 <strong>${ITEM_DEFS[choice.id].name}</strong>。`);
  } else if (choice.type === "skill_card") {
    const result = learnRandomMediumSkill();
    showToast(result.toast);
    addLog("system", result.log);
  } else {
    addGold(COIN_BAG_GOLD);
    showToast(`获得 ${COIN_BAG_GOLD} 金币。`);
    addLog("system", `你从钱袋里取出了 <strong>${COIN_BAG_GOLD}</strong> 枚金币。`);
  }
  completeNode(NODE_KEYS.forest_1_2);
  state.currentEvent = null;
  state.eventChoices = [];
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
  renderMap();
  setView("map");
}

function renderItemBar() {
  dom.itemBar.innerHTML = "";
  const ownedItems = Object.values(ITEM_DEFS).filter((item) => (state.inventory[item.id] || 0) > 0);
  ownedItems.forEach((item) => {
    const count = state.inventory[item.id] || 0;
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `item-slot ${item.css}`;
    slot.disabled = state.currentView !== "battle" || state.phase !== "player" || state.gameOver || state.paused || count <= 0;
    slot.innerHTML = `<div class="item-icon">${item.icon}</div><div><h4>${item.name}</h4><p>${item.description}</p></div><div class="item-count">x${count}</div>`;
    slot.addEventListener("click", () => useInventoryItem(item.id));
    dom.itemBar.append(slot);
  });
}

function renderRelicBar() {
  dom.relicBar.innerHTML = "";
  [...state.relics].forEach((relicId) => {
    const relic = RELIC_DEFS[relicId];
    if (!relic) return;
    const slot = document.createElement("div");
    slot.className = "item-slot relic";
    slot.innerHTML = `<div class="item-icon">${relic.icon}</div><div><h4>${relic.name}</h4><p>${relic.description}</p></div><div class="item-count">${relic.short}</div>`;
    dom.relicBar.append(slot);
  });
}

function renderSkillsPanel() {
  const baseSkills = [
    { title: "三个金 / 金属化", description: "免疫敌方下一次造成伤害的攻击。" },
    { title: "三个木 / 树藤缠绕", description: "对 Boss 造成 50 伤害，并回复 20 生命。" },
    { title: "三个水 / 冰霜冲击", description: "对 Boss 造成 80 伤害，并有 30% 概率冻结 Boss 下一次行动。" },
    { title: "三个火 / 火焰弹", description: "对 Boss 造成 100 伤害。" },
    { title: "三个土 / 土流盾", description: "获得 50 护盾，持续 3 次 Boss 行动。" },
    { title: "五个以太 / 创世之光", description: "直接清空 Boss 生命。" },
  ];
  dom.skillList.innerHTML = baseSkills.map((skill) => `<li><strong>${skill.title}</strong>：${skill.description}</li>`).join("");
  const learned = Object.values(MEDIUM_SKILLS).filter((skill) => state.learnedMediumSkills.has(skill.id));
  dom.mediumSkillList.innerHTML = learned.length
    ? learned.map((skill) => `<li><strong>${skill.count}个${ELEMENTS[skill.element].name} / ${skill.name}</strong>：${skill.description}</li>`).join("")
    : "<li>当前还没有学会中级技能。宝箱中的中级技能卡会随机教会你 1 个四同元素技能。</li>";
}

function countsFromSelected() {
  const selected = state.dice.filter((die) => state.selectedDice.has(die.id));
  const counts = Object.fromEntries(ELEMENT_ORDER.map((id) => [id, 0]));
  selected.forEach((die) => {
    counts[die.face] += getDieFaceLevel(die);
  });
  return { selected, counts };
}

function getLearnedMediumMatch(counts) {
  return Object.values(MEDIUM_SKILLS).find((skill) => state.learnedMediumSkills.has(skill.id) && counts[skill.element] === skill.count);
}

function describeCombo(selected, counts) {
  if (!selected.length) return { title: "尚未选中骰子", description: "选中 3 个同元素可释放基础技能，学会中级技能后，4 同元素也会触发特殊效果。" };
  if (counts.aether === 5) return { title: "创世之光", description: "五个以太：直接清空 Boss 生命。" };
  const learned = getLearnedMediumMatch(counts);
  if (learned) return { title: learned.name, description: learned.description };
  const triple = ELEMENT_ORDER.find((id) => counts[id] >= 3);
  if (!triple) return { title: "未形成技能", description: "当前组合不会触发技能效果，但依然会消耗 1 次行动。" };
  return {
    title: `${ELEMENTS[triple].name}系技能`,
    description: {
      metal: "三个金：免疫 Boss 下一次造成伤害的攻击。",
      wood: "三个木：造成 50 伤害并回复 20 生命。",
      water: "三个水：造成 80 伤害，并有 30% 概率冻结 Boss。",
      fire: "三个火：造成 100 伤害。",
      earth: "三个土：获得 50 点护盾，持续 3 次 Boss 行动。",
    }[triple],
  };
}

function updateSelectionInfo() {
  const { selected, counts } = countsFromSelected();
  const combo = describeCombo(selected, counts);
  dom.comboTitle.textContent = combo.title;
  dom.comboDescription.textContent = combo.description;
  dom.selectionSummary.textContent = selected.length
    ? ELEMENT_ORDER.filter((elementId) => counts[elementId] > 0).map((elementId) => `${ELEMENTS[elementId].name} x${counts[elementId]}`).join(" / ")
    : "当前未选择骰子";
}

function bossActionMeta(action) {
  if (!action) return { icon: "?", title: "石像守卫正在观察你", text: "预告区会显示它下一次行动。", badge: "待揭示", preview: "预告中" };
  if (action.id === "attack") return { icon: "刃", title: action.label, text: `预计造成 ${Math.round(action.value * state.bossDamageBoost)} 点伤害。`, badge: state.bossDamageBoost > 1 ? "强化" : "轻击", preview: `即将${action.label}` };
  if (action.id === "slam") return { icon: "爆", title: action.label, text: `预计造成 ${action.value} 点伤害，建议提前准备金属化或护盾。`, badge: "高伤", preview: `即将${action.label}` };
  return { icon: "+", title: action.label, text: state.currentBattleKey === NODE_KEYS.forest_1_3 ? `回复 ${action.value} 点生命，并让下一次攻击伤害提升 50%。` : `预计回复 ${action.value} 点生命，这通常是你的输出窗口。`, badge: "回血", preview: `即将${action.label}` };
}

function getGuideTip() {
  const action = state.nextBossAction;
  if (!action) return { title: "先观察 Boss 的下一招", text: "预告区会告诉你下一回合应该保命还是抢伤害。" };
  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    if (action.id === "heal") return { title: "野性咆哮后要准备防御", text: "它回完血后的下一击会强化 50%，尽量提前准备金属化、护盾或冻结。" };
    if (state.bossDamageBoost > 1) return { title: "下一击已经强化", text: "这回合更适合保命，不要硬吃强化后的利爪撕咬。" };
    return { title: "抓紧清掉当前这只狼", text: "狼群是连续车轮战，尽量在低风险回合多打伤害，减少后续压力。" };
  }
  if (action.id === "slam") return { title: "优先考虑保命", text: "尽量凑三个金或三个土，实在没有也可以使用黄色药丸冻结 Boss。" };
  if (action.id === "heal") return { title: "这是抢节奏的机会", text: "回血回合适合拼火、水或直接追求五以太终结。" };
  return { title: "维持血线并持续压制", text: "普通攻击压力不大，可以继续找输出或补充资源。" };
}

function syncBattleUi() {
  const bossName = bossDisplayName();
  renderBossPortrait();
  dom.goldCount.textContent = String(state.gold);
  dom.playerHpLabel.textContent = `${state.playerHp} / ${state.playerMaxHp}`;
  dom.playerHpBar.style.width = `${(state.playerHp / state.playerMaxHp) * 100}%`;
  dom.bossHpLabel.textContent = `${state.bossHp} / ${state.bossMaxHp}`;
  dom.bossHpBar.style.width = `${(state.bossHp / state.bossMaxHp) * 100}%`;
  dom.turnCounter.textContent = `回合 ${state.turn} / ${currentBasePlays()}`;
  dom.rerollCounter.textContent = String(state.rerollsLeft);
  dom.playCounter.textContent = String(state.playsLeft);
  dom.metalState.textContent = state.metalGuard ? "已激活" : "未激活";
  dom.shieldState.textContent = state.shieldHp > 0 ? `${state.shieldHp} / ${state.shieldTurns}` : "0 / 0";
  dom.freezeState.textContent = state.bossFrozen ? "已冻结" : "无";
  dom.bossState.textContent = state.bossDamageBoost > 1
    ? "下一击强化"
    : state.bossDamageReduction > 0
      ? `伤害 -${state.bossDamageReduction}`
      : state.currentBattleKey === NODE_KEYS.forest_1_3
        ? "狼群环伺"
        : "石纹微震";
  const bossPortraitName = document.querySelector(".boss-portrait > span");
  const bossCardTitle = document.querySelector(".boss-card .status-head h2");
  if (bossPortraitName) bossPortraitName.textContent = bossName;
  if (bossCardTitle) bossCardTitle.textContent = bossName;
  dom.phaseBadge.textContent = state.phase === "player" ? "玩家回合" : state.phase === "boss" ? "Boss 回合" : "战斗结束";
  dom.pauseButton.disabled = state.gameOver;
  dom.pauseButton.textContent = state.paused ? "继续" : "暂停";
  dom.audioButton.textContent = `音效：${state.audioEnabled ? "开" : "关"}`;
  const preview = bossActionMeta(state.nextBossAction);
  const guide = getGuideTip();
  dom.forecastIcon.textContent = preview.icon;
  dom.forecastTitle.textContent = preview.title;
  dom.forecastText.textContent = preview.text;
  dom.forecastBadge.textContent = preview.badge;
  dom.bossIntent.textContent = state.paused ? "已暂停" : state.phase === "boss" ? "行动中" : preview.preview;
  dom.guideTitle.textContent = guide.title;
  dom.guideText.textContent = guide.text;
  dom.forecastCard.classList.remove("attack", "slam", "heal");
  if (state.nextBossAction?.id) dom.forecastCard.classList.add(state.nextBossAction.id);
  const disableActions = state.gameOver || state.phase !== "player" || state.paused;
  dom.rerollButton.disabled = disableActions || state.selectedDice.size === 0 || state.rerollsLeft <= 0;
  dom.playButton.disabled = disableActions || state.selectedDice.size === 0 || state.playsLeft <= 0;
  dom.clearButton.disabled = disableActions || state.selectedDice.size === 0;
  renderBossRules();
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
}

function renderDice(animatedIds = []) {
  dom.diceGrid.innerHTML = "";
  state.dice.forEach((die) => {
    const element = ELEMENTS[die.face];
    const faceLevel = getDieFaceLevel(die);
    const faceLabel = getDieFaceDisplayLabel(die);
    const faceDisplay = die.face === "aether" ? element.symbol : faceLabel;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `die ${element.css}${state.selectedDice.has(die.id) ? " selected" : ""}${animatedIds.includes(die.id) ? " roll-flash" : ""}`;
    button.disabled = state.phase !== "player" || state.gameOver || state.paused;
    button.innerHTML = `<div class="die-header"><span class="die-symbol">${faceDisplay}</span><span class="die-tag">${element.label}${faceLevel > 1 ? ` x${faceLevel}` : ""}</span></div><div class="die-name">${element.name}</div><div class="die-note">${faceLevel > 1 ? `当前为 ${faceLabel}，可视作 ${faceLevel} 个同属性面。` : element.description}</div>`;
    button.addEventListener("click", () => toggleDie(die.id));
    dom.diceGrid.append(button);
  });
  updateSelectionInfo();
}

function toggleDie(dieId) {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  if (state.selectedDice.has(dieId)) state.selectedDice.delete(dieId);
  else state.selectedDice.add(dieId);
  playSound("select");
  renderDice();
  syncBattleUi();
}

function clearSelection() {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  state.selectedDice.clear();
  renderDice();
  syncBattleUi();
}

function useInventoryItem(itemId) {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  if (!consumeItem(itemId)) return;
  if (itemId === "blue_pill") {
    state.playsLeft += 1;
    showToast("额外获得 1 次行动机会。");
    addLog("player", "你使用了 <strong>蓝色药丸</strong>，额外获得 1 次行动机会。");
  } else if (itemId === "red_pill") {
    state.rerollsLeft += 2;
    showToast("重掷次数 +2。");
    addLog("player", "你使用了 <strong>红色药丸</strong>，重掷次数增加 2。");
  } else if (itemId === "green_pill") {
    const healed = healPlayer(50);
    showToast(`恢复了 ${healed} 点生命。`);
    addLog("player", `你使用了 <strong>绿色药丸</strong>，恢复了 <strong>${healed}</strong> 点生命。`);
  } else if (itemId === "yellow_pill") {
    state.bossFrozen = true;
    showToast("Boss 的下一次行动将被冻结。");
    addLog("player", "你使用了 <strong>黄色药丸</strong>，封锁了 Boss 的下一次行动。");
  }
  playSound("item");
  syncBattleUi();
}

function rerollSelectedDice() {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  const selectedIds = [...state.selectedDice];
  if (!selectedIds.length) {
    showToast("请先选中至少一个骰子。");
    return;
  }
  if (state.rerollsLeft <= 0) {
    showToast("本局没有剩余重掷次数了。");
    return;
  }
  state.rerollsLeft -= 1;
  selectedIds.forEach((id) => {
    const die = state.dice.find((item) => item.id === id);
    if (die) die.face = randomElement();
  });
  state.selectedDice.clear();
  addLog("player", "你消耗了 <strong>1 次重掷</strong>，重掷了所选骰子。");
  playSound("reroll");
  renderDice(selectedIds);
  syncBattleUi();
}

function evaluateSelection(selected, counts) {
  if (counts.aether === 5) return { type: "aether" };
  const learned = getLearnedMediumMatch(counts);
  if (learned) return { type: "medium", skill: learned };
  const triple = ELEMENT_ORDER.find((id) => counts[id] >= 3);
  if (triple) return { type: "basic", element: triple };
  return { type: "empty" };
}

function replacePlayedDice(selectedIds) {
  selectedIds.forEach((id) => {
    const die = state.dice.find((item) => item.id === id);
    if (die) die.face = randomElement();
  });
  state.selectedDice.clear();
}

function applyBasicSkill(elementId) {
  if (elementId === "metal") {
    state.metalGuard = true;
    addLog("player", "你发动了 <strong>金属化</strong>，将免疫 Boss 下一次造成伤害的攻击。");
    showToast("金属化已激活。");
    showSkillEffect("metal", "金属化", "IRON GUARD");
    runSkillTrajectory("metal", "player");
    showBattleFloat(".player-card", "免疫", "immune");
    return;
  }
  if (elementId === "wood") {
    const damage = 50 + playerDamageBonus();
    damageBoss(damage);
    const healed = healPlayer(20);
    addLog("player", `你发动了 <strong>树藤缠绕</strong>，造成 <strong>${damage}</strong> 点伤害并回复 <strong>${healed}</strong> 点生命。`);
    showToast("树藤缠绕命中。");
    showSkillEffect("wood", "树藤缠绕", "VINE WRAP");
    runSkillTrajectory("wood", "boss");
    showBattleFloat(".boss-card", `-${damage}`, "damage");
    showBattleFloat(".player-card", `+${healed}`, "heal");
    return;
  }
  if (elementId === "water") {
    const damage = 80 + playerDamageBonus();
    damageBoss(damage);
    const frozen = Math.random() < 0.3;
    if (frozen) state.bossFrozen = true;
    addLog("player", `你发动了 <strong>冰霜冲击</strong>，造成 <strong>${damage}</strong> 点伤害${frozen ? "，并冻结了 Boss 的下一次行动" : ""}。`);
    showToast(frozen ? "冰霜冲击冻结了 Boss。" : "冰霜冲击命中。");
    showSkillEffect("water", "冰霜冲击", "FROST SURGE");
    runSkillTrajectory("water", "boss");
    showBattleFloat(".boss-card", `-${damage}`, "damage");
    return;
  }
  if (elementId === "fire") {
    const damage = 100 + playerDamageBonus();
    damageBoss(damage);
    addLog("player", `你发动了 <strong>火焰弹</strong>，对 Boss 造成 <strong>${damage}</strong> 点伤害。`);
    showToast("火焰弹命中。");
    showSkillEffect("fire", "火焰弹", "FLAME BURST");
    runSkillTrajectory("fire", "boss");
    showBattleFloat(".boss-card", `-${damage}`, "damage");
    return;
  }
  state.shieldHp += 50;
  state.shieldTurns = Math.max(state.shieldTurns, 3);
  addLog("player", "你发动了 <strong>土流盾</strong>，获得 <strong>50</strong> 点护盾，持续 3 次 Boss 行动。");
  showToast("土流盾已展开。");
  showSkillEffect("earth", "土流盾", "EARTH WALL");
  runSkillTrajectory("earth", "player");
  showBattleFloat(".player-card", "+50 护盾", "shield");
}

function applyMediumSkill(skill) {
  const result = skill.resolve();
  showSkillEffect(skill.element, skill.name, "ADVANCED SKILL");
  runSkillTrajectory(skill.element, result.healPlayer || result.shield || result.reduceBossDamage ? "player" : "boss");
  if (result.selfDamage) state.playerHp = Math.max(0, state.playerHp - result.selfDamage);
  const finalDamage = result.damageBoss ? result.damageBoss + playerDamageBonus() : 0;
  if (finalDamage) damageBoss(finalDamage);
  if (result.healPlayer) healPlayer(result.healPlayer);
  if (result.shield) {
    state.shieldHp += result.shield;
    state.shieldTurns = Math.max(state.shieldTurns, result.shieldTurns);
  }
  if (result.reduceBossDamage) state.bossDamageReduction += result.reduceBossDamage;
  if (result.refundPlay) state.playsLeft += result.refundPlay;
  if (finalDamage) showBattleFloat(".boss-card", `-${finalDamage}`, "damage");
  if (result.healPlayer) showBattleFloat(".player-card", `+${result.healPlayer}`, "heal");
  if (result.shield) showBattleFloat(".player-card", `+${result.shield} 护盾`, "shield");
  if (result.selfDamage) showBattleFloat(".player-card", `-${result.selfDamage}`, "damage");
  addLog("player", `你发动了中级技能 <strong>${skill.name}</strong>。`);
  showToast(`发动 ${skill.name}。`);
}

function resolvePlayerAction() {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  const { selected, counts } = countsFromSelected();
  if (!selected.length) {
    showToast("请先选中至少一个骰子。");
    return;
  }
  state.phase = "boss";
  state.playsLeft -= 1;
  const result = evaluateSelection(selected, counts);
  const selectedIds = selected.map((die) => die.id);
  if (result.type === "aether") {
    state.bossHp = 0;
    addLog("player", "你发动了 <strong>创世之光</strong>，直接终结了石像守卫。");
    showToast("创世之光降临。");
    showSkillEffect("aether", "创世之光", "STARFALL");
    runSkillTrajectory("aether", "boss");
    showBattleFloat(".boss-card", "终结", "damage");
  } else if (result.type === "medium") {
    applyMediumSkill(result.skill);
  } else if (result.type === "basic") {
    applyBasicSkill(result.element);
  } else {
    addLog("player", "你打出了一个未形成技能的组合，本回合没有触发额外效果。");
    showToast("没有触发技能。");
    playSound("play");
  }
  if (result.type !== "empty") playSound(result.type === "aether" ? "aether" : "skill");
  replacePlayedDice(selectedIds);
  renderDice(selectedIds);
  syncBattleUi();
  if (checkBattleEnd()) return;
  if (state.phase !== "boss") return;
  state.bossTimerId = window.setTimeout(() => {
    state.bossTimerId = null;
    resolveBossTurn();
  }, 500);
}

function chooseBossAction() {
  const config = state.currentBattleConfig || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  return config.chooseBossAction();
}

function updateTurnState() {
  state.turn = Math.min(currentBasePlays(), currentBasePlays() - state.playsLeft + 1);
}

function resolveBossTurn() {
  if (state.gameOver || state.paused) return;
  const action = state.nextBossAction || chooseBossAction();
  dom.bossIntent.textContent = "行动中";
  if (state.bossFrozen) {
    state.bossFrozen = false;
    state.bossPatternIndex += 1;
    addLog("boss", "石像守卫被寒冰冻结，本回合无法行动。");
    showToast("Boss 行动被跳过。");
    playSound("freeze");
    consumeShieldTurn();
    finishRound();
    return;
  }
  if (action.id === "heal") {
    healBoss(action.value);
    if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
      state.bossDamageBoost = 1.5;
      addLog("boss", `迅猛狼发动 <strong>${action.label}</strong>，回复了 <strong>${action.value}</strong> 点生命，并让下一次攻击伤害提升 50%。`);
      showToast("野性咆哮强化了下一次攻击。");
    } else {
      addLog("boss", `石像守卫发动 <strong>${action.label}</strong>，回复了 <strong>${action.value}</strong> 点生命。`);
      showToast("Boss 回复了生命。");
    }
    showBattleFloat(".boss-card", `+${action.value}`, "heal");
    playSound("bossHeal");
  } else {
    const damageValue = Math.round(action.value * state.bossDamageBoost);
    const dealt = damagePlayer(damageValue);
    addLog("boss", `${bossDisplayName()} 发动 <strong>${action.label}</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
    showToast(`Boss 使出了 ${action.label}。`);
    showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 500);
    playSound(action.id === "slam" ? "bossSlam" : "bossAttack");
    state.bossDamageBoost = 1;
  }
  state.bossPatternIndex += 1;
  consumeShieldTurn();
  syncBattleUi();
  if (checkBattleEnd()) return;
  finishRound();
}

function finishRound() {
  if (state.gameOver) return;
  if (state.playsLeft <= 0) {
    checkBattleEnd(true);
    return;
  }
  state.phase = "player";
  state.nextBossAction = chooseBossAction();
  updateTurnState();
  addLog("system", `第 <strong>${state.turn}</strong> 回合开始。`);
  addLog("boss", `石像守卫的下一步意图浮现：<strong>${state.nextBossAction.label}</strong>。`);
  syncBattleUi();
  renderDice();
}

function checkBattleEnd(forceTurnCheck = false) {
  if (state.bossHp <= 0) {
    if (maybeAdvanceBossWave()) {
      return false;
    }
    state.gameOver = true;
    state.phase = "end";
    const nodeKey = state.currentBattleKey || NODE_KEYS.forest_1_1;
    const firstClear = !hasCompleted(nodeKey);
    let relic = null;
    if (firstClear) {
      completeNode(nodeKey);
      addGold(state.currentBattleConfig?.rewardGold || 0);
      if (state.currentBattleConfig?.rewardType === "treasure") {
        state.overlayAction = "treasure";
      } else if (state.currentBattleConfig?.rewardType === "wolf_relic") {
        relic = grantRandomWolfRelic();
        state.overlayAction = firstClear && state.currentBattleKey === NODE_KEYS.forest_1_3 ? "shop" : "map";
      } else {
        state.overlayAction = "map";
      }
    } else {
      state.overlayAction = "map";
    }
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战成功";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_3 ? "迅猛狼群已被击退" : "石像守卫已被击碎";
    if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
      dom.overlayText.textContent = firstClear
        ? `你连续击败了三只迅猛狼，获得 ${THIRD_LEVEL_CLEAR_GOLD} 枚金币，并拿到圣物“${relic?.name || "未知圣物"}”。效果：${relicEffectText(relic)}`
        : "你再次击退了迅猛狼群，可以返回地图继续前进。";
      dom.overlayButton.textContent = "返回地图";
    } else {
      dom.overlayText.textContent = firstClear ? `你完成了首关挑战，并获得 ${FIRST_LEVEL_CLEAR_GOLD} 枚金币。接下来会进入第 2 个地点的宝箱事件。` : "你再次击败了石像守卫，可以返回地图继续查看路线。";
      dom.overlayButton.textContent = firstClear ? "进入第 2 地点" : "返回地图";
    }
    if (state.overlayAction === "shop") dom.overlayButton.textContent = "进入商店";
    dom.overlay.classList.remove("hidden");
    addLog("system", `战斗结束。你成功击败了 ${state.currentBattleConfig?.bossName || "Boss"}。`);
    playSound("win");
    renderMap();
    return true;
  }
  if (state.playerHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_3 ? "你被狼群撕碎了防线" : "你被石像守卫击倒";
    dom.overlayText.textContent = "生命归零，遗迹深处再度归于沉寂。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你的生命值耗尽，挑战失败。");
    playSound("lose");
    return true;
  }
  if (forceTurnCheck && state.playsLeft <= 0 && state.bossHp > 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_3 ? "出骰机会已尽" : "六回合已尽";
    dom.overlayText.textContent = state.currentBattleKey === NODE_KEYS.forest_1_3 ? "十次出骰机会已经耗尽，狼群仍未被清空，第三关挑战失败。" : "石像守卫仍然屹立，第一关挑战失败。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "第 6 回合结束后 Boss 仍然存活，本次挑战失败。");
    playSound("lose");
    return true;
  }
  return false;
}

function openHelp() {
  dom.helpPanel.classList.remove("hidden");
}

function closeHelp() {
  dom.helpPanel.classList.add("hidden");
}

function togglePause(force) {
  if (state.currentView !== "battle" || state.gameOver) return;
  state.paused = typeof force === "boolean" ? force : !state.paused;
  dom.pauseOverlay.classList.toggle("hidden", !state.paused);
  if (!state.paused && state.phase === "boss" && !state.gameOver && !state.bossTimerId) {
    state.bossTimerId = window.setTimeout(() => {
      state.bossTimerId = null;
      resolveBossTurn();
    }, 300);
  }
  syncBattleUi();
}

function toggleAudio() {
  state.audioEnabled = !state.audioEnabled;
  if (state.audioEnabled) {
    ensureAudio();
    playSound("select");
  }
  syncBattleUi();
}

function ensureAudio() {
  if (audioContext) {
    if (audioContext.state === "suspended") audioContext.resume();
    return;
  }
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  audioContext = new AudioCtx();
  compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 18;
  compressor.ratio.value = 12;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.22;
  masterGain = audioContext.createGain();
  masterGain.gain.value = MASTER_VOLUME;
  compressor.connect(masterGain);
  masterGain.connect(audioContext.destination);
}

function playTone({ time, freq, duration, type = "triangle", gain = 0.2, endFreq = null }) {
  if (!audioContext || !masterGain) return;
  const osc = audioContext.createOscillator();
  const env = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), time + duration);
  env.gain.setValueAtTime(0.0001, time);
  env.gain.exponentialRampToValueAtTime(gain, time + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(env);
  env.connect(compressor);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

function playNoiseBurst({ time, duration = 0.12, gain = 0.12, highpass = 900 }) {
  if (!audioContext || !masterGain) return;
  const buffer = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * duration), audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  const filter = audioContext.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = highpass;
  const env = audioContext.createGain();
  env.gain.setValueAtTime(gain, time);
  env.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  source.connect(filter);
  filter.connect(env);
  env.connect(compressor);
  source.start(time);
  source.stop(time + duration);
}

function playSound(kind) {
  if (!state.audioEnabled) return;
  ensureAudio();
  if (!audioContext) return;
  const time = audioContext.currentTime + 0.005;
  if (kind === "select") {
    playTone({ time, freq: 620, endFreq: 820, duration: 0.08, type: "square", gain: 0.12 });
    return;
  }
  if (kind === "reroll") {
    playTone({ time, freq: 320, endFreq: 740, duration: 0.12, type: "sawtooth", gain: 0.17 });
    playNoiseBurst({ time: time + 0.02, duration: 0.08, gain: 0.08, highpass: 1400 });
    return;
  }
  if (kind === "item") {
    playTone({ time, freq: 520, endFreq: 880, duration: 0.14, type: "triangle", gain: 0.16 });
    playTone({ time: time + 0.04, freq: 780, endFreq: 1040, duration: 0.12, type: "triangle", gain: 0.13 });
    return;
  }
  if (kind === "skill") {
    playTone({ time, freq: 220, endFreq: 520, duration: 0.16, type: "sawtooth", gain: 0.18 });
    playTone({ time: time + 0.05, freq: 660, endFreq: 880, duration: 0.2, type: "triangle", gain: 0.16 });
    playNoiseBurst({ time: time + 0.03, duration: 0.11, gain: 0.07, highpass: 1800 });
    return;
  }
  if (kind === "aether") {
    playTone({ time, freq: 330, endFreq: 1320, duration: 0.4, type: "triangle", gain: 0.22 });
    playTone({ time: time + 0.05, freq: 660, endFreq: 1760, duration: 0.34, type: "sine", gain: 0.18 });
    playNoiseBurst({ time: time + 0.08, duration: 0.18, gain: 0.09, highpass: 2200 });
    return;
  }
  if (kind === "play") {
    playTone({ time, freq: 260, endFreq: 350, duration: 0.08, type: "square", gain: 0.11 });
    return;
  }
  if (kind === "freeze") {
    playTone({ time, freq: 900, endFreq: 420, duration: 0.18, type: "triangle", gain: 0.15 });
    return;
  }
  if (kind === "bossAttack") {
    playTone({ time, freq: 150, endFreq: 90, duration: 0.16, type: "sawtooth", gain: 0.22 });
    playNoiseBurst({ time: time + 0.01, duration: 0.09, gain: 0.12, highpass: 700 });
    return;
  }
  if (kind === "bossSlam") {
    playTone({ time, freq: 90, endFreq: 42, duration: 0.26, type: "sawtooth", gain: 0.28 });
    playNoiseBurst({ time: time + 0.02, duration: 0.16, gain: 0.14, highpass: 420 });
    return;
  }
  if (kind === "bossHeal") {
    playTone({ time, freq: 280, endFreq: 420, duration: 0.18, type: "triangle", gain: 0.15 });
    playTone({ time: time + 0.06, freq: 420, endFreq: 560, duration: 0.18, type: "triangle", gain: 0.13 });
    return;
  }
  if (kind === "win") {
    playTone({ time, freq: 440, endFreq: 880, duration: 0.22, type: "triangle", gain: 0.19 });
    playTone({ time: time + 0.12, freq: 660, endFreq: 1320, duration: 0.28, type: "triangle", gain: 0.18 });
    return;
  }
  if (kind === "lose") {
    playTone({ time, freq: 240, endFreq: 120, duration: 0.3, type: "sawtooth", gain: 0.18 });
  }
}

function resetBattleState() {
  clearBossTimer();
  state.playerMaxHp = currentPlayerMaxHp();
  state.playerHp = state.playerMaxHp;
  state.bossMaxHp = state.currentBattleConfig?.bossMaxHp ?? MAX_BOSS_HP;
  state.bossHp = state.bossMaxHp;
  state.bossName = state.currentBattleConfig?.bossName || "石像守卫";
  state.bossWave = 1;
  state.bossCount = state.currentBattleConfig?.bossCount || 1;
  state.bossPatternIndex = 0;
  state.bossDamageBoost = 1;
  state.turn = 1;
  state.rerollsLeft = currentBaseRerolls();
  state.playsLeft = currentBasePlays();
  state.selectedDice.clear();
  state.phase = "player";
  state.gameOver = false;
  state.paused = false;
  state.metalGuard = false;
  state.shieldHp = 0;
  state.shieldTurns = 0;
  state.bossFrozen = false;
  state.bossDamageReduction = 0;
  state.nextBossAction = chooseBossAction();
  state.dice = Array.from({ length: DICE_COUNT }, (_, index) => createDie(index));
  dom.battleLog.innerHTML = "";
  dom.overlay.classList.add("hidden");
  dom.pauseOverlay.classList.add("hidden");
  addLog("system", state.currentBattleConfig?.introLog || "战斗开始。");
  addLog("boss", `${bossDisplayName()} 露出了下一步意图：<strong>${state.nextBossAction.label}</strong>。`);
  renderDice();
  syncBattleUi();
}

function resetRun() {
  clearBossTimer();
  state.completedNodes = new Set();
  state.gold = 0;
  state.currentEvent = null;
  state.eventChoices = [];
  state.inventory = { blue_pill: 0, red_pill: 0, green_pill: 0, yellow_pill: 0 };
  state.relics = new Set();
  state.learnedMediumSkills = new Set();
  state.mapPage = 0;
  setBattleConfig(NODE_KEYS.forest_1_1);
  resetBattleState();
  dom.overlay.classList.add("hidden");
  closeHelp();
  returnToMap();
}

function startFirstLevel() {
  setBattleConfig(NODE_KEYS.forest_1_1);
  resetBattleState();
  setView("battle");
  showToast("第一关开始。");
  playSound("select");
}

function startThirdLevel() {
  setBattleConfig(NODE_KEYS.forest_1_3);
  resetBattleState();
  setView("battle");
  showToast("第三关开始。");
  playSound("select");
}

function returnToMap() {
  clearBossTimer();
  state.paused = false;
  dom.pauseOverlay.classList.add("hidden");
  dom.overlay.classList.add("hidden");
  closeHelp();
  renderMap();
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
  setView("map");
}

MAP_PAGES[0].hint = "点击 1-1 进入首战，随后依次解锁后续关卡。在奖励关中强化战力，迎战更难的章节。";

function spendGold(amount) {
  if (state.gold < amount) return false;
  addGold(-amount);
  return true;
}

function shuffleArray(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function createStartingDicePool() {
  ensureDieBlueprints();
  const dice = Array.from({ length: DICE_COUNT }, (_, index) => createDie(index));
  if (!state.shopRelics.has("starlight_eye")) return dice;
  const boosted = randomElement();
  const faces = shuffleArray([boosted, boosted, boosted, randomElement(), randomElement()]);
  return faces.map((face, index) => {
    const die = createDie(index);
    die.face = face;
    return die;
  });
}

function ensureShopStock() {
  if (!state.shopStockRelics.length) {
    const pool = Object.keys(SHOP_RELIC_DEFS).filter((id) => !state.shopRelics.has(id));
    const fallback = Object.keys(SHOP_RELIC_DEFS);
    state.shopStockRelics = randomPick(pool.length >= 2 ? pool : fallback, 2);
  }
}

function openShop() {
  if (!hasCompleted(NODE_KEYS.forest_1_3)) {
    showToast("先完成 1-3，商店才会开放。");
    return;
  }
  ensureShopStock();
  renderShop();
  setView("shop");
}

function leaveShop() {
  if (!hasCompleted(NODE_KEYS.forest_1_4)) completeNode(NODE_KEYS.forest_1_4);
  startFifthLevel();
}

function shopStatusCards() {
  return [
    {
      label: "当前金币",
      value: `${state.gold}`,
      text: "金币会在购买后立刻扣除，可以自由搭配药丸、技能卡和圣物。",
    },
    {
      label: "中级技能",
      value: `${state.learnedMediumSkills.size}`,
      text: state.shopSkillCardPurchased ? "本次商店的技能卡已经购买。" : "本次商店还能再购买 1 张技能卡。",
    },
    {
      label: "商店圣物",
      value: `${state.shopRelics.size}`,
      text: state.shopRelics.size ? "商店圣物会在后续所有战斗关持续提供增益。" : "本次还没有购买商店专属圣物。",
    },
    {
      label: "陈列圣物",
      value: `${state.shopStockRelics.length}`,
      text: "本次商店会从独立圣物池中随机摆出 2 件，买过的不会重复出现在后续陈列里。",
    },
  ];
}

function renderShopStatus() {
  dom.shopStatus.innerHTML = shopStatusCards().map((card) => `
    <article class="shop-status-card">
      <span class="event-status-label">${card.label}</span>
      <strong>${card.value}</strong>
      <p>${card.text}</p>
    </article>
  `).join("");
}

function renderShopConsumables() {
  dom.shopConsumables.innerHTML = "";
  ["blue_pill", "red_pill", "green_pill", "yellow_pill"].forEach((itemId) => {
    const item = ITEM_DEFS[itemId];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `shop-product ${item.css}`;
    button.disabled = state.gold < SHOP_ITEM_PRICE;
    button.innerHTML = `
      <div class="shop-product-top">
        <div class="shop-icon">${item.icon}</div>
        <div class="shop-price">${SHOP_ITEM_PRICE} 金币</div>
      </div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="shop-tag-row">
        <span class="shop-tag">消耗品</span>
        <span class="shop-tag">${item.short}</span>
      </div>
      <div class="shop-stock">
        <span>当前持有 x${state.inventory[item.id] || 0}</span>
        <span>无限购买</span>
      </div>
    `;
    button.addEventListener("click", () => buyShopItem(itemId));
    dom.shopConsumables.append(button);
  });
}

function renderShopSkillCard() {
  const soldOut = state.shopSkillCardPurchased || !availableMediumSkills().length;
  dom.shopSkillCard.innerHTML = "";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "shop-skill-card";
  button.disabled = soldOut || state.gold < SHOP_SKILL_CARD_PRICE;
  button.innerHTML = `
    <div class="shop-product-top">
      <div class="shop-icon">技</div>
      <div class="shop-price">${SHOP_SKILL_CARD_PRICE} 金币</div>
    </div>
    <div>
      <h3>中级技能卡</h3>
      <p>购买后永久随机学会 1 个当前尚未掌握的中级技能。现有技能池为五种，后续仍可继续扩充。</p>
    </div>
    <div class="shop-tag-row">
      <span class="shop-tag">永久成长</span>
      <span class="shop-tag">限购 1 张</span>
    </div>
    <div class="shop-stock">
      <span>${soldOut ? "已售罄" : `剩余可学 ${availableMediumSkills().length} 种`}</span>
      <span>${state.shopSkillCardPurchased ? "本次已购买" : "可购买"}</span>
    </div>
  `;
  button.addEventListener("click", buyShopSkillCard);
  dom.shopSkillCard.append(button);
}

function renderShopRelics() {
  dom.shopRelics.innerHTML = "";
  ensureShopStock();
  state.shopStockRelics.forEach((relicId) => {
    const relic = SHOP_RELIC_DEFS[relicId];
    const owned = state.shopRelics.has(relicId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "shop-relic-card";
    button.disabled = owned || state.gold < SHOP_RELIC_PRICE;
    button.innerHTML = `
      <div class="shop-product-top">
        <div class="shop-icon shop-relic-icon">${relic.icon}</div>
        <div class="shop-price">${SHOP_RELIC_PRICE} 金币</div>
      </div>
      <div>
        <h3>${relic.name}</h3>
        <p>${relic.description}</p>
      </div>
      <div class="shop-tag-row">
        <span class="shop-tag">商店圣物</span>
        <span class="shop-tag">${relic.short}</span>
      </div>
      <div class="shop-stock">
        <span>${owned ? "已购入" : "本次陈列"}</span>
        <span>${owned ? "永久生效" : "可购买"}</span>
      </div>
    `;
    button.addEventListener("click", () => buyShopRelic(relicId));
    dom.shopRelics.append(button);
  });
}

function renderShop() {
  renderShopStatus();
  renderShopConsumables();
  renderShopSkillCard();
  renderShopRelics();
}

function buyShopItem(itemId) {
  if (!spendGold(SHOP_ITEM_PRICE)) {
    showToast("金币不足。");
    return;
  }
  addItem(itemId, 1);
  showToast(`购入 ${ITEM_DEFS[itemId].name}。`);
  playSound("item");
  renderShop();
  renderItemBar();
}

function buyShopSkillCard() {
  if (state.shopSkillCardPurchased) {
    showToast("这张技能卡已经卖完了。");
    return;
  }
  if (!availableMediumSkills().length) {
    showToast("当前已经学会全部中级技能。");
    return;
  }
  if (!spendGold(SHOP_SKILL_CARD_PRICE)) {
    showToast("金币不足。");
    return;
  }
  state.shopSkillCardPurchased = true;
  const result = learnRandomMediumSkill();
  showToast(result.toast);
  addLog("system", `你在商店中购入了 <strong>中级技能卡</strong>。${result.log}`);
  playSound("skill");
  renderShop();
  renderSkillsPanel();
}

function buyShopRelic(relicId) {
  if (state.shopRelics.has(relicId)) {
    showToast("这件圣物已经购入。");
    return;
  }
  if (!spendGold(SHOP_RELIC_PRICE)) {
    showToast("金币不足。");
    return;
  }
  state.shopRelics.add(relicId);
  showToast(`购入商店圣物：${SHOP_RELIC_DEFS[relicId].name}`);
  addLog("system", `你从商店购入了圣物 <strong>${SHOP_RELIC_DEFS[relicId].name}</strong>。${SHOP_RELIC_DEFS[relicId].description}`);
  playSound("win");
  renderShop();
  renderRelicBar();
}

function currentNodeDefinitions() {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: () => showToast("已通过"),
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通过" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: () => showToast("已通过"),
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: openShop,
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-5<br>即将开放" : "1-5<br>未解锁",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? "active" : "locked",
      onClick: () => showToast("1-5 关卡会在下一步继续制作。"),
      onCompletedClick: () => showToast("1-5 关卡会在下一步继续制作。"),
    },
  };
}

function updateHeroForView() {
  if (state.currentView === "map") {
    const page = MAP_PAGES[state.mapPage];
    dom.heroEyebrow.textContent = `世界地图 / 第 ${state.mapPage + 1} 页`;
    dom.heroTitle.textContent = `元素骰境：${page.name}`;
    dom.heroSubtitle.textContent = page.subtitle;
    return;
  }
  if (state.currentView === "event") {
    dom.heroEyebrow.textContent = "地点事件 / 宝箱";
    dom.heroTitle.textContent = "迷雾森林：林间宝箱";
    dom.heroSubtitle.textContent = "从 3 种随机奖励中选择 1 种带走，奖励会永久保留到后续流程。";
    return;
  }
  if (state.currentView === "shop") {
    dom.heroEyebrow.textContent = "地点事件 / 商店";
    dom.heroTitle.textContent = "迷雾森林：星辉行馆";
    dom.heroSubtitle.textContent = "在华丽的大商店中购买药丸、技能卡与商店圣物，为后面的 1-5 做好准备。";
    return;
  }
  const battle = state.currentBattleConfig || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  dom.heroEyebrow.textContent = battle.heroEyebrow;
  dom.heroTitle.textContent = battle.heroTitle;
  dom.heroSubtitle.textContent = battle.heroSubtitle;
}

function renderMap(animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
}

function setView(view) {
  state.currentView = view;
  dom.mapView.classList.toggle("hidden-view", view !== "map");
  dom.eventView.classList.toggle("hidden-view", view !== "event");
  dom.shopView.classList.toggle("hidden-view", view !== "shop");
  dom.libraryView.classList.toggle("hidden-view", view !== "library");
  dom.battleView.classList.toggle("hidden-view", view !== "battle");
  dom.mapButton.classList.toggle("hidden-control", view === "map");
  updateHeroForView();
}

function currentBasePlays() {
  const base = state.currentBattleConfig?.plays ?? MAX_TURNS;
  return base + (state.shopRelics.has("hero_chain") ? 1 : 0);
}

function damagePlayer(rawDamage) {
  let damage = Math.max(0, rawDamage - state.bossDamageReduction);
  if (damage > 0 && state.cloakGuard) {
    state.cloakGuard = false;
    return 0;
  }
  if (state.metalGuard) {
    state.metalGuard = false;
    return 0;
  }
  if (state.shieldHp > 0) {
    const absorbed = Math.min(state.shieldHp, damage);
    state.shieldHp -= absorbed;
    damage -= absorbed;
  }
  state.playerHp = Math.max(0, state.playerHp - damage);
  return damage;
}

function renderRelicBar() {
  dom.relicBar.innerHTML = "";
  [...state.relics, ...state.shopRelics].forEach((relicId) => {
    const relic = RELIC_DEFS[relicId] || SHOP_RELIC_DEFS[relicId];
    if (!relic) return;
    const slot = document.createElement("div");
    slot.className = "item-slot relic";
    slot.innerHTML = `<div class="item-icon">${relic.icon}</div><div><h4>${relic.name}</h4><p>${relic.description}</p></div><div class="item-count">${relic.short}</div>`;
    dom.relicBar.append(slot);
  });
}

function shopStatusCards() {
  return [
    {
      label: "当前金币",
      value: `${state.gold}`,
      text: "金币会在购买后立刻扣除，可以自由搭配药丸、技能卡和圣物。",
    },
    {
      label: "中级技能",
      value: `${state.learnedMediumSkills.size}`,
      text: state.shopSkillCardPurchased ? "本次商店的技能卡已经购买。" : "本次商店还能再购买 1 张技能卡。",
    },
    {
      label: "商店圣物",
      value: `${state.shopStockRelics.length} 陈列 / ${state.shopRelics.size} 已购`,
      text: "商店陈列的圣物就是商店圣物。本次会陈列 2 件，已购入的圣物不会在后续商店里重复出现。",
    },
  ];
}

function resetBattleState() {
  clearBossTimer();
  state.playerMaxHp = currentPlayerMaxHp();
  state.playerHp = state.playerMaxHp;
  state.bossMaxHp = state.currentBattleConfig?.bossMaxHp ?? MAX_BOSS_HP;
  state.bossHp = state.bossMaxHp;
  state.bossName = state.currentBattleConfig?.bossName || "石像守卫";
  state.bossWave = 1;
  state.bossCount = state.currentBattleConfig?.bossCount || 1;
  state.bossPatternIndex = 0;
  state.bossDamageBoost = 1;
  state.turn = 1;
  state.rerollsLeft = currentBaseRerolls();
  state.playsLeft = currentBasePlays();
  state.selectedDice.clear();
  state.phase = "player";
  state.gameOver = false;
  state.paused = false;
  state.metalGuard = false;
  state.shieldHp = 0;
  state.shieldTurns = 0;
  state.bossFrozen = false;
  state.bossDamageReduction = 0;
  state.cloakGuard = state.shopRelics.has("night_cloak");
  state.nextBossAction = chooseBossAction();
  state.dice = createStartingDicePool();
  dom.battleLog.innerHTML = "";
  dom.overlay.classList.add("hidden");
  dom.pauseOverlay.classList.add("hidden");
  addLog("system", state.currentBattleConfig?.introLog || "战斗开始。");
  if (state.shopRelics.has("starlight_eye")) addLog("system", "星光之眼照亮了骰池，开局已形成至少三同色布局。");
  if (state.cloakGuard) addLog("system", "暗夜斗篷在本关待命，将免疫你受到的第一次伤害。");
  addLog("boss", `${bossDisplayName()} 露出了下一步意图：<strong>${state.nextBossAction.label}</strong>。`);
  renderDice();
  syncBattleUi();
}

function resetRun() {
  clearBossTimer();
  state.completedNodes = new Set();
  state.gold = 0;
  state.currentEvent = null;
  state.eventChoices = [];
  state.shopStockRelics = [];
  state.shopSkillCardPurchased = false;
  state.inventory = { blue_pill: 0, red_pill: 0, green_pill: 0, yellow_pill: 0 };
  state.relics = new Set();
  state.shopRelics = new Set();
  state.learnedMediumSkills = new Set();
  state.runBonusMaxHp = 0;
  state.diceBlueprints = Array.from({ length: DICE_COUNT }, (_, index) => createDieBlueprint(index));
  state.mapPage = 0;
  setBattleConfig(NODE_KEYS.forest_1_1);
  resetBattleState();
  dom.overlay.classList.add("hidden");
  closeHelp();
  returnToMap();
}

function returnToMap() {
  clearBossTimer();
  state.paused = false;
  dom.pauseOverlay.classList.add("hidden");
  dom.overlay.classList.add("hidden");
  closeHelp();
  renderMap();
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
  setView("map");
}

state.darkHunterRevived = false;
state.darkHunterStealthed = false;
state.darkHunterWindup = false;
state.darkHunterReviveAvailable = false;

BATTLE_CONFIGS[NODE_KEYS.forest_1_5] = {
  nodeKey: NODE_KEYS.forest_1_5,
  heroEyebrow: "第五关 / 暗夜猎人",
  heroTitle: "元素骰境：暗夜猎人",
  heroSubtitle: "在 8 次出骰机会与 8 次重掷内击败暗夜猎人。提防它的隐匿刺杀，以及死亡后仅会触发一次的暗夜苏生。",
  bossName: "暗夜猎人",
  bossMaxHp: 250,
  plays: 8,
  rerolls: 8,
  rewardType: "map",
  rewardGold: 8,
  introLog: "第五关开始。暗夜猎人从雾幕与月辉中现身，冰冷地审视着你的每一步。",
  chooseBossAction() {
    if (state.darkHunterWindup) return { id: "assassinate", label: "刺杀", value: 80 };
    return Math.random() < 0.8
      ? { id: "shadow_arrow", label: "暗影箭", value: 35 }
      : { id: "stealth", label: "隐匿刺杀", value: 0 };
  },
};

function startFifthLevel() {
  setBattleConfig(NODE_KEYS.forest_1_5);
  resetBattleState();
  setView("battle");
  showToast("第五关开始。");
  playSound("select");
}

function currentNodeDefinitions() {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: () => showToast("已通过"),
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通过" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: () => showToast("已通过"),
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: openShop,
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通过" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: () => showToast("已通过"),
    },
  };
}

function updateHeroForView() {
  if (state.currentView === "map") {
    const page = MAP_PAGES[state.mapPage];
    dom.heroEyebrow.textContent = `世界地图 / 第 ${state.mapPage + 1} 页`;
    dom.heroTitle.textContent = `元素骰境：${page.name}`;
    dom.heroSubtitle.textContent = page.subtitle;
    return;
  }
  if (state.currentView === "event") {
    dom.heroEyebrow.textContent = "地点事件 / 宝箱";
    dom.heroTitle.textContent = "迷雾森林：林间宝箱";
    dom.heroSubtitle.textContent = "从 3 种随机奖励中选择 1 种带走，奖励会永久保留到后续流程。";
    return;
  }
  if (state.currentView === "shop") {
    dom.heroEyebrow.textContent = "地点事件 / 商店";
    dom.heroTitle.textContent = "迷雾森林：星辉行馆";
    dom.heroSubtitle.textContent = "在华丽的大商店中购买药丸、技能卡与商店圣物，为后面的 1-5 做好准备。";
    return;
  }
  const battle = state.currentBattleConfig || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  dom.heroEyebrow.textContent = battle.heroEyebrow;
  dom.heroTitle.textContent = battle.heroTitle;
  dom.heroSubtitle.textContent = battle.heroSubtitle;
}

function renderMap(animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
}

function damageBoss(amount) {
  if (state.currentBattleKey === NODE_KEYS.forest_1_5 && state.darkHunterStealthed && amount > 0) {
    showToast("暗夜猎人处于隐匿状态，免疫了这次伤害。");
    showBattleFloat(".boss-card", "隐匿", "immune");
    addLog("boss", "暗夜猎人潜入阴影，避开了你的攻击。");
    return;
  }
  state.bossHp = Math.max(0, state.bossHp - amount);
}

function renderBossPortrait() {
  if (!dom.bossPortrait) return;
  if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
    dom.bossPortrait.classList.remove("wolf-pack");
    dom.bossPortrait.classList.add("dark-hunter");
    dom.bossPortrait.classList.toggle("stealthed", state.darkHunterStealthed);
    dom.bossPortrait.innerHTML = `
      <svg class="dark-hunter-illustration" viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <linearGradient id="hunterHair" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#f8fbff" />
            <stop offset="100%" stop-color="#c5d0e5" />
          </linearGradient>
          <linearGradient id="hunterArmor" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#8da0d6" />
            <stop offset="45%" stop-color="#3c4b79" />
            <stop offset="100%" stop-color="#10182e" />
          </linearGradient>
          <linearGradient id="hunterCloak" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#253253" />
            <stop offset="100%" stop-color="#060914" />
          </linearGradient>
          <linearGradient id="hunterSkin" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#f4d9d3" />
            <stop offset="100%" stop-color="#c89d9a" />
          </linearGradient>
        </defs>
        <path class="cloak-flow" d="M42 170 C38 122, 54 70, 92 42 C76 88, 88 132, 104 182 C78 196, 56 192, 42 170 Z" fill="url(#hunterCloak)" opacity="0.96"/>
        <path class="cloak-flow" d="M176 172 C182 132, 170 80, 130 40 C142 90, 134 136, 120 182 C146 194, 166 191, 176 172 Z" fill="url(#hunterCloak)" opacity="0.96"/>
        <path d="M82 52 L52 92 L82 104 L92 62 Z" fill="url(#hunterArmor)" />
        <path d="M138 52 L168 92 L138 104 L128 62 Z" fill="url(#hunterArmor)" />
        <path d="M84 88 C92 72, 108 62, 122 62 C136 62, 150 72, 156 88 L150 162 C144 172, 132 180, 120 182 C106 180, 94 172, 88 162 Z" fill="url(#hunterArmor)" />
        <path d="M102 82 C108 72, 120 70, 128 78 C132 88, 128 106, 122 116 C112 112, 102 102, 102 82 Z" fill="url(#hunterSkin)" />
        <path d="M82 86 C88 66, 102 48, 120 46 C138 48, 150 64, 148 84 C146 102, 132 116, 118 118 C100 116, 84 104, 82 86 Z" fill="url(#hunterSkin)" />
        <path d="M86 56 C90 34, 106 24, 126 24 C144 26, 152 42, 150 60 C146 84, 126 102, 102 106 C94 92, 90 72, 86 56 Z" fill="url(#hunterHair)" />
        <path d="M92 54 C104 38, 118 30, 128 30 C122 46, 118 62, 116 98 C102 94, 94 78, 92 54 Z" fill="url(#hunterHair)" />
        <path d="M116 42 C128 54, 136 78, 136 112 C146 106, 154 94, 156 78 C158 58, 146 40, 116 42 Z" fill="url(#hunterHair)" />
        <ellipse class="glow-eye" cx="118" cy="74" rx="4" ry="3" fill="#c4f2ff" />
        <path d="M108 86 C114 88, 120 88, 126 84" stroke="#8a5353" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M94 110 C106 118, 120 120, 136 114 L138 144 C130 158, 110 160, 100 146 Z" fill="#d9dce7" opacity="0.88"/>
        <path d="M116 120 L124 136 L116 152 L108 136 Z" class="glow-rune" fill="#9ed8ff" opacity="0.9"/>
      </svg>
      <span>${bossDisplayName()}</span>
    `;
    return;
  }
  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    dom.bossPortrait.classList.remove("dark-hunter", "stealthed");
    dom.bossPortrait.classList.add("wolf-pack");
    dom.bossPortrait.innerHTML = `
      <svg class="wolf-illustration" viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <linearGradient id="wolfFur" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="56%" stop-color="#e7eaee" />
            <stop offset="100%" stop-color="#bcc2c9" />
          </linearGradient>
          <linearGradient id="wolfShade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#fefefe" />
            <stop offset="100%" stop-color="#aeb5bc" />
          </linearGradient>
          <linearGradient id="wolfDark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2c3138" />
            <stop offset="100%" stop-color="#0d0f13" />
          </linearGradient>
        </defs>
        <path class="wolf-shadow" d="M28 188 C74 176, 160 176, 204 190" />
        <path class="wolf-tail-shape" d="M148 94 C182 80, 212 88, 214 104 C214 118, 190 120, 169 115 C188 122, 202 136, 194 148 C184 158, 152 143, 128 122 Z" />
        <path class="wolf-body-shape" d="M72 68 C97 54, 132 56, 152 76 C166 90, 170 114, 162 133 C152 157, 124 170, 94 168 C64 166, 44 148, 40 124 C36 98, 48 78, 72 68 Z" />
        <path class="wolf-chest-shape" d="M84 92 C92 78, 108 74, 118 82 C126 92, 124 116, 114 130 C104 144, 88 144, 80 132 C74 120, 76 106, 84 92 Z" />
        <path class="wolf-neck-shape" d="M66 82 C72 62, 90 44, 110 42 C126 42, 138 50, 140 62 C142 76, 132 88, 118 96 C102 104, 78 106, 66 82 Z" />
        <path class="wolf-head-shape" d="M48 28 C62 18, 82 18, 96 26 C104 32, 108 44, 106 56 C104 74, 88 84, 68 84 C48 82, 34 70, 34 54 C34 44, 38 34, 48 28 Z" />
        <path class="wolf-muzzle-shape" d="M86 40 C98 42, 110 50, 118 60 C122 66, 120 72, 112 74 C98 78, 78 74, 72 64 C68 56, 74 40, 86 40 Z" />
        <path class="wolf-jaw-shape" d="M82 66 C98 70, 110 76, 116 88 C112 96, 102 102, 88 100 C74 98, 66 90, 68 82 C70 76, 74 70, 82 66 Z" />
        <path class="wolf-ear-left-shape" d="M52 22 L64 2 L74 26 Z" />
        <path class="wolf-ear-right-shape" d="M74 24 L92 10 L90 34 Z" />
        <path class="wolf-leg-back-shape" d="M116 152 C126 150, 134 156, 134 166 L130 204 C128 210, 120 212, 116 206 L114 170 C114 162, 112 156, 116 152 Z" />
        <path class="wolf-leg-back2-shape" d="M146 146 C154 146, 160 154, 158 164 L152 205 C150 211, 142 213, 138 208 L138 168 C138 160, 140 150, 146 146 Z" />
        <path class="wolf-leg-front-shape" d="M74 150 C82 144, 94 146, 98 156 L94 206 C92 212, 84 214, 80 208 L76 170 C74 162, 70 156, 74 150 Z" />
        <path class="wolf-leg-front2-shape" d="M96 144 C106 140, 116 146, 118 156 L114 206 C112 212, 104 214, 100 208 L98 168 C98 160, 94 150, 96 144 Z" />
        <ellipse class="wolf-eye-shape" cx="66" cy="46" rx="3.4" ry="4.1" />
        <ellipse class="wolf-eye-shape" cx="78" cy="49" rx="2.8" ry="3.4" />
        <path class="wolf-brow" d="M58 40 C64 36, 70 36, 76 40" />
        <path class="wolf-nose-shape" d="M112 66 C116 66, 120 68, 120 72 C120 76, 116 78, 112 78 C108 78, 104 76, 104 72 C104 68, 108 66, 112 66 Z" />
        <path class="wolf-fang-left" d="M94 84 L98 98 L92 98 Z" />
        <path class="wolf-fang-right" d="M104 88 L108 102 L102 102 Z" />
        <path class="wolf-snarl" d="M84 82 C94 88, 102 90, 112 88" />
      </svg>
      <span>${bossDisplayName()}</span>
    `;
    return;
  }
  dom.bossPortrait.classList.remove("wolf-pack", "dark-hunter", "stealthed");
  dom.bossPortrait.innerHTML = `
    <div class="boss-horn boss-horn-left"></div>
    <div class="boss-horn boss-horn-right"></div>
    <div class="boss-shoulder boss-shoulder-left"></div>
    <div class="boss-shoulder boss-shoulder-right"></div>
    <div class="boss-upperarm boss-upperarm-left"></div>
    <div class="boss-upperarm boss-upperarm-right"></div>
    <div class="boss-forearm boss-forearm-left"></div>
    <div class="boss-forearm boss-forearm-right"></div>
    <div class="boss-fist boss-fist-left"></div>
    <div class="boss-fist boss-fist-right"></div>
    <div class="boss-neck"></div>
    <div class="boss-core"></div>
    <div class="boss-lava boss-lava-chest"></div>
    <div class="boss-lava boss-lava-left"></div>
    <div class="boss-lava boss-lava-right"></div>
    <div class="boss-face">
      <span class="boss-eye boss-eye-left"></span>
      <span class="boss-eye boss-eye-right"></span>
      <span class="boss-mouth"></span>
    </div>
    <span>${bossDisplayName()}</span>
  `;
}

function bossActionMeta(action) {
  if (!action) return { icon: "?", title: "Boss 正在观察你", text: "预告区会显示它下一次行动。", badge: "待揭示", preview: "预告中" };
  if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
    if (action.id === "shadow_arrow") return { icon: "影", title: action.label, text: "预计造成 35 点伤害。", badge: "远程", preview: "即将暗影箭" };
    if (action.id === "stealth") return { icon: "隐", title: action.label, text: "下回合进入隐匿状态，期间不会受到伤害；再下一回合发动刺杀。", badge: "隐匿", preview: "即将隐匿" };
    if (action.id === "assassinate") return { icon: "杀", title: action.label, text: "预计造成 80 点高额伤害，必须提前准备防御、冻结或免疫。", badge: "致命", preview: "即将刺杀" };
  }
  if (action.id === "attack") return { icon: "刃", title: action.label, text: `预计造成 ${Math.round(action.value * state.bossDamageBoost)} 点伤害。`, badge: state.bossDamageBoost > 1 ? "强化" : "轻击", preview: `即将${action.label}` };
  if (action.id === "slam") return { icon: "爆", title: action.label, text: `预计造成 ${action.value} 点伤害，建议提前准备金属化或护盾。`, badge: "高伤", preview: `即将${action.label}` };
  return { icon: "+", title: action.label, text: state.currentBattleKey === NODE_KEYS.forest_1_3 ? `回复 ${action.value} 点生命，并让下一次攻击伤害提升 50%。` : `预计回复 ${action.value} 点生命，这通常是你的输出窗口。`, badge: "回血", preview: `即将${action.label}` };
}

function getGuideTip() {
  const action = state.nextBossAction;
  if (!action) return { title: "先观察 Boss 的下一招", text: "预告区会告诉你下一回合应该保命还是抢输出。" };
  if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
    if (state.darkHunterStealthed && state.darkHunterWindup) return { title: "猎人已隐入黑暗", text: "这一回合几乎不该浪费输出，优先准备金属化、护盾、黄药丸或保命道具，迎接下一击刺杀。" };
    if (action.id === "stealth") return { title: "提前准备反制刺杀", text: "它先隐匿，再在下一回合刺杀。你现在最好囤防御、冻结或者免疫手段。" };
    if (action.id === "assassinate") return { title: "这一击非常危险", text: "80 点伤害会迅速压垮血线，尽量用金属、土盾、黄药丸或暗夜斗篷去化解。" };
    return { title: "暗影箭压力稳定但持续", text: "单发伤害不低，适合边控血线边规划爆发，注意它死亡后还会有一次复活。" };
  }
  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    if (action.id === "heal") return { title: "野性咆哮后要准备防御", text: "它回完血后的下一击会强化 50%，尽量提前准备金属化、护盾或冻结。" };
    if (state.bossDamageBoost > 1) return { title: "下一击已经强化", text: "这回合更适合保命，不要硬吃强化后的利爪撕咬。" };
    return { title: "抓紧清掉当前这只狼", text: "狼群是连续车轮战，尽量在低风险回合多打伤害，减少后续压力。" };
  }
  if (action.id === "slam") return { title: "优先考虑保命", text: "尽量凑三个金或三个土，实在没有也可以使用黄药丸冻结 Boss。" };
  if (action.id === "heal") return { title: "这是抢节奏的机会", text: "回血回合适合拼火、水或直接追求五以太终结。" };
  return { title: "维持血线并持续压制", text: "普通攻击压力不大，可以继续找输出或补充资源。" };
}

function syncBattleUi() {
  const bossName = bossDisplayName();
  renderBossPortrait();
  dom.goldCount.textContent = String(state.gold);
  dom.playerHpLabel.textContent = `${state.playerHp} / ${state.playerMaxHp}`;
  dom.playerHpBar.style.width = `${(state.playerHp / state.playerMaxHp) * 100}%`;
  dom.bossHpLabel.textContent = `${state.bossHp} / ${state.bossMaxHp}`;
  dom.bossHpBar.style.width = `${(state.bossHp / state.bossMaxHp) * 100}%`;
  dom.turnCounter.textContent = `回合 ${state.turn} / ${currentBasePlays()}`;
  dom.rerollCounter.textContent = String(state.rerollsLeft);
  dom.playCounter.textContent = String(state.playsLeft);
  dom.metalState.textContent = state.metalGuard ? "已激活" : "未激活";
  dom.shieldState.textContent = state.shieldHp > 0 ? `${state.shieldHp} / ${state.shieldTurns}` : "0 / 0";
  dom.freezeState.textContent = state.bossFrozen ? "已冻结" : state.currentBattleKey === NODE_KEYS.forest_1_5 && state.darkHunterStealthed ? "隐匿中" : "无";
  dom.bossState.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5
    ? state.darkHunterStealthed
      ? "隐匿状态"
      : state.darkHunterReviveAvailable
        ? "苏生待命"
        : state.darkHunterRevived
          ? "已完成苏生"
          : "夜幕游猎"
    : state.bossDamageBoost > 1
      ? "下一击强化"
      : state.bossDamageReduction > 0
        ? `伤害 -${state.bossDamageReduction}`
        : state.currentBattleKey === NODE_KEYS.forest_1_3
          ? "狼群环伺"
          : "石纹微震";
  const bossPortraitName = document.querySelector(".boss-portrait > span");
  const bossCardTitle = document.querySelector(".boss-card .status-head h2");
  if (bossPortraitName) bossPortraitName.textContent = bossName;
  if (bossCardTitle) bossCardTitle.textContent = bossName;
  dom.phaseBadge.textContent = state.phase === "player" ? "玩家回合" : state.phase === "boss" ? "Boss 回合" : "战斗结束";
  dom.pauseButton.disabled = state.gameOver;
  dom.pauseButton.textContent = state.paused ? "继续" : "暂停";
  dom.audioButton.textContent = `音效：${state.audioEnabled ? "开" : "关"}`;
  const preview = bossActionMeta(state.nextBossAction);
  const guide = getGuideTip();
  dom.forecastIcon.textContent = preview.icon;
  dom.forecastTitle.textContent = preview.title;
  dom.forecastText.textContent = preview.text;
  dom.forecastBadge.textContent = preview.badge;
  dom.bossIntent.textContent = state.paused ? "已暂停" : state.phase === "boss" ? "行动中" : preview.preview;
  dom.guideTitle.textContent = guide.title;
  dom.guideText.textContent = guide.text;
  dom.forecastCard.classList.remove("attack", "slam", "heal", "windup");
  if (state.currentBattleKey === NODE_KEYS.forest_1_5 && (state.nextBossAction?.id === "assassinate" || state.darkHunterWindup)) dom.forecastCard.classList.add("windup");
  if (state.nextBossAction?.id === "attack" || state.nextBossAction?.id === "shadow_arrow") dom.forecastCard.classList.add("attack");
  if (state.nextBossAction?.id === "slam") dom.forecastCard.classList.add("slam");
  if (state.nextBossAction?.id === "heal" || state.nextBossAction?.id === "stealth") dom.forecastCard.classList.add("heal");
  const disableActions = state.gameOver || state.phase !== "player" || state.paused;
  dom.rerollButton.disabled = disableActions || state.selectedDice.size === 0 || state.rerollsLeft <= 0;
  dom.playButton.disabled = disableActions || state.selectedDice.size === 0 || state.playsLeft <= 0;
  dom.clearButton.disabled = disableActions || state.selectedDice.size === 0;
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
}

function resolveBossTurn() {
  if (state.gameOver || state.paused) return;
  const action = state.nextBossAction || chooseBossAction();
  dom.bossIntent.textContent = "行动中";
  if (state.bossFrozen) {
    state.bossFrozen = false;
    state.bossPatternIndex += 1;
    addLog("boss", `${bossDisplayName()} 被冻结，当前回合无法行动。`);
    showToast("Boss 行动被跳过。");
    playSound("freeze");
    consumeShieldTurn();
    finishRound();
    return;
  }
  if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
    if (action.id === "stealth") {
      state.darkHunterStealthed = true;
      state.darkHunterWindup = true;
      addLog("boss", "暗夜猎人发动 <strong>隐匿刺杀</strong>，身影沉入夜色，本回合起将免疫伤害，并在下个 Boss 回合发动刺杀。");
      showToast("暗夜猎人进入隐匿状态。");
      playSound("bossHeal");
    } else if (action.id === "assassinate") {
      state.darkHunterStealthed = false;
      state.darkHunterWindup = false;
      const dealt = damagePlayer(action.value);
      addLog("boss", `暗夜猎人从阴影中发动 <strong>刺杀</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
      showToast("暗夜猎人发动了刺杀。");
      showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
      applyTransientClass(".player-card", "impact", 500);
      playSound("bossSlam");
    } else {
      const dealt = damagePlayer(action.value);
      addLog("boss", `暗夜猎人射出 <strong>暗影箭</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
      showToast("暗影箭命中。");
      showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
      applyTransientClass(".player-card", "impact", 500);
      playSound("bossAttack");
    }
    state.bossPatternIndex += 1;
    consumeShieldTurn();
    syncBattleUi();
    if (checkBattleEnd()) return;
    finishRound();
    return;
  }
  const previousResolveBossTurn = (() => {});
  const action2 = action;
  if (action2.id === "heal") {
    healBoss(action2.value);
    if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
      state.bossDamageBoost = 1.5;
      addLog("boss", `迅猛狼发动 <strong>${action2.label}</strong>，回复了 <strong>${action2.value}</strong> 点生命，并让下一次攻击伤害提升 50%。`);
      showToast("野性咆哮强化了下一次攻击。");
    } else {
      addLog("boss", `石像守卫发动 <strong>${action2.label}</strong>，回复了 <strong>${action2.value}</strong> 点生命。`);
      showToast("Boss 回复了生命。");
    }
    showBattleFloat(".boss-card", `+${action2.value}`, "heal");
    playSound("bossHeal");
  } else {
    const damageValue = Math.round(action2.value * state.bossDamageBoost);
    const dealt = damagePlayer(damageValue);
    addLog("boss", `${bossDisplayName()} 发动 <strong>${action2.label}</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
    showToast(`Boss 使出了${action2.label}。`);
    showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 500);
    playSound(action2.id === "slam" ? "bossSlam" : "bossAttack");
    state.bossDamageBoost = 1;
  }
  state.bossPatternIndex += 1;
  consumeShieldTurn();
  syncBattleUi();
  if (checkBattleEnd()) return;
  finishRound();
}

function checkBattleEnd(forceTurnCheck = false) {
  if (state.currentBattleKey === NODE_KEYS.forest_1_5 && state.bossHp <= 0 && state.darkHunterReviveAvailable) {
    state.darkHunterReviveAvailable = false;
    state.darkHunterRevived = true;
    state.darkHunterStealthed = false;
    state.darkHunterWindup = false;
    state.bossHp = 100;
    addLog("boss", "暗夜猎人触发了 <strong>暗夜苏生</strong>，在倒下的瞬间重新站起，并恢复了 <strong>100</strong> 点生命。");
    showToast("暗夜猎人发动暗夜苏生。");
    showBattleFloat(".boss-card", "+100", "heal");
    syncBattleUi();
    return false;
  }
  if (state.bossHp <= 0) {
    if (maybeAdvanceBossWave()) return false;
    state.gameOver = true;
    state.phase = "end";
    const nodeKey = state.currentBattleKey || NODE_KEYS.forest_1_1;
    const firstClear = !hasCompleted(nodeKey);
    let relic = null;
    if (firstClear) {
      completeNode(nodeKey);
      addGold(state.currentBattleConfig?.rewardGold || 0);
      if (state.currentBattleConfig?.rewardType === "treasure") {
        state.overlayAction = "treasure";
      } else if (state.currentBattleConfig?.rewardType === "wolf_relic") {
        relic = grantRandomWolfRelic();
        state.overlayAction = firstClear && state.currentBattleKey === NODE_KEYS.forest_1_3 ? "shop" : "map";
      } else {
        state.overlayAction = "map";
      }
    } else {
      state.overlayAction = "map";
    }
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战成功";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5
      ? "暗夜猎人已被终结"
      : state.currentBattleKey === NODE_KEYS.forest_1_3
        ? "迅猛狼群已被击退"
        : "石像守卫已被击碎";
    if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
      dom.overlayText.textContent = firstClear
        ? "你在夜幕深处击败了暗夜猎人，闯过了 1-5。它的隐匿刺杀与暗夜苏生都没能阻止你。"
        : "你再次击败了暗夜猎人，可以返回地图继续规划后续章节。";
      dom.overlayButton.textContent = "返回地图";
    } else if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
      dom.overlayText.textContent = firstClear
        ? `你连续击败了三只迅猛狼，获得 ${THIRD_LEVEL_CLEAR_GOLD} 枚金币，并拿到了圣物“${relic?.name || "未知圣物"}”。效果：${relicEffectText(relic)}`
        : "你再次击退了迅猛狼群，可以返回地图继续前进。";
      dom.overlayButton.textContent = firstClear ? "进入商店" : "返回地图";
    } else {
      dom.overlayText.textContent = firstClear
        ? `你完成了首关挑战，并获得 ${FIRST_LEVEL_CLEAR_GOLD} 枚金币。接下来会进入第 2 个地点的宝箱事件。`
        : "你再次击败了石像守卫，可以返回地图继续查看路线。";
      dom.overlayButton.textContent = firstClear ? "进入第 2 地点" : "返回地图";
    }
    dom.overlay.classList.remove("hidden");
    addLog("system", `战斗结束。你成功击败了 ${state.currentBattleConfig?.bossName || "Boss"}。`);
    playSound("win");
    renderMap();
    return true;
  }
  if (state.playerHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5 ? "你被暗夜猎人猎杀" : state.currentBattleKey === NODE_KEYS.forest_1_3 ? "你被狼群撕碎了防线" : "你被石像守卫击倒";
    dom.overlayText.textContent = "生命归零，遗迹深处再度归于沉寂。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你的生命值耗尽，挑战失败。");
    playSound("lose");
    return true;
  }
  if (forceTurnCheck && state.playsLeft <= 0 && state.bossHp > 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5 ? "出骰机会已尽" : state.currentBattleKey === NODE_KEYS.forest_1_3 ? "出骰机会已尽" : "六回合已尽";
    dom.overlayText.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5 ? "八次出骰机会已经耗尽，暗夜猎人仍潜伏在夜色中，第五关挑战失败。" : state.currentBattleKey === NODE_KEYS.forest_1_3 ? "十次出骰机会已经耗尽，狼群仍未被清空，第三关挑战失败。" : "石像守卫仍然屹立，第一关挑战失败。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "出骰回合耗尽后 Boss 仍然存活，本次挑战失败。");
    playSound("lose");
    return true;
  }
  return false;
}

function resetBattleState() {
  clearBossTimer();
  ensureDieBlueprints();
  state.playerMaxHp = currentPlayerMaxHp();
  state.playerHp = state.playerMaxHp;
  state.bossMaxHp = state.currentBattleConfig?.bossMaxHp ?? MAX_BOSS_HP;
  state.bossHp = state.bossMaxHp;
  state.bossName = state.currentBattleConfig?.bossName || "石像守卫";
  state.bossWave = 1;
  state.bossCount = state.currentBattleConfig?.bossCount || 1;
  state.bossPatternIndex = 0;
  state.bossDamageBoost = 1;
  state.turn = 1;
  state.rerollsLeft = currentBaseRerolls();
  state.playsLeft = currentBasePlays();
  state.selectedDice.clear();
  state.phase = "player";
  state.gameOver = false;
  state.paused = false;
  state.metalGuard = false;
  state.shieldHp = 0;
  state.shieldTurns = 0;
  state.bossFrozen = false;
  state.bossDamageReduction = 0;
  state.cloakGuard = state.shopRelics.has("night_cloak");
  state.darkHunterRevived = false;
  state.darkHunterStealthed = false;
  state.darkHunterWindup = false;
  state.darkHunterReviveAvailable = state.currentBattleKey === NODE_KEYS.forest_1_5;
  state.nextBossAction = chooseBossAction();
  state.dice = createStartingDicePool();
  syncDieBlueprintsFromDice(state.dice);
  dom.battleLog.innerHTML = "";
  dom.overlay.classList.add("hidden");
  dom.pauseOverlay.classList.add("hidden");
  addLog("system", state.currentBattleConfig?.introLog || "战斗开始。");
  if (state.shopRelics.has("starlight_eye")) addLog("system", "星光之眼照亮了骰池，开局已形成至少三同色布局。");
  if (state.cloakGuard) addLog("system", "暗夜斗篷在本关待命，将免疫你受到的第一次伤害。");
  if (state.currentBattleKey === NODE_KEYS.forest_1_5) addLog("boss", "暗夜猎人的被动 <strong>暗夜苏生</strong> 已待命，它倒下时会复活一次并恢复 100 生命。");
  addLog("boss", `${bossDisplayName()} 露出了下一步意图：<strong>${state.nextBossAction.label}</strong>。`);
  renderDice();
  syncBattleUi();
}

function currentNodeDefinitions() {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: () => showToast("已通关"),
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: () => showToast("已通关"),
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: openShop,
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: () => showToast("已通关"),
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已领取" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: () => showToast("大图书馆的馈赠已经领取。"),
    },
  };
}

function updateHeroForView() {
  if (state.currentView === "map") {
    const page = MAP_PAGES[state.mapPage];
    dom.heroEyebrow.textContent = `世界地图 / 第 ${state.mapPage + 1} 页`;
    dom.heroTitle.textContent = `元素骰境：${page.name}`;
    dom.heroSubtitle.textContent = page.subtitle;
    return;
  }
  if (state.currentView === "event") {
    dom.heroEyebrow.textContent = "地点事件 / 宝箱";
    dom.heroTitle.textContent = "迷雾森林：林间宝箱";
    dom.heroSubtitle.textContent = "从 3 种随机奖励中选择 1 种带走，奖励会永久保留到后续流程。";
    return;
  }
  if (state.currentView === "shop") {
    dom.heroEyebrow.textContent = "地点事件 / 商店";
    dom.heroTitle.textContent = "迷雾森林：星辉行馆";
    dom.heroSubtitle.textContent = "在华丽的商店中购买药丸、技能卡与商店圣物，为后续战斗做好准备。";
    return;
  }
  if (state.currentView === "library") {
    dom.heroEyebrow.textContent = "奖励关 / 大图书馆";
    dom.heroTitle.textContent = "迷雾森林：大图书馆";
    dom.heroSubtitle.textContent = "在篝火、古籍与秘火铸炉之间作出一次永久选择，只能领取其中一项馈赠。";
    return;
  }
  const battle = state.currentBattleConfig || BATTLE_CONFIGS[NODE_KEYS.forest_1_1];
  dom.heroEyebrow.textContent = battle.heroEyebrow;
  dom.heroTitle.textContent = battle.heroTitle;
  dom.heroSubtitle.textContent = battle.heroSubtitle;
}

function renderMap(animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
    ? "1-6 大图书馆已经开放。进入后可从三项永久奖励中选择其一。"
    : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : state.mapPage === 0 && index === 5
                ? NODE_KEYS.forest_1_6
                : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : def?.icon === "library"
              ? `<div class="map-node-icon-library"><span></span></div>`
              : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
}

function checkBattleEnd(forceTurnCheck = false) {
  if (state.currentBattleKey === NODE_KEYS.forest_1_5 && state.bossHp <= 0 && state.darkHunterReviveAvailable) {
    state.darkHunterReviveAvailable = false;
    state.darkHunterRevived = true;
    state.darkHunterStealthed = false;
    state.darkHunterWindup = false;
    state.bossHp = 100;
    addLog("boss", "暗夜猎人触发了 <strong>暗夜苏生</strong>，倒下后再度起身，并恢复了 <strong>100</strong> 点生命。");
    showToast("暗夜猎人发动了暗夜苏生。");
    showBattleFloat(".boss-card", "+100", "heal");
    syncBattleUi();
    return false;
  }
  if (state.bossHp <= 0) {
    if (maybeAdvanceBossWave()) return false;
    state.gameOver = true;
    state.phase = "end";
    const nodeKey = state.currentBattleKey || NODE_KEYS.forest_1_1;
    const firstClear = !hasCompleted(nodeKey);
    let relic = null;
    if (firstClear) {
      completeNode(nodeKey);
      addGold(state.currentBattleConfig?.rewardGold || 0);
      if (state.currentBattleConfig?.rewardType === "treasure") {
        state.overlayAction = "treasure";
      } else if (state.currentBattleConfig?.rewardType === "wolf_relic") {
        relic = grantRandomWolfRelic();
        state.overlayAction = state.currentBattleKey === NODE_KEYS.forest_1_3 ? "shop" : "map";
      } else if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
        state.overlayAction = "library";
      } else {
        state.overlayAction = "map";
      }
    } else {
      state.overlayAction = "map";
    }
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战成功";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5
      ? "暗夜猎人已被终结"
      : state.currentBattleKey === NODE_KEYS.forest_1_3
        ? "迅猛狼群已被击退"
        : "石像守卫已被击碎";
    if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
      dom.overlayText.textContent = firstClear
        ? "你闯过了 1-5，迷雾深处的大图书馆已经向你开放。下一步可以领取一次永久奖励。"
        : "你再次击败了暗夜猎人，可以返回地图继续规划后续章节。";
      dom.overlayButton.textContent = firstClear ? "进入大图书馆" : "返回地图";
    } else if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
      dom.overlayText.textContent = firstClear
        ? `你连续击败了三只迅猛狼，获得 ${THIRD_LEVEL_CLEAR_GOLD} 枚金币，并得到了圣物“${relic?.name || "未知圣物"}”。效果：${relicEffectText(relic)}`
        : "你再次击退了迅猛狼群，可以返回地图继续前进。";
      dom.overlayButton.textContent = firstClear ? "进入商店" : "返回地图";
    } else {
      dom.overlayText.textContent = firstClear
        ? `你完成了首关挑战，并获得 ${FIRST_LEVEL_CLEAR_GOLD} 枚金币。接下来将进入第 2 个地点的宝箱事件。`
        : "你再次击败了石像守卫，可以返回地图继续查看路线。";
      dom.overlayButton.textContent = firstClear ? "进入第 2 地点" : "返回地图";
    }
    dom.overlay.classList.remove("hidden");
    addLog("system", `战斗结束。你成功击败了 ${state.currentBattleConfig?.bossName || "Boss"}。`);
    playSound("win");
    renderMap();
    return true;
  }
  if (state.playerHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5 ? "你被暗夜猎人猎杀" : state.currentBattleKey === NODE_KEYS.forest_1_3 ? "你被狼群撕碎了防线" : "你被石像守卫击倒";
    dom.overlayText.textContent = "生命归零，遗迹深处再次归于沉寂。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你的生命值耗尽，挑战失败。");
    playSound("lose");
    return true;
  }
  if (forceTurnCheck && state.playsLeft <= 0 && state.bossHp > 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = state.currentBattleKey && state.currentBattleKey !== NODE_KEYS.forest_1_1 ? "run_reset" : "reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5 ? "出骰机会已尽" : state.currentBattleKey === NODE_KEYS.forest_1_3 ? "出骰机会已尽" : "六回合已尽";
    dom.overlayText.textContent = state.currentBattleKey === NODE_KEYS.forest_1_5
      ? "八次出骰机会已经耗尽，暗夜猎人仍潜伏在夜色中，第五关挑战失败。"
      : state.currentBattleKey === NODE_KEYS.forest_1_3
        ? "十次出骰机会已经耗尽，狼群仍未被清空，第三关挑战失败。"
        : "石像守卫依然屹立，第一关挑战失败。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "出骰回合耗尽后 Boss 仍然存活，本次挑战失败。");
    playSound("lose");
    return true;
  }
  return false;
}

dom.rerollButton.addEventListener("click", rerollSelectedDice);
dom.playButton.addEventListener("click", resolvePlayerAction);
dom.clearButton.addEventListener("click", clearSelection);
dom.mapButton.addEventListener("click", returnToMap);
dom.mapPrevButton.addEventListener("click", () => {
  if (state.mapPage > 0) {
    state.mapPage -= 1;
    renderMap(true);
    updateHeroForView();
  }
});
dom.mapNextButton.addEventListener("click", () => {
  if (state.mapPage < MAP_PAGES.length - 1) {
    state.mapPage += 1;
    renderMap(true);
    updateHeroForView();
  }
});
dom.pauseButton.addEventListener("click", () => togglePause());
dom.helpButton.addEventListener("click", openHelp);
dom.closeHelpButton.addEventListener("click", closeHelp);
dom.resumeButton.addEventListener("click", () => togglePause(false));
dom.pauseHelpButton.addEventListener("click", openHelp);
dom.restartButton.addEventListener("click", resetRun);
dom.eventBackButton.addEventListener("click", returnToMap);
dom.shopBackButton.addEventListener("click", returnToMap);
dom.shopLeaveButton.addEventListener("click", leaveShop);
dom.libraryBackButton.addEventListener("click", returnToMap);
dom.overlayButton.addEventListener("click", () => {
  dom.overlay.classList.add("hidden");
  if (state.overlayAction === "map") {
    returnToMap();
    return;
  }
  if (state.overlayAction === "run_reset") {
    resetRun();
    return;
  }
  if (state.overlayAction === "treasure") {
    openTreasureEvent();
    return;
  }
  if (state.overlayAction === "shop") {
    openShop();
    return;
  }
  if (state.overlayAction === "library") {
    openGreatLibrary();
    return;
  }
  resetBattleState();
  setView("battle");
});
dom.audioButton.addEventListener("click", toggleAudio);
window.addEventListener("pointerdown", ensureAudio, { once: true });

function renderGlobalHelpSummary() {
  const helpBlocks = document.querySelectorAll(".help-block");
  const content = [
    {
      title: "基础规则",
      text: "每次打出或重掷后，只有被选中的骰子会刷新，未选中的骰子会留在场上，方便你逐步凑组合。",
    },
    {
      title: "读懂预告",
      text: "先看 Boss 预告再决定保命还是抢输出。高伤回合优先金属、护盾、冻结或道具，安全回合再追求爆发。",
    },
    {
      title: "成长资源",
      text: "宝箱、商店、圣物和大图书馆都会永久强化这一轮旅程。药丸解决短线压力，技能和骰子强化决定后期上限。",
    },
    {
      title: "构筑方向",
      text: "火水偏爆发，木偏续航，土金偏防守，以太负责终结；强化后的骰面能当作多个同属性面使用。",
    },
  ];
  helpBlocks.forEach((block, index) => {
    const data = content[index];
    if (!block || !data) return;
    const title = block.querySelector("h4");
    const text = block.querySelector("p");
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
  });
}

function renderBossRules() {
  const bossRules = document.querySelectorAll(".boss-rules-card li");
  if (!bossRules.length) return;

  const rules = state.currentBattleKey === NODE_KEYS.forest_1_5
    ? [
      "<strong>暗影箭</strong>：造成 35 伤害，属于稳定远程压制。",
      "<strong>隐匿刺杀</strong>：先进入隐身，再在下一次 Boss 回合发动 80 伤害刺杀。",
      "<strong>暗夜苏生</strong>：首次被击倒后会复活一次，并恢复 100 生命。",
      "<strong>胜负关键</strong>：8 次出骰内完成击杀，预告到刺杀时务必提前准备防御。",
    ]
    : state.currentBattleKey === NODE_KEYS.forest_1_3
      ? [
        "<strong>狼群轮战</strong>：共 3 只狼，每只 80 生命，必须全部击败才算胜利。",
        "<strong>利爪撕咬</strong>：基础造成 30 伤害，节奏稳定但持续施压。",
        "<strong>野性嚎叫</strong>：回复 20 生命，并让下一次攻击伤害提高 50%。",
        "<strong>胜负关键</strong>：10 次出骰内清空整组狼群，避免在强化后的撕咬回合硬吃伤害。",
      ]
      : [
        "<strong>普通攻击</strong>：基础造成 20 伤害，是最常见的行动。",
        "<strong>蓄力重击</strong>：造成 50 伤害，看到预告时优先准备金属或护盾。",
        "<strong>生命回复</strong>：回复 30 生命，通常是你抢节奏的输出窗口。",
        "<strong>胜负关键</strong>：6 次出骰内击败石像守卫，否则本关失败。",
      ];

  bossRules.forEach((rule, index) => {
    if (rules[index]) rule.innerHTML = rules[index];
  });
}

function currentNodeDefinitions() {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: startFirstLevel,
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: startThirdLevel,
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: openShop,
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: startFifthLevel,
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: openGreatLibrary,
    },
  };
}

applyStaticCopy();
renderGlobalHelpSummary();
setBattleConfig(NODE_KEYS.forest_1_1);
renderMap();
renderItemBar();
renderRelicBar();
renderSkillsPanel();
setView("map");

if (window.ElementBoomArch && typeof window.ElementBoomArch.setRuntimeBridge === "function") {
  window.ElementBoomArch.setRuntimeBridge({
    getContent() {
      return {
        ELEMENTS,
        ELEMENT_ORDER,
        MAP_PAGES,
        NODE_KEYS,
        ITEM_DEFS,
        RELIC_DEFS,
        SHOP_RELIC_DEFS,
        BATTLE_CONFIGS,
        MEDIUM_SKILLS,
      };
    },
    getConstants() {
      return {
        BASE_PLAYER_HP,
        MAX_BOSS_HP,
        MAX_TURNS,
        DICE_COUNT,
        TOTAL_REROLLS,
        FIRST_LEVEL_CLEAR_GOLD,
        THIRD_LEVEL_CLEAR_GOLD,
        COIN_BAG_GOLD,
        TREASURE_DRAW_COUNT,
        SHOP_ITEM_PRICE,
        SHOP_SKILL_CARD_PRICE,
        SHOP_RELIC_PRICE,
      };
    },
    getState() {
      return state;
    },
    getDom() {
      return dom;
    },
    getActions() {
      return {
        setBattleConfig,
        renderMap,
        renderShop,
        openTreasureEvent,
        openShop,
        startFirstLevel,
        startThirdLevel,
        startFifthLevel,
        upgradeDieFace,
        getDieFaceLevel,
        resetRun,
        returnToMap,
      };
    },
  });
}

NODE_KEYS.forest_1_7 = "forest_1_7";
state.playerPoisoned = false;
state.playerPoisonedNextTurn = false;

RELIC_DEFS.python_bracelet = {
  id: "python_bracelet",
  name: "巨蟒手链",
  short: "出骰 +1",
  icon: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="pythonBraceletBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f4ffcf" />
          <stop offset="42%" stop-color="#84db76" />
          <stop offset="100%" stop-color="#256a3f" />
        </linearGradient>
      </defs>
      <path d="M20 18c8-8 22-8 30 0c8 8 8 22 0 30c-8 8-22 8-30 0c-8-8-8-22 0-30Z" fill="none" stroke="url(#pythonBraceletBody)" stroke-width="7" stroke-linecap="round"/>
      <path d="M39 14c6 1 11 6 11 12c0 5-3 10-8 12" fill="none" stroke="#f3ffc9" stroke-width="4" stroke-linecap="round"/>
      <circle cx="43" cy="17" r="2.3" fill="#163724" />
      <circle cx="48" cy="19" r="2.3" fill="#163724" />
    </svg>
  `,
  description: "永久生效。玩家在各战斗关卡中的基础出骰次数永久 +1，可与其他加行动效果叠加。",
};

BATTLE_CONFIGS[NODE_KEYS.forest_1_7] = {
  nodeKey: NODE_KEYS.forest_1_7,
  heroEyebrow: "第七关 / 绿斑巨蟒",
  heroTitle: "元素骰境：绿斑巨蟒",
  heroSubtitle: "在 6 次出骰与 6 次重掷内击败 300 生命的绿斑巨蟒。小心毒液压制与会把生命值直接压到 1 点的死亡之毒。",
  bossName: "绿斑巨蟒",
  bossMaxHp: 300,
  plays: 6,
  rerolls: 6,
  rewardType: "python_relic",
  rewardGold: 10,
  introLog: "第七关开始。绿斑巨蟒盘踞在藤蔓与石阶之间，蛇瞳正缓慢锁定你的呼吸与节奏。",
  chooseBossAction() {
    const roll = Math.random() * 110;
    if (roll < 60) return { id: "serpent_bite", label: "蛇咬", value: 30 };
    if (roll < 90) return { id: "venom_spray", label: "毒液喷射", value: 20 };
    return { id: "death_poison", label: "死亡之毒", value: 1 };
  },
};

function grantPythonBracelet() {
  state.relics.add("python_bracelet");
  const relic = RELIC_DEFS.python_bracelet;
  showToast(`获得圣物：${relic.name}`);
  addLog("system", `你获得了圣物 <strong>${relic.name}</strong>：${relic.description}`);
  return relic;
}

function startSeventhLevel() {
  setBattleConfig(NODE_KEYS.forest_1_7);
  resetBattleState();
  setView("battle");
  showToast("第七关开始。");
  playSound("select");
}

const baseCurrentBasePlays = currentBasePlays;
currentBasePlays = function () {
  return baseCurrentBasePlays() + (state.relics.has("python_bracelet") ? 1 : 0);
};

const baseResetBattleState = resetBattleState;
resetBattleState = function () {
  state.playerPoisoned = false;
  state.playerPoisonedNextTurn = false;
  return baseResetBattleState();
};

const baseRenderBossPortrait = renderBossPortrait;
renderBossPortrait = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_7) {
    baseRenderBossPortrait();
    return;
  }
  if (!dom.bossPortrait) return;
  dom.bossPortrait.classList.remove("wolf-pack", "dark-hunter", "stealthed");
  dom.bossPortrait.innerHTML = `
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <linearGradient id="pythonBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ecffd6" />
          <stop offset="42%" stop-color="#8fe285" />
          <stop offset="100%" stop-color="#215f39" />
        </linearGradient>
        <linearGradient id="pythonBelly" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#fbffe1" />
          <stop offset="100%" stop-color="#cde7a3" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="192" rx="74" ry="13" fill="rgba(16, 54, 28, 0.18)" />
      <path d="M72 176c-18-9-28-23-28-38c0-25 21-41 48-41c20 0 36 7 50 15c17 10 34 20 34 42c0 19-17 34-40 34c-20 0-28-10-40-18c-10-7-15-8-24-8Z" fill="url(#pythonBody)" />
      <path d="M80 170c15-8 24-6 36 1c10 6 18 10 30 10c16 0 28-8 28-20c0-14-12-21-28-30c-16-9-31-16-51-16c-23 0-41 13-41 31c0 10 6 19 19 27c-1-3 1-5 7-3Z" fill="url(#pythonBelly)" opacity="0.94" />
      <path d="M116 34c24 0 44 18 44 41c0 15-8 28-20 36c4 9 7 18 7 28c0 22-17 41-41 41c-22 0-39-15-39-37c0-16 10-29 24-38c-3-5-5-11-5-18c0-29 14-53 30-53Z" fill="url(#pythonBody)" />
      <path d="M108 46c15 0 27 14 27 30c0 11-5 21-13 27c5 8 8 16 8 25c0 18-11 31-25 31c-14 0-24-10-24-24c0-13 8-23 18-31c-4-6-7-14-7-22c0-20 7-36 16-36Z" fill="url(#pythonBelly)" opacity="0.95" />
      <path d="M121 44c31 0 55 19 55 42c0 13-8 24-21 31l-3 2c8 5 14 12 14 21c0 18-22 32-49 32c-30 0-53-16-53-38c0-15 11-28 28-34c-4-6-7-14-7-23c0-18 15-33 36-33Z" fill="url(#pythonBody)" />
      <path d="M144 54c19 0 35 12 35 27c0 9-5 17-14 22c9 4 15 12 15 21c0 16-19 29-43 29c-26 0-45-13-45-31c0-13 10-23 25-28c-6-5-10-12-10-19c0-12 10-21 23-21Z" fill="rgba(19, 72, 42, 0.16)" />
      <path d="M152 60c18 0 32 12 32 28c0 16-14 28-32 28h-22c-17 0-31-12-31-28c0-16 14-28 31-28Z" fill="url(#pythonBody)" />
      <ellipse cx="136" cy="88" rx="6" ry="8" fill="#123422" />
      <ellipse cx="164" cy="88" rx="6" ry="8" fill="#123422" />
      <circle cx="136" cy="86" r="2.2" fill="#f8ffe4" />
      <circle cx="164" cy="86" r="2.2" fill="#f8ffe4" />
      <path d="M139 104c6 4 15 4 22 0" fill="none" stroke="#174228" stroke-width="4" stroke-linecap="round" />
      <path d="M150 104v19" fill="none" stroke="#ef6582" stroke-width="4" stroke-linecap="round" />
      <path d="M150 121l-7 11" fill="none" stroke="#ef6582" stroke-width="3" stroke-linecap="round" />
      <path d="M150 121l7 11" fill="none" stroke="#ef6582" stroke-width="3" stroke-linecap="round" />
      <g fill="#e4ffb4" opacity="0.9">
        <circle cx="118" cy="72" r="4" />
        <circle cx="126" cy="104" r="4" />
        <circle cx="154" cy="64" r="4" />
        <circle cx="165" cy="108" r="4" />
        <circle cx="91" cy="132" r="4" />
        <circle cx="110" cy="144" r="4" />
      </g>
    </svg>
    <span>${bossDisplayName()}</span>
  `;
};

const baseBossActionMeta = bossActionMeta;
bossActionMeta = function (action) {
  if (!action) return baseBossActionMeta(action);
  if (action.id === "serpent_bite") {
    return { icon: "牙", title: action.label, text: "预计造成 30 点伤害，是最稳定也最常见的压制动作。", badge: "咬击", preview: "即将蛇咬" };
  }
  if (action.id === "venom_spray") {
    return { icon: "毒", title: action.label, text: "预计造成 20 点伤害，并让你下回合进入中毒状态：该回合无法重掷。", badge: "中毒", preview: "即将喷毒" };
  }
  if (action.id === "death_poison") {
    return { icon: "死", title: action.label, text: "预计将你的生命值直接压到 1 点。这不是普通伤害，重点是准备后续保命。", badge: "致命", preview: "即将死亡之毒" };
  }
  return baseBossActionMeta(action);
};

const baseGetGuideTip = getGuideTip;
getGuideTip = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_7) return baseGetGuideTip();
  const action = state.nextBossAction;
  if (state.playerPoisoned) {
    return {
      title: "中毒回合无法重掷",
      text: "先看手上现有骰面再决定防守还是抢输出，这一回合必须直接用当前牌面完成行动。",
    };
  }
  if (!action) {
    return {
      title: "先读懂巨蟒的下一招",
      text: "绿斑巨蟒的压制不在纯伤害，而在节奏控制。提前看预告能决定你该抢输出还是准备保命。",
    };
  }
  if (action.id === "death_poison") {
    return {
      title: "准备承受濒死压制",
      text: "死亡之毒会把生命压到 1 点。优先布置金属化、护盾或回复资源，确保被压低血线后还能扛住下一击。",
    };
  }
  if (action.id === "venom_spray") {
    return {
      title: "下一回合可能失去重掷",
      text: "毒液喷射的真正威胁是封锁你下一回合的找牌能力。本回合尽量留下更顺手的骰面，减少后手压力。",
    };
  }
  return {
    title: "稳血线再打爆发",
    text: "蛇咬伤害稳定，适合用木系续航或火水爆发换血，但别把自己压到一个死亡之毒后无法续命的区间。",
  };
};

const baseSyncBattleUi = syncBattleUi;
syncBattleUi = function () {
  baseSyncBattleUi();

  const bossBuffNames = document.querySelectorAll(".boss-card .buff-name");
  if (bossBuffNames[0]) {
    bossBuffNames[0].textContent = state.currentBattleKey === NODE_KEYS.forest_1_7
      ? "毒/冻状态"
      : state.currentBattleKey === NODE_KEYS.forest_1_5
        ? "冻结/隐匿"
        : "冻结效果";
  }

  if (state.currentBattleKey === NODE_KEYS.forest_1_7) {
    const statusBits = [];
    if (state.bossFrozen) statusBits.push("Boss已冻结");
    if (state.playerPoisoned) statusBits.push("你已中毒");
    else if (state.playerPoisonedNextTurn) statusBits.push("下回合中毒");
    dom.freezeState.textContent = statusBits.length ? statusBits.join(" / ") : "无";
    dom.bossState.textContent = state.nextBossAction?.id === "death_poison"
      ? "死亡之毒待发"
      : state.nextBossAction?.id === "venom_spray"
        ? "毒腺鼓动"
        : state.playerPoisoned
          ? "毒性压制"
          : "蛇瞳锁定";
  }

  dom.rerollButton.textContent = state.playerPoisoned ? "中毒回合不可重掷" : "重掷所选骰子";
  if (state.playerPoisoned) {
    dom.rerollButton.disabled = true;
  }

  dom.forecastCard.classList.remove("venom", "doom");
  if (state.currentBattleKey === NODE_KEYS.forest_1_7) {
    if (state.nextBossAction?.id === "serpent_bite") dom.forecastCard.classList.add("attack");
    if (state.nextBossAction?.id === "venom_spray") dom.forecastCard.classList.add("heal");
    if (state.nextBossAction?.id === "death_poison") dom.forecastCard.classList.add("slam");
  }

  renderBossRules();
};

const baseRerollSelectedDice = rerollSelectedDice;
rerollSelectedDice = function () {
  if (state.phase === "player" && !state.gameOver && !state.paused && state.playerPoisoned) {
    showToast("你正处于中毒状态，本回合无法重掷。");
    return;
  }
  return baseRerollSelectedDice();
};

const baseResolvePlayerAction = resolvePlayerAction;
resolvePlayerAction = function () {
  const poisonWillBeConsumed = state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.playsLeft > 0
    && state.selectedDice.size > 0
    && state.playerPoisoned;
  const result = baseResolvePlayerAction();
  if (poisonWillBeConsumed && state.phase !== "player") {
    state.playerPoisoned = false;
    if (!state.gameOver) syncBattleUi();
  }
  return result;
};

const baseFinishRound = finishRound;
finishRound = function () {
  const shouldApplyPoison = Boolean(state.playerPoisonedNextTurn);
  baseFinishRound();
  if (state.gameOver || state.phase !== "player") return;
  state.playerPoisoned = shouldApplyPoison;
  state.playerPoisonedNextTurn = false;
  if (shouldApplyPoison) {
    addLog("boss", "绿斑巨蟒的毒性在你体内扩散，本回合你无法重掷骰子。");
    showToast("你陷入中毒，本回合无法重掷。");
    renderDice();
    syncBattleUi();
  }
};

const baseResolveBossTurn = resolveBossTurn;
resolveBossTurn = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_7) {
    return baseResolveBossTurn();
  }
  if (state.gameOver || state.paused) return;
  const action = state.nextBossAction || chooseBossAction();
  dom.bossIntent.textContent = "行动中";

  if (state.bossFrozen) {
    state.bossFrozen = false;
    state.bossPatternIndex += 1;
    addLog("boss", "绿斑巨蟒被寒潮冻结，本回合无法行动。");
    showToast("Boss 行动被跳过。");
    playSound("freeze");
    consumeShieldTurn();
    finishRound();
    return;
  }

  if (action.id === "venom_spray") {
    const dealt = damagePlayer(action.value);
    state.playerPoisonedNextTurn = true;
    addLog("boss", `绿斑巨蟒发动 <strong>毒液喷射</strong>，造成 <strong>${dealt}</strong> 点伤害，并让你下回合进入中毒状态。`);
    showToast("毒液命中，下回合你将无法重掷。");
    showBattleFloat(".player-card", dealt === 0 ? "中毒" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 500);
    playSound("bossAttack");
  } else if (action.id === "death_poison") {
    const loss = Math.max(0, state.playerHp - 1);
    state.playerHp = Math.min(state.playerHp, 1);
    addLog("boss", `绿斑巨蟒发动 <strong>死亡之毒</strong>，将你的生命值压到了 <strong>1</strong> 点。`);
    showToast("死亡之毒爆发，你被压到 1 点生命。");
    showBattleFloat(".player-card", loss > 0 ? `-${loss}` : "濒死", "damage");
    applyTransientClass(".player-card", "impact", 560);
    playSound("bossSlam");
  } else {
    const dealt = damagePlayer(action.value);
    addLog("boss", `绿斑巨蟒发动 <strong>蛇咬</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
    showToast("蛇咬命中。");
    showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 500);
    playSound("bossAttack");
  }

  state.bossPatternIndex += 1;
  consumeShieldTurn();
  syncBattleUi();
  if (checkBattleEnd()) return;
  finishRound();
};

renderBossRules = function () {
  const bossRules = document.querySelectorAll(".boss-rules-card li");
  if (!bossRules.length) return;

  let rules = [
    "<strong>普通攻击</strong>：造成 20 点伤害，是最常见的行动。",
    "<strong>蓄力重击</strong>：造成 50 点伤害，看见预告时优先准备金属化或护盾。",
    "<strong>生命恢复</strong>：回复 30 点生命，通常是你抢节奏的输出窗口。",
    "<strong>胜负关键</strong>：6 次出骰内击败石像守卫，否则本关失败。",
  ];

  if (state.currentBattleKey === NODE_KEYS.forest_1_3) {
    rules = [
      "<strong>狼群轮战</strong>：共 3 只狼，每只 80 生命，必须全部击败才算胜利。",
      "<strong>利爪撕咬</strong>：稳定造成 30 点伤害，会持续给你血线压力。",
      "<strong>野性嚎叫</strong>：回复 20 点生命，并让下一次攻击伤害提高 50%。",
      "<strong>胜负关键</strong>：10 次出骰内清空整组狼群，别让强化后的撕咬轮次滚起来。",
    ];
  } else if (state.currentBattleKey === NODE_KEYS.forest_1_5) {
    rules = [
      "<strong>暗影箭</strong>：造成 35 点伤害，属于稳定的远程压制。",
      "<strong>隐匿刺杀</strong>：先进入隐身，再在下个 Boss 回合发动 80 伤害刺杀。",
      "<strong>暗夜苏生</strong>：首次被击倒后会复活一次，并恢复 100 点生命。",
      "<strong>胜负关键</strong>：8 次出骰内完成击杀，看到刺杀预告时务必提前准备防御。",
    ];
  } else if (state.currentBattleKey === NODE_KEYS.forest_1_7) {
    rules = [
      "<strong>蛇咬</strong>：常规动作，造成 30 点伤害，频率最高。",
      "<strong>毒液喷射</strong>：造成 20 点伤害，并让你下回合进入【中毒】：该回合无法重掷。",
      "<strong>死亡之毒</strong>：会把你的生命值直接压到 1 点，核心在于提前准备后续保命。",
      "<strong>胜负关键</strong>：6 次出骰与 6 次重掷内击败 300 生命的绿斑巨蟒，首通获得 10 金币与圣物【巨蟒手链】。",
    ];
  }

  bossRules.forEach((rule, index) => {
    if (rules[index]) bossRules[index].innerHTML = rules[index];
  });
};

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: startFirstLevel,
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: openTreasureEvent,
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: startThirdLevel,
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: startFifthLevel,
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。"),
    },
    [NODE_KEYS.forest_1_7]: {
      label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒",
      icon: "serpent",
      state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked",
      onClick: startSeventhLevel,
      onCompletedClick: startSeventhLevel,
    },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
    ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
      ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
      : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : state.mapPage === 0 && index === 5
                ? NODE_KEYS.forest_1_6
                : state.mapPage === 0 && index === 6
                  ? NODE_KEYS.forest_1_7
                  : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : def?.icon === "library"
              ? `<div class="map-node-icon-library"><span></span></div>`
              : def?.icon === "serpent"
                ? `<div class="map-node-icon-serpent"></div>`
                : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

const baseCheckBattleEnd = checkBattleEnd;
checkBattleEnd = function (forceTurnCheck = false) {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_7) {
    return baseCheckBattleEnd(forceTurnCheck);
  }

  if (state.bossHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    const firstClear = !hasCompleted(NODE_KEYS.forest_1_7);
    let relic = null;
    if (firstClear) {
      completeNode(NODE_KEYS.forest_1_7);
      addGold(10);
      relic = grantPythonBracelet();
    }
    state.overlayAction = "map";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战成功";
    dom.overlayTitle.textContent = "绿斑巨蟒已被击退";
    dom.overlayText.textContent = firstClear
      ? `你击败了绿斑巨蟒，获得 10 金币与圣物“${relic?.name || "巨蟒手链"}”。效果：${relicEffectText(relic)}`
      : "你再次击退了绿斑巨蟒，可以返回地图继续后续设计。";
    dom.overlayButton.textContent = "返回地图";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你成功击败了绿斑巨蟒。");
    playSound("win");
    renderMap();
    return true;
  }

  if (state.playerHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = "run_reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = "你被绿斑巨蟒吞没";
    dom.overlayText.textContent = "毒液与绞杀一起逼近，你倒在了蛇影盘踞的石阶前。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你的生命值归零，挑战失败。");
    playSound("lose");
    return true;
  }

  if (forceTurnCheck && state.playsLeft <= 0 && state.bossHp > 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = "run_reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = "出骰机会已耗尽";
    dom.overlayText.textContent = "6 次出骰机会已经耗尽，绿斑巨蟒仍然盘踞不退，第七关挑战失败。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "出骰回合耗尽后，绿斑巨蟒仍然存活，本次挑战失败。");
    playSound("lose");
    return true;
  }

  return false;
};

renderGlobalHelpSummary();
renderMap();
updateHeroForView();

NODE_KEYS.forest_1_10 = "forest_1_10";

BATTLE_CONFIGS[NODE_KEYS.forest_1_10] = {
  nodeKey: NODE_KEYS.forest_1_10,
  heroEyebrow: "第十关 / 终章决战",
  heroTitle: "元素骰境：迅猛狼王",
  heroSubtitle: "在 12 次出骰与 12 次重掷内，击败 500 生命的迅猛狼王。留意它的封印与召唤，别让节奏被狼群撕碎。",
  bossName: "迅猛狼王",
  bossMaxHp: 500,
  plays: 12,
  rerolls: 12,
  rewardType: "map",
  rewardGold: 0,
  introLog: "第十关开始。迷雾深处传来低沉狼嚎，披着王冠般鬃毛的迅猛狼王踏上古道，终章试炼正式降临。",
  chooseBossAction() {
    if (state.wolfKingSummonActive) {
      return { id: "wolf_pack_attack", label: "利爪撕咬", value: 30 };
    }
    const roll = Math.random();
    if (roll < 0.5) return { id: "wolf_king_pounce", label: "狼王扑击", value: 40 };
    if (roll < 0.75) return { id: "wolf_king_seal", label: "狼王封印", value: 30 };
    return { id: "wolf_king_summon", label: "狼王召唤", value: 0 };
  },
};

function startTenthLevel() {
  setBattleConfig(NODE_KEYS.forest_1_10);
  resetBattleState();
  setView("battle");
  showToast("第十关开始。");
  playSound("select");
}

function wolfKingNodeIconMarkup() {
  return '<div class="map-node-icon-wolf-king"></div>';
}

state.wolfKingSummonActive = false;
state.wolfKingStoredHp = 0;
state.playerBasicSeal = false;
state.playerBasicSealNextTurn = false;

const previousResetBattleStateForWolfKing = resetBattleState;
resetBattleState = function () {
  const result = previousResetBattleStateForWolfKing();
  state.wolfKingSummonActive = false;
  state.wolfKingStoredHp = 0;
  state.playerBasicSeal = false;
  state.playerBasicSealNextTurn = false;
  return result;
};

const previousDescribeComboForWolfKing = describeCombo;
describeCombo = function (selected, counts) {
  const combo = previousDescribeComboForWolfKing(selected, counts);
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10 || !state.playerBasicSeal || !selected.length) return combo;
  const result = evaluateSelection(selected, counts);
  if (result.type !== "basic") return combo;
  return {
    title: "狼王封印",
    description: "本回合无法打出三同基础技能。即使凑出三同，也只会消耗这次出骰，不会触发技能效果。",
  };
};

const previousApplyBasicSkillForWolfKing = applyBasicSkill;
applyBasicSkill = function (elementId) {
  if (state.currentBattleKey === NODE_KEYS.forest_1_10 && state.playerBasicSeal) {
    addLog("boss", "迅猛狼王的封印压住了你的三同基础技能，这次出骰没有触发额外效果。");
    showToast("狼王封印生效，本回合无法打出三同基础技能。");
    return;
  }
  return previousApplyBasicSkillForWolfKing(elementId);
};

const previousResolvePlayerActionForWolfKing = resolvePlayerAction;
resolvePlayerAction = function () {
  const sealWillExpire = state.currentBattleKey === NODE_KEYS.forest_1_10
    && state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.playsLeft > 0
    && state.selectedDice.size > 0
    && state.playerBasicSeal;

  const result = previousResolvePlayerActionForWolfKing();

  if (sealWillExpire && state.phase !== "player") {
    state.playerBasicSeal = false;
    if (!state.gameOver) syncBattleUi();
  }

  return result;
};

const previousFinishRoundForWolfKing = finishRound;
finishRound = function () {
  const shouldApplySeal = state.currentBattleKey === NODE_KEYS.forest_1_10 && state.playerBasicSealNextTurn;
  previousFinishRoundForWolfKing();
  if (state.gameOver || state.phase !== "player" || state.currentBattleKey !== NODE_KEYS.forest_1_10) return;
  state.playerBasicSeal = Boolean(shouldApplySeal);
  state.playerBasicSealNextTurn = false;
  if (shouldApplySeal) {
    addLog("boss", "迅猛狼王的封印余波落在你的骰池上，本回合无法打出三同基础技能。");
    showToast("你被狼王封印，本回合无法打出三同基础技能。");
    renderDice();
    syncBattleUi();
  }
};

const previousRenderBossPortraitForWolfKing = renderBossPortrait;
renderBossPortrait = function () {
  if (!dom.bossPortrait) return;
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) {
    dom.bossPortrait.classList.remove("wolf-king");
    previousRenderBossPortraitForWolfKing();
    return;
  }

  dom.bossPortrait.classList.remove("wolf-pack", "dark-hunter", "stealthed");

  if (state.wolfKingSummonActive) {
    dom.bossPortrait.classList.remove("wolf-king");
    dom.bossPortrait.innerHTML = `
      <svg viewBox="0 0 220 220" aria-hidden="true">
        <defs>
          <linearGradient id="summonedWolfFur" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#f8fbff" />
            <stop offset="48%" stop-color="#bcc4cf" />
            <stop offset="100%" stop-color="#5d6573" />
          </linearGradient>
          <linearGradient id="summonedWolfShadow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2d333d" />
            <stop offset="100%" stop-color="#0f1217" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="192" rx="74" ry="13" fill="rgba(10, 12, 18, 0.24)" />
        <path d="M58 132c4-30 30-52 63-52c34 0 62 21 67 52c3 20-9 42-34 52c-20 8-52 10-77 1c-27-10-42-31-38-53Z" fill="url(#summonedWolfFur)" />
        <path d="M82 90c4-31 25-56 53-56c24 0 43 17 47 41c3 21-8 44-28 57c-18 11-45 15-65 8c-21-8-34-28-31-50Z" fill="url(#summonedWolfShadow)" opacity="0.18" />
        <path d="M58 94 78 40 96 92" fill="url(#summonedWolfFur)" />
        <path d="M122 88 156 34 168 94" fill="url(#summonedWolfFur)" />
        <path d="M68 96c4-24 22-46 47-46c31 0 56 22 56 51c0 29-25 49-57 49c-33 0-52-20-46-54Z" fill="url(#summonedWolfFur)" />
        <path d="M140 92c16 2 30 14 37 29c-6 8-20 17-40 17c-19 0-35-6-44-14c7-20 24-34 47-32Z" fill="#f7f2ea" />
        <circle cx="100" cy="92" r="6" fill="#151921" />
        <circle cx="137" cy="95" r="6" fill="#151921" />
        <circle cx="98" cy="90" r="2.2" fill="#f9f9f7" />
        <circle cx="135" cy="93" r="2.2" fill="#f9f9f7" />
        <path d="M119 105c10 0 18 3 24 8c-3 8-11 14-23 14c-11 0-19-5-22-13c6-5 12-9 21-9Z" fill="#12161f" />
        <path d="M108 128l-6 18" stroke="#f7f2ea" stroke-width="4" stroke-linecap="round" />
        <path d="M130 128l6 18" stroke="#f7f2ea" stroke-width="4" stroke-linecap="round" />
        <path d="M86 166c5-10 12-14 20-14s15 4 18 14" fill="none" stroke="#eef2f7" stroke-width="7" stroke-linecap="round" />
      </svg>
      <span>${bossDisplayName()}</span>
    `;
    return;
  }

  dom.bossPortrait.classList.add("wolf-king");
  dom.bossPortrait.innerHTML = `
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <linearGradient id="wolfKingFur" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fffaf0" />
          <stop offset="36%" stop-color="#d9dde4" />
          <stop offset="78%" stop-color="#8a909c" />
          <stop offset="100%" stop-color="#535866" />
        </linearGradient>
        <linearGradient id="wolfKingMane" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffe9b0" />
          <stop offset="52%" stop-color="#dba149" />
          <stop offset="100%" stop-color="#7d4415" />
        </linearGradient>
        <radialGradient id="wolfKingAura" cx="50%" cy="34%" r="62%">
          <stop offset="0%" stop-color="rgba(255, 228, 165, 0.72)" />
          <stop offset="100%" stop-color="rgba(255, 228, 165, 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="192" rx="80" ry="14" fill="rgba(16, 9, 3, 0.28)" />
      <circle cx="110" cy="88" r="72" fill="url(#wolfKingAura)" />
      <path d="M48 128c0-39 28-70 62-70c34 0 62 31 62 70c0 35-23 63-62 63c-39 0-62-28-62-63Z" fill="url(#wolfKingMane)" opacity="0.94" />
      <path d="M52 92 76 22 96 84" fill="url(#wolfKingMane)" />
      <path d="M124 84 150 18 170 92" fill="url(#wolfKingMane)" />
      <path d="M52 82h116l-10-18-18 6-12-22-18 16-17-16-11 22-20-6Z" fill="url(#wolfKingMane)" />
      <path d="M64 90c4-30 24-54 52-54c29 0 49 19 53 48c4 32-15 66-46 80c-32 14-69 5-83-23c-13-26-3-62 24-51Z" fill="url(#wolfKingFur)" />
      <path d="M84 124c12-12 25-18 40-18s28 6 41 17c-5 18-24 31-48 31c-23 0-42-12-49-30Z" fill="#f8f2e9" />
      <path d="M93 52c8 11 16 16 27 16c10 0 18-5 27-15" fill="none" stroke="#ffd88f" stroke-width="6" stroke-linecap="round" />
      <circle cx="95" cy="92" r="7" fill="#141821" />
      <circle cx="139" cy="95" r="7" fill="#141821" />
      <circle cx="93" cy="89" r="2.4" fill="#ffffff" />
      <circle cx="137" cy="92" r="2.4" fill="#ffffff" />
      <path d="M110 104c10 0 19 4 26 11c-4 11-13 19-26 19c-12 0-22-7-26-18c6-7 15-12 26-12Z" fill="#171a23" />
      <path d="M98 134l-8 22" stroke="#fff3df" stroke-width="5" stroke-linecap="round" />
      <path d="M122 134l8 22" stroke="#fff3df" stroke-width="5" stroke-linecap="round" />
      <path d="M84 154c8 12 17 17 27 17c12 0 21-6 28-18" fill="none" stroke="#ffe2a8" stroke-width="7" stroke-linecap="round" opacity="0.86" />
    </svg>
    <span>${bossDisplayName()}</span>
  `;
};

const previousBossActionMetaForWolfKing = bossActionMeta;
bossActionMeta = function (action) {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) return previousBossActionMetaForWolfKing(action);
  if (!action) {
    return {
      icon: "王",
      title: "迅猛狼王正在审视战场",
      text: "狼王的下一步会在预告区显现，尽量抢在封印或召唤前完成关键输出。",
      badge: "压迫",
      preview: "王者意图显现中",
    };
  }
  if (action.id === "wolf_pack_attack") {
    return { icon: "爪", title: action.label, text: "被召来的迅猛狼会稳定造成 30 点伤害。先清掉它，狼王才会回到战场。", badge: "召唤狼", preview: "召唤狼即将撕咬" };
  }
  if (action.id === "wolf_king_pounce") {
    return { icon: "袭", title: action.label, text: "预计造成 40 点伤害，是狼王最常用的正面压制手段。", badge: "高压", preview: "狼王即将扑击" };
  }
  if (action.id === "wolf_king_seal") {
    return { icon: "封", title: action.label, text: "回复 30 点生命，并让你下回合无法打出三同基础技能。", badge: "封印", preview: "狼王即将封印" };
  }
  return { icon: "召", title: action.label, text: "狼王会暂时退后，并召来一只 100 生命的迅猛狼顶上战场。", badge: "召唤", preview: "狼王即将召唤" };
};

const previousGetGuideTipForWolfKing = getGuideTip;
getGuideTip = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) return previousGetGuideTipForWolfKing();
  if (state.wolfKingSummonActive) {
    return {
      title: "先撕开召唤狼这一层防线",
      text: "迅猛狼王不会回场，直到被召来的迅猛狼倒下。别把关键爆发浪费在拖延上，尽快解决这 100 点生命的替身。",
    };
  }
  if (state.playerBasicSeal) {
    return {
      title: "这一回合别依赖三同基础技能",
      text: "狼王封印正在生效。优先改打四同、五同、道具或纯粹调整牌面，别让这回合空转得太亏。",
    };
  }
  const action = state.nextBossAction;
  if (!action) {
    return {
      title: "读懂狼王，再决定节奏",
      text: "迅猛狼王的威胁不只在高伤害，还在封印你的基础技并用召唤拖节奏。预告比蛮打更重要。",
    };
  }
  if (action.id === "wolf_king_summon") {
    return {
      title: "准备转火召唤出来的迅猛狼",
      text: "一旦狼王完成召唤，你必须先处理那只替身狼。保留稳定伤害、冻结或高阶技能，会让这一轮更顺。",
    };
  }
  if (action.id === "wolf_king_seal") {
    return {
      title: "下一回合的三同基础技能会被封住",
      text: "本回合可以提前整理牌面，为下一回合的四同、五同或道具路线做准备，避免被封印完全打乱。",
    };
  }
  return {
    title: "狼王扑击前先稳血线",
    text: "40 点扑击足够压人，但还没到绝境。能防就防，能抢节奏也可以抢，不过别被连续扑击压到无法处理后面的封印与召唤。",
  };
};

const previousSyncBattleUiForWolfKing = syncBattleUi;
syncBattleUi = function () {
  previousSyncBattleUiForWolfKing();
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) return;

  const bossBuffNames = document.querySelectorAll(".boss-card .buff-name");
  if (bossBuffNames[0]) bossBuffNames[0].textContent = "封印/召唤";

  const statusBits = [];
  if (state.bossFrozen) statusBits.push("Boss已冻结");
  if (state.playerBasicSeal) statusBits.push("本回合禁三同");
  else if (state.playerBasicSealNextTurn) statusBits.push("下回合禁三同");
  dom.freezeState.textContent = statusBits.length ? statusBits.join(" / ") : "无";

  dom.bossState.textContent = state.wolfKingSummonActive
    ? "召唤狼在场"
    : state.nextBossAction?.id === "wolf_king_summon"
      ? "狼群回响"
      : state.nextBossAction?.id === "wolf_king_seal"
        ? "封印蓄势"
        : "王者压迫";

  dom.rerollButton.textContent = "重掷所选骰子";
  dom.forecastCard.classList.remove("attack", "heal", "slam", "venom", "doom");
  if (state.nextBossAction?.id === "wolf_king_pounce" || state.nextBossAction?.id === "wolf_pack_attack") dom.forecastCard.classList.add("attack");
  if (state.nextBossAction?.id === "wolf_king_seal") dom.forecastCard.classList.add("heal");
  if (state.nextBossAction?.id === "wolf_king_summon") dom.forecastCard.classList.add("slam");
  renderBossRules();
};

const previousResolveBossTurnForWolfKing = resolveBossTurn;
resolveBossTurn = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) return previousResolveBossTurnForWolfKing();
  if (state.gameOver || state.paused) return;

  const action = state.nextBossAction || chooseBossAction();
  dom.bossIntent.textContent = "行动中";

  if (state.bossFrozen) {
    state.bossFrozen = false;
    state.bossPatternIndex += 1;
    addLog("boss", `${bossDisplayName()} 被冻结，当前回合无法行动。`);
    showToast("Boss 行动被跳过。");
    playSound("freeze");
    consumeShieldTurn();
    finishRound();
    return;
  }

  if (action.id === "wolf_pack_attack") {
    const dealt = damagePlayer(action.value);
    addLog("boss", `被召来的迅猛狼发动 <strong>利爪撕咬</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
    showToast("召唤狼扑了上来。");
    showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 500);
    playSound("bossAttack");
  } else if (action.id === "wolf_king_seal") {
    const healed = healBoss(action.value);
    state.playerBasicSealNextTurn = true;
    addLog("boss", `迅猛狼王发动 <strong>狼王封印</strong>，回复了 <strong>${healed}</strong> 点生命，并封住你下回合的三同基础技能。`);
    showToast("下回合你的三同基础技能将被封印。");
    showBattleFloat(".boss-card", `+${healed}`, "heal");
    playSound("bossHeal");
  } else if (action.id === "wolf_king_summon") {
    state.wolfKingStoredHp = Math.max(1, state.bossHp);
    state.wolfKingSummonActive = true;
    state.bossName = "迅猛狼";
    state.bossMaxHp = 100;
    state.bossHp = 100;
    addLog("boss", "迅猛狼王发动 <strong>狼王召唤</strong>，呼来一只迅猛狼挡在你的面前。狼王会在召唤狼倒下后重新回到战场。");
    showToast("狼王召来了一只迅猛狼。");
    showBattleFloat(".boss-card", "召唤", "shield");
    applyTransientClass(".boss-card", "impact", 520);
    playSound("bossSlam");
  } else {
    const dealt = damagePlayer(action.value);
    addLog("boss", `迅猛狼王发动 <strong>狼王扑击</strong>，实际造成 <strong>${dealt}</strong> 点伤害。`);
    showToast("狼王扑击袭来。");
    showBattleFloat(".player-card", dealt === 0 ? "免疫" : `-${dealt}`, dealt === 0 ? "immune" : "damage");
    applyTransientClass(".player-card", "impact", 540);
    playSound("bossAttack");
  }

  state.bossPatternIndex += 1;
  consumeShieldTurn();
  syncBattleUi();
  if (checkBattleEnd()) return;
  finishRound();
};

const previousCheckBattleEndForWolfKing = checkBattleEnd;
checkBattleEnd = function (forceTurnCheck = false) {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) return previousCheckBattleEndForWolfKing(forceTurnCheck);

  if (state.bossHp <= 0 && state.wolfKingSummonActive) {
    state.wolfKingSummonActive = false;
    state.bossName = "迅猛狼王";
    state.bossMaxHp = BATTLE_CONFIGS[NODE_KEYS.forest_1_10].bossMaxHp;
    state.bossHp = Math.max(1, state.wolfKingStoredHp || state.bossMaxHp);
    state.wolfKingStoredHp = 0;
    state.bossFrozen = false;
    state.nextBossAction = chooseBossAction();
    addLog("system", "被召来的迅猛狼倒下后，迅猛狼王重新踏入战场。");
    showToast("迅猛狼王重返战场。");
    syncBattleUi();
    return false;
  }

  if (state.bossHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    const firstClear = !hasCompleted(NODE_KEYS.forest_1_10);
    if (firstClear) completeNode(NODE_KEYS.forest_1_10);
    state.overlayAction = "map";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "章节完成";
    dom.overlayTitle.textContent = "迅猛狼王已被击溃";
    dom.overlayText.textContent = firstClear
      ? "你击败了迅猛狼王，第一章地图至此全部打通。迷雾森林的终点已经被你踩在脚下。"
      : "迅猛狼王再次倒在你的骰术之下，第一章终点已经彻底被你征服。";
    dom.overlayButton.textContent = "返回地图";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你击败了迅猛狼王，第一章已完成。");
    playSound("win");
    renderMap();
    return true;
  }

  if (state.playerHp <= 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = "run_reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = "你被迅猛狼王撕碎了防线";
    dom.overlayText.textContent = "王者的扑击、封印与召唤层层逼近，你倒在了迷雾森林的终点前。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "战斗结束。你的生命值归零，第一章终战挑战失败。");
    playSound("lose");
    return true;
  }

  if (forceTurnCheck && state.playsLeft <= 0 && state.bossHp > 0) {
    state.gameOver = true;
    state.phase = "end";
    state.overlayAction = "run_reset";
    syncBattleUi();
    dom.overlayEyebrow.textContent = "挑战失败";
    dom.overlayTitle.textContent = "出骰机会已经耗尽";
    dom.overlayText.textContent = "12 次出骰已经全部用完，迅猛狼王仍然站在终点，第一章终战挑战失败。";
    dom.overlayButton.textContent = "再来一局";
    dom.overlay.classList.remove("hidden");
    addLog("system", "出骰机会耗尽后，迅猛狼王仍然存活，本次终战挑战失败。");
    playSound("lose");
    return true;
  }

  return false;
};

const previousRenderBossRulesForWolfKing = renderBossRules;
renderBossRules = function () {
  if (state.currentBattleKey !== NODE_KEYS.forest_1_10) {
    previousRenderBossRulesForWolfKing();
    return;
  }
  const bossRules = document.querySelectorAll(".boss-rules-card li");
  if (!bossRules.length) return;
  const rules = [
    "<strong>狼王扑击</strong>：50% 概率发动，造成 40 点伤害，是狼王最稳定的正面压制。",
    "<strong>狼王封印</strong>：25% 概率发动，回复 30 点生命，并让你下回合无法打出三同基础技能。",
    "<strong>狼王召唤</strong>：25% 概率发动，召来一只 100 生命的迅猛狼。必须先击倒它，狼王才会回归战场。",
    "<strong>胜负关键</strong>：在 12 次出骰与 12 次重掷内击败 500 生命的迅猛狼王，别让封印与召唤把你的爆发回合拖空。",
  ];
  bossRules.forEach((rule, index) => {
    if (rules[index]) bossRules[index].innerHTML = rules[index];
  });
};

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: { label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active", onClick: startFirstLevel, onCompletedClick: startFirstLevel },
    [NODE_KEYS.forest_1_2]: { label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_3]: { label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked", onClick: startThirdLevel, onCompletedClick: startThirdLevel },
    [NODE_KEYS.forest_1_4]: { label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_4), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_5]: { label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人", icon: "gate", state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked", onClick: startFifthLevel, onCompletedClick: startFifthLevel },
    [NODE_KEYS.forest_1_6]: { label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆", icon: "library", state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked", onClick: openGreatLibrary, onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。") },
    [NODE_KEYS.forest_1_7]: { label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒", icon: "serpent", state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked", onClick: startSeventhLevel, onCompletedClick: startSeventhLevel },
    [NODE_KEYS.forest_1_8]: { label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_9]: { label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_9), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_10]: { label: hasCompleted(NODE_KEYS.forest_1_10) ? "1-10<br>已通关" : "1-10<br>迅猛狼王", icon: "wolf_king", state: hasCompleted(NODE_KEYS.forest_1_9) ? (hasCompleted(NODE_KEYS.forest_1_10) ? "completed" : "active") : "locked", onClick: startTenthLevel, onCompletedClick: startTenthLevel },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_9) && !hasCompleted(NODE_KEYS.forest_1_10)
    ? "1-10 迅猛狼王已经现身。它会用封印锁住你的三同基础技能，还会召来迅猛狼拖住节奏，这就是第一章的终章决战。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
      ? "1-9 第二商店已经开放。这里会出售高级技能卡，并带来新的圣物“熵减魔方”。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
        ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
          ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
          : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
            ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
            : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  const forestNodeKeys = [
    NODE_KEYS.forest_1_1,
    NODE_KEYS.forest_1_2,
    NODE_KEYS.forest_1_3,
    NODE_KEYS.forest_1_4,
    NODE_KEYS.forest_1_5,
    NODE_KEYS.forest_1_6,
    NODE_KEYS.forest_1_7,
    NODE_KEYS.forest_1_8,
    NODE_KEYS.forest_1_9,
    NODE_KEYS.forest_1_10,
  ];

  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 ? forestNodeKeys[index] || null : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? '<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>'
      : def?.icon === "chest"
        ? '<div class="map-node-icon-chest"></div>'
        : def?.icon === "shop"
          ? '<div class="map-node-icon-shop"></div>'
          : def?.icon === "gate"
            ? '<div class="map-node-icon-gate"></div>'
            : def?.icon === "library"
              ? '<div class="map-node-icon-library"><span></span></div>'
              : def?.icon === "serpent"
                ? '<div class="map-node-icon-serpent"></div>'
                : def?.icon === "wolf_king"
                  ? wolfKingNodeIconMarkup()
                  : "?";
    if (!def) button.addEventListener("click", () => showToast("该地点尚未开放。"));
    else if (def.state === "completed" && def.onCompletedClick) button.addEventListener("click", def.onCompletedClick);
    else if (def.state !== "locked") button.addEventListener("click", def.onClick);
    else button.addEventListener("click", () => showToast("先完成前置节点。"));
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();
if (state.currentBattleKey === NODE_KEYS.forest_1_10) syncBattleUi();

const finalShopLeaveInterceptor = (event) => {
  if (state.currentView !== "shop") return;
  event.preventDefault();
  event.stopImmediatePropagation();

  if (state.currentShopNode && !hasCompleted(state.currentShopNode)) {
    completeNode(state.currentShopNode);
  }

  if (state.currentShopNode === NODE_KEYS.forest_1_9) {
    returnToMap();
    return;
  }

  startFifthLevel();
};

const finalShopBackInterceptor = (event) => {
  if (state.currentView !== "shop") return;
  if (state.currentShopNode !== NODE_KEYS.forest_1_9) return;
  event.preventDefault();
  event.stopImmediatePropagation();

  if (!hasCompleted(NODE_KEYS.forest_1_9)) {
    completeNode(NODE_KEYS.forest_1_9);
  }
  returnToMap();
};

dom.shopLeaveButton.addEventListener("click", finalShopLeaveInterceptor, true);
dom.shopBackButton.addEventListener("click", finalShopBackInterceptor, true);

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: startFirstLevel,
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: startThirdLevel,
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: () => openShop(NODE_KEYS.forest_1_4),
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: startFifthLevel,
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。"),
    },
    [NODE_KEYS.forest_1_7]: {
      label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒",
      icon: "serpent",
      state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked",
      onClick: startSeventhLevel,
      onCompletedClick: startSeventhLevel,
    },
    [NODE_KEYS.forest_1_8]: {
      label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_9]: {
      label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked",
      onClick: () => openShop(NODE_KEYS.forest_1_9),
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
    ? "1-9 第二商店已经开放。这里会出售高级技能卡，并带来新的圣物“熵减魔方”。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
      ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
        ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
          ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
          : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : state.mapPage === 0 && index === 5
                ? NODE_KEYS.forest_1_6
                : state.mapPage === 0 && index === 6
                  ? NODE_KEYS.forest_1_7
                  : state.mapPage === 0 && index === 7
                    ? NODE_KEYS.forest_1_8
                    : state.mapPage === 0 && index === 8
                      ? NODE_KEYS.forest_1_9
                      : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : def?.icon === "library"
              ? `<div class="map-node-icon-library"><span></span></div>`
              : def?.icon === "serpent"
                ? `<div class="map-node-icon-serpent"></div>`
                : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();

NODE_KEYS.forest_1_9 = "forest_1_9";
const ADVANCED_SKILL_CARD_PRICE = 10;
const FIRST_SHOP_RELIC_IDS = ["hero_chain", "starlight_eye", "night_cloak"];

SHOP_RELIC_DEFS.entropy_cube = {
  id: "entropy_cube",
  name: "熵减魔方",
  short: "尾击伤害 +50%",
  icon: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="entropyEdge" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff2b8" />
          <stop offset="45%" stop-color="#88d3ff" />
          <stop offset="100%" stop-color="#3567b9" />
        </linearGradient>
      </defs>
      <path d="M32 8L50 18V40L32 50L14 40V18Z" fill="rgba(64,110,184,0.2)" stroke="url(#entropyEdge)" stroke-width="4" />
      <path d="M32 8V50M14 18L32 28L50 18M14 40L32 28L50 40" fill="none" stroke="url(#entropyEdge)" stroke-width="3" />
    </svg>
  `,
  description: "永久生效。每个战斗关卡中，最后一次出骰若打出的是伤害类技能，则该次伤害提高 50%。",
};

const ADVANCED_SKILLS = {
  metal5: {
    id: "metal5",
    element: "metal",
    count: 5,
    name: "群星落陨",
    description: "五个金：本回合进入蓄能状态；你的下回合开始时对敌方造成 250 点伤害。",
  },
  wood5: {
    id: "wood5",
    element: "wood",
    count: 5,
    name: "生命赞歌",
    description: "五个木：回复全部生命值。",
  },
  water5: {
    id: "water5",
    element: "water",
    count: 5,
    name: "凛冬雪瀑",
    description: "五个水：冻结敌方下回合，并造成 150 点伤害。",
  },
  fire5: {
    id: "fire5",
    element: "fire",
    count: 5,
    name: "崩坏狱炎",
    description: "五个火：消耗敌方当前 50% 生命值。",
  },
  earth5: {
    id: "earth5",
    element: "earth",
    count: 5,
    name: "大地之门",
    description: "五个土：出骰次数 +3，且本次出骰不扣减。",
  },
};

state.learnedAdvancedSkills = new Set();
state.shopPurchasedMediumCardNodes = new Set();
state.shopPurchasedAdvancedCardNodes = new Set();
state.currentShopNode = null;
state.shopNodeStocks = {};
state.firstShopOfferedRelics = [];
state.starfallPending = false;
state.entropyCubeWindow = false;
state.entropyCubeApplied = false;

function availableAdvancedSkills() {
  return Object.values(ADVANCED_SKILLS).filter((skill) => !state.learnedAdvancedSkills.has(skill.id));
}

function learnRandomAdvancedSkill() {
  const pool = availableAdvancedSkills();
  if (!pool.length) return null;
  const learned = pool[Math.floor(Math.random() * pool.length)];
  state.learnedAdvancedSkills.add(learned.id);
  return learned;
}

function getLearnedAdvancedMatch(counts) {
  return Object.values(ADVANCED_SKILLS).find((skill) => state.learnedAdvancedSkills.has(skill.id) && counts[skill.element] >= skill.count);
}

function isCurrentShopMediumBought() {
  return state.shopPurchasedMediumCardNodes.has(state.currentShopNode);
}

function isCurrentShopAdvancedBought() {
  return state.shopPurchasedAdvancedCardNodes.has(state.currentShopNode);
}

const previousResetRunForAdvanced = resetRun;
resetRun = function () {
  previousResetRunForAdvanced();
  state.learnedAdvancedSkills = new Set();
  state.shopPurchasedMediumCardNodes = new Set();
  state.shopPurchasedAdvancedCardNodes = new Set();
  state.currentShopNode = null;
  state.shopNodeStocks = {};
  state.firstShopOfferedRelics = [];
  state.starfallPending = false;
  state.entropyCubeWindow = false;
  state.entropyCubeApplied = false;
  renderRelicBar();
  renderSkillsPanel();
  renderMap();
  updateHeroForView();
};

const previousResetBattleStateForAdvanced = resetBattleState;
resetBattleState = function () {
  const result = previousResetBattleStateForAdvanced();
  state.starfallPending = false;
  state.entropyCubeWindow = false;
  state.entropyCubeApplied = false;
  return result;
};

ensureShopStock = function (nodeKey = state.currentShopNode || NODE_KEYS.forest_1_4) {
  if (state.shopNodeStocks[nodeKey]?.length) {
    state.shopStockRelics = [...state.shopNodeStocks[nodeKey]];
    return;
  }

  if (nodeKey === NODE_KEYS.forest_1_9) {
    const carryOver = (state.firstShopOfferedRelics || []).filter((id) => !state.shopRelics.has(id));
    const backup = FIRST_SHOP_RELIC_IDS.filter((id) => !state.shopRelics.has(id) && !carryOver.includes(id));
    while (carryOver.length < 2 && backup.length) {
      carryOver.push(backup.shift());
    }
    const candidates = [...new Set([...carryOver.slice(0, 2), "entropy_cube"])];
    state.shopNodeStocks[nodeKey] = randomPick(candidates, Math.min(2, candidates.length));
  } else {
    state.shopNodeStocks[nodeKey] = randomPick(FIRST_SHOP_RELIC_IDS, 2);
    state.firstShopOfferedRelics = [...state.shopNodeStocks[nodeKey]];
  }
  state.shopStockRelics = [...state.shopNodeStocks[nodeKey]];
};

openShop = function (nodeKey = null) {
  const targetNode = nodeKey
    || (!hasCompleted(NODE_KEYS.forest_1_4) ? NODE_KEYS.forest_1_4
      : hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9) ? NODE_KEYS.forest_1_9
      : NODE_KEYS.forest_1_4);
  const prereq = targetNode === NODE_KEYS.forest_1_9 ? NODE_KEYS.forest_1_8 : NODE_KEYS.forest_1_3;
  if (!hasCompleted(prereq)) {
    showToast(targetNode === NODE_KEYS.forest_1_9 ? "先完成 1-8，第二个商店才会开放。" : "先完成 1-3，商店才会开放。");
    return;
  }
  state.currentShopNode = targetNode;
  ensureShopStock(targetNode);
  if (targetNode === NODE_KEYS.forest_1_9) {
    dom.shopEyebrow.textContent = "地点事件 / 第二商店";
    dom.shopTitle.textContent = "迷雾森林：回响商栈";
    dom.shopText.textContent = "这里会继续出售四种药丸，并提供中级技能卡、高级技能卡，以及由旧货与新圣物组成的第二轮圣物陈列。";
    dom.shopLeaveButton.textContent = "离开商店";
  } else {
    dom.shopEyebrow.textContent = "地点事件 / 商店";
    dom.shopTitle.textContent = "迷雾森林补给站";
    dom.shopText.textContent = "在华丽的商店中购买药丸、技能卡与商店圣物，为后续战斗做好准备。";
    dom.shopLeaveButton.textContent = "进入下一关";
  }
  renderShop();
  setView("shop");
};

leaveShop = function () {
  if (state.currentShopNode && !hasCompleted(state.currentShopNode)) completeNode(state.currentShopNode);
  if (state.currentShopNode === NODE_KEYS.forest_1_9) {
    returnToMap();
    return;
  }
  startFifthLevel();
};

renderShopStatus = function () {
  const cards = [
    {
      label: "当前金币",
      value: `${state.gold}`,
      text: "金币会在购买后立刻扣除，可以自由搭配药丸、技能卡与圣物。",
    },
    {
      label: "技能成长",
      value: `${state.learnedMediumSkills.size} 中 / ${state.learnedAdvancedSkills.size} 高`,
      text: state.currentShopNode === NODE_KEYS.forest_1_9
        ? "第二商店会同时提供中级技能卡与高级技能卡。"
        : "当前商店提供中级技能卡，用来补齐四同技能体系。",
    },
    {
      label: "商店圣物",
      value: `${state.shopRelics.size}`,
      text: state.shopRelics.size ? "商店圣物会在后续所有战斗关持续提供增益。" : "本轮还没有购买商店专属圣物。",
    },
    {
      label: "当前陈列",
      value: `${state.shopStockRelics.length}`,
      text: state.currentShopNode === NODE_KEYS.forest_1_9
        ? "第二商店会从旧店未购圣物与熵减魔方中随机陈列 2 件。"
        : "首个商店会从基础圣物池中随机陈列 2 件。",
    },
  ];
  dom.shopStatus.innerHTML = cards.map((card) => `
    <article class="shop-status-card">
      <span class="event-status-label">${card.label}</span>
      <strong>${card.value}</strong>
      <p>${card.text}</p>
    </article>
  `).join("");
};

renderShopSkillCard = function () {
  dom.shopSkillCard.innerHTML = "";

  const mediumSoldOut = isCurrentShopMediumBought() || !availableMediumSkills().length;
  const mediumButton = document.createElement("button");
  mediumButton.type = "button";
  mediumButton.className = "shop-skill-card";
  mediumButton.disabled = mediumSoldOut || state.gold < SHOP_SKILL_CARD_PRICE;
  mediumButton.innerHTML = `
    <div class="shop-product-top">
      <div class="shop-icon">技</div>
      <div class="shop-price">${SHOP_SKILL_CARD_PRICE} 金币</div>
    </div>
    <div>
      <h3>中级技能卡</h3>
      <p>购买后永久随机学会 1 个尚未掌握的四同中级技能。</p>
    </div>
    <div class="shop-tag-row">
      <span class="shop-tag">永久成长</span>
      <span class="shop-tag">每店限购 1 张</span>
    </div>
    <div class="shop-stock">
      <span>${mediumSoldOut ? "已售罄" : `剩余可学 ${availableMediumSkills().length} 种`}</span>
      <span>${isCurrentShopMediumBought() ? "本店已购买" : "可购买"}</span>
    </div>
  `;
  mediumButton.addEventListener("click", () => buyShopSkillCard("medium"));
  dom.shopSkillCard.append(mediumButton);

  if (state.currentShopNode !== NODE_KEYS.forest_1_9) return;

  const advancedSoldOut = isCurrentShopAdvancedBought() || !availableAdvancedSkills().length;
  const advancedButton = document.createElement("button");
  advancedButton.type = "button";
  advancedButton.className = "shop-skill-card";
  advancedButton.disabled = advancedSoldOut || state.gold < ADVANCED_SKILL_CARD_PRICE;
  advancedButton.innerHTML = `
    <div class="shop-product-top">
      <div class="shop-icon">极</div>
      <div class="shop-price">${ADVANCED_SKILL_CARD_PRICE} 金币</div>
    </div>
    <div>
      <h3>高级技能卡</h3>
      <p>购买后永久随机学会 1 个尚未掌握的五同高级技能。</p>
    </div>
    <div class="shop-tag-row">
      <span class="shop-tag">五同技能</span>
      <span class="shop-tag">每店限购 1 张</span>
    </div>
    <div class="shop-stock">
      <span>${advancedSoldOut ? "已售罄" : `剩余可学 ${availableAdvancedSkills().length} 种`}</span>
      <span>${isCurrentShopAdvancedBought() ? "本店已购买" : "可购买"}</span>
    </div>
  `;
  advancedButton.addEventListener("click", () => buyShopSkillCard("advanced"));
  dom.shopSkillCard.append(advancedButton);
};

buyShopSkillCard = function (type = "medium") {
  if (!state.currentShopNode) return;
  if (type === "advanced") {
    if (isCurrentShopAdvancedBought()) {
      showToast("这张高级技能卡已经卖完了。");
      return;
    }
    if (!availableAdvancedSkills().length) {
      showToast("当前已经学会全部高级技能。");
      return;
    }
    if (!spendGold(ADVANCED_SKILL_CARD_PRICE)) {
      showToast("金币不足。");
      return;
    }
    state.shopPurchasedAdvancedCardNodes.add(state.currentShopNode);
    const learned = learnRandomAdvancedSkill();
    showToast(`学会高级技能：${learned.name}`);
    addLog("system", `你在商店中购入了 <strong>高级技能卡</strong>，并学会了 <strong>${learned.name}</strong>。${learned.description}`);
    playSound("skill");
    renderShop();
    renderSkillsPanel();
    return;
  }

  if (isCurrentShopMediumBought()) {
    showToast("这张中级技能卡已经卖完了。");
    return;
  }
  if (!availableMediumSkills().length) {
    showToast("当前已经学会全部中级技能。");
    return;
  }
  if (!spendGold(SHOP_SKILL_CARD_PRICE)) {
    showToast("金币不足。");
    return;
  }
  state.shopPurchasedMediumCardNodes.add(state.currentShopNode);
  const result = learnRandomMediumSkill();
  showToast(result.toast);
  addLog("system", `你在商店中购入了 <strong>中级技能卡</strong>。${result.log}`);
  playSound("skill");
  renderShop();
  renderSkillsPanel();
};

renderSkillsPanel = function () {
  const baseSkills = [
    { title: "三个金 / 金属化", description: "免疫敌方下一次造成伤害的攻击。" },
    { title: "三个木 / 树藤缠绕", description: "对 Boss 造成 50 伤害，并恢复 20 生命。" },
    { title: "三个水 / 冰霜冲击", description: "对 Boss 造成 80 伤害，并有概率冻结 Boss 下一次行动。" },
    { title: "三个火 / 火焰弹", description: "对 Boss 造成 100 伤害。" },
    { title: "三个土 / 土流盾", description: "获得 50 护盾，持续 3 次 Boss 行动。" },
    { title: "五个以太 / 创世之光", description: "直接清空 Boss 生命。" },
  ];
  dom.skillList.innerHTML = baseSkills.map((skill) => `<li><strong>${skill.title}</strong>：${skill.description}</li>`).join("");

  const learnedMedium = Object.values(MEDIUM_SKILLS).filter((skill) => state.learnedMediumSkills.has(skill.id));
  const learnedAdvanced = Object.values(ADVANCED_SKILLS).filter((skill) => state.learnedAdvancedSkills.has(skill.id));
  const entries = [
    ...learnedMedium.map((skill) => `<li><strong>${skill.count}个${ELEMENTS[skill.element].name} / ${skill.name}</strong>：${skill.description}</li>`),
    ...learnedAdvanced.map((skill) => `<li><strong>${skill.count}个${ELEMENTS[skill.element].name} / ${skill.name}</strong>：${skill.description}</li>`),
  ];
  dom.mediumSkillList.innerHTML = entries.length
    ? entries.join("")
    : "<li>当前还没有学会中级或高级技能。商店与宝箱中的技能卡会教会你四同或五同元素技能。</li>";
};

const previousDescribeComboForAdvanced = describeCombo;
describeCombo = function (selected, counts) {
  if (!selected.length) return previousDescribeComboForAdvanced(selected, counts);
  if (counts.aether === 5) return { title: "创世之光", description: "五个以太：直接清空 Boss 生命。" };
  const advanced = getLearnedAdvancedMatch(counts);
  if (advanced) return { title: advanced.name, description: advanced.description };
  return previousDescribeComboForAdvanced(selected, counts);
};

evaluateSelection = function (selected, counts) {
  if (counts.aether === 5) return { type: "aether" };
  const advanced = getLearnedAdvancedMatch(counts);
  if (advanced) return { type: "advanced", skill: advanced };
  const learned = getLearnedMediumMatch(counts);
  if (learned) return { type: "medium", skill: learned };
  const triple = ELEMENT_ORDER.find((id) => counts[id] >= 3);
  if (triple) return { type: "basic", element: triple };
  return { type: "empty" };
};

function applyAdvancedSkill(skill) {
  showSkillEffect(skill.element, skill.name, "ULTIMATE SKILL");
  if (skill.id === "metal5") {
    state.starfallPending = true;
    addLog("player", "你发动了 <strong>群星落陨</strong>，本回合进入蓄能，下回合开始时将降下星陨。");
    showToast("群星落陨开始蓄能。");
    runSkillTrajectory("metal", "player");
    return;
  }
  if (skill.id === "wood5") {
    const healed = healPlayer(state.playerMaxHp);
    addLog("player", `你发动了 <strong>生命赞歌</strong>，恢复了 <strong>${healed}</strong> 点生命。`);
    showToast("生命赞歌让你的生命恢复至满值。");
    runSkillTrajectory("wood", "player");
    showBattleFloat(".player-card", `+${healed}`, "heal");
    return;
  }
  if (skill.id === "water5") {
    const damage = 150 + playerDamageBonus();
    state.bossFrozen = true;
    damageBoss(damage);
    addLog("player", `你发动了 <strong>凛冬雪瀑</strong>，冻结了 Boss 的下回合，并造成 <strong>${damage}</strong> 点伤害。`);
    showToast("凛冬雪瀑命中，Boss 下回合被冻结。");
    runSkillTrajectory("water", "boss");
    showBattleFloat(".boss-card", `-${damage}`, "damage");
    return;
  }
  if (skill.id === "fire5") {
    const damage = Math.ceil(state.bossHp * 0.5);
    damageBoss(damage);
    addLog("player", `你发动了 <strong>崩坏狱炎</strong>，吞噬了 Boss 当前 <strong>50%</strong> 的生命。`);
    showToast("崩坏狱炎吞噬了敌方半数生命。");
    runSkillTrajectory("fire", "boss");
    showBattleFloat(".boss-card", `-${damage}`, "damage");
    return;
  }
  state.playsLeft += 4;
  addLog("player", "你发动了 <strong>大地之门</strong>，额外获得 3 次出骰，并返还了这次出骰消耗。");
  showToast("大地之门展开，出骰次数大幅增加。");
  runSkillTrajectory("earth", "player");
  showBattleFloat(".player-card", "+3 出骰", "shield");
}

const previousDamageBossForEntropy = damageBoss;
damageBoss = function (amount) {
  let finalAmount = amount;
  if (state.entropyCubeWindow && !state.entropyCubeApplied && finalAmount > 0) {
    finalAmount = Math.round(finalAmount * 1.5);
    state.entropyCubeApplied = true;
    showToast("熵减魔方触发，最后一击伤害提升 50%。");
    addLog("system", `圣物 <strong>熵减魔方</strong> 被激活，本次伤害提升至 <strong>${finalAmount}</strong>。`);
  }
  return previousDamageBossForEntropy(finalAmount);
};

resolvePlayerAction = function () {
  if (state.phase !== "player" || state.gameOver || state.paused) return;
  const { selected, counts } = countsFromSelected();
  if (!selected.length) {
    showToast("请先选中至少一个骰子。");
    return;
  }

  const result = evaluateSelection(selected, counts);
  const selectedIds = selected.map((die) => die.id);
  const consumePoison = Boolean(state.playerPoisoned);
  const usePythonBracelet = Boolean(state.pythonBraceletReady);
  const useEntropyCube = Boolean(state.shopRelics.has("entropy_cube") && state.playsLeft === 1);

  if (usePythonBracelet) {
    state.pythonBraceletWindow = true;
    state.pythonBraceletApplied = false;
  }
  if (useEntropyCube) {
    state.entropyCubeWindow = true;
    state.entropyCubeApplied = false;
  }

  state.phase = "boss";
  state.playsLeft -= 1;

  if (result.type === "aether") {
    state.bossHp = 0;
    addLog("player", "你发动了 <strong>创世之光</strong>，直接终结了敌人。");
    showToast("创世之光降临。");
    showSkillEffect("aether", "创世之光", "STARFALL");
    runSkillTrajectory("aether", "boss");
    showBattleFloat(".boss-card", "终结", "damage");
  } else if (result.type === "advanced") {
    applyAdvancedSkill(result.skill);
  } else if (result.type === "medium") {
    applyMediumSkill(result.skill);
  } else if (result.type === "basic") {
    applyBasicSkill(result.element);
  } else {
    addLog("player", "你打出了一组未形成技能的组合，本回合没有触发额外效果。");
    showToast("没有触发技能。");
    playSound("play");
  }

  if (result.type !== "empty") playSound(result.type === "aether" ? "aether" : "skill");
  replacePlayedDice(selectedIds);
  if (consumePoison) state.playerPoisoned = false;
  renderDice(selectedIds);

  state.pythonBraceletWindow = false;
  state.entropyCubeWindow = false;
  if (usePythonBracelet) state.pythonBraceletReady = false;

  syncBattleUi();
  if (checkBattleEnd()) return;
  if (state.phase !== "boss") return;
  state.bossTimerId = window.setTimeout(() => {
    state.bossTimerId = null;
    resolveBossTurn();
  }, 500);
};

const previousFinishRoundForStarfall = finishRound;
finishRound = function () {
  previousFinishRoundForStarfall();
  if (state.gameOver || state.phase !== "player") return;
  if (!state.starfallPending) return;

  state.starfallPending = false;
  const damage = 250 + playerDamageBonus();
  damageBoss(damage);
  addLog("player", `蓄能完成，<strong>群星落陨</strong> 在回合开始时砸落，对 Boss 造成 <strong>${damage}</strong> 点伤害。`);
  showToast("群星落陨爆发。");
  runSkillTrajectory("metal", "boss");
  showBattleFloat(".boss-card", `-${damage}`, "damage");
  syncBattleUi();
  if (!checkBattleEnd()) renderDice();
};

const previousUpdateHeroForViewForShop2 = updateHeroForView;
updateHeroForView = function () {
  if (state.currentView === "shop" && state.currentShopNode === NODE_KEYS.forest_1_9) {
    dom.heroEyebrow.textContent = "地点事件 / 第二商店";
    dom.heroTitle.textContent = "迷雾森林：回响商栈";
    dom.heroSubtitle.textContent = "这里会出售第二轮药丸、技能卡与圣物。你还能在这里购入五同元素的高级技能卡。";
    return;
  }
  previousUpdateHeroForViewForShop2();
};

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: startFirstLevel,
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: startThirdLevel,
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: () => openShop(NODE_KEYS.forest_1_4),
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: startFifthLevel,
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。"),
    },
    [NODE_KEYS.forest_1_7]: {
      label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒",
      icon: "serpent",
      state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked",
      onClick: startSeventhLevel,
      onCompletedClick: startSeventhLevel,
    },
    [NODE_KEYS.forest_1_8]: {
      label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_9]: {
      label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked",
      onClick: () => openShop(NODE_KEYS.forest_1_9),
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
    ? "1-9 第二商店已经开放。这里会出售高级技能卡，并带来新的圣物“熵减魔方”。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
      ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
        ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
          ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
          : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : state.mapPage === 0 && index === 5
                ? NODE_KEYS.forest_1_6
                : state.mapPage === 0 && index === 6
                  ? NODE_KEYS.forest_1_7
                  : state.mapPage === 0 && index === 7
                    ? NODE_KEYS.forest_1_8
                    : state.mapPage === 0 && index === 8
                      ? NODE_KEYS.forest_1_9
                      : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : def?.icon === "library"
              ? `<div class="map-node-icon-library"><span></span></div>`
              : def?.icon === "serpent"
                ? `<div class="map-node-icon-serpent"></div>`
                : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderSkillsPanel();
renderMap();
updateHeroForView();
if (state.currentBattleKey) syncBattleUi();

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: { label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active", onClick: startFirstLevel, onCompletedClick: startFirstLevel },
    [NODE_KEYS.forest_1_2]: { label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_3]: { label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked", onClick: startThirdLevel, onCompletedClick: startThirdLevel },
    [NODE_KEYS.forest_1_4]: { label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_4), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_5]: { label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人", icon: "gate", state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked", onClick: startFifthLevel, onCompletedClick: startFifthLevel },
    [NODE_KEYS.forest_1_6]: { label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆", icon: "library", state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked", onClick: openGreatLibrary, onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。") },
    [NODE_KEYS.forest_1_7]: { label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒", icon: "serpent", state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked", onClick: startSeventhLevel, onCompletedClick: startSeventhLevel },
    [NODE_KEYS.forest_1_8]: { label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_9]: { label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_9), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
    ? "1-9 第二商店已经开放。它会和前面的关卡一样正常显示在地图上。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
      ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
        ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
          ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
          : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0 ? NODE_KEYS.forest_1_1 : state.mapPage === 0 && index === 1 ? NODE_KEYS.forest_1_2 : state.mapPage === 0 && index === 2 ? NODE_KEYS.forest_1_3 : state.mapPage === 0 && index === 3 ? NODE_KEYS.forest_1_4 : state.mapPage === 0 && index === 4 ? NODE_KEYS.forest_1_5 : state.mapPage === 0 && index === 5 ? NODE_KEYS.forest_1_6 : state.mapPage === 0 && index === 6 ? NODE_KEYS.forest_1_7 : state.mapPage === 0 && index === 7 ? NODE_KEYS.forest_1_8 : state.mapPage === 0 && index === 9 ? NODE_KEYS.forest_1_9 : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    if (page.id === "forest" && index === 8 && !def) return;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem" ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>` : def?.icon === "chest" ? `<div class="map-node-icon-chest"></div>` : def?.icon === "shop" ? `<div class="map-node-icon-shop"></div>` : def?.icon === "gate" ? `<div class="map-node-icon-gate"></div>` : def?.icon === "library" ? `<div class="map-node-icon-library"><span></span></div>` : def?.icon === "serpent" ? `<div class="map-node-icon-serpent"></div>` : "?";
    if (!def) button.addEventListener("click", () => showToast("该地点尚未开放。"));
    else if (def.state === "completed" && def.onCompletedClick) button.addEventListener("click", def.onCompletedClick);
    else if (def.state !== "locked") button.addEventListener("click", def.onClick);
    else button.addEventListener("click", () => showToast("先完成前置节点。"));
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: { label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active", onClick: startFirstLevel, onCompletedClick: startFirstLevel },
    [NODE_KEYS.forest_1_2]: { label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_3]: { label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked", onClick: startThirdLevel, onCompletedClick: startThirdLevel },
    [NODE_KEYS.forest_1_4]: { label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_4), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_5]: { label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人", icon: "gate", state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked", onClick: startFifthLevel, onCompletedClick: startFifthLevel },
    [NODE_KEYS.forest_1_6]: { label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆", icon: "library", state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked", onClick: openGreatLibrary, onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。") },
    [NODE_KEYS.forest_1_7]: { label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒", icon: "serpent", state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked", onClick: startSeventhLevel, onCompletedClick: startSeventhLevel },
    [NODE_KEYS.forest_1_8]: { label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_9]: { label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_9), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
    ? "1-9 第二商店已经开放。它会和前面的关卡一样显示在地图上，前置未完成时只是不可进入。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
      ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
        ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
          ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
          : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0 ? NODE_KEYS.forest_1_1 : state.mapPage === 0 && index === 1 ? NODE_KEYS.forest_1_2 : state.mapPage === 0 && index === 2 ? NODE_KEYS.forest_1_3 : state.mapPage === 0 && index === 3 ? NODE_KEYS.forest_1_4 : state.mapPage === 0 && index === 4 ? NODE_KEYS.forest_1_5 : state.mapPage === 0 && index === 5 ? NODE_KEYS.forest_1_6 : state.mapPage === 0 && index === 6 ? NODE_KEYS.forest_1_7 : state.mapPage === 0 && index === 7 ? NODE_KEYS.forest_1_8 : state.mapPage === 0 && index === 8 ? NODE_KEYS.forest_1_9 : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem" ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>` : def?.icon === "chest" ? `<div class="map-node-icon-chest"></div>` : def?.icon === "shop" ? `<div class="map-node-icon-shop"></div>` : def?.icon === "gate" ? `<div class="map-node-icon-gate"></div>` : def?.icon === "library" ? `<div class="map-node-icon-library"><span></span></div>` : def?.icon === "serpent" ? `<div class="map-node-icon-serpent"></div>` : "?";
    if (!def) button.addEventListener("click", () => showToast("该地点尚未开放。"));
    else if (def.state === "completed" && def.onCompletedClick) button.addEventListener("click", def.onCompletedClick);
    else if (def.state !== "locked") button.addEventListener("click", def.onClick);
    else button.addEventListener("click", () => showToast("先完成前置节点。"));
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();

grantRandomWolfRelic = function () {
  const wolfRelicIds = ["wolf_tooth", "wolf_skin", "wolf_eye"];
  const pool = wolfRelicIds.filter((id) => !state.relics.has(id));
  const fallback = wolfRelicIds;
  const source = pool.length ? pool : fallback;
  const chosenId = source[Math.floor(Math.random() * source.length)];
  state.relics.add(chosenId);
  showToast(`获得圣物：${RELIC_DEFS[chosenId].name}`);
  addLog("system", `你获得了圣物 <strong>${RELIC_DEFS[chosenId].name}</strong>：${RELIC_DEFS[chosenId].description}`);
  return RELIC_DEFS[chosenId];
};

NODE_KEYS.forest_1_8 = "forest_1_8";
const MEDIUM_COIN_BAG_GOLD = 8;
const FOREST_1_8_TREASURE_POOL = [
  { id: "blue_pill", type: "item" },
  { id: "red_pill", type: "item" },
  { id: "green_pill", type: "item" },
  { id: "yellow_pill", type: "item" },
  { id: "mid_skill_card", type: "skill_card" },
  { id: "coin_bag_medium", type: "coins", amount: MEDIUM_COIN_BAG_GOLD },
];

rewardMeta = function (choice) {
  if (choice.type === "item") {
    const item = ITEM_DEFS[choice.id];
    return {
      css: `reward-card reward-${item.css}`,
      icon: item.icon,
      name: item.name,
      description: item.description,
      meta: "战斗消耗品",
      detail: item.short,
    };
  }
  if (choice.type === "skill_card") {
    return {
      css: "reward-card reward-skill",
      icon: "技",
      name: "中级技能卡",
      description: `从当前可学习的 ${availableMediumSkills().length} 个四同元素技能里随机学会 1 个。`,
      meta: "永久成长",
      detail: "随机四同技能",
    };
  }
  const amount = choice.amount || COIN_BAG_GOLD;
  return {
    css: "reward-card reward-coin",
    icon: "$",
    name: amount >= MEDIUM_COIN_BAG_GOLD ? "中型钱袋" : "小型钱袋",
    description: `直接获得 ${amount} 枚金币。`,
    meta: "金币奖励",
    detail: `+${amount} 金币`,
  };
};

openTreasureEvent = function (nodeKey = NODE_KEYS.forest_1_2) {
  const isLateTreasure = nodeKey === NODE_KEYS.forest_1_8;
  const prereqNode = isLateTreasure ? NODE_KEYS.forest_1_7 : NODE_KEYS.forest_1_1;
  if (!hasCompleted(prereqNode)) {
    showToast(isLateTreasure ? "先完成 1-7，才能打开这个宝箱。" : "先完成 1-1，才能打开这个宝箱。");
    return;
  }
  if (hasCompleted(nodeKey)) {
    showToast("这个宝箱已经领取过了。");
    return;
  }
  state.currentEvent = isLateTreasure ? "forest_treasure_1_8" : "forest_treasure_1_2";
  state.currentTreasureNode = nodeKey;
  if (!state.eventChoices.length) {
    state.eventChoices = randomPick(isLateTreasure ? FOREST_1_8_TREASURE_POOL : TREASURE_POOL, TREASURE_DRAW_COUNT);
  }
  dom.eventEyebrow.textContent = "地点事件 / 宝箱";
  dom.eventTitle.textContent = "林间宝箱";
  dom.eventText.textContent = isLateTreasure
    ? "藤影深处的第二只林间宝箱缓缓开启。它依然会展示 3 种奖励，但这次的小型钱袋被替换成了中型钱袋。"
    : "残破石碑旁的古旧宝箱打开了。它会展示 3 种奖励，你只能带走其中 1 种。";
  renderEventStatus();
  renderEventChoices();
  setView("event");
};

claimTreasureReward = function (choice) {
  if (!state.currentEvent) return;
  const currentTreasureNode = state.currentTreasureNode || NODE_KEYS.forest_1_2;
  if (choice.type === "item") {
    addItem(choice.id, 1);
    showToast(`获得 ${ITEM_DEFS[choice.id].name}。`);
    addLog("system", `你从宝箱里拿到了 <strong>${ITEM_DEFS[choice.id].name}</strong>。`);
  } else if (choice.type === "skill_card") {
    const result = learnRandomMediumSkill();
    showToast(result.toast);
    addLog("system", result.log);
  } else {
    const amount = choice.amount || COIN_BAG_GOLD;
    addGold(amount);
    showToast(`获得 ${amount} 金币。`);
    addLog("system", `你从钱袋里取出了 <strong>${amount}</strong> 枚金币。`);
  }
  completeNode(currentTreasureNode);
  state.currentEvent = null;
  state.currentTreasureNode = null;
  state.eventChoices = [];
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
  renderMap();
  setView("map");
};

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: {
      label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active",
      onClick: startFirstLevel,
      onCompletedClick: startFirstLevel,
    },
    [NODE_KEYS.forest_1_2]: {
      label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
    [NODE_KEYS.forest_1_3]: {
      label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群",
      icon: "golem",
      state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked",
      onClick: startThirdLevel,
      onCompletedClick: startThirdLevel,
    },
    [NODE_KEYS.forest_1_4]: {
      label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店",
      icon: "shop",
      state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked",
      onClick: openShop,
      onCompletedClick: () => showToast("这个商店本轮只能进入一次。"),
    },
    [NODE_KEYS.forest_1_5]: {
      label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人",
      icon: "gate",
      state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked",
      onClick: startFifthLevel,
      onCompletedClick: startFifthLevel,
    },
    [NODE_KEYS.forest_1_6]: {
      label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆",
      icon: "library",
      state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked",
      onClick: openGreatLibrary,
      onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。"),
    },
    [NODE_KEYS.forest_1_7]: {
      label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒",
      icon: "serpent",
      state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked",
      onClick: startSeventhLevel,
      onCompletedClick: startSeventhLevel,
    },
    [NODE_KEYS.forest_1_8]: {
      label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱",
      icon: "chest",
      state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked",
      onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8),
      onCompletedClick: () => showToast("这个宝箱已经领取过了。"),
    },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
    ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
      ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
        ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
        : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0
      ? NODE_KEYS.forest_1_1
      : state.mapPage === 0 && index === 1
        ? NODE_KEYS.forest_1_2
        : state.mapPage === 0 && index === 2
          ? NODE_KEYS.forest_1_3
          : state.mapPage === 0 && index === 3
            ? NODE_KEYS.forest_1_4
            : state.mapPage === 0 && index === 4
              ? NODE_KEYS.forest_1_5
              : state.mapPage === 0 && index === 5
                ? NODE_KEYS.forest_1_6
                : state.mapPage === 0 && index === 6
                  ? NODE_KEYS.forest_1_7
                  : state.mapPage === 0 && index === 7
                    ? NODE_KEYS.forest_1_8
                    : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem"
      ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>`
      : def?.icon === "chest"
        ? `<div class="map-node-icon-chest"></div>`
        : def?.icon === "shop"
          ? `<div class="map-node-icon-shop"></div>`
          : def?.icon === "gate"
            ? `<div class="map-node-icon-gate"></div>`
            : def?.icon === "library"
              ? `<div class="map-node-icon-library"><span></span></div>`
              : def?.icon === "serpent"
                ? `<div class="map-node-icon-serpent"></div>`
                : "?";
    if (!def) {
      button.addEventListener("click", () => showToast("该地点尚未开放。"));
    } else if (def.state === "completed" && def.onCompletedClick) {
      button.addEventListener("click", def.onCompletedClick);
    } else if (def.state !== "locked") {
      button.addEventListener("click", def.onClick);
    } else {
      button.addEventListener("click", () => showToast("先完成前置节点。"));
    }
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();

RELIC_DEFS.python_bracelet.short = "首击伤害 +50%";
RELIC_DEFS.python_bracelet.description = "永久生效。每关第一次出骰时，若这一手触发的是伤害类技能，则该次伤害提高 50%。若第一手不是伤害技能，则本关不会触发此效果。";

currentBasePlays = function () {
  return baseCurrentBasePlays();
};

const previousResetBattleState = resetBattleState;
resetBattleState = function () {
  const result = previousResetBattleState();
  state.pythonBraceletReady = state.relics.has("python_bracelet");
  state.pythonBraceletWindow = false;
  state.pythonBraceletApplied = false;
  state.wolfKingSummonActive = false;
  state.wolfKingStoredHp = 0;
  state.playerBasicSeal = false;
  state.playerBasicSealNextTurn = false;
  return result;
};

const previousDamageBoss = damageBoss;
damageBoss = function (amount) {
  let finalAmount = amount;
  if (state.pythonBraceletWindow && !state.pythonBraceletApplied && amount > 0) {
    finalAmount = Math.round(amount * 1.5);
    state.pythonBraceletApplied = true;
    showToast("巨蟒手链触发，首次伤害技能提升 50%。");
    addLog("system", `圣物 <strong>巨蟒手链</strong> 被激活，本次伤害提升至 <strong>${finalAmount}</strong>。`);
  }
  return previousDamageBoss(finalAmount);
};

const previousResolvePlayerAction = resolvePlayerAction;
resolvePlayerAction = function () {
  const shouldOpenBraceletWindow = state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.selectedDice.size > 0
    && state.playsLeft > 0
    && state.pythonBraceletReady;
  const sealWillExpire = state.currentBattleKey === NODE_KEYS.forest_1_10
    && state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.selectedDice.size > 0
    && state.playsLeft > 0
    && state.playerBasicSeal;

  if (shouldOpenBraceletWindow) {
    state.pythonBraceletWindow = true;
    state.pythonBraceletApplied = false;
  }

  const result = previousResolvePlayerAction();

  if (shouldOpenBraceletWindow && state.phase !== "player") {
    state.pythonBraceletWindow = false;
    state.pythonBraceletReady = false;
  }
  if (sealWillExpire && state.phase !== "player") {
    state.playerBasicSeal = false;
    if (!state.gameOver) syncBattleUi();
  }

  return result;
};

const previousFinishRoundForWolfKingFinal = finishRound;
finishRound = function () {
  const shouldApplySeal = state.currentBattleKey === NODE_KEYS.forest_1_10 && state.playerBasicSealNextTurn;
  previousFinishRoundForWolfKingFinal();
  if (state.gameOver || state.phase !== "player" || state.currentBattleKey !== NODE_KEYS.forest_1_10) return;
  state.playerBasicSeal = Boolean(shouldApplySeal);
  state.playerBasicSealNextTurn = false;
  if (shouldApplySeal) {
    addLog("boss", "迅猛狼王的封印余波落在你的骰池上，本回合无法打出三同基础技能。");
    showToast("你被狼王封印，本回合无法打出三同基础技能。");
    renderDice();
    syncBattleUi();
  }
};

if (state.currentBattleKey) syncBattleUi();

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: { label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active", onClick: startFirstLevel, onCompletedClick: startFirstLevel },
    [NODE_KEYS.forest_1_2]: { label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_3]: { label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked", onClick: startThirdLevel, onCompletedClick: startThirdLevel },
    [NODE_KEYS.forest_1_4]: { label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_4), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_5]: { label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人", icon: "gate", state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked", onClick: startFifthLevel, onCompletedClick: startFifthLevel },
    [NODE_KEYS.forest_1_6]: { label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆", icon: "library", state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked", onClick: openGreatLibrary, onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。") },
    [NODE_KEYS.forest_1_7]: { label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒", icon: "serpent", state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked", onClick: startSeventhLevel, onCompletedClick: startSeventhLevel },
    [NODE_KEYS.forest_1_8]: { label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_9]: { label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_9), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
    ? "1-9 第二商店已经开放。它会和前面的关卡一样正常显示在地图上。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
      ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
        ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
          ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
          : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0 ? NODE_KEYS.forest_1_1 : state.mapPage === 0 && index === 1 ? NODE_KEYS.forest_1_2 : state.mapPage === 0 && index === 2 ? NODE_KEYS.forest_1_3 : state.mapPage === 0 && index === 3 ? NODE_KEYS.forest_1_4 : state.mapPage === 0 && index === 4 ? NODE_KEYS.forest_1_5 : state.mapPage === 0 && index === 5 ? NODE_KEYS.forest_1_6 : state.mapPage === 0 && index === 6 ? NODE_KEYS.forest_1_7 : state.mapPage === 0 && index === 7 ? NODE_KEYS.forest_1_8 : state.mapPage === 0 && index === 8 ? NODE_KEYS.forest_1_9 : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem" ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>` : def?.icon === "chest" ? `<div class="map-node-icon-chest"></div>` : def?.icon === "shop" ? `<div class="map-node-icon-shop"></div>` : def?.icon === "gate" ? `<div class="map-node-icon-gate"></div>` : def?.icon === "library" ? `<div class="map-node-icon-library"><span></span></div>` : def?.icon === "serpent" ? `<div class="map-node-icon-serpent"></div>` : "?";
    if (!def) button.addEventListener("click", () => showToast("该地点尚未开放。"));
    else if (def.state === "completed" && def.onCompletedClick) button.addEventListener("click", def.onCompletedClick);
    else if (def.state !== "locked") button.addEventListener("click", def.onClick);
    else button.addEventListener("click", () => showToast("先完成前置节点。"));
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();

const finalResetBattleStateForWolfKingEof = resetBattleState;
resetBattleState = function () {
  const result = finalResetBattleStateForWolfKingEof();
  state.pythonBraceletReady = state.relics.has("python_bracelet");
  state.pythonBraceletWindow = false;
  state.pythonBraceletApplied = false;
  state.wolfKingSummonActive = false;
  state.wolfKingStoredHp = 0;
  state.playerBasicSeal = false;
  state.playerBasicSealNextTurn = false;
  return result;
};

const finalResolvePlayerActionForWolfKingEof = resolvePlayerAction;
resolvePlayerAction = function () {
  const shouldOpenBraceletWindow = state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.selectedDice.size > 0
    && state.playsLeft > 0
    && state.pythonBraceletReady;
  const sealWillExpire = state.currentBattleKey === NODE_KEYS.forest_1_10
    && state.phase === "player"
    && !state.gameOver
    && !state.paused
    && state.selectedDice.size > 0
    && state.playsLeft > 0
    && state.playerBasicSeal;

  if (shouldOpenBraceletWindow) {
    state.pythonBraceletWindow = true;
    state.pythonBraceletApplied = false;
  }

  const result = finalResolvePlayerActionForWolfKingEof();

  if (shouldOpenBraceletWindow && state.phase !== "player") {
    state.pythonBraceletWindow = false;
    state.pythonBraceletReady = false;
  }
  if (sealWillExpire && state.phase !== "player") {
    state.playerBasicSeal = false;
    if (!state.gameOver) syncBattleUi();
  }

  return result;
};

const finalFinishRoundForWolfKingEof = finishRound;
finishRound = function () {
  const shouldApplySeal = state.currentBattleKey === NODE_KEYS.forest_1_10 && state.playerBasicSealNextTurn;
  finalFinishRoundForWolfKingEof();
  if (state.gameOver || state.phase !== "player" || state.currentBattleKey !== NODE_KEYS.forest_1_10) return;
  state.playerBasicSeal = Boolean(shouldApplySeal);
  state.playerBasicSealNextTurn = false;
  if (shouldApplySeal) {
    addLog("boss", "迅猛狼王的封印余波落在你的骰池上，本回合无法打出三同基础技能。");
    showToast("你被狼王封印，本回合无法打出三同基础技能。");
    renderDice();
    syncBattleUi();
  }
};

currentNodeDefinitions = function () {
  return {
    [NODE_KEYS.forest_1_1]: { label: hasCompleted(NODE_KEYS.forest_1_1) ? "1-1<br>已通关" : "1-1<br>石像守卫", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_1) ? "completed" : "active", onClick: startFirstLevel, onCompletedClick: startFirstLevel },
    [NODE_KEYS.forest_1_2]: { label: hasCompleted(NODE_KEYS.forest_1_2) ? "1-2<br>已开启" : "1-2<br>宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_1) ? (hasCompleted(NODE_KEYS.forest_1_2) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_2), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_3]: { label: hasCompleted(NODE_KEYS.forest_1_3) ? "1-3<br>已通关" : "1-3<br>迅猛狼群", icon: "golem", state: hasCompleted(NODE_KEYS.forest_1_2) ? (hasCompleted(NODE_KEYS.forest_1_3) ? "completed" : "active") : "locked", onClick: startThirdLevel, onCompletedClick: startThirdLevel },
    [NODE_KEYS.forest_1_4]: { label: hasCompleted(NODE_KEYS.forest_1_4) ? "1-4<br>已到访" : "1-4<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_3) ? (hasCompleted(NODE_KEYS.forest_1_4) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_4), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_5]: { label: hasCompleted(NODE_KEYS.forest_1_5) ? "1-5<br>已通关" : "1-5<br>暗夜猎人", icon: "gate", state: hasCompleted(NODE_KEYS.forest_1_4) ? (hasCompleted(NODE_KEYS.forest_1_5) ? "completed" : "active") : "locked", onClick: startFifthLevel, onCompletedClick: startFifthLevel },
    [NODE_KEYS.forest_1_6]: { label: hasCompleted(NODE_KEYS.forest_1_6) ? "1-6<br>已到访" : "1-6<br>大图书馆", icon: "library", state: hasCompleted(NODE_KEYS.forest_1_5) ? (hasCompleted(NODE_KEYS.forest_1_6) ? "completed" : "active") : "locked", onClick: openGreatLibrary, onCompletedClick: () => showToast("大图书馆本轮只能领取一次奖励。") },
    [NODE_KEYS.forest_1_7]: { label: hasCompleted(NODE_KEYS.forest_1_7) ? "1-7<br>已通关" : "1-7<br>绿斑巨蟒", icon: "serpent", state: hasCompleted(NODE_KEYS.forest_1_6) ? (hasCompleted(NODE_KEYS.forest_1_7) ? "completed" : "active") : "locked", onClick: startSeventhLevel, onCompletedClick: startSeventhLevel },
    [NODE_KEYS.forest_1_8]: { label: hasCompleted(NODE_KEYS.forest_1_8) ? "1-8<br>已开启" : "1-8<br>林间宝箱", icon: "chest", state: hasCompleted(NODE_KEYS.forest_1_7) ? (hasCompleted(NODE_KEYS.forest_1_8) ? "completed" : "active") : "locked", onClick: () => openTreasureEvent(NODE_KEYS.forest_1_8), onCompletedClick: () => showToast("这个宝箱已经领取过了。") },
    [NODE_KEYS.forest_1_9]: { label: hasCompleted(NODE_KEYS.forest_1_9) ? "1-9<br>已到访" : "1-9<br>商店", icon: "shop", state: hasCompleted(NODE_KEYS.forest_1_8) ? (hasCompleted(NODE_KEYS.forest_1_9) ? "completed" : "active") : "locked", onClick: () => openShop(NODE_KEYS.forest_1_9), onCompletedClick: () => showToast("这个商店本轮只能进入一次。") },
    [NODE_KEYS.forest_1_10]: { label: hasCompleted(NODE_KEYS.forest_1_10) ? "1-10<br>已通关" : "1-10<br>迅猛狼王", icon: "wolf_king", state: hasCompleted(NODE_KEYS.forest_1_9) ? (hasCompleted(NODE_KEYS.forest_1_10) ? "completed" : "active") : "locked", onClick: startTenthLevel, onCompletedClick: startTenthLevel },
  };
};

renderMap = function (animate = false) {
  const page = MAP_PAGES[state.mapPage];
  setThemeClass(dom.mapCard, page.id);
  setThemeClass(dom.mapScene, page.id);
  if (animate) {
    dom.mapScene.classList.remove("map-flip");
    void dom.mapScene.offsetWidth;
    dom.mapScene.classList.add("map-flip");
  }
  dom.mapRegionTitle.textContent = page.name;
  dom.mapRegionText.textContent = page.subtitle;
  dom.mapPageTitle.textContent = page.name;
  dom.mapPageMeta.textContent = `第 ${state.mapPage + 1} 页 / 共 ${MAP_PAGES.length} 页`;
  dom.mapHint.textContent = page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_9) && !hasCompleted(NODE_KEYS.forest_1_10)
    ? "1-10 迅猛狼王已经现身。它会用封印锁住你的三同基础技能，还会召来迅猛狼拖住节奏，这就是第一章的终章决战。"
    : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_8) && !hasCompleted(NODE_KEYS.forest_1_9)
      ? "1-9 第二商店已经开放。这里会出售高级技能卡，并带来新的圣物“熵减魔方”。"
      : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_7) && !hasCompleted(NODE_KEYS.forest_1_8)
        ? "1-8 林间宝箱已经开放。这次宝箱的金币奖励升级成了中型钱袋，依然是三选一。"
        : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_6) && !hasCompleted(NODE_KEYS.forest_1_7)
          ? "1-7 绿斑巨蟒已经开放。它会用中毒与濒死压制打乱你的节奏，别忘了带上已经成型的骰面与圣物。"
          : page.id === "forest" && hasCompleted(NODE_KEYS.forest_1_5) && !hasCompleted(NODE_KEYS.forest_1_6)
            ? "1-6 大图书馆已经开放。进入后可以从三项永久奖励中选其一。"
            : page.hint;
  dom.mapPrevButton.disabled = state.mapPage === 0;
  dom.mapNextButton.disabled = state.mapPage === MAP_PAGES.length - 1;
  dom.mapChapterRow.innerHTML = "";
  MAP_PAGES.forEach((mapPage, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `map-chapter-pill${index === state.mapPage ? " active" : ""}`;
    pill.innerHTML = `<span>第 ${index + 1} 页</span><strong>${mapPage.name}</strong>`;
    pill.addEventListener("click", () => {
      state.mapPage = index;
      renderMap(true);
      updateHeroForView();
    });
    dom.mapChapterRow.append(pill);
  });
  dom.mapPathSvg.innerHTML = `<path d="${page.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")}"></path>`;
  dom.mapNodes.innerHTML = "";
  const nodeDefs = currentNodeDefinitions();
  page.points.forEach((point, index) => {
    const node = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("div");
    const nodeKey = state.mapPage === 0 && index === 0 ? NODE_KEYS.forest_1_1 : state.mapPage === 0 && index === 1 ? NODE_KEYS.forest_1_2 : state.mapPage === 0 && index === 2 ? NODE_KEYS.forest_1_3 : state.mapPage === 0 && index === 3 ? NODE_KEYS.forest_1_4 : state.mapPage === 0 && index === 4 ? NODE_KEYS.forest_1_5 : state.mapPage === 0 && index === 5 ? NODE_KEYS.forest_1_6 : state.mapPage === 0 && index === 6 ? NODE_KEYS.forest_1_7 : state.mapPage === 0 && index === 7 ? NODE_KEYS.forest_1_8 : state.mapPage === 0 && index === 8 ? NODE_KEYS.forest_1_9 : state.mapPage === 0 && index === 9 ? NODE_KEYS.forest_1_10 : null;
    const def = nodeKey ? nodeDefs[nodeKey] : null;
    node.className = `map-node ${def?.state || "locked"}`;
    node.style.left = `${point.x}%`;
    node.style.top = `${point.y}%`;
    button.type = "button";
    button.className = "map-node-button";
    button.innerHTML = def?.icon === "golem" ? `<div class="map-node-icon-golem"><div class="map-node-arms"></div></div>` : def?.icon === "chest" ? `<div class="map-node-icon-chest"></div>` : def?.icon === "shop" ? `<div class="map-node-icon-shop"></div>` : def?.icon === "gate" ? `<div class="map-node-icon-gate"></div>` : def?.icon === "library" ? `<div class="map-node-icon-library"><span></span></div>` : def?.icon === "serpent" ? `<div class="map-node-icon-serpent"></div>` : def?.icon === "wolf_king" ? wolfKingNodeIconMarkup() : "?";
    if (!def) button.addEventListener("click", () => showToast("该地点尚未开放。"));
    else if (def.state === "completed" && def.onCompletedClick) button.addEventListener("click", def.onCompletedClick);
    else if (def.state !== "locked") button.addEventListener("click", def.onClick);
    else button.addEventListener("click", () => showToast("先完成前置节点。"));
    label.className = "map-node-label";
    label.innerHTML = def?.label || "后续开放";
    node.append(button, label);
    dom.mapNodes.append(node);
  });
};

renderMap();
updateHeroForView();
if (state.currentBattleKey === NODE_KEYS.forest_1_10) syncBattleUi();
