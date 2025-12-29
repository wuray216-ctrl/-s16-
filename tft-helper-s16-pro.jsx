import React, { useState } from 'react';

/*
 * ================================================
 * 金铲铲之战 S16 英雄联盟传奇 - 新手速成助手
 * ================================================
 * 作者: 四十大盗
 * 小红书: @四十大盗 7719219630
 * GitHub: https://github.com/wuray216-ctrl/-s16-.git
 * 创建日期: 2024年12月29日
 * 
 * ⚠️ 原创开发，禁止未授权转载
 * ================================================
 */
const baseItems = [
  { id: 'sword', name: '暴风大剑', icon: '⚔️' },
  { id: 'bow', name: '反曲之弓', icon: '🏹' },
  { id: 'rod', name: '无用大棒', icon: '🪄' },
  { id: 'tear', name: '女神之泪', icon: '💧' },
  { id: 'armor', name: '锁子甲', icon: '🛡️' },
  { id: 'cloak', name: '负极斗篷', icon: '🧥' },
  { id: 'belt', name: '巨人腰带', icon: '💫' },
  { id: 'glove', name: '暴击手套', icon: '🧤' },
];

const combinedItems = [
  { base1: 'sword', base2: 'glove', name: '无尽之刃', icon: '💎', desc: '暴击伤害+40%', easyDesc: '💥 暴击超级疼！物理C必备', category: 'physical' },
  { base1: 'bow', base2: 'rod', name: '鬼索狂暴之刃', icon: '👻', desc: '攻击叠攻速', easyDesc: '🔥 羊刀！越打越快', category: 'physical' },
  { base1: 'sword', base2: 'cloak', name: '饮血剑', icon: '🩸', desc: '物理吸血', easyDesc: '❤️ 打人回血', category: 'physical' },
  { base1: 'bow', base2: 'glove', name: '最后的轻语', icon: '🗣️', desc: '破甲30%', easyDesc: '🎯 破甲弓，打肉必备', category: 'physical' },
  { base1: 'sword', base2: 'bow', name: '巨人杀手', icon: '⚡', desc: '对高血量额外伤害', easyDesc: '💪 巨杀，专打胖子', category: 'physical' },
  { base1: 'bow', base2: 'bow', name: '红霸符', icon: '🔥', desc: '灼烧真伤', easyDesc: '🔥 海妖，攻速+真伤', category: 'physical' },
  { base1: 'sword', base2: 'sword', name: '死亡之刃', icon: '🗡️', desc: '击杀叠攻击', easyDesc: '💀 杀人越多越猛', category: 'physical' },
  { base1: 'rod', base2: 'glove', name: '珠光护手', icon: '✨', desc: '技能可暴击', easyDesc: '💫 法爆！法师必备', category: 'magic' },
  { base1: 'rod', base2: 'rod', name: '灭世者的死亡之帽', icon: '🎩', desc: '法强+50%', easyDesc: '🎩 大帽子，法强翻倍', category: 'magic' },
  { base1: 'tear', base2: 'tear', name: '蓝霸符', icon: '💙', desc: '开局+30法力', easyDesc: '💙 开局放技能', category: 'magic' },
  { base1: 'sword', base2: 'tear', name: '朔极之矛', icon: '🐲', desc: '击杀回蓝', easyDesc: '🐲 青龙刀，无限放技能', category: 'magic' },
  { base1: 'rod', base2: 'tear', name: '大天使之杖', icon: '😇', desc: '施法+法强', easyDesc: '😇 越放越强', category: 'magic' },
  { base1: 'tear', base2: 'glove', name: '正义之拳', icon: '👊', desc: '破魔抗30%', easyDesc: '👊 法师打肉必备', category: 'magic' },
  { base1: 'sword', base2: 'rod', name: '海克斯科技枪', icon: '🔫', desc: '治疗+伤害', easyDesc: '🔫 科技枪，打人回血', category: 'magic' },
  { base1: 'rod', base2: 'belt', name: '鬼书', icon: '📕', desc: '重伤效果', easyDesc: '📕 对面有奶就出', category: 'magic' },
  { base1: 'belt', base2: 'belt', name: '狂徒铠甲', icon: '❤️', desc: '每秒回2%血', easyDesc: '❤️ 狂徒，坦克必备', category: 'tank' },
  { base1: 'cloak', base2: 'cloak', name: '龙爪', icon: '🐉', desc: '魔法减免30%', easyDesc: '🐉 龙牙，抗法师', category: 'tank' },
  { base1: 'armor', base2: 'armor', name: '荆棘之甲', icon: '🦔', desc: '反弹25%物伤', easyDesc: '🦔 反甲，打我扎你', category: 'tank' },
  { base1: 'armor', base2: 'cloak', name: '石像鬼石板甲', icon: '🗿', desc: '双抗+25', easyDesc: '🗿 石像鬼，万金油', category: 'tank' },
  { base1: 'armor', base2: 'belt', name: '日炎斗篷', icon: '☀️', desc: '灼烧周围', easyDesc: '☀️ 日炎，站着烧人', category: 'tank' },
  { base1: 'tear', base2: 'belt', name: '救赎', icon: '✝️', desc: '低血治疗队友', easyDesc: '✝️ 快死时奶队友', category: 'tank' },
  { base1: 'cloak', base2: 'glove', name: '水银', icon: '💨', desc: '免控一次', easyDesc: '💨 防刺客必备', category: 'tank' },
  { base1: 'bow', base2: 'armor', name: '泰坦的坚决', icon: '🏔️', desc: '受伤叠攻速', easyDesc: '🏔️ 泰坦，挨打越快', category: 'tank' },
];

