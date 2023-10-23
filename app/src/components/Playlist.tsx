import { usePlayerStore } from "../stores/player";
import { Song } from "./Song";

export function Playlist() {
  const songs = usePlayerStore((state) => state.selectedCollection.songs);

  return (
    <div className="mx-2 my-12 grid place-items-center">
      {songs.map((song, index) => (
        <div key={index}>
          <Song song={song} index={index + 1} />
        </div>
      ))}
    </div>
  );
}
