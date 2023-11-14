import { z } from "zod";
import { create } from "zustand";
import { songSchema } from "./library";
import { useLibraryStore } from "./library";

const htmlAudioElementSchema = z.custom(
  (value) => {
    return value instanceof HTMLAudioElement;
  },
  {
    message: "Expected an HTMLAudioElement",
  },
);

const selectedSongSchema = z.object({
  index: z.number(),
  song: songSchema,
});

export type SelectedSongType = z.infer<typeof selectedSongSchema>;

const selectedPlaylistSchema = z.object({
  name: z.string(),
  songs: z.array(songSchema),
});

export type selectedPlaylistType = z.infer<typeof selectedPlaylistSchema>;

const playerSchema = z.object({
  selectedSong: selectedSongSchema,
  setSelectedSong: z.function().args(selectedSongSchema),
  selectedPlaylist: z.string(),
  setSelectedPlaylist: z.function().args(z.string()),
  isPlaying: z.boolean(),
  setIsPlaying: z.function().args(),
  audioElement: htmlAudioElementSchema,
  setAudioElement: z.function().args(htmlAudioElementSchema),
  currentTime: z.number(),
  setCurrentTime: z.function().args(z.number()),
  duration: z.number(),
  setDuration: z.function().args(z.number()),
  volume: z.number(),
  setVolume: z.function().args(z.number()),
  play: z.function(),
  playPause: z.function(),
  nextSong: z.function(),
  prevSong: z.function(),
});

type PlayerState = z.infer<typeof playerSchema>;

export const usePlayerStore = create<PlayerState>()((set) => ({
  //initial state
  selectedSong: {
    index: 0,
    song: {
      title: "",
      artist: "",
      album: "",
      length: 0,
      filePath: "",
      collection: "",
    },
  },
  setSelectedSong: (song: SelectedSongType) =>
    set(() => ({ selectedSong: song })),
  selectedPlaylist: "library",
  setSelectedPlaylist: (selectedPlaylist: string) =>
    set(() => ({ selectedPlaylist: selectedPlaylist })),
  audioElement: document.createElement("audio"),
  setAudioElement: (audioElement: unknown) =>
    set(() => ({ audioElement: audioElement as HTMLAudioElement })),
  isPlaying: false,
  setIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  currentTime: 0,
  setCurrentTime: (currentTime: number) =>
    set(() => ({ currentTime: currentTime })),
  duration: 0,
  setDuration: (duration: number) => set(() => ({ duration: duration })),
  volume: 1,
  setVolume: (volume: number) => set(() => ({ volume: volume })),
  //player control functions
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
  nextSong: () => {
    set((state) => {
      const songsArray =
        state.selectedPlaylist === "library"
          ? useLibraryStore.getState().songs
          : useLibraryStore.getState().playlists[state.selectedPlaylist].songs;
      const nextIndex = state.selectedSong.index + 1;
      const nextSong = songsArray[nextIndex];
      const audioElement = state.audioElement as HTMLAudioElement;
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = nextSong.filePath;
      audioElement.load();

      // Add an event listener for when the audio is ready to play
      audioElement.oncanplay = () => {
        audioElement.play();
      };

      return {
        selectedSong: {
          index: nextIndex,
          song: nextSong,
        },
        isPlaying: true,
      };
    });
  },
  prevSong: () => {
    set((state) => {
      const songsArray =
        state.selectedPlaylist === "library"
          ? useLibraryStore.getState().songs
          : useLibraryStore.getState().playlists[state.selectedPlaylist].songs;
      const prevIndex = state.selectedSong.index - 1;
      const prevSong = songsArray[prevIndex];
      const audioElement = state.audioElement as HTMLAudioElement;
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = prevSong.filePath;
      audioElement.load();

      // Add an event listener for when the audio is ready to play
      audioElement.oncanplay = () => {
        audioElement.play();
      };

      return {
        selectedSong: {
          index: prevIndex,
          song: prevSong,
        },
        isPlaying: true,
      };
    });
  },
}));
