import { Link } from "react-router-dom";
import { useLibraryStore } from "../stores/library";
import { usePlayerStore } from "../stores/player";

export function PlaylistMenu() {
  const playlists = useLibraryStore((state) => state.playlists);
  const playlistNames = Object.keys(playlists);
  const setSelectedCollection = usePlayerStore(
    (state) => state.setSelectedCollection,
  );

  const handleSetPlaylist = (playlistName: string) => {
    setSelectedCollection(playlists[playlistName]);
  };
  return (
    <>
      {playlistNames.map((playlistName: string) => (
        <Link
          to={`/playlists/${playlistName}`}
          onClick={() => handleSetPlaylist(playlistName)}
        >
          {playlistName}
        </Link>
      ))}
    </>
  );
}