const heroData = {
  '芸阿娜': { cost: 4, region: '艾欧尼亚', class: '迅击战士', skill: '百花缭乱', skillDesc: '花瓣风暴攻击+治疗', easyDesc: '🌸 又打又奶！法系C首选', items: ['法爆', '大帽子', '正义之拳'], tip: '站后排，装备够就是爹' },
  '千珏': { cost: 5, region: '暗影岛', class: '射手', skill: '羔羊的祝福', skillDesc: '画圈内所有人暂时死不了', easyDesc: '🐺 无敌圈！保命反杀', items: ['羊刀', '无尽', '海妖'], tip: '暗影岛收魂后伤害爆炸' },
  '德莱文': { cost: 3, region: '诺克萨斯', class: '迅击战士', skill: '旋转飞斧', skillDesc: '接斧头攻击更疼', easyDesc: '🪓 斧子王！接斧子输出爆炸', items: ['无尽', '饮血', '破甲弓'], tip: '诺克核心C，3费就能拿' },
  '薇恩': { cost: 3, region: '德玛西亚', class: '狙神', skill: '圣银弩箭', skillDesc: '每三下真实伤害', easyDesc: '🏹 三环真伤！专打肉', items: ['羊刀', '海妖', '巨杀'], tip: '德玛核心C，羊刀必做' },
  '维迦': { cost: 4, region: '约德尔人', class: '法师', skill: '恶魔冲击', skillDesc: '流星砸人，杀人加法强', easyDesc: '⭐ 杀人越多越猛！', items: ['蓝霸符', '法爆', '大帽子'], tip: '解锁要两个帽子' },
  '梅尔': { cost: 5, region: '诺克萨斯', class: '耀光使', skill: '耀光法球', skillDesc: '吸蓝后大范围爆炸', easyDesc: '✨ 诺克法系核心', items: ['蓝霸符', '大帽子', '法爆'], tip: '解锁需2星安蓓萨死亡' },
  '瑟提': { cost: 5, region: '艾欧尼亚', class: '腕豪', skill: '蓄力重拳', skillDesc: '挨打积怒，一拳超高伤害', easyDesc: '👊 挨揍越多打人越疼！', items: ['狂徒', '龙牙', '石像鬼'], tip: '解锁超简单：前排只站1人' },
  '斯维因': { cost: 4, region: '诺克萨斯', class: '法师', skill: '恶魔集群', skillDesc: '变身吸血', easyDesc: '🦅 变身吸血怪！越打越肉', items: ['狂徒', '龙牙', '反甲'], tip: '诺克核心前排' },
  '加里奥': { cost: 5, region: '德玛西亚', class: '守护者', skill: '英雄登场', skillDesc: '从天砸晕一大片', easyDesc: '🗽 从天而降！控制一片', items: ['狂徒', '日炎', '石像鬼'], tip: '解锁需德玛12星级' },
  '孙悟空': { cost: 4, region: '艾欧尼亚', class: '斗士', skill: '大闹天宫', skillDesc: '分身三猴揍人', easyDesc: '🐵 三个猴开打！', items: ['日炎', '狂徒', '石像鬼'], tip: '艾欧主坦' },
  '塞拉斯': { cost: 7, region: '诺克萨斯', class: '法师', skill: '窃法之链', skillDesc: '偷敌人技能强化使用', easyDesc: '⛓️ 7费超模！控制收割一体', items: ['蓝霸符', '法爆', '大帽子'], tip: '解锁：卖2星皇子+盖伦+拉克丝' },
  '纳什男爵': { cost: 7, region: '虚空', class: '虚空', skill: '虚空之怒', skillDesc: '触手酸液大范围攻击', easyDesc: '🐉 LOL大龙！7费战场统治', items: ['狂徒', '龙牙', '石像鬼'], tip: '虚空终极' },
  '岩宝': { cost: 7, region: '以绪塔尔', class: '以绪塔尔', skill: '震地猛击', skillDesc: '大范围伤害+击飞', easyDesc: '🪨 憨厚但超猛！大范围击飞', items: ['狂徒', '石像鬼', '日炎'], tip: '解锁需500太阳碎片' },
  '锤石': { cost: 5, region: '暗影岛', class: '神盾使', skill: '幽冥监牢', skillDesc: '建墙关人吸血', easyDesc: '👻 建墙关人！', items: ['狂徒', '救赎', '石像鬼'], tip: '解锁需150灵魂' },
  '费德提克': { cost: 5, region: '暗影岛', class: '征服者', skill: '群鸦风暴', skillDesc: '传送人堆持续吸血', easyDesc: '🎃 稻草人开大全场颤抖', items: ['蓝霸符', '法爆', '大帽子'], tip: '暗影岛机制超强' },
  '塔姆': { cost: 5, region: '比尔吉沃特', class: '斗士', skill: '吞噬', skillDesc: '一口吞敌消化吐出', easyDesc: '🐸 一口一个！吞人消化', items: ['狂徒', '龙牙', '石像鬼'], tip: '解锁需500银蛇币' },
};

const regionData = [
  { name: '德玛西亚', icon: '🏰', color: '#f0c040', levels: '3/5/7/11', easyDesc: '💪 越打越硬！', tip: '12星解锁加里奥' },
  { name: '诺克萨斯', icon: '⚔️', color: '#c41e3a', levels: '3/5/7/10', easyDesc: '👹 召唤暗裔怪兽！', tip: '赛恩带装备解锁乐芙兰' },
  { name: '艾欧尼亚', icon: '🌸', color: '#ff69b4', levels: '3/5/7', easyDesc: '🛤️ 每局不一样！五条路', tip: '3星亚索解锁永恩' },
  { name: '暗影岛', icon: '💀', color: '#9333ea', levels: '2/3/4/5', easyDesc: '👻 杀人收魂！', tip: '150灵魂解锁锤石' },
  { name: '比尔吉沃特', icon: '🏴‍☠️', color: '#ff8c00', levels: '3/5/7/10', easyDesc: '💰 海盗攒钱！', tip: '500银蛇币解锁塔姆' },
  { name: '约德尔人', icon: '🐹', color: '#a855f7', levels: '2/4/6/8', easyDesc: '🎁 小个子大能量！', tip: '两帽子解锁维迦' },
  { name: '以绪塔尔', icon: '🌿', color: '#22c55e', levels: '3/5/7', easyDesc: '☀️ 做任务拿奖励！', tip: '500碎片解锁岩宝' },
  { name: '祖安', icon: '🧪', color: '#00ff88', levels: '3/5/7', easyDesc: '💉 嗑药变强！', tip: '金克丝蔚2星解锁沃里克' },
];

