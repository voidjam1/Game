import React, { useState, useEffect } from 'react';

export const DebugInfo: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({
    userAgent: '',
    viewport: '',
    platform: '',
    online: true,
  });

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth} x ${window.innerHeight}`,
        platform: navigator.platform,
        online: navigator.onLine,
      });
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    return () => window.removeEventListener('resize', updateInfo);
  }, []);

  // 按住屏幕右下角3秒显示调试信息
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    const { innerWidth, innerHeight } = window;

    // 检测是否在右下角 (50x50 区域)
    if (clientX > innerWidth - 50 && clientY > innerHeight - 50) {
      setTimeout(() => setVisible(true), 3000);
    }
  };

  if (!visible) {
    return (
      <div
        className="fixed bottom-0 right-0 w-12 h-12 opacity-0"
        onTouchStart={handleTouchStart}
      />
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white text-xs p-4 rounded-lg max-w-sm z-50 shadow-lg">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-white/60 hover:text-white"
      >
        ✕
      </button>
      <h3 className="font-bold mb-2">调试信息</h3>
      <div className="space-y-1">
        <div><strong>在线:</strong> {info.online ? '是' : '否'}</div>
        <div><strong>平台:</strong> {info.platform}</div>
        <div><strong>视口:</strong> {info.viewport}</div>
        <div><strong>UA:</strong> {info.userAgent.slice(0, 50)}...</div>
        <div><strong>Base URL:</strong> {import.meta.env.BASE_URL}</div>
        <div><strong>Mode:</strong> {import.meta.env.MODE}</div>
      </div>
    </div>
  );
};
