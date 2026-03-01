import React from 'react';
import { motion } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { DialogueHistoryEntry } from '../types/game';

interface DialogueHistoryPanelProps {
  history: DialogueHistoryEntry[];
  onClose: () => void;
}

export const DialogueHistoryPanel: React.FC<DialogueHistoryPanelProps> = ({
  history,
  onClose,
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
        className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden border border-white/20"
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-white" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              对话历史
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 历史列表 */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {history.length === 0 ? (
            <div className="text-center text-white/40 py-8">
              暂无对话记录
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <motion.div
                  key={`${entry.nodeId}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">
                      {entry.character || '旁白'}
                    </div>
                    <div className="text-white/40 text-sm">
                      {formatTime(entry.timestamp)}
                    </div>
                  </div>
                  <div className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">
                    {entry.text}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
