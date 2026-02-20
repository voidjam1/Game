import React from 'react';

interface DialogueBoxProps {
  character?: string;
  text: string;
  onNext: () => void;
  isChoice?: boolean;
  isTyping?: boolean; // 新增属性
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  character, 
  text, 
  onNext, 
  isTyping 
}) => {
  return (
    <div 
      className="absolute bottom-0 w-full p-4 md:p-8 pb-12 z-30 bg-gradient-to-t from-black via-black/90 to-transparent pt-24 cursor-pointer"
      onClick={onNext}
    >
      <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 min-h-[160px] relative shadow-2xl hover:border-white/30 transition-colors">
        
        {/* 名字栏 */}
        {character && (
          <div className="absolute -top-5 left-6 bg-yellow-600 text-white px-6 py-1 rounded-t-lg font-bold tracking-widest shadow-lg text-lg">
            {character}
          </div>
        )}

        {/* 文字内容 */}
        <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium whitespace-pre-wrap">
          {text}
          {/* 光标：如果正在打字，显示光标 */}
          {isTyping && <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse align-middle"/>}
        </p>
        
        {/* 下一步提示箭头 (不打字时显示) */}
        {!isTyping && (
           <div className="absolute bottom-4 right-4 animate-bounce text-yellow-500">
             ▼
           </div>
        )}
      </div>
    </div>
  );
};
