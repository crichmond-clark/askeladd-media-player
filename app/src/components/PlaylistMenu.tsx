import { Link } from "react-router-dom";
import { useLibraryStore } from "../stores/library";
export function PlaylistMenu() {
  const playlists = useLibraryStore((state) => state.playlists);
  return (
    <>
      {playlists.map((playlist) => (
        <Link to={`/playlists/${playlist.name}`}>{playlist.name}</Link>
      ))}
    </>
  );
}
