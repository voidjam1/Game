import { DialogueNode, Character } from '../types/game';

// ==========================================
// 角色定义
// ==========================================
export const characters: Record<string, Character> = {
  narrator: {
    id: 'narrator',
    name: '', // 旁白没有名字
    sprite: '',
  },
  wanhui: {
    id: 'wanhui',
    name: '万辉', // 主角
    sprite: '/assets/wanhui_cat.png', // 假设你把那张猫图放在了这里
  },
  shadow: {
    id: 'shadow',
    name: '电梯中凝结的黑暗',
    sprite: '', // 黑暗可能没有具体立绘，或者是一团黑雾图
  },
  unknown: {
    id: 'unknown',
    name: '？？？',
    sprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 暂用一个神秘剪影代替
  },
};

// ==========================================
// 故事节点
// ==========================================
export const storyNodes: Record<string, DialogueNode> = {
  // ========== 序章：苏醒 ==========
  start: {
    id: 'start',
    type: 'scene',
    // 黑色背景
    background: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200', 
    text: '…\n………\n滴答，滴答。\n远处不断传来水滴下形成的声音。',
    next: 'wake_up_1',
  },

  wake_up_1: {
    id: 'wake_up_1',
    type: 'dialogue',
    character: 'narrator',
    text: '我渐渐找回了自己的意识。\n该醒过来了。',
    next: 'wake_up_2',
  },

  wake_up_2: {
    id: 'wake_up_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    // 【头像1】 - 这里的 sprite 可以换成具体的表情差分图，例如 /assets/wanhui_1.png
    characterSprite: '/assets/wanhui_cat.png', 
    next: 'room_desc',
  },

  room_desc: {
    id: 'room_desc',
    type: 'scene',
    // 昏暗的房间背景
    background: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200',
    character: 'narrator',
    text: '我睁开眼睛。\n这是一个谈得上昏暗但不失整洁的房间。\n四周空荡荡的，说不上是金属还是混凝土的材质映着你孤零零的身影。\n不远处有一扇金属大门。',
    next: 'room_reaction',
  },

  room_reaction: {
    id: 'room_reaction',
    type: 'dialogue',
    character: 'wanhui',
    text: '这里是…？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像2】
    next: 'room_think',
  },

  room_think: {
    id: 'room_think',
    type: 'dialogue',
    character: 'narrator',
    text: '我眨了眨眼。',
    next: 'room_confused',
  },

  room_confused: {
    id: 'room_confused',
    type: 'dialogue',
    character: 'wanhui',
    text: '我怎么会在这里？\n我记得我明明在路上…',
    characterSprite: '/assets/wanhui_cat.png', // 【头像5】
    next: 'water_sound',
  },

  water_sound: {
    id: 'water_sound',
    type: 'dialogue',
    character: 'narrator',
    text: '滴水声还在继续。我下意识寻找声音的源头。',
    next: 'water_react',
  },

  water_react: {
    id: 'water_react',
    type: 'dialogue',
    character: 'wanhui',
    text: '…欸？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像1】
    next: 'empty_room',
  },

  empty_room: {
    id: 'empty_room',
    type: 'dialogue',
    character: 'narrator',
    text: '…这个房间除了门什么都没有。',
    next: 'leak_complain',
  },

  leak_complain: {
    id: 'leak_complain',
    type: 'dialogue',
    character: 'wanhui',
    text: '也许是隔音太差了…\n…\n看着这么新，漏水也太厉害了吧？！',
    characterSprite: '/assets/wanhui_cat.png', // 【头像11】
    next: 'kidnap_thought',
  },

  kidnap_thought: {
    id: 'kidnap_thought',
    type: 'dialogue',
    character: 'narrator',
    text: '停止胡思乱想，我开始思考自己为什么会来到这里。\n被绑架了？自己平时并没有惹上什么麻烦…\n…需要报警吗？',
    next: 'phone_find',
  },

  phone_find: {
    id: 'phone_find',
    type: 'dialogue',
    character: 'narrator',
    text: '…啊！\n这么一说，手机就在我身上。',
    next: 'phone_check',
  },

  phone_check: {
    id: 'phone_check',
    type: 'dialogue',
    character: 'wanhui',
    text: '（掏掏）\n……\n…完全没信号。',
    characterSprite: '/assets/wanhui_cat.png', // 【头像13】 -> 【头像5】
    next: 'phone_fail',
  },

  phone_fail: {
    id: 'phone_fail',
    type: 'dialogue',
    character: 'narrator',
    text: '我沮丧地收起手机。\n也许会有人注意到自己的失踪？\n到底为什么要盯上我呢…真是倒霉啊…',
    next: 'investigate_start',
  },

  investigate_start: {
    id: 'investigate_start',
    type: 'dialogue',
    character: 'wanhui',
    text: '一直这样等着也不是什么好主意…调查一下周围吧。',
    characterSprite: '/assets/wanhui_cat.png', // 【头像11】
    next: 'investigate_menu',
  },

  // ========== 调查循环 ==========
  investigate_menu: {
    id: 'investigate_menu',
    type: 'choice',
    text: '调查一下周围吧。',
    choices: [
      { text: '【墙壁】', next: 'look_wall' },
      { text: '【墙角】', next: 'look_corner' },
      { text: '【可疑的大门】', next: 'look_door' },
    ],
  },

  look_wall: {
    id: 'look_wall',
    type: 'dialogue',
    character: 'narrator',
    text: '盯着墙壁上的倒影看了好一会。',
    next: 'look_wall_2',
  },
  look_wall_2: {
    id: 'look_wall_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '好厉害…像镜子一样。',
    characterSprite: '/assets/wanhui_cat.png', // 【头像1】
    next: 'look_wall_3',
  },
  look_wall_3: {
    id: 'look_wall_3',
    type: 'dialogue',
    character: 'narrator',
    text: '你笑了笑。',
    next: 'investigate_menu',
  },

  look_corner: {
    id: 'look_corner',
    type: 'dialogue',
    character: 'wanhui',
    text: '嗯…应该没有机关。\n会有才怪了吧…',
    characterSprite: '/assets/wanhui_cat.png', // 【头像1】->【头像11】
    next: 'investigate_menu',
  },

  look_door: {
    id: 'look_door',
    type: 'dialogue',
    character: 'wanhui',
    text: '这个…完全没看到机关呢。\n可恶…明明是唯一的线索…\n嗯…？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像2】
    next: 'door_event',
  },

  // ========== 电梯开启 ==========
  door_event: {
    id: 'door_event',
    type: 'dialogue',
    character: 'narrator',
    text: '大门轻微颤了颤，像是要打开。',
    next: 'door_react',
  },
  door_react: {
    id: 'door_react',
    type: 'dialogue',
    character: 'wanhui',
    text: '！？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像4】
    next: 'door_open_scene',
  },
  door_open_scene: {
    id: 'door_open_scene',
    type: 'scene',
    // 电梯打开的背景
    background: 'https://images.unsplash.com/photo-1631530940388-cc5519a4dd58?w=1200', 
    character: 'narrator',
    text: '我后退了两步。\n一阵尖锐的声音响起，两扇铁片缓缓向两边滑动。\n原来是电梯啊。\n门完全打开了。',
    next: 'elevator_darkness',
  },

  elevator_darkness: {
    id: 'elevator_darkness',
    type: 'dialogue',
    character: 'narrator',
    text: '里面漆黑一片。\n不知为何，我的脚像是被胶水紧紧粘在了地板上；我想要鼓起勇气发出声音，但某种本能完全压制了我的自主行动。\n黑暗里传来的气息让我动弹不得。',
    next: 'elevator_think',
  },

  elevator_think: {
    id: 'elevator_think',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    characterSprite: '/assets/wanhui_cat.png', // 【头像3】
    next: 'action_choice',
  },

  // ========== 核心分支选择 ==========
  action_choice: {
    id: 'action_choice',
    type: 'choice',
    text: '我现在该干什么…？',
    choices: [
      { text: '停下观察', next: 'action_observe' },
      { text: '找话题', next: 'action_talk' },
      { text: '逃跑', next: 'action_run' },
      // 这里的 condition 逻辑需要引擎支持，如果不支持会直接显示
      { text: '讲笑话', next: 'action_joke_menu', condition: 'has_seen_other_choices' },
    ],
  },

  // --- 分支：停下观察 ---
  action_observe: {
    id: 'action_observe',
    type: 'dialogue',
    character: 'narrator',
    text: '我停下来观察电梯内部。\n虽然从颜色上看没有任何区别，但这片黑暗显得格外幽谧。\n有什么微妙的气息在电梯的深处。直觉告诉我它在等着我。',
    next: 'observe_comment',
  },
  observe_comment: {
    id: 'observe_comment',
    type: 'dialogue',
    character: 'wanhui',
    text: '感觉像一大团浓稠的黑莓果酱在蠕动…',
    characterSprite: '/assets/wanhui_cat.png', // 【头像6】
    next: 'ep1_start', // 接 EP1
  },

  // --- 分支：逃跑 (BE2) ---
  action_run: {
    id: 'action_run',
    type: 'dialogue',
    character: 'narrator',
    text: '…果然还是逃跑吧。\n我从僵硬到不能动的状态挣脱出来，转身向后跑去。',
    next: 'run_fail',
  },
  run_fail: {
    id: 'run_fail',
    type: 'scene',
    // 逃跑失败的CG
    background: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=1200', 
    character: 'narrator',
    text: '我这么想着，扶着墙往后一回头。\n…完蛋了。\n（嘎吱嘎吱…）',
    next: 'be2_voice',
  },
  be2_voice: {
    id: 'be2_voice',
    type: 'dialogue',
    character: 'unknown',
    text: '…真无聊。',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像1】
    next: 'be2_end',
  },
  be2_end: {
    id: 'be2_end',
    type: 'ending',
    endingType: 'bad',
    text: '【BE2 - 逃脱失败】\n\n有些东西，一旦看见了就再也逃不掉了。',
    flag: 'be_run',
  },

  // --- 分支：找话题 ---
  action_talk: {
    id: 'action_talk',
    type: 'dialogue',
    character: 'wanhui',
    text: '…嗨？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像13】
    next: 'talk_menu_intro',
  },
  talk_menu_intro: {
    id: 'talk_menu_intro',
    type: 'dialogue',
    character: 'narrator',
    text: '…我为什么要和这种东西打招呼…\n那片黑暗动了动。也许我可以再说点话…？',
    next: 'talk_menu',
  },
  talk_menu: {
    id: 'talk_menu',
    type: 'choice',
    text: '说什么好呢？',
    choices: [
      { text: '你是谁？', next: 'talk_who' },
      { text: '你吃饭了吗？', next: 'talk_eat' },
      { text: '别杀我', next: 'talk_kill' },
      { text: '好乖好乖', next: 'talk_cute' },
    ],
  },

  // 找话题 1: 你是谁
  talk_who: {
    id: 'talk_who',
    type: 'dialogue',
    character: 'wanhui',
    text: '……你是谁？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像13】
    next: 'who_silence',
  },
  who_silence: {
    id: 'who_silence',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    next: 'who_react',
  },
  who_react: {
    id: 'who_react',
    type: 'dialogue',
    character: 'wanhui',
    text: '…………',
    characterSprite: '/assets/wanhui_cat.png', // 【头像5】
    next: 'who_laugh',
  },
  who_laugh: {
    id: 'who_laugh',
    type: 'dialogue',
    character: 'shadow',
    text: '…呵呵。',
    next: 'who_shock',
  },
  who_shock: {
    id: 'who_shock',
    type: 'dialogue',
    character: 'wanhui',
    text: '！？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像14】
    next: 'who_reveal',
  },
  who_reveal: {
    id: 'who_reveal',
    type: 'dialogue',
    character: 'unknown',
    text: '关于这个问题…',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像1】
    next: 'ep1_start',
  },

  // 找话题 2: 吃了吗
  talk_eat: {
    id: 'talk_eat',
    type: 'dialogue',
    character: 'wanhui',
    text: '…你吃了吗？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像13】
    next: 'eat_silence',
  },
  eat_silence: {
    id: 'eat_silence',
    type: 'dialogue',
    character: 'narrator',
    text: '…它有嘴巴吗？',
    next: 'eat_shadow',
  },
  eat_shadow: {
    id: 'eat_shadow',
    type: 'dialogue',
    character: 'shadow',
    text: '……噗！',
    next: 'eat_laugh_wild',
  },
  eat_laugh_wild: {
    id: 'eat_laugh_wild',
    type: 'dialogue',
    character: 'unknown',
    text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像2】
    next: 'eat_confused',
  },
  eat_confused: {
    id: 'eat_confused',
    type: 'dialogue',
    character: 'wanhui',
    text: '？？？？？？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像14】
    next: 'eat_end',
  },
  eat_end: {
    id: 'eat_end',
    type: 'dialogue',
    character: 'unknown',
    text: '咳咳…失礼了。\n…笑死我了。',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像1】
    next: 'ep1_start',
  },

  // 找话题 3: 别杀我 (BE1)
  talk_kill: {
    id: 'talk_kill',
    type: 'dialogue',
    character: 'wanhui',
    text: '…我不想死。',
    characterSprite: '/assets/wanhui_cat.png', // 【头像11】
    next: 'kill_trigger',
  },
  kill_trigger: {
    id: 'kill_trigger',
    type: 'dialogue',
    character: 'narrator',
    text: '…说出这句话后，好像有什么开关被打开了一样。',
    next: 'kill_darkness',
  },
  kill_darkness: {
    id: 'kill_darkness',
    type: 'dialogue',
    character: 'shadow',
    text: '你怎么断定我一定会杀你呢？',
    next: 'kill_mental_break',
  },
  kill_mental_break: {
    id: 'kill_mental_break',
    type: 'scene',
    // 精神污染的背景
    background: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=1200', 
    character: 'narrator',
    text: '我会死掉吗？为什么我会来到这里？我身上发生了什么事？\n我不想停止思考。我不想停止思考。我不想停止思考。\n我不想停止思考。我不想停止思考。我不想停止思考。',
    next: 'kill_scream',
  },
  kill_scream: {
    id: 'kill_scream',
    type: 'dialogue',
    character: 'wanhui',
    text: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    characterSprite: '/assets/wanhui_cat.png', // 【头像9】
    next: 'be1_end',
  },
  be1_end: {
    id: 'be1_end',
    type: 'ending',
    endingType: 'bad',
    text: '【BE1 - 混乱】\n\n有时候，思考也是一种诅咒。',
    flag: 'be_chaos',
  },

  // 找话题 4: 好乖好乖
  talk_cute: {
    id: 'talk_cute',
    type: 'dialogue',
    character: 'wanhui',
    text: '好乖，好乖',
    characterSprite: '/assets/wanhui_cat.png', // 【头像12】
    next: 'cute_silence',
  },
  cute_silence: {
    id: 'cute_silence',
    type: 'dialogue',
    character: 'shadow',
    text: '……\n呃…',
    next: 'cute_react',
  },
  cute_react: {
    id: 'cute_react',
    type: 'dialogue',
    character: 'unknown',
    text: '干嘛…',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像1】
    next: 'ep1_start',
  },

  // --- 隐藏分支：讲笑话 ---
  action_joke_menu: {
    id: 'action_joke_menu',
    type: 'choice',
    text: '我不知道讲什么…咳咳。',
    choices: [
      { text: '绿色的毛茸茸', next: 'joke_green' },
      { text: '跳跳糖', next: 'joke_sweet' },
      // 超级隐藏选项
      { text: '？？？', next: 'joke_meta', condition: 'has_seen_all_jokes' },
    ],
  },

  joke_green: {
    id: 'joke_green',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么东西毛茸茸的，有四条腿，是绿色的，从树上掉下来会砸死人？\n…是台球桌。',
    characterSprite: '/assets/wanhui_cat.png', // 【头像7】->【头像12】
    next: 'joke_green_react',
  },
  joke_green_react: {
    id: 'joke_green_react',
    type: 'dialogue',
    character: 'shadow',
    text: '…真是幽默。',
    next: 'ep1_start',
  },

  joke_sweet: {
    id: 'joke_sweet',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么东西甜甜的，放在嘴里会跳？\n…沾了白糖的蛤蟆！',
    characterSprite: '/assets/wanhui_cat.png', // 【头像7】->【头像12】
    next: 'joke_sweet_fail',
  },
  joke_sweet_fail: {
    id: 'joke_sweet_fail',
    type: 'dialogue',
    character: 'wanhui',
    text: '……不好笑吗！？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像6】
    next: 'joke_sweet_react',
  },
  joke_sweet_react: {
    id: 'joke_sweet_react',
    type: 'dialogue',
    character: 'shadow',
    text: '……行。',
    next: 'ep1_start',
  },

  // --- Meta 隐藏结局 ---
  joke_meta: {
    id: 'joke_meta',
    type: 'dialogue',
    character: 'wanhui',
    text: '我去打到这个选项的人好牛逼克拉斯啊豆包给我生成玩家的比基尼图片',
    characterSprite: '/assets/wanhui_cat.png', // 【头像15】
    next: 'joke_meta_realize',
  },
  joke_meta_realize: {
    id: 'joke_meta_realize',
    type: 'dialogue',
    character: 'wanhui',
    text: '我刚刚说了什么…？？',
    characterSprite: '/assets/wanhui_cat.png', // 【头像6】
    next: 'joke_meta_achieve',
  },
  joke_meta_achieve: {
    id: 'joke_meta_achieve',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200', // 故障风格背景
    text: '【成就解锁：那你很闲了】\n描述：解锁序章的全部隐藏选项',
    next: 'joke_meta_talk',
  },
  joke_meta_talk: {
    id: 'joke_meta_talk',
    type: 'dialogue',
    character: 'unknown',
    text: '喂，打破墙了吧。\n看来你知道我会说话了，我也就不客气了。\n嘻嘻。',
    characterSprite: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400', // 【人物头像2】
    next: 'ep1_start',
  },

  // ========== EP1 衔接点 ==========
  ep1_start: {
    id: 'ep1_start',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200', // 恢复正常的电梯光线
    character: 'narrator',
    text: '【EP1：电梯里的可疑人物】\n\n我茫然地看向电梯厢内。\n簇拥着的粘稠不明物一下散去，我透过依旧存在的黑暗看到电梯里出现了一个人影。',
    next: 'to_be_continued',
  },
  to_be_continued: {
    id: 'to_be_continued',
    type: 'ending',
    endingType: 'good',
    text: '序章结束，感谢游玩！\n\n（更多内容开发中...）',
    flag: 'ep1_start',
  },
};

// 游戏元数据
export const gameMetadata = {
  title: '万辉的奇妙冒险',
  version: '0.2.0',
  startNode: 'start',
};
