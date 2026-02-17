import React from 'react';
import { motion } from 'motion/react';
import { X, Save, Trash2 } from 'lucide-react';
import { SaveData } from '../types/game';

interface SaveLoadMenuProps {
  mode: 'save' | 'load';
  saves: (SaveData | null)[];
  onClose: () => void;
  onSave?: (slot: number) => void;
  onLoad?: (slot: number) => void;
  onDelete?: (slot: number) => void;
}

export const SaveLoadMenu: React.FC<SaveLoadMenuProps> = ({
  mode,
  saves,
  onClose,
  onSave,
  onLoad,
  onDelete,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSlotClick = (slot: number) => {
    if (mode === 'save' && onSave) {
      onSave(slot);
    } else if (mode === 'load' && onLoad && saves[slot - 1]) {
      onLoad(slot);
    }
  };

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
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {mode === 'save' ? '保存游戏' : '读取游戏'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 存档列表 */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {saves.map((save, index) => {
              const slot = index + 1;
              const isEmpty = !save;
              const isLoadDisabled = mode === 'load' && isEmpty;

              return (
                <motion.div
                  key={slot}
                  whileHover={!isLoadDisabled ? { scale: 1.02 } : {}}
                  className={`relative bg-white/5 rounded-lg border border-white/10 p-4 transition-all ${
                    isLoadDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white/10 cursor-pointer'
                  }`}
                  onClick={() => !isLoadDisabled && handleSlotClick(slot)}
                >
                  {/* 存档槽编号 */}
                  <div className="absolute top-2 left-2 bg-white/20 rounded px-2 py-1 text-xs font-semibold text-white">
                    存档 {slot}
                  </div>

                  {isEmpty ? (
                    <div className="h-24 flex items-center justify-center text-white/40">
                      {mode === 'save' ? (
                        <div className="text-center">
                          <Save className="w-8 h-8 mx-auto mb-2" />
                          <div>空存档位</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div>没有存档</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="pt-6 space-y-2">
                        <div className="text-white font-medium truncate">
                          {save.screenshot}
                        </div>
                        <div className="text-white/60 text-sm">
                          {formatDate(save.timestamp)}
                        </div>
                      </div>

                      {/* 删除按钮 */}
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(slot);
                          }}
                          className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/40 rounded p-1.5 text-red-400 transition-colors"
                          aria-label="删除存档"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
