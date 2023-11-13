import { z } from "zod";
import { create } from "zustand";
import { songSchema } from "./library";

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

const selectedCollectionSchema = z.object({
  name: z.string(),
  songs: z.array(songSchema),
});

export type SelectedCollectionType = z.infer<typeof selectedCollectionSchema>;

const playerSchema = z.object({
  selectedSong: selectedSongSchema,
  setSelectedSong: z.function().args(selectedSongSchema),
  selectedCollection: selectedCollectionSchema,
  setSelectedCollection: z.function().args(selectedCollectionSchema),
  isPlaying: z.boolean(),
  setIsPlaying: z.function().args(),
  audioElement: htmlAudioElementSchema,
  setAudioElement: z.function().args(htmlAudioElementSchema),
  currentTime: z.number(),
  setCurrentTime: z.function().args(z.number()),
  duration: z.number(),
  setDuration: z.function().args(z.number()),
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
  selectedCollection: {
    name: "library",
    songs: [],
  },
  setSelectedCollection: (selectedCollection: SelectedCollectionType) =>
    set(() => ({ selectedCollection: selectedCollection })),
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
      const nextIndex = state.selectedSong.index + 1;
      const nextSong = state.selectedCollection.songs[nextIndex];
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
      const prevIndex = state.selectedSong.index - 1;
      const prevSong = state.selectedCollection.songs[prevIndex];
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
