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
  History,
  X,
} from 'lucide-react';
import { DialogueNode, GameState, GameSettings, Character } from '../types/game';
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
  const [showHistory, setShowHistory] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // === 核心状态：打字机、分行、头像 ===
  const [displayedText, setDisplayedText] = useState(''); // 当前屏幕上显示的字
  const [rightChar, setRightChar] = useState<Character | null>(null); // 配角立绘
  
  // === 新增：分行控制状态 ===
  const [subLines, setSubLines] = useState<string[]>([]); // 当前节点拆分后的所有行
  const [subLineIndex, setSubLineIndex] = useState(0);    // 当前正在显示第几行
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentNode = storyNodes[gameState.currentNodeId];

  // ==========================================
  // 核心逻辑 1: 节点初始化 (拆分文本)
  // ==========================================
  useEffect(() => {
    if (!currentNode) return;

    // 1. 更新 CG 和 结局解锁 (保持不变)
    if (currentNode.cg && !gameState.unlockedCGs.includes(currentNode.cg)) {
      setGameState((prev) => ({ ...prev, unlockedCGs: [...prev.unlockedCGs, currentNode.cg!] }));
    }
    if (currentNode.type === 'ending' && currentNode.flag && !gameState.unlockedEndings.includes(currentNode.flag)) {
      setGameState((prev) => ({ ...prev, unlockedEndings: [...prev.unlockedEndings, currentNode.flag!] }));
    }

    // 2. 更新右侧立绘
    if (currentNode.character && currentNode.character !== 'narrator' && currentNode.character !== 'wanhui') {
      const char = characters[currentNode.character];
      if (char) setRightChar(char);
    }

    // 3. 【关键修改】拆分文本
    // 如果是选项或结局，不拆分，直接当做一行
    if (currentNode.type === 'choice' || currentNode.type === 'ending') {
      setSubLines([currentNode.text || '']);
    } else {
      // 按照换行符 \n 拆分，并且过滤掉完全空白的行（可选）
      const rawText = currentNode.text || '';
      const lines = rawText.split('\n'); 
      // 如果你想保留空行作为一个停顿，就直接用 split('\n')
      // 如果你想去掉空行，可以用 .filter(line => line.trim() !== '')
      setSubLines(lines.length > 0 ? lines : ['']);
    }
    
    // 重置到第一行
    setSubLineIndex(0);
    setDisplayedText('');

  }, [currentNode, gameState.currentNodeId]);


  // ==========================================
  // 核心逻辑 2: 打字机效果 (针对每一行)
  // ==========================================
  useEffect(() => {
    if (!currentNode || subLines.length === 0) return;

    // 获取当前要显示的那一行文字
    const targetText = subLines[subLineIndex] || '';

    // 清理旧的计时器
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);

    let currentIndex = 0;
    const speed = 80; // 打字速度

    // 定义打字函数
    const typeChar = () => {
      // 如果当前显示的字还没达到目标长度
      if (currentIndex < targetText.length) {
        setDisplayedText(targetText.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeChar, speed);
      } else {
        // === 这一行打完了 ===
        
        // 如果开启了自动播放
        if (isAutoPlay && currentNode.type !== 'choice' && currentNode.type !== 'ending') {
          const delay = (11 - settings.autoSpeed) * 500;
          autoPlayTimeoutRef.current = setTimeout(() => {
            handleNext(); // 自动触发下一步
          }, Math.max(delay, 1000));
        }
      }
    };

    // 如果是选项或结局，直接显示（不打字）
    if (currentNode.type === 'choice' || currentNode.type === 'ending') {
      setDisplayedText(targetText);
    } else {
      // 开始打字前先清空，防止上一句残留
      setDisplayedText(''); 
      typeChar();
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [subLines, subLineIndex, isAutoPlay, currentNode, settings.autoSpeed]); // 依赖 subLineIndex 变化


  // ==========================================
  // 核心逻辑 3: 点击交互 (下一句/下一节点)
  // ==========================================
  const handleNext = useCallback(() => {
    if (!currentNode || subLines.length === 0) return;

    const targetText = subLines[subLineIndex] || '';

    // 1. 如果还在打字，瞬间显示全句
    if (displayedText.length < targetText.length && currentNode.type !== 'choice') {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setDisplayedText(targetText);
      return;
    }

    // 2. 如果打完了，检查还有没有下一行
    if (subLineIndex < subLines.length - 1) {
      // 还有下一行，索引+1，触发 useEffect 重新打字
      setSubLineIndex(prev => prev + 1);
      return;
    }

    // 3. 所有行都显示完了，执行跳转逻辑 (原来的逻辑)
    
    // 设置 flag
    if (currentNode.flag) {
      setGameState((prev) => ({
        ...prev,
        flags: { ...prev.flags, [currentNode.flag!]: true },
      }));
    }

    // 跳转 next
    if (currentNode.next) {
      // 记录历史（记录整个节点的文本，而不是一行行记录，这样回看比较方便）
      setGameState((prev) => ({
        ...prev,
        currentNodeId: currentNode.next!,
        history: [...prev.history, prev.currentNodeId],
      }));
    }
  }, [currentNode, displayedText, subLines, subLineIndex]);

  // (保留原来的 handleChoice, handleSave 等...)
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

  const handleSave = useCallback((slot: number) => {
      const screenshot = displayedText || '游戏进行中';
      saveSystem.saveGame(slot, gameMetadata.title, screenshot, gameState.currentNodeId, gameState);
      setShowSaveMenu(false);
  }, [displayedText, gameState]);

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
    const screenshot = displayedText || '游戏进行中';
    saveSystem.quickSave(gameMetadata.title, screenshot, gameState.currentNodeId, gameState);
  }, [displayedText, gameState]);

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

  // 键盘事件
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
          handleBacklog();
          break;
        case 'l':
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

  // 渲染逻辑
  const characterName = currentNode.character ? characters[currentNode.character]?.name : '';
  
  const isWanhuiSpeaking = currentNode.character === 'wanhui';
  const isNarrator = currentNode.character === 'narrator' || !currentNode.character;
  const isOtherSpeaking = !isWanhuiSpeaking && !isNarrator;

  // 历史记录生成
  const historyList = gameState.history.map(nodeId => {
     const node = storyNodes[nodeId];
     if (!node || !node.text) return null;
     const name = node.character ? characters[node.character]?.name : '';
     return { name, text: node.text }; // 历史记录显示完整文本
  }).filter(item => item !== null);

  // 判断是否是最后一行（用于显示选项）
  const isLastLine = subLineIndex === subLines.length - 1;
  const isTypingFinished = displayedText.length === (subLines[subLineIndex] || '').length;
  const showChoices = currentNode.type === 'choice' && isLastLine && isTypingFinished;

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
            <img src={currentNode.background} alt="BG" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-black/40" />
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/90"
          >
            <img src={currentNode.cg} alt="CG" className="max-h-full max-w-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. 对话框 (集成头像) */}
      {(currentNode.type === 'dialogue' || currentNode.type === 'scene' || currentNode.type === 'ending' || currentNode.type === 'choice') && (
        <DialogueBox
          character={characterName}
          text={displayedText} // 显示当前这一行的字
          onNext={handleNext}
          
          // 只有打字中才显示光标
          isTyping={!isTypingFinished}
          
          leftSprite={currentNode.characterSprite || characters.wanhui?.sprite}
          rightSprite={rightChar?.sprite}
          isLeftSpeaking={isWanhuiSpeaking}
          isRightSpeaking={isOtherSpeaking}
        />
      )}

      {/* 4. 选择面板 (只有在最后一行文字显示完后才出现) */}
      {showChoices && currentNode.choices && (
        <ChoicePanel choices={currentNode.choices} onSelect={handleChoice} />
      )}

      {/* 5. 顶部菜单按钮 */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         {isAutoPlay && (
            <div className="bg-red-900/80 text-white px-3 py-1 text-sm flex items-center gap-2 animate-pulse border border-red-500/30">
              <SkipForward size={14} /> Auto
            </div>
         )}
         <button onClick={() => setShowMenu(true)} className="bg-black/80 border border-white/20 p-2 hover:bg-white/10 text-white transition-colors">
           <Menu size={24} />
         </button>
      </div>

      {/* 6. 历史记录 (显示完整段落) */}
      {showHistory && (
        <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col p-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-200">
              <History /> 历史记录
            </h2>
            <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/10 text-white">
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-6 pr-4">
            {historyList.map((log, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-gray-800 pb-4">
                {log?.name && <span className="text-red-500 font-bold text-sm tracking-wider">{log.name}</span>}
                <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">{log?.text}</p>
              </div>
            ))}
             {/* 当前显示的完整文本（方便回看当前句） */}
             <div className="flex flex-col gap-1 opacity-50">
                {characterName && <span className="text-red-500 font-bold text-sm tracking-wider">{characterName}</span>}
                <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-wrap">{currentNode.text}</p>
              </div>
          </div>
        </div>
      )}

      {/* 7. 快捷菜单 */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-16 right-4 z-50 bg-black border border-gray-700 p-4 w-64 shadow-2xl"
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
              <button onClick={() => setIsAutoPlay(!isAutoPlay)} className={`menu-btn ${isAutoPlay ? 'text-red-500' : ''}`}>
                <SkipForward className="w-5 h-5" /> 自动播放
              </button>
              <button onClick={() => { setShowGallery(true); setShowMenu(false); }} className="menu-btn">
                <ImageIcon className="w-5 h-5" /> 画廊
              </button>
              <button onClick={() => { setShowSettings(true); setShowMenu(false); }} className="menu-btn">
                <Settings className="w-5 h-5" /> 设置
              </button>
              <div className="h-px bg-gray-700 my-2" />
              <button onClick={onReturnToMenu} className="menu-btn text-red-400 hover:bg-red-900/20">
                <RotateCcw className="w-5 h-5" /> 返回标题
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSaveMenu && <SaveLoadMenu mode="save" saves={saveSystem.getAllSaves()} onClose={() => setShowSaveMenu(false)} onSave={handleSave} onDelete={handleDeleteSave} />}
      {showLoadMenu && <SaveLoadMenu mode="load" saves={saveSystem.getAllSaves()} onClose={() => setShowLoadMenu(false)} onLoad={handleLoad} onDelete={handleDeleteSave} />}
      {showGallery && <Gallery unlockedCGs={gameState.unlockedCGs} onClose={() => setShowGallery(false)} />}
      {showSettings && <SettingsMenu settings={settings} onClose={() => setShowSettings(false)} onSave={handleSettingsSave} />}
      
      <style>{`
        .menu-btn {
          @apply w-full flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 transition-all text-left border border-transparent hover:border-gray-600;
        }
      `}</style>
    </div>
  );
};
