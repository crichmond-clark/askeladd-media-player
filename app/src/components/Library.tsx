import { useLibraryStore } from "../stores/library";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Song } from "./Song";
import { SongOptions } from "./SongOptions";
import type { SongType } from "../stores/library";

export function Library() {
  const songs = useLibraryStore((state) => state.songs);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const uniqueSongs = [
    ...new Set(
      songs.map((song) =>
        JSON.stringify({
          title: song.title,
          artist: song.artist,
          album: song.album,
        }),
      ),
    ),
  ]
    .map((songStr) =>
      songs.find(
        (song) =>
          JSON.stringify({
            title: song.title,
            artist: song.artist,
            album: song.album,
          }) === songStr,
      ),
    )
    .filter((song): song is SongType => song !== undefined);

  return (
    <div className="mx-2 my-12 grid place-items-center" ref={parent}>
      {uniqueSongs.map((song, index) => (
        <div
          key={index}
          className="mb-2 flex items-center justify-center hover:bg-grey-dark focus:bg-grey-dark md:text-base"
        >
          {song ? <Song song={song} index={index} /> : null}
          <SongOptions
            isLibrary={true}
            isPlaylist={false}
            song={song}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
