import { useLibraryStore } from "../stores/library";
import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Song } from "./Song";

export function Library() {
  const songs = useLibraryStore((state) => state.songs);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="mx-2 my-12 grid place-items-center" ref={parent}>
      {songs.map((song, index) => (
        <div key={index} className="mb-2">
          <Song song={song} index={index} />
        </div>
      ))}
    </div>
  );
}
