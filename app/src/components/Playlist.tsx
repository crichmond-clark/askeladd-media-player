import { usePlayerStore } from "../stores/player";
import { Song } from "./Song";
import { Link } from "react-router-dom";

export function Playlist() {
  const songs = usePlayerStore((state) => state.selectedCollection.songs);

  return (
    <>
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
      <div className="mx-2 my-12 grid place-items-center">
        {songs.map((song, index) => (
          <div key={index} className="mb-2">
            <Song song={song} index={index} />
          </div>
        ))}
      </div>
    </>
  );
}
