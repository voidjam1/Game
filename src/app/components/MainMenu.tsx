import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Image, Settings, Save, FolderOpen } from 'lucide-react';

interface MainMenuProps {
  onNewGame: () => void;
  onContinue: () => void;
  onLoad: () => void;
  onGallery: () => void;
  onSettings: () => void;
  hasSave: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onNewGame,
  onContinue,
  onLoad,
  onGallery,
  onSettings,
  hasSave,
}) => {
  const menuItems = [
    { label: '开始游戏', icon: Play, onClick: onNewGame, disabled: false },
    { label: '继续游戏', icon: BookOpen, onClick: onContinue, disabled: !hasSave },
    { label: '读取存档', icon: FolderOpen, onClick: onLoad, disabled: false },
    { label: 'CG画廊', icon: Image, onClick: onGallery, disabled: false },
    { label: '设置', icon: Settings, onClick: onSettings, disabled: false },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* 背景动画 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [Math.random() * 0.5, 0, Math.random() * 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* 菜单容器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* 游戏标题 */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            视觉小说
          </h1>
          <p className="text-white/60 text-sm md:text-base">Visual Novel Game</p>
        </motion.div>

        {/* 菜单项 */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={!item.disabled ? { x: 10, scale: 1.02 } : {}}
              whileTap={!item.disabled ? { scale: 0.98 } : {}}
              onClick={item.onClick}
              disabled={item.disabled}
              className={`w-full flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 transition-all ${
                item.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-white/20 cursor-pointer'
              }`}
            >
              <item.icon className="w-6 h-6 text-white" />
              <span className="text-lg text-white font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* 版本信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-white/40 text-sm"
        >
          Version 1.0.0
        </motion.div>
      </motion.div>
    </div>
  );
};