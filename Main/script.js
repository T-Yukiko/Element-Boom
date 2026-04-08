const ELEMENTS = {
  metal: { id: "metal", name: "金", label: "金属", symbol: "金", css: "element-metal", description: "稳健防御，适合抵挡高伤害招式。" },
  wood: { id: "wood", name: "木", label: "木灵", symbol: "木", css: "element-wood", description: "兼顾伤害与回复，适合拉回节奏。" },
  water: { id: "water", name: "水", label: "寒潮", symbol: "水", css: "element-water", description: "高额冲击，并有机会冻结 Boss。" },
  fire: { id: "fire", name: "火", label: "烈焰", symbol: "火", css: "element-fire", description: "最直接的爆发伤害。" },
  earth: { id: "earth", name: "土", label: "磐岩", symbol: "土", css: "element-earth", description: "提供护盾，用来硬抗强力攻击。" },
  aether: { id: "aether", name: "以太", label: "以太", symbol: "★", css: "element-aether", description: "集齐五枚可直接终结战斗。" },
};

const ELEMENT_ORDER = ["metal", "wood", "water", "fire", "earth", "aether"];
const BASE_PLAYER_HP = 100;
const MAX_BOSS_HP = 200;
const MAX_TURNS = 6;
const DICE_COUNT = 5;
const TOTAL_REROLLS = 5;
const FIRST_LEVEL_CLEAR_GOLD = 4;
const THIRD_LEVEL_CLEAR_GOLD = 6;
const COIN_BAG_GOLD = 5;
const TREASURE_DRAW_COUNT = 3;
const MAP_THEMES = ["theme-forest", "theme-tundra", "theme-lava", "theme-castle"];
const NODE_KEYS = { forest_1_1: "forest_1_1", forest_1_2: "forest_1_2", forest_1_3: "forest_1_3" };

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
  completedNodes: new Set(),
  gold: 0,
  inventory: { blue_pill: 0, red_pill: 0, green_pill: 0, yellow_pill: 0 },
  relics: new Set(),
  learnedMediumSkills: new Set(),
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
  phase: "player",
  metalGuard: false,
  shieldHp: 0,
  shieldTurns: 0,
  bossFrozen: false,
  bossDamageReduction: 0,
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

function createDie(index) {
  return { id: `die-${index + 1}`, face: randomElement() };
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
  return BASE_PLAYER_HP + (state.relics.has("wolf_skin") ? 50 : 0);
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
    counts[die.face] += 1;
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
  renderItemBar();
  renderRelicBar();
  renderSkillsPanel();
}

function renderDice(animatedIds = []) {
  dom.diceGrid.innerHTML = "";
  state.dice.forEach((die) => {
    const element = ELEMENTS[die.face];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `die ${element.css}${state.selectedDice.has(die.id) ? " selected" : ""}${animatedIds.includes(die.id) ? " roll-flash" : ""}`;
    button.disabled = state.phase !== "player" || state.gameOver || state.paused;
    button.innerHTML = `<div class="die-header"><span class="die-symbol">${element.symbol}</span><span class="die-tag">${element.label}</span></div><div class="die-name">${element.name}</div><div class="die-note">${element.description}</div>`;
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
        state.overlayAction = "map";
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
  resetBattleState();
  setView("battle");
});
dom.audioButton.addEventListener("click", toggleAudio);
window.addEventListener("pointerdown", ensureAudio, { once: true });

applyStaticCopy();
setBattleConfig(NODE_KEYS.forest_1_1);
renderMap();
renderItemBar();
renderRelicBar();
renderSkillsPanel();
setView("map");
