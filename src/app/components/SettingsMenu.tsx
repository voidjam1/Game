import React from 'react';
import { motion } from 'motion/react';
import { X, Volume2, VolumeX, Gauge } from 'lucide-react';
import { GameSettings } from '../types/game';

interface SettingsMenuProps {
  settings: GameSettings;
  onClose: () => void;
  onSave: (settings: GameSettings) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  settings,
  onClose,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = React.useState<GameSettings>(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const updateSetting = (key: keyof GameSettings, value: number) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const SliderControl = ({
    label,
    value,
    onChange,
    icon: Icon,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: React.ElementType;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-white flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {label}
        </label>
        <span className="text-white/60">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

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
        className="bg-gray-900 rounded-lg w-full max-w-2xl border border-white/20"
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white">设置</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 设置内容 */}
        <div className="p-4 md:p-6 space-y-6">
          {/* 文字速度 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                文字速度
              </label>
              <span className="text-white/60">{localSettings.textSpeed}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={localSettings.textSpeed}
              onChange={(e) => updateSetting('textSpeed', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* 自动播放速度 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                自动播放速度
              </label>
              <span className="text-white/60">{localSettings.autoSpeed}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={localSettings.autoSpeed}
              onChange={(e) => updateSetting('autoSpeed', Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-4">音量设置</h3>
            <div className="space-y-6">
              <SliderControl
                label="背景音乐"
                value={localSettings.bgmVolume}
                onChange={(v) => updateSetting('bgmVolume', v)}
                icon={localSettings.bgmVolume > 0 ? Volume2 : VolumeX}
              />
              <SliderControl
                label="音效"
                value={localSettings.seVolume}
                onChange={(v) => updateSetting('seVolume', v)}
                icon={localSettings.seVolume > 0 ? Volume2 : VolumeX}
              />
              <SliderControl
                label="语音"
                value={localSettings.voiceVolume}
                onChange={(v) => updateSetting('voiceVolume', v)}
                icon={localSettings.voiceVolume > 0 ? Volume2 : VolumeX}
              />
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-3 p-4 md:p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
          >
            保存
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
