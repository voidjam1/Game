import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  character: string;
  text: string;
  onNext: () => void;
  isChoice: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  character,
  text,
  onNext,
  isChoice,
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 left-0 right-0 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
        {character && (
          <div className="text-lg md:text-xl font-semibold text-white mb-2">
            {character}
          </div>
        )}
        <div className="text-base md:text-lg text-white/90 leading-relaxed whitespace-pre-wrap">
          {text}
        </div>
        {!isChoice && (
          <button
            onClick={onNext}
            className="absolute bottom-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="下一句"
          >
            <ChevronRight className="w-6 h-6 animate-pulse" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
