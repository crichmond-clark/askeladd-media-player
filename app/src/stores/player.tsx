import { z } from "zod";
import { create } from "zustand";
import { songSchema } from "./library";
import type { SongType } from "./library";

const playerSchema = z.object({
  selectedSong: songSchema,
  isPlaying: z.boolean(),
  setSelectedSong: z.function().args(songSchema),
  setIsPlaying: z.function().args(z.boolean()),
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
  isPlaying: false,
  setSelectedSong: (song: SongType) => set(() => ({ selectedSong: song })),
  setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying: isPlaying })),
}));
