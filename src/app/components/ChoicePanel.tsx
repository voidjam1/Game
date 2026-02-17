import React from 'react';
import { motion } from 'motion/react';
import { Choice } from '../types/game';

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export const ChoicePanel: React.FC<ChoicePanelProps> = ({ choices, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="w-full max-w-2xl space-y-3 md:space-y-4">
        {choices.map((choice, index) => (
          <motion.button
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(choice)}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 md:p-6 text-left text-white text-base md:text-lg transition-all"
          >
            <span className="text-white/60 mr-2">{index + 1}.</span>
            {choice.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
