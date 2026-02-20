import { DialogueNode, Character } from '../types/game';

// ==========================================
// 角色定义
// ==========================================
export const characters: Record<string, Character> = {
  narrator: {
    id: 'narrator',
    name: '', // 旁白
    sprite: '',
  },
  wanhui: {
    id: 'wanhui',
    name: '万辉', // 主角
    // 默认立绘，剧情中会通过 characterSprite 覆盖具体的【头像x】
    sprite: '/assets/wanhui_default.png', 
  },
  shadow: {
    id: 'shadow',
    name: '电梯中凝结的黑暗',
    sprite: '/assets/shadow_blob.png', // 一团黑影
  },
  suspicious: {
    id: 'suspicious',
    name: '电梯里的可疑人物',
    // 默认立绘，剧情中覆盖【人物头像x】
    sprite: '/assets/suspicious_default.png', 
  },
  unknown: {
    id: 'unknown',
    name: '？？？',
    sprite: '/assets/suspicious_shadow.png', // 神秘人剪影
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
    background: '/assets/bg_black.png', 
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
    characterSprite: '/assets/wanhui_1.png', // 【头像1】
    next: 'room_desc',
  },

  room_desc: {
    id: 'room_desc',
    type: 'scene',
    background: '/assets/bg_elevator_door.png', // 正对着电梯门的视角
    character: 'wanhui',
    text: '这里是…？',
    characterSprite: '/assets/wanhui_2.png', // 【头像2】
    next: 'room_desc_2',
  },

  room_desc_2: {
    id: 'room_desc_2',
    type: 'dialogue',
    character: 'narrator',
    text: '这是一个谈得上昏暗但不失整洁的房间。\n四周空荡荡的，说不上是金属还是混凝土的材质映着你孤零零的身影。\n不远处有一扇金属大门。',
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
    text: '我怎么会在这里？',
    characterSprite: '/assets/wanhui_5.png', // 【头像5】
    next: 'room_confused_2',
  },

  room_confused_2: {
    id: 'room_confused_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '我记得我明明在路上…',
    characterSprite: '/assets/wanhui_5.png', 
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
    characterSprite: '/assets/wanhui_1.png', // 【头像1】
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
    text: '也许是隔音太差了…',
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'leak_complain_2',
  },
  leak_complain_2: {
    id: 'leak_complain_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    characterSprite: '/assets/wanhui_2.png', // 【头像2】
    next: 'leak_complain_3',
  },
  leak_complain_3: {
    id: 'leak_complain_3',
    type: 'dialogue',
    character: 'wanhui',
    text: '看着这么新，漏水也太厉害了吧？！',
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'kidnap_thought',
  },

  kidnap_thought: {
    id: 'kidnap_thought',
    type: 'dialogue',
    character: 'narrator',
    text: '停止胡思乱想，我开始思考自己为什么会来到这里。\n被绑架了？自己平时并没有惹上什么麻烦…\n…需要报警吗？\n…啊！',
    next: 'phone_find',
  },

  phone_find: {
    id: 'phone_find',
    type: 'dialogue',
    character: 'narrator',
    text: '这么一说，手机就在我身上。',
    next: 'phone_check',
  },

  phone_check: {
    id: 'phone_check',
    type: 'dialogue',
    character: 'wanhui',
    text: '（掏掏）',
    characterSprite: '/assets/wanhui_2.png', // 【头像2】
    next: 'phone_check_2',
  },
  phone_check_2: {
    id: 'phone_check_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '……',
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
    next: 'phone_fail',
  },
  phone_fail: {
    id: 'phone_fail',
    type: 'dialogue',
    character: 'wanhui',
    text: '…完全没信号。',
    characterSprite: '/assets/wanhui_5.png', // 【头像5】
    next: 'phone_sad',
  },

  phone_sad: {
    id: 'phone_sad',
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
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'investigate_menu',
  },

  // ========== 调查循环 ==========
  investigate_menu: {
    id: 'investigate_menu',
    type: 'choice',
    text: '【任务】调查一下周围吧。',
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
    characterSprite: '/assets/wanhui_1.png', // 【头像1】
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
    text: '嗯…应该没有机关。',
    characterSprite: '/assets/wanhui_1.png', // 【头像1】
    next: 'look_corner_2',
  },
  look_corner_2: {
    id: 'look_corner_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '会有才怪了吧…',
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'investigate_menu',
  },

  look_door: {
    id: 'look_door',
    type: 'dialogue',
    character: 'wanhui',
    text: '这个…完全没看到机关呢。',
    characterSprite: '/assets/wanhui_1.png', // 【头像1】
    next: 'look_door_2',
  },
  look_door_2: {
    id: 'look_door_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '可恶…明明是唯一的线索…',
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'look_door_3',
  },
  look_door_3: {
    id: 'look_door_3',
    type: 'dialogue',
    character: 'wanhui',
    text: '嗯…？',
    characterSprite: '/assets/wanhui_2.png', // 【头像2】
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
    characterSprite: '/assets/wanhui_4.png', // 【头像4】
    next: 'door_open_scene',
  },
  door_open_scene: {
    id: 'door_open_scene',
    type: 'scene',
    background: '/assets/bg_elevator_open.png', // 电梯门打开
    character: 'narrator',
    text: '我后退了两步。\n一阵尖锐的声音响起，两扇铁片缓缓向两边滑动。\n原来是电梯啊。\n门完全打开了。',
    next: 'elevator_darkness',
  },

  elevator_darkness: {
    id: 'elevator_darkness',
    type: 'dialogue',
    character: 'narrator',
    text: '里面漆黑一片。\n不知为何，我的脚像是被胶水紧紧粘在了地板上；我想要鼓起勇气发出声音，但某种本能完全压制了我的自主行动。\n黑暗里传来的气息让我动弹不得。',
    next: 'elevator_fear',
  },
  elevator_fear: {
    id: 'elevator_fear',
    type: 'dialogue',
    character: 'narrator',
    text: '现在转身逃跑当然不是明智的选择。',
    next: 'elevator_think',
  },

  elevator_think: {
    id: 'elevator_think',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    characterSprite: '/assets/wanhui_3.png', // 【头像3】
    next: 'elevator_ask',
  },
  elevator_ask: {
    id: 'elevator_ask',
    type: 'dialogue',
    character: 'narrator',
    text: '那我该干什么…？',
    next: 'action_choice',
  },

  // ========== 核心分支选择 ==========
  action_choice: {
    id: 'action_choice',
    type: 'choice',
    text: '要干什么？',
    choices: [
      { text: '停下观察', next: 'action_observe' },
      { text: '找话题', next: 'action_talk' },
      { text: '逃跑', next: 'action_run' },
      // 这里的 condition 逻辑需要引擎支持
      { text: '讲笑话', next: 'action_joke_menu', condition: 'has_seen_other_choices' },
    ],
  },

  // --- 分支：停下观察 ---
  action_observe: {
    id: 'action_observe',
    type: 'dialogue',
    character: 'narrator',
    text: '我停下来观察电梯内部。\n虽然从颜色上看没有任何区别，但这片黑暗显得格外幽谧。\n有什么微妙的气息在电梯的深处。直觉告诉我它在等着我。',
    next: 'observe_scare',
  },
  observe_scare: {
    id: 'observe_scare',
    type: 'dialogue',
    character: 'narrator',
    text: '真是让人害怕啊…\n我叹了口气，重新打量了一遍电梯内部。',
    next: 'observe_comment',
  },
  observe_comment: {
    id: 'observe_comment',
    type: 'dialogue',
    character: 'wanhui',
    text: '感觉像一大团浓稠的黑莓果酱在蠕动…',
    characterSprite: '/assets/wanhui_6.png', // 【头像6】
    next: 'ep1_start', // 接 EP1
  },

  // --- 分支：逃跑 (BE2) ---
  action_run: {
    id: 'action_run',
    type: 'dialogue',
    character: 'narrator',
    text: '…果然还是逃跑吧。\n我从僵硬到不能动的状态挣脱出来，转身向后跑去。\n虽然不能够立刻脱困，但也许能争取到一些时间。',
    next: 'run_thought',
  },
  run_thought: {
    id: 'run_thought',
    type: 'dialogue',
    character: 'narrator',
    text: '也许这个怪物无法离开电梯…只要先到安全地带，再思考下策也不是不可取。\n我这么想着，扶着墙往后一回头。',
    next: 'run_fail',
  },
  run_fail: {
    id: 'run_fail',
    type: 'scene',
    cg: '/assets/cg1_run_fail.png', // 【展示CG1】
    character: 'narrator',
    text: '…完蛋了。\n（嘎吱嘎吱…）',
    next: 'be2_voice',
  },
  be2_voice: {
    id: 'be2_voice',
    type: 'dialogue',
    character: 'unknown',
    text: '…真无聊。',
    characterSprite: '/assets/suspicious_1.png', // 【人物头像1】
    next: 'be2_end',
  },
  be2_end: {
    id: 'be2_end',
    type: 'ending',
    endingType: 'bad',
    cg: '/assets/cg2_be_run.png', // 【展示结局CG2】
    text: '【BE2 - 逃脱失败】\n\n有些东西，一旦看见了就再也逃不掉了。',
    flag: 'be_run',
  },

  // --- 分支：找话题 ---
  action_talk: {
    id: 'action_talk',
    type: 'dialogue',
    character: 'wanhui',
    text: '…嗨？',
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
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
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
    next: 'who_silence',
  },
  who_silence: {
    id: 'who_silence',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    characterSprite: '/assets/shadow_default.png', // 【人物头像】
    next: 'who_react',
  },
  who_react: {
    id: 'who_react',
    type: 'dialogue',
    character: 'wanhui',
    text: '…………',
    characterSprite: '/assets/wanhui_5.png', // 【头像5】
    next: 'who_think',
  },
  who_think: {
    id: 'who_think',
    type: 'dialogue',
    character: 'narrator',
    text: '…好像不会说话。',
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
    characterSprite: '/assets/wanhui_14.png', // 【头像14】
    next: 'who_reveal',
  },
  who_reveal: {
    id: 'who_reveal',
    type: 'dialogue',
    character: 'unknown',
    text: '关于这个问题…',
    characterSprite: '/assets/suspicious_1.png', // 【人物头像1】
    next: 'ep1_start',
  },

  // 找话题 2: 吃了吗
  talk_eat: {
    id: 'talk_eat',
    type: 'dialogue',
    character: 'wanhui',
    text: '…你吃了吗？',
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
    next: 'eat_think',
  },
  eat_think: {
    id: 'eat_think',
    type: 'dialogue',
    character: 'narrator',
    text: '…它有嘴巴吗？',
    next: 'eat_silence',
  },
  eat_silence: {
    id: 'eat_silence',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    characterSprite: '/assets/shadow_default.png', // 【人物头像】
    next: 'eat_silence_2',
  },
  eat_silence_2: {
    id: 'eat_silence_2',
    type: 'dialogue',
    character: 'narrator',
    text: '好像不会说话…',
    next: 'eat_shadow',
  },
  eat_shadow: {
    id: 'eat_shadow',
    type: 'dialogue',
    character: 'shadow',
    text: '……噗！',
    characterSprite: '/assets/shadow_default.png', // 【人物头像】
    next: 'eat_laugh_wild',
  },
  eat_laugh_wild: {
    id: 'eat_laugh_wild',
    type: 'dialogue',
    character: 'unknown',
    text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'eat_confused',
  },
  eat_confused: {
    id: 'eat_confused',
    type: 'dialogue',
    character: 'wanhui',
    text: '？？？？？？',
    characterSprite: '/assets/wanhui_14.png', // 【头像14】
    next: 'eat_think_2',
  },
  eat_think_2: {
    id: 'eat_think_2',
    type: 'dialogue',
    character: 'narrator',
    text: '怎么会笑成这样…\n…我刚刚说的确实很好笑。好吧。',
    next: 'eat_end',
  },
  eat_end: {
    id: 'eat_end',
    type: 'dialogue',
    character: 'unknown',
    text: '…笑死我了。',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'eat_end_2',
  },
  eat_end_2: {
    id: 'eat_end_2',
    type: 'dialogue',
    character: 'unknown',
    text: '咳咳…失礼了。',
    characterSprite: '/assets/suspicious_1.png', // 【人物头像1】
    next: 'ep1_start',
  },

  // 找话题 3: 别杀我 (BE1)
  talk_kill: {
    id: 'talk_kill',
    type: 'dialogue',
    character: 'wanhui',
    text: '…我不想死。',
    characterSprite: '/assets/wanhui_11.png', // 【头像11】
    next: 'kill_trigger',
  },
  kill_trigger: {
    id: 'kill_trigger',
    type: 'dialogue',
    character: 'narrator',
    text: '…说出这句话后，好像有什么开关被打开了一样。',
    next: 'kill_react',
  },
  kill_react: {
    id: 'kill_react',
    type: 'dialogue',
    character: 'wanhui',
    text: '…！？',
    characterSprite: '/assets/wanhui_3.png', // 【头像3】
    next: 'kill_desc',
  },
  kill_desc: {
    id: 'kill_desc',
    type: 'dialogue',
    character: 'narrator',
    text: '我的视线开始模糊发黑。一阵阵杂乱的噪音蒙蔽了我的听觉。心脏砰砰跳动着。',
    next: 'kill_darkness',
  },
  kill_darkness: {
    id: 'kill_darkness',
    type: 'dialogue',
    character: 'shadow',
    text: '你怎么断定我一定会杀你呢？',
    characterSprite: '/assets/shadow_default.png',
    next: 'kill_mental_break',
  },
  kill_mental_break: {
    id: 'kill_mental_break',
    type: 'dialogue',
    character: 'narrator',
    text: '我依然听得清它在说什么。我看不清它。\n就当我试图做出回应时，从心底涌现的情绪将我吞没了。\n那是恐惧吗？还是…好像都无所谓了。这个时候思绪杂乱一点也无所谓吧。反正我已经坚持着思考这么久了。',
    next: 'kill_mental_break_2',
  },
  kill_mental_break_2: {
    id: 'kill_mental_break_2',
    type: 'dialogue',
    character: 'narrator',
    text: '我的思绪一下分散开来。\n它好像还在说话，但我已经没有精力去理会它了。\n我会死掉吗？为什么我会来到这里？我身上发生了什么事？我还能回去吗？我还逃得掉吗？我还逃得掉吗？我还逃得掉吗？要是我一直维持着这样思考下去我会撑到自己恢复状态吗？好困。我不想停止思考。',
    next: 'kill_mental_break_3',
  },
  kill_mental_break_3: {
    id: 'kill_mental_break_3',
    type: 'dialogue',
    character: 'narrator',
    text: '我不想停止思考。\n我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。我不想停止思考。',
    next: 'kill_scream',
  },
  kill_scream: {
    id: 'kill_scream',
    type: 'dialogue',
    character: 'wanhui',
    text: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    characterSprite: '/assets/wanhui_9.png', // 【头像9】
    next: 'kill_voice',
  },
  kill_voice: {
    id: 'kill_voice',
    type: 'dialogue',
    character: 'unknown',
    text: '哎呀…',
    characterSprite: '/assets/suspicious_1.png', // 【人物头像1】
    next: 'be1_end',
  },
  be1_end: {
    id: 'be1_end',
    type: 'ending',
    endingType: 'bad',
    cg: '/assets/cg1_be_chaos.png', // 【展示结局CG1】
    text: '【BE1 - 混乱】\n\n有时候，思考也是一种诅咒。',
    flag: 'be_chaos',
  },

  // 找话题 4: 好乖好乖
  talk_cute: {
    id: 'talk_cute',
    type: 'dialogue',
    character: 'wanhui',
    text: '好乖，好乖',
    characterSprite: '/assets/wanhui_12.png', // 【头像12】
    next: 'cute_think',
  },
  cute_think: {
    id: 'cute_think',
    type: 'dialogue',
    character: 'narrator',
    text: '我这是在干什么…心虚。',
    next: 'cute_stare',
  },
  cute_stare: {
    id: 'cute_stare',
    type: 'dialogue',
    character: 'wanhui',
    text: '……',
    characterSprite: '/assets/wanhui_7.png', // 【头像7】
    next: 'cute_shadow_silence',
  },
  cute_shadow_silence: {
    id: 'cute_shadow_silence',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    next: 'cute_narrator',
  },
  cute_narrator: {
    id: 'cute_narrator',
    type: 'dialogue',
    character: 'narrator',
    text: '我紧盯着它。',
    next: 'cute_react',
  },
  cute_react: {
    id: 'cute_react',
    type: 'dialogue',
    character: 'shadow',
    text: '呃…',
    next: 'cute_talk',
  },
  cute_talk: {
    id: 'cute_talk',
    type: 'dialogue',
    character: 'narrator',
    text: '啊，说话了。',
    next: 'cute_reveal',
  },
  cute_reveal: {
    id: 'cute_reveal',
    type: 'dialogue',
    character: 'unknown',
    text: '干嘛…',
    characterSprite: '/assets/suspicious_1.png', // 【人物头像1】
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
      { text: '？？？', next: 'joke_meta', condition: 'has_seen_all_jokes' },
    ],
  },

  // 笑话1
  joke_green: {
    id: 'joke_green',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么东西毛茸茸的，有四条腿，是绿色的，从树上掉下来会砸死人？',
    characterSprite: '/assets/wanhui_7.png', // 【头像7】
    next: 'joke_green_2',
  },
  joke_green_2: {
    id: 'joke_green_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    characterSprite: '/assets/wanhui_7.png',
    next: 'joke_green_3',
  },
  joke_green_3: {
    id: 'joke_green_3',
    type: 'dialogue',
    character: 'shadow',
    text: '…',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_green_4',
  },
  joke_green_4: {
    id: 'joke_green_4',
    type: 'dialogue',
    character: 'wanhui',
    text: '…是台球桌。',
    characterSprite: '/assets/wanhui_12.png', // 【头像12】
    next: 'joke_green_5',
  },
  joke_green_5: {
    id: 'joke_green_5',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_green_6',
  },
  joke_green_6: {
    id: 'joke_green_6',
    type: 'dialogue',
    character: 'wanhui',
    text: '……咳咳。',
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
    next: 'joke_green_think',
  },
  joke_green_think: {
    id: 'joke_green_think',
    type: 'dialogue',
    character: 'narrator',
    text: '我干咳了一声…然后不知道出于什么心态摆出一副委屈的样子。',
    next: 'joke_green_react',
  },
  joke_green_react: {
    id: 'joke_green_react',
    type: 'dialogue',
    character: 'shadow',
    text: '…真是幽默。',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_green_thought',
  },
  joke_green_thought: {
    id: 'joke_green_thought',
    type: 'dialogue',
    character: 'narrator',
    text: '…这是在夸我还是阴阳我啊？\n欸…等等，这玩意会说话的？',
    next: 'ep1_start',
  },

  // 笑话2
  joke_sweet: {
    id: 'joke_sweet',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么东西甜甜的，放在嘴里会跳？',
    characterSprite: '/assets/wanhui_7.png', // 【头像7】
    next: 'joke_sweet_2',
  },
  joke_sweet_2: {
    id: 'joke_sweet_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '…',
    characterSprite: '/assets/wanhui_7.png',
    next: 'joke_sweet_3',
  },
  joke_sweet_3: {
    id: 'joke_sweet_3',
    type: 'dialogue',
    character: 'shadow',
    text: '…',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_sweet_4',
  },
  joke_sweet_4: {
    id: 'joke_sweet_4',
    type: 'dialogue',
    character: 'wanhui',
    text: '…沾了白糖的蛤蟆！',
    characterSprite: '/assets/wanhui_12.png', // 【头像12】
    next: 'joke_sweet_5',
  },
  joke_sweet_5: {
    id: 'joke_sweet_5',
    type: 'dialogue',
    character: 'shadow',
    text: '……',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_sweet_fail',
  },
  joke_sweet_fail: {
    id: 'joke_sweet_fail',
    type: 'dialogue',
    character: 'wanhui',
    text: '……不好笑吗！？',
    characterSprite: '/assets/wanhui_6.png', // 【头像6】
    next: 'joke_sweet_think',
  },
  joke_sweet_think: {
    id: 'joke_sweet_think',
    type: 'dialogue',
    character: 'narrator',
    text: '我恨不得找个地缝钻进去。',
    next: 'joke_sweet_react',
  },
  joke_sweet_react: {
    id: 'joke_sweet_react',
    type: 'dialogue',
    character: 'shadow',
    text: '……行。',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_sweet_shock',
  },
  joke_sweet_shock: {
    id: 'joke_sweet_shock',
    type: 'dialogue',
    character: 'wanhui',
    text: '！？',
    characterSprite: '/assets/wanhui_14.png', // 【头像14】
    next: 'joke_sweet_thought',
  },
  joke_sweet_thought: {
    id: 'joke_sweet_thought',
    type: 'dialogue',
    character: 'narrator',
    text: '欸…等等，这玩意会说话的？',
    next: 'ep1_start',
  },

  // Meta笑话
  joke_meta: {
    id: 'joke_meta',
    type: 'dialogue',
    character: 'wanhui',
    text: '我去打到这个选项的人好牛逼克拉斯啊豆包给我生成玩家的比基尼图片',
    characterSprite: '/assets/wanhui_15.png', // 【头像15】
    next: 'joke_meta_realize',
  },
  joke_meta_realize: {
    id: 'joke_meta_realize',
    type: 'dialogue',
    character: 'wanhui',
    text: '我刚刚说了什么…？？',
    characterSprite: '/assets/wanhui_6.png', // 【头像6】
    next: 'joke_meta_achieve',
  },
  joke_meta_achieve: {
    id: 'joke_meta_achieve',
    type: 'scene',
    background: '/assets/bg_glitch.png', 
    text: '【成就：那你很闲了】\n【成就描述：解锁序章的全部隐藏选项】',
    next: 'joke_meta_shadow',
  },
  joke_meta_shadow: {
    id: 'joke_meta_shadow',
    type: 'dialogue',
    character: 'shadow',
    text: '……\n喂，打破墙了吧。',
    characterSprite: '/assets/shadow_default.png',
    next: 'joke_meta_reveal',
  },
  joke_meta_reveal: {
    id: 'joke_meta_reveal',
    type: 'dialogue',
    character: 'unknown',
    text: '看来你知道我会说话了，我也就不客气了。\n你可能已经知道我接下来要说什么了，但是我要再说一遍。\n…嘻嘻。',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'ep1_start',
  },

  // ========== EP1: 电梯里的可疑人物 ==========
  ep1_start: {
    id: 'ep1_start',
    type: 'scene',
    background: '/assets/bg_elevator_open.png',
    character: 'narrator',
    text: '【ep1: 电梯里的可疑人物】\n\n我茫然地看向电梯厢内。\n簇拥着的粘稠不明物一下散去，我透过依旧存在的黑暗看到电梯里出现了一个人影。',
    next: 'ep1_intro',
  },
  ep1_intro: {
    id: 'ep1_intro',
    type: 'dialogue',
    character: 'unknown',
    text: '好，现在开始进入正题。',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'ep1_cg',
  },
  ep1_cg: {
    id: 'ep1_cg',
    type: 'scene',
    cg: '/assets/cg2.png', // 【展示CG2】
    character: 'unknown',
    text: '先进来吧。',
    characterSprite: '/assets/suspicious_2.png',
    next: 'ep1_desc',
  },
  ep1_desc: {
    id: 'ep1_desc',
    type: 'dialogue',
    character: 'narrator',
    text: '我一言不发，盯着面前的可疑人物。\n对方的右眼完全被帽檐遮住了，他（它？）的脸上挂着一丝微笑，我无法读出这其中的含义。',
    next: 'ep1_talk_1',
  },
  ep1_talk_1: {
    id: 'ep1_talk_1',
    type: 'dialogue',
    character: 'suspicious',
    text: '哎呀…虽然说这部电梯没有定时关闭这一说，但还是希望你快点上来。',
    characterSprite: '/assets/suspicious_4.png', // 【人物头像4】
    next: 'ep1_reaction_1',
  },
  ep1_reaction_1: {
    id: 'ep1_reaction_1',
    type: 'dialogue',
    character: 'narrator',
    text: '我攥紧了拳头。',
    next: 'ep1_talk_2',
  },
  ep1_talk_2: {
    id: 'ep1_talk_2',
    type: 'dialogue',
    character: 'suspicious',
    text: '快点。',
    characterSprite: '/assets/suspicious_4.png', // 【人物头像4】
    next: 'ep1_talk_3',
  },
  ep1_talk_3: {
    id: 'ep1_talk_3',
    type: 'dialogue',
    character: 'suspicious',
    text: '万辉。',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'ep1_chill',
  },
  ep1_chill: {
    id: 'ep1_chill',
    type: 'dialogue',
    character: 'narrator',
    text: '寒意袭卷了我的全身。\n这个人…这个东西，怎么会知道我的名字？',
    next: 'ep1_talk_4',
  },
  ep1_talk_4: {
    id: 'ep1_talk_4',
    type: 'dialogue',
    character: 'suspicious',
    text: '快点啦…我很无聊啊。',
    characterSprite: '/assets/suspicious_2.png',
    next: 'ep1_hesitate',
  },
  ep1_hesitate: {
    id: 'ep1_hesitate',
    type: 'dialogue',
    character: 'narrator',
    text: '我低头看着地面。',
    next: 'ep1_choice',
  },

  // EP1 分支
  ep1_choice: {
    id: 'ep1_choice',
    type: 'choice',
    text: '要走上电梯吗？',
    choices: [
      { text: '走进电梯', next: 'ep1_enter' },
      { text: '拒绝', next: 'ep1_refuse' },
    ],
  },

  // 拒绝分支
  ep1_refuse: {
    id: 'ep1_refuse',
    type: 'dialogue',
    character: 'wanhui',
    text: '…我不要。',
    characterSprite: '/assets/wanhui_13.png', // 【头像13】
    next: 'ep1_refuse_2',
  },
  ep1_refuse_2: {
    id: 'ep1_refuse_2',
    type: 'dialogue',
    character: 'suspicious',
    text: '……',
    characterSprite: '/assets/suspicious_4.png', // 【人物头像4】
    next: 'ep1_refuse_3',
  },
  ep1_refuse_3: {
    id: 'ep1_refuse_3',
    type: 'dialogue',
    character: 'suspicious',
    text: '抱歉啦，在这里你没有拒绝的权利。',
    characterSprite: '/assets/suspicious_2.png', // 【人物头像2】
    next: 'ep1_refuse_4',
  },
  ep1_refuse_4: {
    id: 'ep1_refuse_4',
    type: 'dialogue',
    character: 'wanhui',
    text: '怎么这样！',
    characterSprite: '/assets/wanhui_6.png', // 【头像6】
    next: 'ep1_refuse_force',
  },
  ep1_refuse_force: {
    id: 'ep1_refuse_force',
    type: 'dialogue',
    character: 'narrator',
    text: '一股推力从身后传来，我一头栽进电梯厢内。\n好过分！',
    next: 'ep1_inside_common', // 强行进入，汇合到共同路线
  },

  // 进入分支
  ep1_enter: {
    id: 'ep1_enter',
    type: 'dialogue',
    character: 'narrator',
    text: '我走进电梯。',
    next: 'ep1_inside_common',
  },

  // 共同路线：电梯内部
  ep1_inside_common: {
    id: 'ep1_inside_common',
    type: 'scene',
    background: '/assets/bg_elevator_inside.png', // 电梯内部
    character: 'narrator',
    text: '一进入电梯，门立刻在身后关闭。\n我环顾了一圈。',
    next: 'ep1_senses',
  },
  ep1_senses: {
    id: 'ep1_senses',
    type: 'dialogue',
    character: 'narrator',
    text: '就好像直到现在才开始发挥作用，我的感官争先恐后向我传达着信息。\nLED灯带投下的光晕、淡淡的铁锈味、身上由于不安持续淌下的汗水--',
    next: 'ep1_senses_2',
  },
  ep1_senses_2: {
    id: 'ep1_senses_2',
    type: 'dialogue',
    character: 'narrator',
    text: '--以及，从未停歇的滴水声。\n（滴答…）',
    next: 'ep1_observe_guy',
  },
  ep1_observe_guy: {
    id: 'ep1_observe_guy',
    type: 'dialogue',
    character: 'narrator',
    text: '见我进了电梯就开始四处观察，那个生物并没有阻拦或者发言，始终面带着微笑看着我。\n说实话挺让人不安的。这种彬彬有礼的人物发起疯来最狠了。',
    next: 'to_be_continued',
  },

  // 待续
  to_be_continued: {
    id: 'to_be_continued',
    type: 'ending',
    endingType: 'good',
    text: '第一章体验结束。\n\n（更多内容开发中...）',
    flag: 'demo_end',
  },
};

// 游戏元数据
export const gameMetadata = {
  title: '镜界电梯',
  version: '0.3.0',
  startNode: 'start',
};
