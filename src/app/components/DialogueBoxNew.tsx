import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Character } from '../types/game';

interface DialogueBoxNewProps {
  character: string;
  characterData?: Character;
  text: string;
  onNext: () => void;
  isChoice: boolean;
  textSpeed: number; // 1-10
  isAutoPlay?: boolean;
  protagonistAvatar?: string; // 主角头像
  protagonistName?: string; // 主角名字
}

export const DialogueBoxNew: React.FC<DialogueBoxNewProps> = ({
  character,
  characterData,
  text,
  onNext,
  isChoice,
  textSpeed,
  isAutoPlay = false,
  protagonistAvatar,
  protagonistName = '万辉',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const textRef = useRef(text);
  const indexRef = useRef(0);

  const isProtagonist = character === protagonistName || character === '';
  const showingCharacter = character || '旁白';

  // 计算打字速度（ms per character）
  const charDelay = Math.max(10, 150 - textSpeed * 12);

  useEffect(() => {
    // 重置状态
    textRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    setIsSkipped(false);

    // 逐字显示
    const interval = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        setDisplayedText(textRef.current.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, charDelay);

    return () => clearInterval(interval);
  }, [text, charDelay]);

  // 自动播放逻辑
  useEffect(() => {
    if (isAutoPlay && isComplete && !isChoice) {
      const timer = setTimeout(() => {
        onNext();
      }, 500); // 停顿0.5秒
      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, isComplete, isChoice, onNext]);

  const handleClick = () => {
    if (!isComplete) {
      // 快速完成文字显示
      setDisplayedText(text);
      setIsComplete(true);
      setIsSkipped(true);
    } else if (!isChoice) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-30"
      onClick={handleClick}
    >
      <div className="max-w-4xl mx-auto">
        {/* 头像区域 */}
        {(protagonistAvatar || characterData?.avatar) && (
          <div className="flex justify-between mb-4 px-4">
            {/* 主角头像（左侧） */}
            {protagonistAvatar && (
              <motion.div
                animate={{
                  opacity: isProtagonist ? 1 : 0.3,
                  scale: isProtagonist ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
                  <img
                    src={protagonistAvatar}
                    alt={protagonistName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isProtagonist && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white"
                  />
                )}
              </motion.div>
            )}

            <div className="flex-1" />

            {/* 配角头像（右侧） */}
            {characterData?.avatar && !isProtagonist && (
              <motion.div
                animate={{
                  opacity: !isProtagonist ? 1 : 0.3,
                  scale: !isProtagonist ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
                  <img
                    src={characterData.avatar}
                    alt={character}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!isProtagonist && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white"
                  />
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* 对话框 */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
          {character && (
            <div className="text-lg md:text-xl font-semibold text-white mb-2">
              {showingCharacter}
            </div>
          )}
          <div className="text-base md:text-lg text-white/90 leading-relaxed whitespace-pre-wrap min-h-[3em]">
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-5 bg-white/70 ml-1"
              />
            )}
          </div>
          {!isChoice && isComplete && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 right-4 text-white/60 hover:text-white transition-colors"
              aria-label="下一句"
            >
              <ChevronRight className="w-6 h-6 animate-pulse" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
