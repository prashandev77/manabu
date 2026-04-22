"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LanguageCode } from "@/lib/kanji";

type ProgressState = Record<string, boolean>;

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  progress: ProgressState;
  markAsMastered: (kanjiId: string) => void;
  resetProgress: () => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [progress, setProgressState] = useState<ProgressState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedLang = localStorage.getItem("manabu_lang") as LanguageCode;
    if (savedLang) setLanguageState(savedLang);

    const savedProgress = localStorage.getItem("manabu_progress");
    if (savedProgress) {
      try {
        setProgressState(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("manabu_lang", lang);
  };

  const markAsMastered = (kanjiId: string) => {
    setProgressState((prev) => {
      const next = { ...prev, [kanjiId]: true };
      localStorage.setItem("manabu_progress", JSON.stringify(next));
      return next;
    });
  };

  const resetProgress = () => {
    setProgressState({});
    localStorage.removeItem("manabu_progress");
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        progress,
        markAsMastered,
        resetProgress,
        isLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
