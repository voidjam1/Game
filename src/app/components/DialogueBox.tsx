import React from 'react';

interface DialogueBoxProps {
  character?: string;
  text: string;
  onNext: () => void;
  isChoice?: boolean;
  isTyping?: boolean;
  
  // 新增：头像属性
  leftSprite?: string;
  rightSprite?: string;
  isLeftSpeaking?: boolean;
  isRightSpeaking?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  character, 
  text, 
  onNext, 
  isTyping,
  leftSprite,
  rightSprite,
  isLeftSpeaking,
  isRightSpeaking
}) => {
  return (
    <div 
      className="absolute bottom-0 w-full z-30 flex justify-center pb-8 px-4"
      onClick={onNext}
    >
      {/* === 对话框本体 (纯黑 + 灰色边框) === */}
      <div className="w-full max-w-5xl h-48 bg-black border-2 border-gray-600 shadow-2xl relative flex items-center">
        
        {/* === 左侧头像 (万辉) === */}
        <div className="w-40 h-full flex-shrink-0 border-r border-gray-700 bg-gray-900 flex items-center justify-center p-2 relative overflow-hidden">
           {leftSprite ? (
             <img 
               src={leftSprite} 
               alt="Left" 
               className={`w-32 h-32 object-cover border-2 border-gray-500 transition-all duration-300 ${isLeftSpeaking ? 'brightness-110 scale-105 border-white' : 'brightness-50 grayscale opacity-60'}`}
             />
           ) : (
             <div className="w-32 h-32 bg-gray-800 border border-gray-700" /> // 占位符
           )}
        </div>

        {/* === 中间文字区域 === */}
        <div className="flex-1 h-full p-6 relative flex flex-col">
          {/* 名字 (左上角) */}
          {character && (
            <div className="text-red-500 font-bold text-xl tracking-widest mb-2 font-serif">
              {character}
            </div>
          )}
          
          {/* 正文 (白色宋体/衬线体，更有恐怖感) */}
          <p className="text-gray-200 text-xl leading-relaxed font-serif tracking-wide whitespace-pre-wrap flex-1">
            {text}
            {isTyping && <span className="inline-block w-3 h-5 bg-red-600 ml-1 animate-pulse align-middle"/>}
          </p>

          {/* 下一步提示箭头 (红色的倒三角) */}
          {!isTyping && (
             <div className="absolute bottom-4 right-4 animate-bounce text-red-600 text-2xl">
               ▼
             </div>
          )}
        </div>

        {/* === 右侧头像 (配角) === */}
        <div className="w-40 h-full flex-shrink-0 border-l border-gray-700 bg-gray-900 flex items-center justify-center p-2 relative overflow-hidden">
           {rightSprite ? (
             <img 
               src={rightSprite} 
               alt="Right" 
               className={`w-32 h-32 object-cover border-2 border-gray-500 transition-all duration-300 ${isRightSpeaking ? 'brightness-110 scale-105 border-white' : 'brightness-50 grayscale opacity-60'}`}
             />
           ) : (
             // 如果没人说话，显示空黑块
             <div className="w-32 h-32 bg-transparent" />
           )}
        </div>

      </div>
    </div>
  );
};
