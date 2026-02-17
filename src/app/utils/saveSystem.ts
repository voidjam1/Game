// 存档系统工具函数
import { SaveData, GameState, GameSettings } from '../types/game';

const SAVE_PREFIX = 'vn_save_';
const SETTINGS_KEY = 'vn_settings';
const MAX_SAVES = 10;

export const saveSystem = {
  // 保存游戏
  saveGame(slot: number, gameName: string, screenshot: string, currentNode: string, state: GameState): void {
    const saveData: SaveData = {
      slot,
      timestamp: Date.now(),
      gameName,
      screenshot,
      currentNode,
      state,
    };
    localStorage.setItem(`${SAVE_PREFIX}${slot}`, JSON.stringify(saveData));
  },

  // 读取游戏
  loadGame(slot: number): SaveData | null {
    const data = localStorage.getItem(`${SAVE_PREFIX}${slot}`);
    if (!data) return null;
    return JSON.parse(data);
  },

  // 获取所有存档
  getAllSaves(): (SaveData | null)[] {
    const saves: (SaveData | null)[] = [];
    for (let i = 1; i <= MAX_SAVES; i++) {
      saves.push(this.loadGame(i));
    }
    return saves;
  },

  // 删除存档
  deleteSave(slot: number): void {
    localStorage.removeItem(`${SAVE_PREFIX}${slot}`);
  },

  // 保存设置
  saveSettings(settings: GameSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // 读取设置
  loadSettings(): GameSettings {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      return {
        textSpeed: 5,
        autoSpeed: 5,
        bgmVolume: 70,
        seVolume: 80,
        voiceVolume: 80,
      };
    }
    return JSON.parse(data);
  },

  // 快速保存
  quickSave(gameName: string, screenshot: string, currentNode: string, state: GameState): void {
    this.saveGame(0, gameName, screenshot, currentNode, state);
  },

  // 快速读取
  quickLoad(): SaveData | null {
    return this.loadGame(0);
  },
};
