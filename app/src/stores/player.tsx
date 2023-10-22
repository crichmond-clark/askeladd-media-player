import { z } from "zod";
import { create } from "zustand";
import { songSchema } from "./library";
import type { SongType } from "./library";

const htmlAudioElementSchema = z.custom(
  (value) => {
    return value instanceof HTMLAudioElement;
  },
  {
    message: "Expected an HTMLAudioElement",
  },
);

const playerSchema = z.object({
  selectedSong: songSchema,
  isPlaying: z.boolean(),
  setSelectedSong: z.function().args(songSchema),
  setIsPlaying: z.function().args(),
  audioElement: htmlAudioElementSchema,
  setAudioElement: z.function().args(htmlAudioElementSchema),
  play: z.function(),
  playPause: z.function(),
});

type PlayerState = z.infer<typeof playerSchema>;

export const usePlayerStore = create<PlayerState>()((set) => ({
  selectedSong: {
    title: "no title",
    artist: "no artist",
    album: "no album",
    length: 22,
    filePath: "",
  },
  audioElement: document.createElement("audio"),
  isPlaying: false,
  play: () => {
    set((state: PlayerState) => {
      (state.audioElement as HTMLAudioElement).pause();
      (state.audioElement as HTMLAudioElement).currentTime = 0;
      (state.audioElement as HTMLAudioElement).play();
      return { isPlaying: true };
    });
  },
  playPause: () => {
    set((state: PlayerState) => {
      const isPlaying = !state.isPlaying;
      isPlaying
        ? (state.audioElement as HTMLAudioElement).play()
        : (state.audioElement as HTMLAudioElement).pause();
      return { isPlaying };
    });
  },
  setSelectedSong: (song: SongType) => set(() => ({ selectedSong: song })),
  setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setAudioElement: (audioElement: unknown) =>
    set(() => ({ audioElement: audioElement as HTMLAudioElement })),
}));
