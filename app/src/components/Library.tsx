import { useLibraryStore } from "../stores/library";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Song } from "./Song";
import { SongOptions } from "./SongOptions";
import { MdMusicNote } from "react-icons/md";

export function Library() {
  const songs = useLibraryStore((state) => state.songs);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <div
        className="mx-2 my-12 place-items-center overflow-y-auto"
        ref={parent}
      >
        <MdMusicNote size={40} className="mx-auto  mt-0" />
        {songs.map((song, index) => (
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
    </>
  );
}
