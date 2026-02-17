import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Save,
  FolderOpen,
  Settings,
  RotateCcw,
  SkipForward,
  Volume2,
  Image as ImageIcon,
} from 'lucide-react';
import { DialogueNode, GameState, GameSettings } from '../types/game';
import { DialogueBox } from './DialogueBox';
import { ChoicePanel } from './ChoicePanel';
import { SaveLoadMenu } from './SaveLoadMenu';
import { Gallery } from './Gallery';
import { SettingsMenu } from './SettingsMenu';
import { saveSystem } from '../utils/saveSystem';
import { storyNodes, characters, gameMetadata } from '../data/story';

interface GameEngineProps {
  onReturnToMenu: () => void;
  startNode?: string;
  loadedState?: GameState;
}

export const GameEngine: React.FC<GameEngineProps> = ({
  onReturnToMenu,
  startNode,
  loadedState,
}) => {
  const [gameState, setGameState] = useState<GameState>(
    loadedState || {
      currentNodeId: startNode || gameMetadata.startNode,
      flags: {},
      history: [],
      unlockedCGs: [],
      unlockedEndings: [],
    }
  );

  const [settings, setSettings] = useState<GameSettings>(saveSystem.loadSettings());
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const currentNode = storyNodes[gameState.currentNodeId];

  // 处理CG解锁
  useEffect(() => {
    if (currentNode?.cg && !gameState.unlockedCGs.includes(currentNode.cg)) {
      setGameState((prev) => ({
        ...prev,
        unlockedCGs: [...prev.unlockedCGs, currentNode.cg!],
      }));
    }
  }, [currentNode, gameState.unlockedCGs]);

  // 处理结局解锁
  useEffect(() => {
    if (currentNode?.type === 'ending' && currentNode.flag) {
      if (!gameState.unlockedEndings.includes(currentNode.flag)) {
        setGameState((prev) => ({
          ...prev,
          unlockedEndings: [...prev.unlockedEndings, currentNode.flag!],
        }));
      }
    }
  }, [currentNode, gameState.unlockedEndings]);

  // 自动播放
  useEffect(() => {
    if (isAutoPlay && currentNode?.type === 'dialogue' && currentNode.next) {
      const delay = (11 - settings.autoSpeed) * 1000;
      const timer = setTimeout(() => {
        handleNext();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, currentNode, settings.autoSpeed]);

  const handleNext = useCallback(() => {
    if (!currentNode) return;

    // 设置标记
    if (currentNode.flag) {
      setGameState((prev) => ({
        ...prev,
        flags: { ...prev.flags, [currentNode.flag!]: true },
      }));
    }

    if (currentNode.next) {
      setGameState((prev) => ({
        ...prev,
        currentNodeId: currentNode.next!,
        history: [...prev.history, prev.currentNodeId],
      }));
    }
  }, [currentNode]);

  const handleChoice = useCallback(
    (choice: { text: string; next: string; flag?: string; flagValue?: any }) => {
      const newFlags = { ...gameState.flags };
      if (choice.flag && choice.flagValue !== undefined) {
        newFlags[choice.flag] = choice.flagValue;
      }

      setGameState((prev) => ({
        ...prev,
        currentNodeId: choice.next,
        history: [...prev.history, prev.currentNodeId],
        flags: newFlags,
      }));
    },
    [gameState.flags]
  );

  const handleSave = useCallback(
    (slot: number) => {
      const screenshot = currentNode?.text || '游戏进行中';
      saveSystem.saveGame(slot, gameMetadata.title, screenshot, gameState.currentNodeId, gameState);
      setShowSaveMenu(false);
    },
    [currentNode, gameState]
  );

  const handleLoad = useCallback((slot: number) => {
    const saveData = saveSystem.loadGame(slot);
    if (saveData) {
      setGameState(saveData.state);
      setShowLoadMenu(false);
    }
  }, []);

  const handleDeleteSave = useCallback((slot: number) => {
    saveSystem.deleteSave(slot);
    setShowSaveMenu(false);
    setShowLoadMenu(false);
  }, []);

  const handleSettingsSave = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSystem.saveSettings(newSettings);
  }, []);

  const handleQuickSave = useCallback(() => {
    const screenshot = currentNode?.text || '游戏进行中';
    saveSystem.quickSave(gameMetadata.title, screenshot, gameState.currentNodeId, gameState);
  }, [currentNode, gameState]);

  const handleBacklog = useCallback(() => {
    if (gameState.history.length > 0) {
      const previousNodeId = gameState.history[gameState.history.length - 1];
      setGameState((prev) => ({
        ...prev,
        currentNodeId: previousNodeId,
        history: prev.history.slice(0, -1),
      }));
    }
  }, [gameState.history]);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showMenu || showSaveMenu || showLoadMenu || showGallery || showSettings) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          if (currentNode?.type === 'dialogue' || currentNode?.type === 'scene') {
            handleNext();
          }
          break;
        case 's':
          if (e.ctrlKey) {
            e.preventDefault();
            handleQuickSave();
          }
          break;
        case 'ArrowLeft':
          handleBacklog();
          break;
        case 'a':
          setIsAutoPlay((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentNode, showMenu, showSaveMenu, showLoadMenu, showGallery, showSettings, handleNext, handleQuickSave, handleBacklog]);

  if (!currentNode) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">游戏节点不存在</p>
          <button
            onClick={onReturnToMenu}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
          >
            返回主菜单
          </button>
        </div>
      </div>
    );
  }

  const characterName = currentNode.character ? characters[currentNode.character]?.name : '';

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* 背景图片 */}
      <AnimatePresence mode="wait">
        {currentNode.background && (
          <motion.div
            key={currentNode.background}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={currentNode.background}
              alt="背景"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CG显示 */}
      <AnimatePresence>
        {currentNode.cg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <img src={currentNode.cg} alt="CG" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 角色立绘 */}
      <AnimatePresence>
        {currentNode.characterSprite && (
          <motion.div
            key={currentNode.characterSprite}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`absolute bottom-0 z-20 h-[70%] ${
              currentNode.characterPosition === 'left'
                ? 'left-0 md:left-[10%]'
                : currentNode.characterPosition === 'right'
                ? 'right-0 md:right-[10%]'
                : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <img
              src={currentNode.characterSprite}
              alt={characterName}
              className="h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 对话框 */}
      {(currentNode.type === 'dialogue' || currentNode.type === 'scene' || currentNode.type === 'ending') && currentNode.text && (
        <DialogueBox
          character={characterName}
          text={currentNode.text}
          onNext={handleNext}
          isChoice={false}
        />
      )}

      {/* 选择面板 */}
      {currentNode.type === 'choice' && currentNode.choices && (
        <ChoicePanel choices={currentNode.choices} onSelect={handleChoice} />
      )}

      {/* 顶部工具栏 */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-white/60 text-sm hidden md:block">
            Ctrl+S: 快速保存 | Space: 继续 | A: 自动播放
          </div>
        </div>
      </div>

      {/* 快捷菜单 */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-4 z-40 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 p-2 min-w-[200px]"
          >
            <button
              onClick={handleQuickSave}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <Save className="w-5 h-5" />
              快速保存
            </button>
            <button
              onClick={() => {
                setShowSaveMenu(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <Save className="w-5 h-5" />
              保存
            </button>
            <button
              onClick={() => {
                setShowLoadMenu(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <FolderOpen className="w-5 h-5" />
              读取
            </button>
            <button
              onClick={handleBacklog}
              disabled={gameState.history.length === 0}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors disabled:opacity-40"
            >
              <RotateCcw className="w-5 h-5" />
              回退
            </button>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors ${
                isAutoPlay ? 'bg-white/20' : ''
              }`}
            >
              <SkipForward className="w-5 h-5" />
              自动播放 {isAutoPlay ? '✓' : ''}
            </button>
            <button
              onClick={() => {
                setShowGallery(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              画廊
            </button>
            <button
              onClick={() => {
                setShowSettings(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <Settings className="w-5 h-5" />
              设置
            </button>
            <div className="border-t border-white/20 my-2" />
            <button
              onClick={onReturnToMenu}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              返回主菜单
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 自动播放指示器 */}
      {isAutoPlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 z-30 bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-2"
        >
          <SkipForward className="w-4 h-4" />
          自动播放中
        </motion.div>
      )}

      {/* 存档菜单 */}
      {showSaveMenu && (
        <SaveLoadMenu
          mode="save"
          saves={saveSystem.getAllSaves()}
          onClose={() => setShowSaveMenu(false)}
          onSave={handleSave}
          onDelete={handleDeleteSave}
        />
      )}

      {/* 读档菜单 */}
      {showLoadMenu && (
        <SaveLoadMenu
          mode="load"
          saves={saveSystem.getAllSaves()}
          onClose={() => setShowLoadMenu(false)}
          onLoad={handleLoad}
          onDelete={handleDeleteSave}
        />
      )}

      {/* 画廊 */}
      {showGallery && (
        <Gallery unlockedCGs={gameState.unlockedCGs} onClose={() => setShowGallery(false)} />
      )}

      {/* 设置 */}
      {showSettings && (
        <SettingsMenu
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsSave}
        />
      )}
    </div>
  );
};
