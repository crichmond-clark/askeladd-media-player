import { create } from "zustand";
import { z } from "zod";

export const songSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  length: z.number(),
  filePath: z.string(),
});

export type SongType = z.infer<typeof songSchema>;

const librarySchema = z.object({
  songs: z.array(songSchema),
  addSongs: z.function().args(songSchema),
});

type LibraryState = z.infer<typeof librarySchema>;

export const useLibraryStore = create<LibraryState>()((set) => ({
  songs: [],
  addSongs: (songsArray) =>
    set((state) => ({ songs: [...state.songs, songsArray] })),
}));
