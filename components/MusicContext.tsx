"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface MusicContextValue {
  enabled: boolean;
  enableMusic: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bg-music-enabled");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  const enableMusic = () => {
    localStorage.setItem("bg-music-enabled", "true");
    setEnabled(true);
  };

  return (
    <MusicContext.Provider value={{ enabled, enableMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return ctx;
}
