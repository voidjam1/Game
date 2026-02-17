// 恐怖题材游戏故事数据
import { DialogueNode, Character } from '../types/game';

// 角色定义
export const characters: Record<string, Character> = {
  narrator: {
    id: 'narrator',
    name: '',
    sprite: '',
  },
  wanhui: {
    id: 'wanhui',
    name: '万辉',
    sprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  voice: {
    id: 'voice',
    name: '？？？',
    sprite: '',
  },
  yinyu: {
    id: 'yinyu',
    name: '殷玉',
    sprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  },
  mirror_girl: {
    id: 'mirror_girl',
    name: '镜中少女',
    sprite: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
  },
  phone_voice: {
    id: 'phone_voice',
    name: '电话里的声音',
    sprite: '',
  },
};

// 故事节点
export const storyNodes: Record<string, DialogueNode> = {
  // ========== 开场 ==========
  start: {
    id: 'start',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1505zcz-96953b982615?w=1200',
    text: '意识逐渐清醒...',
    next: 'intro_1',
  },

  intro_1: {
    id: 'intro_1',
    type: 'dialogue',
    character: 'wanhui',
    text: '...这是哪里？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'intro_2',
  },

  intro_2: {
    id: 'intro_2',
    type: 'dialogue',
    character: 'narrator',
    text: '你醒来时发现自己躺在一个昏暗的房间里。\n四周空荡荡的，只有墙角处有一扇金属电梯门。',
    next: 'intro_3',
  },

  intro_3: {
    id: 'intro_3',
    type: 'dialogue',
    character: 'wanhui',
    text: '我...我怎么会在这里？\n我记得我明明在学校...',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'intro_4',
  },

  intro_4: {
    id: 'intro_4',
    type: 'dialogue',
    character: 'narrator',
    text: '电梯门突然发出"叮"的一声，缓缓打开。\n里面漆黑一片，但你听到了一个声音。',
    next: 'intro_5',
  },

  intro_5: {
    id: 'intro_5',
    type: 'dialogue',
    character: 'voice',
    text: '进来吧，万辉。',
    next: 'intro_6',
  },

  intro_6: {
    id: 'intro_6',
    type: 'dialogue',
    character: 'wanhui',
    text: '你...你是谁？你怎么知道我的名字？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'intro_7',
  },

  intro_7: {
    id: 'intro_7',
    type: 'dialogue',
    character: 'voice',
    text: '我是谁并不重要。\n重要的是...你想离开这里吗？',
    next: 'intro_choice',
  },

  intro_choice: {
    id: 'intro_choice',
    type: 'choice',
    text: '你决定...',
    choices: [
      {
        text: '走进电梯',
        next: 'enter_elevator',
      },
      {
        text: '拒绝进入，寻找其他出路',
        next: 'bad_end_refuse',
      },
    ],
  },

  bad_end_refuse: {
    id: 'bad_end_refuse',
    type: 'ending',
    endingType: 'bad',
    background: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=1200',
    character: 'narrator',
    text: '你转身离开电梯，试图寻找其他出口。\n但房间里什么都没有，墙壁开始向内收缩...\n\n你再也没能醒来。\n\n【坏结局：拒绝的代价】',
    flag: 'ending_refuse',
  },

  enter_elevator: {
    id: 'enter_elevator',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200',
    character: 'narrator',
    text: '你战战兢兢地走进电梯。\n门在你身后关闭，显示屏上显示：第10层',
    next: 'elevator_1',
  },

  elevator_1: {
    id: 'elevator_1',
    type: 'dialogue',
    character: 'voice',
    text: '很好。现在，我们要往下走。\n每一层...都有它的规则。',
    next: 'elevator_2',
  },

  elevator_2: {
    id: 'elevator_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '规则？什么规则？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'elevator_3',
  },

  elevator_3: {
    id: 'elevator_3',
    type: 'dialogue',
    character: 'voice',
    text: '你会明白的。\n记住——不要违反规则，否则...\n\n电梯开始下降。',
    next: 'floor_9_intro',
  },

  // ========== 第9层：镜子怪谈 ==========
  floor_9_intro: {
    id: 'floor_9_intro',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200',
    character: 'narrator',
    text: '【第9层】\n\n电梯门打开，眼前是一条长长的走廊。\n走廊尽头有一面巨大的镜子。',
    next: 'floor_9_1',
  },

  floor_9_1: {
    id: 'floor_9_1',
    type: 'dialogue',
    character: 'voice',
    text: '规则很简单：走到镜子前，但不要回头。',
    next: 'floor_9_2',
  },

  floor_9_2: {
    id: 'floor_9_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '不要回头？为什么？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'floor_9_3',
  },

  floor_9_3: {
    id: 'floor_9_3',
    type: 'dialogue',
    character: 'narrator',
    text: '你开始沿着走廊前进。\n身后传来了奇怪的声音...像是有人在跟着你。',
    next: 'floor_9_choice_1',
  },

  floor_9_choice_1: {
    id: 'floor_9_choice_1',
    type: 'choice',
    text: '你决定...',
    choices: [
      {
        text: '忍住好奇心，继续前进',
        next: 'floor_9_continue',
      },
      {
        text: '回头看看',
        next: 'bad_end_floor_9_look',
      },
    ],
  },

  bad_end_floor_9_look: {
    id: 'bad_end_floor_9_look',
    type: 'ending',
    endingType: 'bad',
    background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200',
    character: 'narrator',
    text: '你忍不住回头看了一眼。\n\n在你身后，站着一个和你一模一样的"人"，\n但它的眼睛...是纯黑色的。\n\n"找到你了。"它笑着说。\n\n【坏结局：镜中的自己】',
    flag: 'ending_floor_9_look',
  },

  floor_9_continue: {
    id: 'floor_9_continue',
    type: 'dialogue',
    character: 'narrator',
    text: '你咬紧牙关，继续向前走。\n脚步声越来越近，几乎就在你耳边...',
    next: 'floor_9_4',
  },

  floor_9_4: {
    id: 'floor_9_4',
    type: 'dialogue',
    character: 'narrator',
    text: '终于，你来到了镜子前。\n镜子里映出了你的倒影...但有些不对劲。',
    next: 'floor_9_5',
  },

  floor_9_5: {
    id: 'floor_9_5',
    type: 'dialogue',
    character: 'mirror_girl',
    text: '你好啊，万辉。',
    characterSprite: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    characterPosition: 'center',
    next: 'floor_9_6',
  },

  floor_9_6: {
    id: 'floor_9_6',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么？！镜子里的...不是我？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'floor_9_7',
  },

  floor_9_7: {
    id: 'floor_9_7',
    type: 'dialogue',
    character: 'mirror_girl',
    text: '想要通过这里，就和我玩个游戏吧。\n我会问你三个问题，答错了...你就留下来陪我。',
    characterSprite: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    characterPosition: 'center',
    next: 'floor_9_question',
  },

  floor_9_question: {
    id: 'floor_9_question',
    type: 'choice',
    text: '镜中少女问："你还记得...你是怎么来到这里的吗？"',
    choices: [
      {
        text: '我在学校...然后就醒来了',
        next: 'floor_9_correct',
      },
      {
        text: '我一直都在这里',
        next: 'bad_end_floor_9_wrong',
      },
      {
        text: '我不记得了',
        next: 'floor_9_correct',
      },
    ],
  },

  bad_end_floor_9_wrong: {
    id: 'bad_end_floor_9_wrong',
    type: 'ending',
    endingType: 'bad',
    background: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200',
    character: 'mirror_girl',
    text: '"错误。"她笑了。\n\n你感觉身体变得僵硬，意识逐渐模糊。\n最后，你成为了镜子里的一部分。\n\n【坏结局：成为镜子的一部分】',
    flag: 'ending_floor_9_wrong',
  },

  floor_9_correct: {
    id: 'floor_9_correct',
    type: 'dialogue',
    character: 'mirror_girl',
    text: '很好...看来你还没有完全忘记自己。\n去吧，电梯在等你。',
    characterSprite: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    characterPosition: 'center',
    next: 'floor_9_end',
  },

  floor_9_end: {
    id: 'floor_9_end',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200',
    character: 'narrator',
    text: '镜子旁边出现了一扇门，你走了进去。\n电梯再次开始下降...',
    next: 'floor_8_intro',
  },

  // ========== 第8层：电话怪谈 ==========
  floor_8_intro: {
    id: 'floor_8_intro',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    character: 'narrator',
    text: '【第8层】\n\n这一层看起来像是一间办公室。\n桌上有一部老式电话，正在响。',
    next: 'floor_8_1',
  },

  floor_8_1: {
    id: 'floor_8_1',
    type: 'dialogue',
    character: 'voice',
    text: '接起电话，但记住：\n无论听到什么，都不要说出你的真实姓名。',
    next: 'floor_8_choice_1',
  },

  floor_8_choice_1: {
    id: 'floor_8_choice_1',
    type: 'choice',
    text: '你决定...',
    choices: [
      {
        text: '接起电话',
        next: 'floor_8_answer',
      },
      {
        text: '忽视电话，寻找出口',
        next: 'floor_8_ignore',
      },
    ],
  },

  floor_8_ignore: {
    id: 'floor_8_ignore',
    type: 'dialogue',
    character: 'narrator',
    text: '你决定不理会电话，在房间里寻找出口。\n但电话铃声越来越大，震耳欲聋...',
    next: 'floor_8_forced',
  },

  floor_8_forced: {
    id: 'floor_8_forced',
    type: 'dialogue',
    character: 'narrator',
    text: '你不得不捂住耳朵。\n最终，你还是伸手拿起了电话。',
    next: 'floor_8_answer',
  },

  floor_8_answer: {
    id: 'floor_8_answer',
    type: 'dialogue',
    character: 'wanhui',
    text: '喂...？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'floor_8_2',
  },

  floor_8_2: {
    id: 'floor_8_2',
    type: 'dialogue',
    character: 'phone_voice',
    text: '你好...请问你是...？',
    next: 'floor_8_question',
  },

  floor_8_question: {
    id: 'floor_8_question',
    type: 'choice',
    text: '电话里的声音在等待你的回答...',
    choices: [
      {
        text: '我是万辉',
        next: 'bad_end_floor_8_name',
      },
      {
        text: '我是谁不重要',
        next: 'floor_8_correct',
      },
      {
        text: '你是谁？',
        next: 'floor_8_correct',
      },
    ],
  },

  bad_end_floor_8_name: {
    id: 'bad_end_floor_8_name',
    type: 'ending',
    endingType: 'bad',
    background: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    character: 'phone_voice',
    text: '"万辉...万辉...万辉..."\n\n电话里的声音不断重复着你的名字。\n你感觉到有什么东西从电话线里钻了出来...\n\n【坏结局：被夺走姓名】',
    flag: 'ending_floor_8_name',
  },

  floor_8_correct: {
    id: 'floor_8_correct',
    type: 'dialogue',
    character: 'phone_voice',
    text: '...聪明。\n那么，记住这个号码：4-7-2。\n你会需要它的。',
    next: 'floor_8_3',
  },

  floor_8_3: {
    id: 'floor_8_3',
    type: 'dialogue',
    character: 'narrator',
    text: '电话挂断了。\n房间的另一侧出现了一扇门，上面有一个密码锁。',
    next: 'floor_8_password',
    flag: 'got_password',
  },

  floor_8_password: {
    id: 'floor_8_password',
    type: 'choice',
    text: '密码锁需要输入三位数字...',
    choices: [
      {
        text: '输入 4-7-2',
        next: 'floor_8_end',
      },
      {
        text: '输入 7-4-2',
        next: 'bad_end_floor_8_wrong_code',
      },
      {
        text: '输入 2-4-7',
        next: 'bad_end_floor_8_wrong_code',
      },
    ],
  },

  bad_end_floor_8_wrong_code: {
    id: 'bad_end_floor_8_wrong_code',
    type: 'ending',
    endingType: 'bad',
    background: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    character: 'narrator',
    text: '密码错误。\n\n警报声响起，房间开始充满刺鼻的气体。\n你无法呼吸...\n\n【坏结局：错误的密码】',
    flag: 'ending_floor_8_code',
  },

  floor_8_end: {
    id: 'floor_8_end',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200',
    character: 'narrator',
    text: '门开了。你回到了电梯里。\n显示屏上的数字跳到了"1"。',
    next: 'floor_1_intro',
  },

  // ========== 第1层：最终层 ==========
  floor_1_intro: {
    id: 'floor_1_intro',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200',
    character: 'narrator',
    text: '【第1层】\n\n电梯门打开，眼前是一个空旷的大厅。\n中央站着一个身着白衣的人。',
    next: 'floor_1_1',
  },

  floor_1_1: {
    id: 'floor_1_1',
    type: 'dialogue',
    character: 'yinyu',
    text: '欢迎来到最底层，万辉。\n我是殷玉，掌管世界怪谈的神明。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'floor_1_2',
  },

  floor_1_2: {
    id: 'floor_1_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '神明...？这到底是怎么回事？\n为什么我会在这里？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'floor_1_3',
  },

  floor_1_3: {
    id: 'floor_1_3',
    type: 'dialogue',
    character: 'yinyu',
    text: '你还记得...在学校发生的事吗？',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'floor_1_4',
  },

  floor_1_4: {
    id: 'floor_1_4',
    type: 'dialogue',
    character: 'wanhui',
    text: '学校...我记得我在图书馆...\n然后...然后...！',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'floor_1_5',
  },

  floor_1_5: {
    id: 'floor_1_5',
    type: 'dialogue',
    character: 'yinyu',
    text: '你遭遇了一场"意外"。\n现在的你...已经无法在外界生存了。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'floor_1_6',
  },

  floor_1_6: {
    id: 'floor_1_6',
    type: 'dialogue',
    character: 'wanhui',
    text: '什么意思...无法生存？\n我...我到底怎么了？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'floor_1_7',
  },

  floor_1_7: {
    id: 'floor_1_7',
    type: 'dialogue',
    character: 'yinyu',
    text: '你的身体发生了变化。\n你现在...介于生与死之间。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'floor_1_8',
  },

  floor_1_8: {
    id: 'floor_1_8',
    type: 'dialogue',
    character: 'yinyu',
    text: '现在，你有两个选择。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'floor_1_9',
  },

  floor_1_9: {
    id: 'floor_1_9',
    type: 'dialogue',
    character: 'narrator',
    text: '殷玉指向大厅的两侧。\n左边是一扇普通的门，右边是一面巨大的镜子。',
    next: 'floor_1_10',
  },

  floor_1_10: {
    id: 'floor_1_10',
    type: 'dialogue',
    character: 'yinyu',
    text: '左边的门，通往冥界——真正的死亡。\n右边的镜子，通往镜中世界——另一种存在。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'final_choice',
  },

  final_choice: {
    id: 'final_choice',
    type: 'choice',
    text: '你该如何选择...？',
    choices: [
      {
        text: '走向左边的门（冥界）',
        next: 'choose_death',
      },
      {
        text: '走向右边的镜子（镜中世界）',
        next: 'choose_mirror_direct',
      },
    ],
  },

  // ========== 选择冥界路线 ==========
  choose_death: {
    id: 'choose_death',
    type: 'dialogue',
    character: 'wanhui',
    text: '我...我选择冥界。\n如果这就是结局，我接受。',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'death_1',
  },

  death_1: {
    id: 'death_1',
    type: 'dialogue',
    character: 'yinyu',
    text: '...你确定吗？\n一旦踏入那扇门，就再也回不来了。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'death_2',
  },

  death_2: {
    id: 'death_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '我确定。',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'death_3',
  },

  death_3: {
    id: 'death_3',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1200',
    character: 'narrator',
    text: '你走向了那扇门。\n门后是一片纯白的光...',
    next: 'death_4',
  },

  death_4: {
    id: 'death_4',
    type: 'dialogue',
    character: 'yinyu',
    text: '等等。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'death_5',
  },

  death_5: {
    id: 'death_5',
    type: 'dialogue',
    character: 'yinyu',
    text: '你的勇气...让我印象深刻。\n或许，你适合成为一名死神。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'death_6',
  },

  death_6: {
    id: 'death_6',
    type: 'dialogue',
    character: 'wanhui',
    text: '死神...？',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'death_7',
  },

  death_7: {
    id: 'death_7',
    type: 'dialogue',
    character: 'yinyu',
    text: '在镜中世界，我需要协助者。\n帮助那些迷失的灵魂...就像曾经的你一样。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'death_8',
  },

  death_8: {
    id: 'death_8',
    type: 'dialogue',
    character: 'yinyu',
    text: '这是我给你的邀请。\n你愿意...和我一起吗？',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'death_to_mirror',
  },

  death_to_mirror: {
    id: 'death_to_mirror',
    type: 'scene',
    background: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200',
    character: 'narrator',
    text: '你点了点头。\n殷玉微笑着，牵起你的手，走向了镜子。',
    next: 'true_ending',
  },

  // ========== 直接选择镜子 ==========
  choose_mirror_direct: {
    id: 'choose_mirror_direct',
    type: 'dialogue',
    character: 'wanhui',
    text: '我选择...镜中世界。',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'center',
    next: 'mirror_direct_1',
  },

  mirror_direct_1: {
    id: 'mirror_direct_1',
    type: 'dialogue',
    character: 'yinyu',
    text: '明智的选择。\n在那里，你将拥有新的身份——冥界的死神之一。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'right',
    next: 'mirror_direct_2',
  },

  mirror_direct_2: {
    id: 'mirror_direct_2',
    type: 'dialogue',
    character: 'wanhui',
    text: '死神...听起来不错。',
    characterSprite: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    characterPosition: 'left',
    next: 'mirror_direct_3',
  },

  mirror_direct_3: {
    id: 'mirror_direct_3',
    type: 'dialogue',
    character: 'yinyu',
    text: '那么，欢迎来到新世界。',
    characterSprite: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    characterPosition: 'center',
    next: 'true_ending',
  },

  // ========== 真结局 ==========
  true_ending: {
    id: 'true_ending',
    type: 'ending',
    endingType: 'good',
    background: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    cg: 'https://images.unsplash.com/photo-1469173479606-ada03df615aa?w=1200',
    character: 'narrator',
    text: '你穿过了���子。\n\n在镜中世界，万辉成为了殷玉的协助者。\n他引导着迷失的灵魂，帮助他们找到归宿。\n\n虽然失去了原本的生活...\n但在这里，他找到了新的意义。\n\n【真结局：镜中的死神】',
    flag: 'ending_true',
  },
};

// 游戏元数据
export const gameMetadata = {
  title: '镜界电梯',
  version: '1.0.0',
  startNode: 'start',
};
