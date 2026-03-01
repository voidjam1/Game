import React, { useState } from "react";
import { MainMenu } from "./components/MainMenu";
import { GameEngine } from "./components/GameEngine";
import { SaveLoadMenu } from "./components/SaveLoadMenu";
import { Gallery } from "./components/Gallery";
import { SettingsMenu } from "./components/SettingsMenu";
import { AchievementsPanel } from "./components/AchievementsPanel";
import { DebugInfo } from "./components/DebugInfo";
import { saveSystem } from "./utils/saveSystem";
import { gameMetadata, achievements } from "./data/story";
import { GameState } from "./types/game";

type Screen = "menu" | "game" | "load" | "gallery" | "settings" | "achievements";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [loadedState, setLoadedState] = useState<
    GameState | undefined
  >();
  const [settings, setSettings] = useState(
    saveSystem.loadSettings(),
  );

  const quickSave = saveSystem.quickLoad();

  // 获取所有已解锁的成就（从所有存档中收集）
  const getAllUnlockedAchievements = (): string[] => {
    const allSaves = saveSystem.getAllSaves();
    const achievementSet = new Set<string>();
    allSaves.forEach((save) => {
      if (save) {
        save.state.achievements?.forEach((achievement) => achievementSet.add(achievement));
      }
    });
    return Array.from(achievementSet);
  };

  const handleNewGame = () => {
    setLoadedState(undefined);
    setScreen("game");
  };

  const handleContinue = () => {
    if (quickSave) {
      setLoadedState(quickSave.state);
      setScreen("game");
    }
  };

  const handleLoad = (slot: number) => {
    const saveData = saveSystem.loadGame(slot);
    if (saveData) {
      setLoadedState(saveData.state);
      setScreen("game");
    }
  };

  const handleDeleteSave = (slot: number) => {
    saveSystem.deleteSave(slot);
  };

  const handleSettingsSave = (newSettings: typeof settings) => {
    setSettings(newSettings);
    saveSystem.saveSettings(newSettings);
    setScreen("menu");
  };

  // 获取所有解锁的CG（从所有存档中收集）
  const getAllUnlockedCGs = (): string[] => {
    const allSaves = saveSystem.getAllSaves();
    const cgs = new Set<string>();
    allSaves.forEach((save) => {
      if (save) {
        save.state.unlockedCGs.forEach((cg) => cgs.add(cg));
      }
    });
    return Array.from(cgs);
  };

  return (
    <>
      <DebugInfo />
      {screen === "menu" && (
        <MainMenu
          onNewGame={handleNewGame}
          onContinue={handleContinue}
          onLoad={() => setScreen("load")}
          onGallery={() => setScreen("gallery")}
          onSettings={() => setScreen("settings")}
          onAchievements={() => setScreen("achievements")}
          hasSave={!!quickSave}
          // backgroundImage="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600" // 可以在这里添加标题画面背景
        />
      )}

      {screen === "game" && (
        <GameEngine
          onReturnToMenu={() => setScreen("menu")}
          startNode={
            loadedState
              ? loadedState.currentNodeId
              : gameMetadata.startNode
          }
          loadedState={loadedState}
        />
      )}

      {screen === "load" && (
        <SaveLoadMenu
          mode="load"
          saves={saveSystem.getAllSaves()}
          onClose={() => setScreen("menu")}
          onLoad={handleLoad}
          onDelete={handleDeleteSave}
        />
      )}

      {screen === "gallery" && (
        <Gallery
          unlockedCGs={getAllUnlockedCGs()}
          onClose={() => setScreen("menu")}
        />
      )}

      {screen === "settings" && (
        <SettingsMenu
          settings={settings}
          onClose={() => setScreen("menu")}
          onSave={handleSettingsSave}
        />
      )}

      {screen === "achievements" && (
        <AchievementsPanel
          allAchievements={achievements}
          unlockedAchievements={getAllUnlockedAchievements()}
          onClose={() => setScreen("menu")}
        />
      )}
    </>
  );
}