const compositions = [
  { id: 1, name: '艾欧双枪芸阿娜', tier: 'T0', difficulty: '简单', units: ['芸阿娜', '瑟提', '孙悟空', '亚索', '永恩', '慎', '烬', '千珏'], traits: ['艾欧尼亚', '迅击战士'], coreUnits: ['芸阿娜', '瑟提'], coreItems: { '芸阿娜': ['法爆', '大帽子', '正义之拳'], '孙悟空': ['日炎', '狂徒', '石像鬼'] }, unlockTips: ['瑟提：8级前排只站1人'], tips: ['💡 4费芸阿娜好拿', '💡 瑟提解锁最简单'], easyDesc: '🌸 新手首选！解锁简单' },
  { id: 2, name: '千珏暗影九五', tier: 'T0', difficulty: '中等', units: ['千珏', '塞拉斯', '斯维因', '德莱文', '费德提克', '乐芙兰', '佛耶戈', '卡莉丝塔'], traits: ['暗影岛', '主宰'], coreUnits: ['千珏', '塞拉斯'], coreItems: { '千珏': ['羊刀', '无尽', '海妖'], '斯维因': ['狂徒', '龙牙', '石像鬼'] }, unlockTips: ['塞拉斯：卖2星皇子+盖伦+拉克丝'], tips: ['💡 伤害天花板', '💡 暗影岛收魂超强'], easyDesc: '🐺 伤害天花板！大成无敌' },
  { id: 3, name: '7诺克萨斯', tier: 'T0', difficulty: '简单', units: ['德莱文', '斯维因', '赛恩', '贝蕾亚', '安蓓萨', '乐芙兰', '千珏', '费德提克'], traits: ['7诺克萨斯', '主宰'], coreUnits: ['德莱文', '斯维因'], coreItems: { '德莱文': ['无尽', '饮血', '破甲弓'], '斯维因': ['狂徒', '龙牙', '反甲'] }, unlockTips: ['乐芙兰：赛恩带两件装备'], tips: ['💡 德莱文砍人超爽！', '💡 7诺克召唤厄塔汗'], easyDesc: '🪓 暴力砍王！' },
  { id: 4, name: '7德玛西亚', tier: 'T1', difficulty: '简单', units: ['薇恩', '盖伦', '拉克丝', '嘉文四世', '赵信', '波比', '加里奥', '娑娜'], traits: ['7德玛西亚', '狙神'], coreUnits: ['薇恩', '加里奥'], coreItems: { '薇恩': ['羊刀', '海妖', '巨杀'], '加里奥': ['狂徒', '日炎', '石像鬼'] }, unlockTips: ['加里奥：德玛12星级'], tips: ['💡 开局3德玛就冲', '💡 薇恩真伤打肉'], easyDesc: '🏰 越打越硬！' },
  { id: 5, name: '8约德尔人', tier: 'T1', difficulty: '简单', units: ['璐璐', '兰博', '波比', '提莫', '崔丝塔娜', '可酷伯', '菲兹', '维迦'], traits: ['8约德尔人'], coreUnits: ['维迦', '波比'], coreItems: { '维迦': ['蓝霸符', '法爆', '大帽子'], '波比': ['狂徒', '日炎', '石像鬼'] }, unlockTips: ['维迦：需要两个帽子！'], tips: ['💡 高层送福袋', '💡 维迦叠法强'], easyDesc: '🐹 小个子大能量！' },
  { id: 6, name: '比尔吉沃特', tier: 'T1', difficulty: '中等', units: ['格雷福斯', '崔斯特', '俄洛伊', '普朗克', '诺提勒斯', '菲兹', '厄运小姐', '塔姆'], traits: ['比尔吉沃特', '枪手'], coreUnits: ['格雷福斯', '塔姆'], coreItems: { '格雷福斯': ['羊刀', '无尽', '巨杀'], '塔姆': ['狂徒', '龙牙', '石像鬼'] }, unlockTips: ['塔姆：花费500银蛇币'], tips: ['💡 银蛇币黑市', '💡 10层大炮轰炸！'], easyDesc: '🏴‍☠️ 海盗发财！' },
  { id: 7, name: '赌狗佛耶戈', tier: '赌狗', difficulty: '困难', units: ['佛耶戈', '约里克', '格温', '赛恩', '贝蕾亚', '乐芙兰'], traits: ['暗影岛'], coreUnits: ['佛耶戈'], coreItems: { '佛耶戈': ['羊刀', '无尽', '饮血'] }, unlockTips: ['约里克：佛耶戈带两件装'], tips: ['⚠️ 高风险高收益！', '💡 1费追3星'], easyDesc: '👻 成了吃鸡败了八' },
  { id: 8, name: '赌狗崔斯特', tier: '赌狗', difficulty: '困难', units: ['崔斯特', '格雷福斯', '俄洛伊', '普朗克', '诺提勒斯', '厄运小姐'], traits: ['比尔吉沃特'], coreUnits: ['崔斯特', '格雷福斯'], coreItems: { '崔斯特': ['蓝霸符', '法爆', '大帽子'], '格雷福斯': ['羊刀', '无尽', '饮血'] }, unlockTips: ['格雷福斯：崔斯特带两件装'], tips: ['⚠️ 上限极高下限极低'], easyDesc: '🃏 成了直接起飞' },
];

