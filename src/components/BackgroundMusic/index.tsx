"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    backgroundAudio?: HTMLAudioElement;
  }
}

const TRACK = "/music/background.mp3";

export function BackgroundMusic() {
  useEffect(() => {
    if (!window.backgroundAudio) {
      const audio = new Audio(TRACK);

      audio.loop = true;
      audio.volume = 0.4;

      window.backgroundAudio = audio;

      audio.play().catch(() => {});
    }

    return () => {};
  }, []);

  return null;
}
