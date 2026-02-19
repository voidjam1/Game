// 存档系统工具函数
import { SaveData, GameState, GameSettings } from '../types/game';

const SAVE_PREFIX = 'vn_save_';
const SETTINGS_KEY = 'vn_settings';
const MAX_SAVES = 10;

// 检查 localStorage 是否可用
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// 安全的 localStorage 操作
const safeSetItem = (key: string, value: string): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage 不可用（可能是隐私模式）');
    return false;
  }
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('localStorage 写入失败:', e);
    return false;
  }
};

const safeGetItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error('localStorage 读取失败:', e);
    return null;
  }
};

const safeRemoveItem = (key: string): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('localStorage 删除失败:', e);
  }
};

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
    safeSetItem(`${SAVE_PREFIX}${slot}`, JSON.stringify(saveData));
  },

  // 读取游戏
  loadGame(slot: number): SaveData | null {
    const data = safeGetItem(`${SAVE_PREFIX}${slot}`);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('存档数据解析失败:', e);
      return null;
    }
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
    safeRemoveItem(`${SAVE_PREFIX}${slot}`);
  },

  // 保存设置
  saveSettings(settings: GameSettings): void {
    safeSetItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // 读取设置
  loadSettings(): GameSettings {
    const data = safeGetItem(SETTINGS_KEY);
    if (!data) {
      return {
        textSpeed: 5,
        autoSpeed: 5,
        bgmVolume: 70,
        seVolume: 80,
        voiceVolume: 80,
      };
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('设置数据解析失败:', e);
      return {
        textSpeed: 5,
        autoSpeed: 5,
        bgmVolume: 70,
        seVolume: 80,
        voiceVolume: 80,
      };
    }
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