const unlockGuide = [
  { cost: '7费', name: '塞拉斯', condition: '卖2星皇子+盖伦+拉克丝', priority: '⭐⭐⭐', tip: '法系核心！' },
  { cost: '7费', name: '纳什男爵', condition: '虚空羁绊一定层级', priority: '⭐⭐⭐', tip: '虚空终极' },
  { cost: '7费', name: '岩宝', condition: '收集500太阳碎片', priority: '⭐⭐', tip: '以绪塔尔终极' },
  { cost: '5费', name: '瑟提', condition: '8级前两排只站1个', priority: '⭐⭐⭐', tip: '最简单！' },
  { cost: '5费', name: '加里奥', condition: '德玛弈子12星级', priority: '⭐⭐⭐', tip: '德玛终极' },
  { cost: '5费', name: '锤石', condition: '收集150灵魂', priority: '⭐⭐', tip: '暗影岛体系' },
  { cost: '5费', name: '塔姆', condition: '花费500银蛇币', priority: '⭐⭐', tip: '比尔终极' },
  { cost: '5费', name: '梅尔', condition: '2星安蓓萨阵亡', priority: '⭐⭐', tip: '诺克法系' },
  { cost: '4费', name: '维迦', condition: '弈子带两个帽子', priority: '⭐⭐⭐', tip: '约德尔核心！' },
  { cost: '4费', name: '永恩', condition: '3星亚索', priority: '⭐⭐', tip: '艾欧体系' },
  { cost: '3费', name: '乐芙兰', condition: '赛恩带两件装备', priority: '⭐⭐⭐', tip: '诺克必解！' },
  { cost: '2费', name: '波比', condition: '德玛/约德尔带两件装', priority: '⭐⭐', tip: '万金油前排' },
  { cost: '2费', name: '格雷福斯', condition: '崔斯特带两件装备', priority: '⭐⭐', tip: '比尔核心' },
];

const operationGuides = [
  { stage: '2-1', title: '升4人口', tips: ['标准', '收集棋子'], color: '#22c55e' },
  { stage: '2-5', title: '升5人口', tips: ['稳血', '保连胜/败'], color: '#22c55e' },
  { stage: '3-2', title: '升6人口', tips: ['关键！', '合装备'], color: '#3b82f6', highlight: true },
  { stage: '3-5', title: '升7人口', tips: ['补羁绊', '注意解锁'], color: '#3b82f6' },
  { stage: '4-2', title: '升8大搜', tips: ['最关键！', 'C位2星'], color: '#ef4444', highlight: true },
  { stage: '拉9', title: '解锁7费', tips: ['血健康才拉'], color: '#ffd700' },
];

