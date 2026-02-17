// 游戏数据类型定义

export type CharacterPosition = 'left' | 'center' | 'right';

export interface Character {
  id: string;
  name: string;
  sprite: string; // 图片URL或路径
}

export interface DialogueNode {
  id: string;
  type: 'dialogue' | 'choice' | 'scene' | 'ending';
  character?: string; // 角色ID
  text?: string; // 对话文本
  background?: string; // 背景图片
  characterSprite?: string; // 角色立绘
  characterPosition?: CharacterPosition; // 角色位置
  cg?: string; // CG图片
  choices?: Choice[]; // 选择选项
  next?: string; // 下一个节点ID
  flag?: string; // 设置的标记
  condition?: { flag: string; value: any }; // 条件判断
  endingType?: string; // 结局类型
}

export interface Choice {
  text: string;
  next: string; // 指向的节点ID
  flag?: string; // 设置的标记
  flagValue?: any; // 标记值
}

export interface GameState {
  currentNodeId: string;
  flags: Record<string, any>; // 游戏标记
  history: string[]; // 历史节点ID
  unlockedCGs: string[]; // 已解锁的CG
  unlockedEndings: string[]; // 已解锁的结局
}

export interface SaveData {
  slot: number;
  timestamp: number;
  gameName: string;
  screenshot: string; // 当前场景截图描述
  currentNode: string;
  state: GameState;
}

export interface GameSettings {
  textSpeed: number; // 文字显示速度 (1-10)
  autoSpeed: number; // 自动播放速度 (1-10)
  bgmVolume: number; // 背景音乐音量 (0-100)
  seVolume: number; // 音效音量 (0-100)
  voiceVolume: number; // 语音音量 (0-100)
}
