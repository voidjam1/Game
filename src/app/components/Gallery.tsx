import React from 'react';
import { motion } from 'motion/react';
import { X, Image } from 'lucide-react';

interface GalleryProps {
  unlockedCGs: string[];
  onClose: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ unlockedCGs, onClose }) => {
  const [selectedCG, setSelectedCG] = React.useState<string | null>(null);

  // 所有可能的CG（包括未解锁的）
  const allCGs = [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-lg w-full max-w-5xl max-h-[85vh] overflow-hidden border border-white/20"
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Image className="w-6 h-6" />
            CG画廊
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CG网格 */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {allCGs.map((cg, index) => {
              const isUnlocked = unlockedCGs.includes(cg);
              return (
                <motion.div
                  key={index}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                    isUnlocked
                      ? 'border-white/20 cursor-pointer'
                      : 'border-white/10'
                  }`}
                  onClick={() => isUnlocked && setSelectedCG(cg)}
                >
                  {isUnlocked ? (
                    <img
                      src={cg}
                      alt={`CG ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-white/40">
                        <Image className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm">未解锁</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white/80">
                    CG #{index + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {unlockedCGs.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <Image className="w-16 h-16 mx-auto mb-4" />
              <p>还没有解锁任何CG</p>
              <p className="text-sm mt-2">继续游戏来解锁更多内容！</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* CG预览 */}
      {selectedCG && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedCG(null)}
        >
          <img
            src={selectedCG}
            alt="CG预览"
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </motion.div>
  );
};