// ==================== 主组件 ====================
export default function TFTHelper() {
  const [activeTab, setActiveTab] = useState('comps');
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [itemFilter, setItemFilter] = useState('all');

  const findCombinedItem = () => {
    if (!selectedItem1 || !selectedItem2) return null;
    return combinedItems.find(item =>
      (item.base1 === selectedItem1 && item.base2 === selectedItem2) ||
      (item.base1 === selectedItem2 && item.base2 === selectedItem1)
    );
  };

  const combinedResult = findCombinedItem();
  const filteredItems = itemFilter === 'all' ? combinedItems : combinedItems.filter(item => item.category === itemFilter);

  const tabs = [
    { id: 'comps', label: '阵容', icon: '📋', color: '#fbbf24' },
    { id: 'items', label: '装备', icon: '⚔️', color: '#ec4899' },
    { id: 'heroes', label: '英雄', icon: '🦸', color: '#06b6d4' },
    { id: 'unlock', label: '解锁', icon: '🔓', color: '#a855f7' },
    { id: 'guide', label: '运营', icon: '📖', color: '#22c55e' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.18) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 100%, rgba(236,72,153,0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 60%, rgba(6,182,212,0.1) 0%, transparent 60%),
        linear-gradient(180deg, #09090b 0%, #0c0a1d 50%, #09090b 100%)
      `,
      color: '#e4e4e7',
      fontFamily: '"SF Pro Display", "PingFang SC", system-ui, sans-serif',
      padding: '16px',
      paddingBottom: '50px',
    }}>
      {/* 标题 */}
      <header style={{
        textAlign: 'center',
        marginBottom: '28px',
        padding: '32px 20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)',
        }} />
        <div style={{
          fontSize: '0.65rem',
          color: '#71717a',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          marginBottom: '14px',
          fontWeight: '500',
        }}>
          S16赛季 · 英雄联盟传奇
        </div>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: '800',
          margin: 0,
          letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 25%, #ec4899 50%, #a855f7 75%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 80px rgba(251,191,36,0.4)',
        }}>
          新手速成助手
        </h1>
        <p style={{
          color: '#52525b',
          fontSize: '0.75rem',
          marginTop: '12px',
          letterSpacing: '3px',
        }}>
          阵容 · 装备 · 英雄 · 解锁 · 运营
        </p>
      </header>

      {/* 导航 */}
      <nav style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '28px',
        padding: '10px',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedComp(null); setSelectedHero(null); }}
            style={{
              flex: 1,
              padding: '16px 6px',
              fontSize: '0.7rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '18px',
              background: activeTab === tab.id ? `linear-gradient(135deg, ${tab.color}25, ${tab.color}08)` : 'transparent',
              color: activeTab === tab.id ? tab.color : '#52525b',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              ...(activeTab === tab.id && {
                boxShadow: `0 0 30px ${tab.color}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
                border: `1px solid ${tab.color}50`,
              }),
            }}
          >
            <span style={{ fontSize: '1.4rem', filter: activeTab === tab.id ? 'none' : 'grayscale(0.6) opacity(0.7)' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ==================== 阵容Tab ==================== */}
      {activeTab === 'comps' && !selectedComp && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* 快速选择 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(249,115,22,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '28px',
            border: '1px solid rgba(251,191,36,0.2)',
            boxShadow: '0 0 50px rgba(251,191,36,0.1)',
          }}>
            <div style={{
              fontWeight: '700',
              marginBottom: '18px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <span style={{
                background: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                开局看装备选阵容
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: '🏹', label: '大剑+弓多', value: '千珏/德玛VN' },
                { icon: '🪄', label: '大棒+眼泪', value: '芸阿娜/约德尔' },
                { icon: '🏰', label: '开局3德玛', value: '7德玛西亚' },
                { icon: '🏴‍☠️', label: '开局3比尔', value: '比尔吉沃特' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ color: '#71717a', fontSize: '0.65rem', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ color: '#fafafa', fontWeight: '600', fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* T0 */}
          <TierSection
            title="T0 稳定吃鸡"
            icon="⭐"
            gradient="linear-gradient(135deg, #fbbf24, #f97316)"
            glowColor="rgba(251,191,36,0.35)"
            comps={compositions.filter(c => c.tier === 'T0')}
            onSelect={setSelectedComp}
          />

          {/* T1 */}
          <TierSection
            title="T1 稳定前四"
            icon="💎"
            gradient="linear-gradient(135deg, #3b82f6, #1d4ed8)"
            glowColor="rgba(59,130,246,0.35)"
            comps={compositions.filter(c => c.tier === 'T1')}
            onSelect={setSelectedComp}
          />

          {/* 赌狗 */}
          <TierSection
            title="赌狗阵容"
            icon="🎲"
            subtitle="高风险高收益"
            gradient="linear-gradient(135deg, #ef4444, #dc2626)"
            glowColor="rgba(239,68,68,0.35)"
            comps={compositions.filter(c => c.tier === '赌狗')}
            onSelect={setSelectedComp}
          />
        </div>
      )}

      {/* 阵容详情 */}
      {activeTab === 'comps' && selectedComp && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <BackButton onClick={() => setSelectedComp(null)} />
          <CompDetail comp={selectedComp} heroData={heroData} combinedItems={combinedItems} />
        </div>
      )}

      {/* ==================== 装备Tab ==================== */}
      {activeTab === 'items' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* 合成器 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            padding: '28px',
            marginBottom: '28px',
            border: '1px solid rgba(236,72,153,0.25)',
            boxShadow: '0 0 50px rgba(236,72,153,0.12)',
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '24px',
              fontSize: '1.1rem',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #ec4899, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🔧 点两个散件看合成
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '28px',
            }}>
              {baseItems.map(item => {
                const isSelected = selectedItem1 === item.id || selectedItem2 === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (selectedItem1 === item.id) setSelectedItem1(null);
                      else if (selectedItem2 === item.id) setSelectedItem2(null);
                      else if (!selectedItem1) setSelectedItem1(item.id);
                      else if (!selectedItem2) setSelectedItem2(item.id);
                      else { setSelectedItem1(item.id); setSelectedItem2(null); }
                    }}
                    style={{
                      padding: '18px 8px',
                      border: 'none',
                      borderRadius: '18px',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(251,191,36,0.1))'
                        : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.25s ease',
                      ...(isSelected && {
                        boxShadow: '0 0 30px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                        border: '1.5px solid rgba(251,191,36,0.6)',
                      }),
                      ...(!isSelected && {
                        border: '1px solid rgba(255,255,255,0.06)',
                      }),
                    }}
                  >
                    <span style={{ fontSize: '2rem', filter: isSelected ? 'drop-shadow(0 0 12px rgba(251,191,36,0.6))' : 'none' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.6rem', color: isSelected ? '#fbbf24' : '#52525b' }}>{item.name.slice(0, 2)}</span>
                  </button>
                );
              })}
            </div>

            {/* 公式 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              padding: '28px',
              background: 'rgba(0,0,0,0.45)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <ItemSlot item={baseItems.find(i => i.id === selectedItem1)} />
              <span style={{ fontSize: '2rem', color: '#3f3f46', fontWeight: '300' }}>+</span>
              <ItemSlot item={baseItems.find(i => i.id === selectedItem2)} />
              <span style={{ fontSize: '2rem', color: '#3f3f46', fontWeight: '300' }}>=</span>
              <ResultSlot result={combinedResult} />
            </div>

            {combinedResult && (
              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(249,115,22,0.08))',
                borderRadius: '18px',
                border: '1px solid rgba(251,191,36,0.25)',
              }}>
                <p style={{
                  margin: '0 0 8px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #fbbf24, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {combinedResult.name}
                </p>
                <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>{combinedResult.easyDesc}</p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => { setSelectedItem1(null); setSelectedItem2(null); }}
                style={{
                  padding: '12px 32px',
                  border: '1px solid #3f3f46',
                  borderRadius: '28px',
                  background: 'transparent',
                  color: '#71717a',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                }}
              >
                🔄 重置
              </button>
            </div>
          </div>

          {/* 筛选 */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            padding: '8px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { id: 'all', label: '全部', color: '#71717a' },
              { id: 'physical', label: '⚔️物理', color: '#ef4444' },
              { id: 'magic', label: '🪄法系', color: '#a855f7' },
              { id: 'tank', label: '🛡️坦克', color: '#22c55e' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setItemFilter(cat.id)}
                style={{
                  flex: 1,
                  padding: '14px 8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '12px',
                  background: itemFilter === cat.id ? `${cat.color}20` : 'transparent',
                  color: itemFilter === cat.id ? cat.color : '#52525b',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...(itemFilter === cat.id && { boxShadow: `0 0 20px ${cat.color}25` }),
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 列表 */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            {filteredItems.map((item, i) => (
              <div key={i} style={{
                padding: '20px',
                borderBottom: i < filteredItems.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: item.category === 'physical' ? 'rgba(239,68,68,0.15)' :
                             item.category === 'magic' ? 'rgba(168,85,247,0.15)' : 'rgba(34,197,94,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  border: `1px solid ${item.category === 'physical' ? 'rgba(239,68,68,0.3)' :
                          item.category === 'magic' ? 'rgba(168,85,247,0.3)' : 'rgba(34,197,94,0.3)'}`,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#fafafa', fontWeight: '700', fontSize: '1rem' }}>{item.name}</span>
                    <span style={{
                      fontSize: '0.6rem',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.06)',
                      color: '#71717a',
                    }}>
                      {baseItems.find(b => b.id === item.base1)?.icon}+{baseItems.find(b => b.id === item.base2)?.icon}
                    </span>
                  </div>
                  <div style={{ color: '#52525b', fontSize: '0.75rem', marginBottom: '6px' }}>{item.desc}</div>
                  <div style={{
                    color: item.category === 'physical' ? '#fca5a5' :
                           item.category === 'magic' ? '#c4b5fd' : '#86efac',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}>
                    {item.easyDesc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 英雄Tab ==================== */}
      {activeTab === 'heroes' && !selectedHero && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            background: 'rgba(6,182,212,0.1)',
            borderRadius: '20px',
            padding: '16px 20px',
            marginBottom: '24px',
            border: '1px solid rgba(6,182,212,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <span style={{ fontSize: '1.4rem' }}>💡</span>
            <span style={{ fontSize: '0.9rem', color: '#67e8f9' }}>点击英雄查看技能详解和推荐装备</span>
          </div>

          {[7, 5, 4, 3].map(cost => {
            const heroes = Object.entries(heroData).filter(([_, h]) => h.cost === cost);
            if (heroes.length === 0) return null;
            const cfg = {
              7: { gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', text: '#fff', glow: 'rgba(239,68,68,0.45)', label: '🌟 7费传奇', accent: '#ef4444' },
              5: { gradient: 'linear-gradient(135deg, #fbbf24, #f97316)', text: '#000', glow: 'rgba(251,191,36,0.45)', label: '⭐ 5费', accent: '#fbbf24' },
              4: { gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)', text: '#fff', glow: 'rgba(168,85,247,0.45)', label: '💎 4费', accent: '#a855f7' },
              3: { gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', text: '#fff', glow: 'rgba(59,130,246,0.45)', label: '🔵 3费', accent: '#3b82f6' },
            }[cost];
            return (
              <div key={cost} style={{ marginBottom: '24px' }}>
                <div style={{
                  background: cfg.gradient,
                  padding: '14px 20px',
                  borderRadius: '20px 20px 0 0',
                  fontWeight: '700',
                  color: cfg.text,
                  fontSize: '1rem',
                  boxShadow: `0 6px 25px ${cfg.glow}`,
                }}>
                  {cfg.label}
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '0 0 20px 20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: 'none',
                }}>
                  {heroes.map(([name, hero]) => (
                    <button
                      key={name}
                      onClick={() => setSelectedHero({ name, ...hero })}
                      style={{
                        padding: '18px 12px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', color: cfg.accent, fontWeight: '700' }}>{name}</span>
                      <span style={{ fontSize: '0.6rem', color: '#52525b' }}>{hero.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 英雄详情 */}
      {activeTab === 'heroes' && selectedHero && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <BackButton onClick={() => setSelectedHero(null)} />
          <HeroDetail hero={selectedHero} combinedItems={combinedItems} />
        </div>
      )}

      {/* ==================== 解锁Tab ==================== */}
      {activeTab === 'unlock' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 100%)',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '28px',
            border: '1px solid rgba(168,85,247,0.25)',
            boxShadow: '0 0 50px rgba(168,85,247,0.12)',
          }}>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.9, color: '#c4b5fd' }}>
              🔓 S16核心机制：<strong style={{ color: '#fbbf24' }}>40名弈子</strong>需要完成任务才能解锁！<br/>
              解锁后下次刷新<strong style={{ color: '#22c55e' }}>必出</strong>在商店最右边
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            marginBottom: '28px',
          }}>
            {unlockGuide.map((item, i) => {
              const c = { '7费': '#ef4444', '5费': '#fbbf24', '4费': '#a855f7', '3费': '#3b82f6', '2费': '#22c55e' }[item.cost] || '#3b82f6';
              return (
                <div key={i} style={{
                  padding: '20px',
                  borderBottom: i < unlockGuide.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ color: '#fafafa', fontWeight: '700', fontSize: '1.1rem' }}>{item.name}</span>
                      <span style={{
                        padding: '5px 14px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        background: `${c}20`,
                        border: `1px solid ${c}50`,
                        color: c,
                      }}>
                        {item.cost}
                      </span>
                    </div>
                    <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{item.priority}</span>
                  </div>
                  <div style={{
                    color: '#a1a1aa',
                    fontSize: '0.9rem',
                    marginBottom: '10px',
                    padding: '14px 18px',
                    background: 'rgba(0,0,0,0.35)',
                    borderRadius: '14px',
                    borderLeft: '4px solid #52525b',
                  }}>
                    📋 {item.condition}
                  </div>
                  <div style={{ color: '#86efac', fontSize: '0.85rem' }}>💡 {item.tip}</div>
                </div>
              );
            })}
          </div>

          <h3 style={{
            marginBottom: '20px',
            fontSize: '1.1rem',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #a855f7, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            🏰 城邦羁绊速查
          </h3>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            {regionData.map((region, i) => (
              <div key={i} style={{
                padding: '20px',
                borderBottom: i < regionData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: `${region.color}18`,
                  border: `1px solid ${region.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.7rem',
                  flexShrink: 0,
                }}>
                  {region.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: region.color, fontWeight: '700', fontSize: '1rem', marginBottom: '6px' }}>
                    {region.name}
                    <span style={{ color: '#52525b', fontWeight: '400', fontSize: '0.7rem', marginLeft: '10px' }}>({region.levels})</span>
                  </div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '6px' }}>{region.easyDesc}</div>
                  <div style={{ color: '#86efac', fontSize: '0.8rem' }}>💡 {region.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 运营Tab ==================== */}
      {activeTab === 'guide' && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          {/* 节奏 */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            padding: '28px',
            marginBottom: '28px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h3 style={{
              marginBottom: '28px',
              fontSize: '1.2rem',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              📈 标准运营节奏
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {operationGuides.map((guide, i) => (
                <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: `${guide.color}20`,
                    border: `1px solid ${guide.color}50`,
                    color: guide.color,
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    minWidth: '56px',
                    textAlign: 'center',
                    boxShadow: guide.highlight ? `0 0 25px ${guide.color}35` : 'none',
                  }}>
                    {guide.stage}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fafafa', fontWeight: '700', fontSize: '1rem', marginBottom: '10px' }}>
                      {guide.title} {guide.highlight && '⭐'}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {guide.tips.map((tip, j) => (
                        <span key={j} style={{
                          padding: '8px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '10px',
                          color: '#a1a1aa',
                          fontSize: '0.8rem',
                        }}>
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 经济 */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            padding: '28px',
            marginBottom: '28px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h3 style={{
              marginBottom: '24px',
              fontSize: '1.2rem',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              💰 经济管理
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { label: '每10金', value: '+1利息', color: '#fbbf24' },
                { label: '保持50金', value: '每回合+5', color: '#22c55e' },
                { label: '血量<40', value: '才破产搜', color: '#ef4444' },
                { label: '连胜/连败', value: '额外金币', color: '#3b82f6' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: '18px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: '#71717a', fontSize: '0.8rem', marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ color: item.color, fontSize: '1.1rem', fontWeight: '700' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 错误 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)',
            borderRadius: '28px',
            padding: '28px',
            marginBottom: '28px',
            border: '1px solid rgba(239,68,68,0.25)',
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '700', color: '#ef4444' }}>
              ❌ 新手常见错误
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#fca5a5', lineHeight: 2.2 }}>
              {['疯狂搜卡不存钱 → 没利息永远穷', '装备乱合 → 先定阵容再合', '忘记解锁条件 → 英雄出不来', '前期追三星 → 应该先上人口', '不看道路 → 艾欧尼亚每局不一样'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#ef4444' }}>✗</span><span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 口诀 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(236,72,153,0.06) 50%, rgba(139,92,246,0.1) 100%)',
            borderRadius: '28px',
            padding: '32px',
            textAlign: 'center',
            border: '1px solid rgba(251,191,36,0.2)',
          }}>
            <h3 style={{
              marginBottom: '24px',
              fontSize: '1.3rem',
              fontWeight: '700',
              background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              🎯 上分口诀
            </h3>
            <div style={{ fontSize: '1.15rem', color: '#e4e4e7', lineHeight: 2.6, fontWeight: '500' }}>
              开局看牌定方向<br/>
              50金利息是王道<br/>
              3-2升6要记牢<br/>
              4-2拉8把卡找<br/>
              解锁条件别忘掉
            </div>
          </div>
        </div>
      )}

      {/* 底部 */}
      <footer style={{
        marginTop: '48px',
        textAlign: 'center',
        padding: '24px',
        color: '#3f3f46',
        fontSize: '0.65rem',
      }}>
        <p style={{ marginBottom: '6px' }}>⚠️ 仅供攻略参考，不与游戏交互，完全合法安全</p>
        <p>数据来源于网络攻略，版本更新后请以游戏内为准</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:active { transform: scale(0.96); }
      `}</style>
    </div>
  );
}

// ==================== 子组件 ====================
function ItemSlot({ item }) {
  return (
    <div style={{
      width: '64px',
      height: '64px',
      borderRadius: '18px',
      background: item ? 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.08))' : 'rgba(255,255,255,0.02)',
      border: item ? '2px solid rgba(251,191,36,0.5)' : '2px dashed rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.2rem',
      boxShadow: item ? '0 0 30px rgba(251,191,36,0.25)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      {item ? item.icon : <span style={{ color: '#3f3f46', fontSize: '1.8rem' }}>?</span>}
    </div>
  );
}

function ResultSlot({ result }) {
  return (
    <div style={{
      minWidth: '110px',
      height: '64px',
      borderRadius: '18px',
      background: result ? 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(236,72,153,0.2))' : 'rgba(255,255,255,0.02)',
      border: result ? '2px solid rgba(251,191,36,0.6)' : '2px dashed rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      padding: '10px',
      boxShadow: result ? '0 0 35px rgba(251,191,36,0.3)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      {result ? (
        <>
          <span style={{ fontSize: '1.8rem' }}>{result.icon}</span>
          <span style={{ fontSize: '0.6rem', color: '#fbbf24', fontWeight: '600' }}>{result.name}</span>
        </>
      ) : (
        <span style={{ fontSize: '1.8rem', color: '#3f3f46' }}>?</span>
      )}
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(6,182,212,0.12)',
      border: '1px solid rgba(6,182,212,0.3)',
      color: '#22d3ee',
      cursor: 'pointer',
      marginBottom: '24px',
      fontSize: '0.9rem',
      padding: '12px 24px',
      borderRadius: '28px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      ← 返回列表
    </button>
  );
}

function TierSection({ title, icon, gradient, glowColor, comps, onSelect, subtitle }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        background: gradient,
        padding: '16px 22px',
        borderRadius: '22px 22px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: `0 6px 30px ${glowColor}`,
      }}>
        <div style={{
          fontWeight: '700',
          color: title.includes('T0') ? '#000' : '#fff',
          fontSize: '1.05rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '1.3rem' }}>{icon}</span>
          {title}
        </div>
        {subtitle && (
          <span style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.25)',
            padding: '6px 14px',
            borderRadius: '14px',
          }}>
            {subtitle}
          </span>
        )}
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        borderRadius: '0 0 22px 22px',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: 'none',
      }}>
        {comps.map((comp, i) => (
          <div
            key={comp.id}
            onClick={() => onSelect(comp)}
            style={{
              padding: '22px',
              borderBottom: i < comps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#fafafa' }}>{comp.name}</span>
              <span style={{
                padding: '6px 16px',
                borderRadius: '14px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: comp.difficulty === '简单' ? 'rgba(34,197,94,0.15)' :
                           comp.difficulty === '中等' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
                color: comp.difficulty === '简单' ? '#22c55e' :
                       comp.difficulty === '中等' ? '#fbbf24' : '#ef4444',
                border: `1px solid ${comp.difficulty === '简单' ? 'rgba(34,197,94,0.3)' :
                        comp.difficulty === '中等' ? 'rgba(251,191,36,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}>
                {comp.difficulty}
              </span>
            </div>
            <p style={{ color: '#71717a', fontSize: '0.9rem', margin: '0 0 16px' }}>{comp.easyDesc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {comp.coreUnits.map((unit, i) => (
                <span key={i} style={{
                  padding: '8px 16px',
                  borderRadius: '14px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(236,72,153,0.06))',
                  border: '1px solid rgba(236,72,153,0.4)',
                  color: '#f9a8d4',
                }}>
                  ⭐ {unit}
                </span>
              ))}
              {comp.units.filter(u => !comp.coreUnits.includes(u)).slice(0, 2).map((unit, i) => (
                <span key={i} style={{
                  padding: '8px 16px',
                  borderRadius: '14px',
                  fontSize: '0.85rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#71717a',
                }}>
                  {unit}
                </span>
              ))}
              {comp.units.length > comp.coreUnits.length + 2 && (
                <span style={{ color: '#52525b', fontSize: '0.8rem', padding: '8px 0' }}>
                  +{comp.units.length - comp.coreUnits.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompDetail({ comp, heroData, combinedItems }) {
  const card = {
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
  };

  return (
    <div>
      <div style={{ ...card, padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fafafa', fontWeight: '700' }}>{comp.name}</h2>
          <span style={{
            padding: '10px 22px',
            borderRadius: '18px',
            fontSize: '0.9rem',
            fontWeight: '700',
            background: comp.tier === 'T0' ? 'linear-gradient(135deg, #fbbf24, #f97316)' :
                       comp.tier === 'T1' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' :
                       'linear-gradient(135deg, #ef4444, #dc2626)',
            color: comp.tier === 'T0' ? '#000' : '#fff',
            boxShadow: comp.tier === 'T0' ? '0 0 30px rgba(251,191,36,0.45)' :
                       comp.tier === 'T1' ? '0 0 30px rgba(59,130,246,0.45)' : '0 0 30px rgba(239,68,68,0.45)',
          }}>
            {comp.tier}
          </span>
        </div>
        <p style={{ color: '#a1a1aa', fontSize: '1rem', margin: '0 0 20px' }}>{comp.easyDesc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {comp.traits.map((trait, i) => (
            <span key={i} style={{
              padding: '8px 16px',
              borderRadius: '14px',
              fontSize: '0.8rem',
              fontWeight: '600',
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              color: '#c4b5fd',
            }}>
              {trait}
            </span>
          ))}
        </div>
      </div>

      <div style={{ ...card, padding: '28px', marginBottom: '24px' }}>
        <h4 style={{ color: '#fbbf24', margin: '0 0 24px', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>💎</span> 核心装备
        </h4>
        {Object.entries(comp.coreItems).map(([unit, items]) => (
          <div key={unit} style={{ marginBottom: '20px', padding: '18px', background: 'rgba(0,0,0,0.35)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <span style={{ color: '#f9a8d4', fontWeight: '700', fontSize: '1.05rem' }}>{unit}</span>
              {heroData[unit] && <span style={{ color: '#52525b', fontSize: '0.8rem' }}>{heroData[unit].easyDesc?.slice(0, 18)}...</span>}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {items.map((item, i) => {
                const itemData = combinedItems.find(ci => ci.name.includes(item) || item.includes(ci.name.slice(0, 2)));
                return (
                  <span key={i} style={{
                    padding: '12px 18px',
                    borderRadius: '14px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e4e4e7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    {itemData?.icon || '⚙️'} {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {comp.unlockTips?.length > 0 && (
        <div style={{ ...card, padding: '28px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.03) 100%)', border: '1px solid rgba(6,182,212,0.2)' }}>
          <h4 style={{ color: '#22d3ee', margin: '0 0 16px', fontSize: '1.1rem', fontWeight: '700' }}>🔓 解锁条件</h4>
          {comp.unlockTips.map((tip, i) => (
            <div key={i} style={{ color: '#67e8f9', fontSize: '0.95rem', marginBottom: '12px', padding: '14px 18px', background: 'rgba(0,0,0,0.35)', borderRadius: '14px', borderLeft: '4px solid #22d3ee' }}>
              • {tip}
            </div>
          ))}
        </div>
      )}

      <div style={{ ...card, padding: '28px' }}>
        <h4 style={{ color: '#22c55e', margin: '0 0 16px', fontSize: '1.1rem', fontWeight: '700' }}>📝 运营要点</h4>
        {comp.tips.map((tip, i) => (
          <div key={i} style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '12px', paddingLeft: '14px' }}>{tip}</div>
        ))}
      </div>
    </div>
  );
}

function HeroDetail({ hero, combinedItems }) {
  const card = {
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
  };
  const c = { 7: '#ef4444', 5: '#fbbf24', 4: '#a855f7', 3: '#3b82f6' }[hero.cost] || '#3b82f6';

  return (
    <div style={{ ...card, padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#fafafa', fontWeight: '700' }}>{hero.name}</h2>
        <span style={{
          padding: '10px 22px',
          borderRadius: '16px',
          fontSize: '1rem',
          fontWeight: '700',
          background: c,
          color: hero.cost === 5 ? '#000' : '#fff',
          boxShadow: `0 0 30px ${c}60`,
        }}>
          {hero.cost}费
        </span>
      </div>
      <div style={{ color: '#71717a', fontSize: '0.9rem', marginBottom: '28px' }}>{hero.region} · {hero.class}</div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.03) 100%)',
        borderRadius: '20px',
        padding: '26px',
        marginBottom: '28px',
        border: '1px solid rgba(251,191,36,0.2)',
      }}>
        <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '1.15rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>⚡</span> {hero.skill}
        </div>
        <div style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '16px' }}>{hero.skillDesc}</div>
        <div style={{
          color: '#fafafa',
          fontSize: '1.1rem',
          fontWeight: '600',
          padding: '18px',
          background: 'rgba(0,0,0,0.45)',
          borderRadius: '14px',
          borderLeft: '4px solid #fbbf24',
        }}>
          {hero.easyDesc}
        </div>
      </div>

      {hero.items && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{ color: '#ec4899', fontWeight: '700', fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>💎</span> 推荐装备
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {hero.items.map((item, i) => {
              const itemData = combinedItems.find(ci => ci.name.includes(item) || item.includes(ci.name.slice(0, 2)));
              return (
                <span key={i} style={{
                  padding: '14px 20px',
                  borderRadius: '16px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))',
                  border: '1px solid rgba(236,72,153,0.3)',
                  color: '#f9a8d4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  {itemData?.icon || '⚙️'} {item}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {hero.tip && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.03) 100%)',
          borderRadius: '16px',
          padding: '18px 22px',
          border: '1px solid rgba(34,197,94,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          <span style={{ color: '#86efac', fontSize: '1rem' }}>{hero.tip}</span>
        </div>
      )}
    </div>
  );
}
