import { useLibraryStore } from "../stores/library";
import { usePlayerStore } from "../stores/player";
import { Song } from "./Song";

export function LibraryPlaylist() {
  const songs = useLibraryStore((state) => state.songs);
  const addSongToPlaylist = useLibraryStore((state) => state.addSongToPlaylist);
  const selectedCollection = usePlayerStore(
    (state) => state.selectedCollection,
  );

  return (
    <div className="mx-2 my-12 grid place-items-center">
      {songs.map((song, index) => (
        <div key={index} className="mb-2 flex items-start">
          <Song song={song} index={index} />
          <button
            onClick={() => addSongToPlaylist(selectedCollection.name, song)}
          >
            <svg
              className="w-12"
              viewBox="0 0 66 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="66" height="50" rx="5" fill="#3F3F3F" />
              <rect x="29" y="7" width="8" height="37" fill="#828282" />
              <rect
                x="14"
                y="30"
                width="8"
                height="37"
                transform="rotate(-90 14 30)"
                fill="#828282"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
