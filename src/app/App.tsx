import React, { useState } from "react";
import { MainMenu } from "./components/MainMenu";
import { GameEngine } from "./components/GameEngine";
import { SaveLoadMenu } from "./components/SaveLoadMenu";
import { Gallery } from "./components/Gallery";
import { SettingsMenu } from "./components/SettingsMenu";
import { DebugInfo } from "./components/DebugInfo";
import { saveSystem } from "./utils/saveSystem";
import { gameMetadata } from "./data/story";
import { GameState } from "./types/game";

type Screen = "menu" | "game" | "load" | "gallery" | "settings";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [loadedState, setLoadedState] = useState<
    GameState | undefined
  >();
  const [settings, setSettings] = useState(
    saveSystem.loadSettings(),
  );

  const quickSave = saveSystem.quickLoad();

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
          hasSave={!!quickSave}
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
    </>
  );
}