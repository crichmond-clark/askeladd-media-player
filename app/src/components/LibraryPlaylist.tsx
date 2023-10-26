import { useLibraryStore } from "../stores/library";
import { usePlayerStore } from "../stores/player";
import { Song } from "./Song";
import { Link } from "react-router-dom";
import type { SongType } from "../stores/library";

export function LibraryPlaylist() {
  const songs = useLibraryStore((state) => state.songs);
  const addSongToPlaylist = useLibraryStore((state) => state.addSongToPlaylist);
  const selectedCollection = usePlayerStore(
    (state) => state.selectedCollection,
  );
  const setSelectedCollection = usePlayerStore(
    (state) => state.setSelectedCollection,
  );
  const playlist = useLibraryStore(
    (state) => state.playlists[selectedCollection.name],
  );

  const addSongSetCollection = (playlistName: string, song: SongType) => {
    addSongToPlaylist(playlistName, song);
    setSelectedCollection({
      name: playlistName,
      songs: [...playlist.songs, song],
    });
  };

  return (
    <>
      <Link to={`/playlists/${selectedCollection.name}`} className="mb-6">
        back to playlist
      </Link>
      <div className="mx-2 my-12 grid place-items-center">
        {songs.map((song, index) => (
          <div key={index} className="mb-2 flex items-start">
            <Song song={song} index={index} />
            <button
              onClick={() =>
                addSongSetCollection(selectedCollection.name, song)
              }
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
    </>
  );
}
