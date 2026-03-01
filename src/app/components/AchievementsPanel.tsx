import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Lock } from 'lucide-react';
import { Achievement } from '../types/game';

interface AchievementsPanelProps {
  allAchievements: Record<string, Achievement>;
  unlockedAchievements: string[];
  onClose: () => void;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  allAchievements,
  unlockedAchievements,
  onClose,
}) => {
  const achievementsList = Object.values(allAchievements);
  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievementsList.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden border border-white/20"
      >
        {/* 标题栏 */}
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl md:text-2xl font-bold text-white">
                成就系统
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 进度条 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">
                已解锁: {unlockedCount} / {totalCount}
              </span>
              <span className="text-white/80">{progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              />
            </div>
          </div>
        </div>

        {/* 成就列表 */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-160px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {achievementsList.map((achievement, index) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-lg border p-4 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`text-3xl ${
                        isUnlocked ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {isUnlocked ? (
                        achievement.icon || '🏆'
                      ) : (
                        <Lock className="w-8 h-8 text-white/40" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold mb-1 ${
                          isUnlocked ? 'text-white' : 'text-white/40'
                        }`}
                      >
                        {isUnlocked ? achievement.title : '???'}
                      </div>
                      <div
                        className={`text-sm ${
                          isUnlocked ? 'text-white/80' : 'text-white/30'
                        }`}
                      >
                        {isUnlocked ? achievement.description : '未解锁'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
