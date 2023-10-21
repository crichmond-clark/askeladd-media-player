import { useLibraryStore } from "../stores/library";

import { Song } from "./Song";

export function Library() {
  const songs = useLibraryStore((state) => state.songs);

  return (
    <div className="mx-2 my-12 grid place-items-center">
      {songs.map((song, index) => (
        <div>
          <Song song={song} index={index + 1} />
        </div>
      ))}
    </div>
  );
}
