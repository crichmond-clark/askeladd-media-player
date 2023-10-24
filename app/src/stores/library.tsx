import { create } from "zustand";
import { z } from "zod";

export const songSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  length: z.number(),
  filePath: z.string(),
  collection: z.string(),
});

export type SongType = z.infer<typeof songSchema>;

export const playlistSchema = z.object({
  name: z.string(),
  songs: z.array(songSchema),
});

export type playlistType = z.infer<typeof playlistSchema>;

const librarySchema = z.object({
  songs: z.array(songSchema),
  playlists: z.record(playlistSchema),
  addSongs: z.function().args(songSchema),
  addPlaylist: z.function().args(playlistSchema),
  addSongToPlaylist: z.function().args(z.string(), songSchema),
});

type LibraryState = z.infer<typeof librarySchema>;

const songs: SongType[] = [];

export const useLibraryStore = create<LibraryState>((set) => ({
  songs,
  playlists: {},

  addSongs: (songsArray) =>
    set((state) => ({ songs: [...state.songs, songsArray] })),
  addPlaylist: (playlist) =>
    set((state) => ({
      playlists: {
        ...state.playlists,
        [playlist.name]: playlist,
      },
    })),
  addSongToPlaylist: (playlistName, song) =>
    set((state) => ({
      playlists: {
        ...state.playlists,
        [playlistName]: {
          ...state.playlists[playlistName],
          songs: [...state.playlists[playlistName].songs, song],
        },
      },
    })),
}));
