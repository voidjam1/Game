import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Save,
  FolderOpen,
  Settings,
  RotateCcw,
  SkipForward,
  Image as ImageIcon,
  History, // 新增：历史记录图标
  X,       // 新增：关闭图标
} from 'lucide-react';
import { DialogueNode, GameState, GameSettings, Character } from '../types/game'; // 确保引入 Character 类型
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
  // === 基础状态 ===
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
  
  // === 界面开关 ===
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // 新增：历史记录界面
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // === 新增：打字机 & 头像状态 ===
  const [displayedText, setDisplayedText] = useState(''); // 当前打字机显示的文字
  const [rightChar, setRightChar] = useState<Character | null>(null); // 右侧立绘（配角）
  
  // 计时器引用
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentNode = storyNodes[gameState.currentNodeId];

  // ==========================================
  // 核心逻辑 1: 处理节点变化 & 打字机
  // ==========================================
  useEffect(() => {
    if (!currentNode) return;

    // 1. 重置文字
    setDisplayedText('');
    
    // 2. 更新 CG 解锁
    if (currentNode.cg && !gameState.unlockedCGs.includes(currentNode.cg)) {
      setGameState((prev) => ({ ...prev, unlockedCGs: [...prev.unlockedCGs, currentNode.cg!] }));
    }

    // 3. 更新结局解锁
    if (currentNode.type === 'ending' && currentNode.flag && !gameState.unlockedEndings.includes(currentNode.flag)) {
      setGameState((prev) => ({ ...prev, unlockedEndings: [...prev.unlockedEndings, currentNode.flag!] }));
    }

    // 4. 更新右侧立绘 (如果不是旁白且不是万辉)
    if (currentNode.character && currentNode.character !== 'narrator' && currentNode.character !== 'wanhui') {
      const char = characters[currentNode.character];
      if (char) setRightChar(char);
    }

    // 5. 启动打字机
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);

    let currentIndex = 0;
    const fullText = currentNode.text || '';
    const speed = 30; // 打字速度 ms/字

    const typeChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeChar, speed);
      } else {
        // 打字结束，检查自动播放
        if (isAutoPlay && currentNode.type !== 'choice' && currentNode.type !== 'ending') {
          const delay = (11 - settings.autoSpeed) * 500; // 这里的延迟是打完字后的停顿
          autoPlayTimeoutRef.current = setTimeout(() => {
            handleNext();
          }, Math.max(delay, 500)); // 至少停顿0.5秒
        }
      }
    };

    // 如果是选项或结局，直接显示全文字，不打字
    if (currentNode.type === 'choice' || currentNode.type === 'ending') {
      setDisplayedText(fullText);
    } else {
      typeChar();
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };

  }, [currentNode, gameState.currentNodeId]); // 依赖 currentNodeId 变化触发


  // ==========================================
  // 核心逻辑 2: 交互处理
  // ==========================================
  const handleNext = useCallback(() => {
    if (!currentNode) return;

    // 如果文字还没打完，点击则瞬间显示全字
    if (displayedText.length < (currentNode.text?.length || 0) && currentNode.type !== 'choice') {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setDisplayedText(currentNode.text || '');
      return;
    }

    // 只有打完了字才能进下一句
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
  }, [currentNode, displayedText]);

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

  // ... (保留你原来的 handleSave, handleLoad 等函数，完全不用动)
  const handleSave = useCallback((slot: number) => {
      const screenshot = currentNode?.text || '游戏进行中';
      saveSystem.saveGame(slot, gameMetadata.title, screenshot, gameState.currentNodeId, gameState);
      setShowSaveMenu(false);
  }, [currentNode, gameState]);

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

  // ==========================================
  // 键盘快捷键
  // ==========================================
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showMenu || showSaveMenu || showLoadMenu || showGallery || showSettings || showHistory) return;

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
          handleBacklog(); // 这里是回退上一句
          break;
        case 'l': // 新增：按 L 键打开历史记录
          setShowHistory(true);
          break;
        case 'a':
          setIsAutoPlay((prev) => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentNode, showMenu, showSaveMenu, showLoadMenu, showGallery, showSettings, showHistory, handleNext, handleQuickSave, handleBacklog]);

  if (!currentNode) return <div>Loading...</div>;

  // ==========================================
  // 渲染逻辑
  // ==========================================
  const characterName = currentNode.character ? characters[currentNode.character]?.name : '';
  
  // 判断谁在说话
  const isWanhuiSpeaking = currentNode.character === 'wanhui';
  const isNarrator = currentNode.character === 'narrator' || !currentNode.character;
  const isOtherSpeaking = !isWanhuiSpeaking && !isNarrator;

  // 生成历史记录列表 (从 gameState.history 推导)
  const historyList = gameState.history.map(nodeId => {
     const node = storyNodes[nodeId];
     if (!node || !node.text) return null;
     const name = node.character ? characters[node.character]?.name : '';
     return { name, text: node.text };
  }).filter(item => item !== null);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-sans select-none">
      
      {/* 1. 背景层 */}
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
            <img src={currentNode.background} alt="BG" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" /> {/* 稍微压暗 */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CG层 */}
      <AnimatePresence>
        {currentNode.cg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/80"
          >
            <img src={currentNode.cg} alt="CG" className="max-h-full max-w-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. 新版双头像系统 (显示在对话框上方) */}
      <div className="absolute bottom-[30vh] left-0 w-full flex justify-between px-[10%] items-end pointer-events-none z-20">
        
        {/* 左侧：万辉 */}
        <motion.div 
          animate={{ 
            scale: isWanhuiSpeaking ? 1.1 : 1.0,
            filter: isWanhuiSpeaking ? 'brightness(1.1)' : 'brightness(0.5)',
            opacity: isWanhuiSpeaking ? 1 : 0.7
          }}
          className="transition-all duration-300 origin-bottom"
        >
          {characters.wanhui?.sprite && (
            <img 
              // 优先用剧情指定的表情，否则用默认
              src={currentNode.characterSprite || characters.wanhui.sprite} 
              alt="Wanhui" 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-white/20 shadow-2xl"
            />
          )}
        </motion.div>

        {/* 右侧：配角 */}
        <motion.div 
          animate={{ 
            scale: isOtherSpeaking ? 1.1 : 1.0,
            filter: isOtherSpeaking ? 'brightness(1.1)' : 'brightness(0.5)',
            opacity: isOtherSpeaking ? 1 : 0.7
          }}
          className="transition-all duration-300 origin-bottom"
        >
          {rightChar?.sprite && (
            <img 
              src={rightChar.sprite} 
              alt={rightChar.name} 
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-white/20 shadow-2xl"
            />
          )}
        </motion.div>
      </div>

      {/* 4. 对话框 (使用 displayedText) */}
      {(currentNode.type === 'dialogue' || currentNode.type === 'scene' || currentNode.type === 'ending') && currentNode.text && (
        <DialogueBox
          character={characterName}
          text={displayedText} // 这里用打字机文字
          onNext={handleNext}
          isChoice={false}
          isTyping={displayedText.length < currentNode.text.length} // 传递正在打字的状态
        />
      )}

      {/* 5. 选择面板 */}
      {currentNode.type === 'choice' && currentNode.choices && (
        <ChoicePanel choices={currentNode.choices} onSelect={handleChoice} />
      )}

      {/* 6. 顶部菜单按钮 */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         {/* 自动播放提示 */}
         {isAutoPlay && (
            <div className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-pulse">
              <SkipForward size={14} /> Auto
            </div>
         )}
         <button onClick={() => setShowMenu(true)} className="bg-black/50 p-2 rounded-full hover:bg-white/20 text-white">
           <Menu size={24} />
         </button>
      </div>

      {/* 7. 历史记录界面 (Modal) */}
      {showHistory && (
        <div className="absolute inset-0 z-[60] bg-black/90 flex flex-col p-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              <History /> 历史记录
            </h2>
            <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/20 rounded-full text-white">
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-6 pr-4">
            {historyList.map((log, i) => (
              <div key={i} className="flex flex-col gap-1">
                {log?.name && <span className="text-yellow-500 font-bold text-sm">{log.name}</span>}
                <p className="text-gray-300 leading-relaxed text-lg">{log?.text}</p>
              </div>
            ))}
            {/* 显示当前正在说的这一句 */}
             <div className="flex flex-col gap-1 opacity-50">
                {characterName && <span className="text-yellow-500 font-bold text-sm">{characterName}</span>}
                <p className="text-gray-300 leading-relaxed text-lg">{displayedText}</p>
              </div>
          </div>
        </div>
      )}

      {/* 8. 快捷菜单 (你的原版菜单，加了一个 History 按钮) */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-16 right-4 z-50 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 p-4 w-64 shadow-2xl"
          >
            <div className="space-y-2">
              <button onClick={() => { setShowHistory(true); setShowMenu(false); }} className="menu-btn">
                <History className="w-5 h-5" /> 历史记录
              </button>
              <button onClick={handleQuickSave} className="menu-btn">
                <Save className="w-5 h-5" /> 快速保存
              </button>
              <button onClick={() => { setShowSaveMenu(true); setShowMenu(false); }} className="menu-btn">
                <Save className="w-5 h-5" /> 存档
              </button>
              <button onClick={() => { setShowLoadMenu(true); setShowMenu(false); }} className="menu-btn">
                <FolderOpen className="w-5 h-5" /> 读档
              </button>
              <button onClick={() => setIsAutoPlay(!isAutoPlay)} className={`menu-btn ${isAutoPlay ? 'text-yellow-400' : ''}`}>
                <SkipForward className="w-5 h-5" /> 自动播放
              </button>
              <button onClick={() => { setShowGallery(true); setShowMenu(false); }} className="menu-btn">
                <ImageIcon className="w-5 h-5" /> 画廊
              </button>
              <button onClick={() => { setShowSettings(true); setShowMenu(false); }} className="menu-btn">
                <Settings className="w-5 h-5" /> 设置
              </button>
              <div className="h-px bg-white/10 my-2" />
              <button onClick={onReturnToMenu} className="menu-btn text-red-400 hover:bg-red-500/20">
                <RotateCcw className="w-5 h-5" /> 返回标题
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. 其他全屏界面 (存档、设置、画廊) */}
      {showSaveMenu && <SaveLoadMenu mode="save" saves={saveSystem.getAllSaves()} onClose={() => setShowSaveMenu(false)} onSave={handleSave} onDelete={handleDeleteSave} />}
      {showLoadMenu && <SaveLoadMenu mode="load" saves={saveSystem.getAllSaves()} onClose={() => setShowLoadMenu(false)} onLoad={handleLoad} onDelete={handleDeleteSave} />}
      {showGallery && <Gallery unlockedCGs={gameState.unlockedCGs} onClose={() => setShowGallery(false)} />}
      {showSettings && <SettingsMenu settings={settings} onClose={() => setShowSettings(false)} onSave={handleSettingsSave} />}
      
      {/* 简单的 CSS 辅助类 */}
      <style>{`
        .menu-btn {
          @apply w-full flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all text-left;
        }
      `}</style>
    </div>
  );
};
