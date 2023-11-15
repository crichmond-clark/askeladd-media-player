import { usePlayerStore } from "../stores/player";
import { useLibraryStore } from "../stores/library";
import { Song } from "./Song";
import { Link } from "react-router-dom";
import { SongOptions } from "./SongOptions";

export function Playlist() {
  const selectedPlaylist = usePlayerStore((state) => state.selectedPlaylist);
  const songs = useLibraryStore(
    (state) => state.playlists[selectedPlaylist].songs,
  );

  return (
    <>
      <div className="flex justify-center">
        <h2 className="mb-2 mr-4 text-3xl">{selectedPlaylist}</h2>
        <Link to="/add-to-playlist">
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
        </Link>
      </div>
      <div className="mx-2 my-12 grid place-items-center">
        {songs.map((song, index) => (
          <div
            key={index}
            className="mb-2 flex items-center justify-center hover:bg-grey-dark focus:bg-grey-dark md:text-base"
          >
            <Song song={song} index={index} />
            <SongOptions
              isLibrary={false}
              isPlaylist={true}
              song={song}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}
