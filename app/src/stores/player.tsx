import _ from "lodash";
import { z } from "zod";
import { create } from "zustand";
import { songSchema } from "./library";
import { useLibraryStore } from "./library";
import type { SongType } from "./library";

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
  shuffleIndexArray: z.array(z.number()),
  setShuffleIndexArray: z.function(),
  shuffleIndex: z.number(),
  setShuffleIndex: z.function(),
  shuffleNextNong: z.function().args(z.array(songSchema)),
  shufflePrevSong: z.function().args(z.array(songSchema)),
  isRepeat: z.boolean(),
  setIsRepeat: z.function().args(z.boolean()),
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
      id: "",
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
  shuffleIndexArray: [],
  setShuffleIndexArray: () => {
    set((state) => {
      if (state.shuffleIndexArray.length > 0) {
        return { shuffleIndexArray: [] };
      }
      const songsArray =
        state.selectedPlaylist === "library"
          ? useLibraryStore.getState().songs
          : useLibraryStore.getState().playlists[state.selectedPlaylist].songs;

      let indexes = [];

      if (state.selectedSong) {
        const filteredArray = songsArray.filter(
          (song) => song.id !== state.selectedSong.song.id,
        );
        indexes = filteredArray.map((_, index) => index);
      } else {
        indexes = songsArray.map((_, index) => index);
      }

      const shuffledIndexes = _.shuffle(indexes);
      return { shuffleIndexArray: shuffledIndexes, shuffleIndex: 0 };
    });
  },
  shuffleIndex: 0,
  setShuffleIndex: (shuffleIndex: any) =>
    set(() => ({ shuffleIndex: shuffleIndex })),
  isRepeat: false,
  setIsRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  //player control functions
  play: () => {
    set((state: PlayerState) => {
      (state.audioElement as HTMLAudioElement).pause();
      (state.audioElement as HTMLAudioElement).currentTime = 0;
      (state.audioElement as HTMLAudioElement).play();
      return { isPlaying: true, shuffleIndexArray: [] };
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
      let returnState: any = {};
      const songsArray =
        state.selectedPlaylist === "library"
          ? useLibraryStore.getState().songs
          : useLibraryStore.getState().playlists[state.selectedPlaylist].songs;

      let nextIndex = state.selectedSong.index + 1;
      let nextSong = songsArray[nextIndex];
      const audioElement = state.audioElement as HTMLAudioElement;

      if (state.isRepeat && nextIndex >= songsArray.length) {
        nextIndex = 0;
        nextSong = songsArray[0];
      }

      if (state.shuffleIndexArray.length > 0) {
        returnState = state.shuffleNextNong(songsArray);
      } else {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.src = nextSong.filePath;
        audioElement.load();
        // Add an event listener for when the audio is ready to play
        audioElement.oncanplay = () => {
          audioElement.play();
        };

        returnState = {
          selectedSong: {
            index: nextIndex,
            song: nextSong,
          },
          isPlaying: true,
        };
      }

      return returnState;
    });
  },
  shuffleNextNong: (songsArray: SongType[]): any => {
    const state: any = usePlayerStore.getState();
    let nextIndex = state.shuffleIndex;
    let nextSong = songsArray[state.shuffleIndexArray[nextIndex]];
    if (nextSong == state.selectedSong.song) {
      nextSong = songsArray[state.shuffleIndexArray[nextIndex + 1]];
    }
    const audioElement = state.audioElement as HTMLAudioElement;
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.src = nextSong.filePath;
    audioElement.load();

    // Add an event listener for when the audio is ready to play
    audioElement.oncanplay = () => {
      audioElement.play();
    };
    if (state.isRepeat && nextIndex == songsArray.length) {
      nextIndex = 0;
      nextSong = songsArray[0];
    }
    return {
      selectedSong: {
        index: nextIndex,
        song: nextSong,
      },
      isPlaying: true,
      shuffleIndex: nextIndex + 1,
    };
  },
  prevSong: () => {
    set((state) => {
      let returnState: any = {};
      const songsArray =
        state.selectedPlaylist === "library"
          ? useLibraryStore.getState().songs
          : useLibraryStore.getState().playlists[state.selectedPlaylist].songs;

      if (state.shuffleIndexArray.length > 0) {
        returnState = state.shufflePrevSong(songsArray);
      } else {
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

        returnState = {
          selectedSong: {
            index: prevIndex,
            song: prevSong,
          },
          isPlaying: true,
        };
      }

      return returnState;
    });
  },
  shufflePrevSong: (songsArray: SongType[]): any => {
    const state: any = usePlayerStore.getState();
    const prevIndex = state.shuffleIndex - 1;
    const prevSong = songsArray[state.shuffleIndexArray[prevIndex]];
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
      shuffleIndex: prevIndex,
    };
  },
}));

const savedState = localStorage.getItem("playerState");
if (savedState) {
  usePlayerStore.setState(JSON.parse(savedState));
}

usePlayerStore.subscribe((state) => {
  // Exclude audioElement from the state that's saved to localStorage
  const { audioElement, ...stateWithoutAudioElement } = state;
  localStorage.setItem("playerState", JSON.stringify(stateWithoutAudioElement));
});
