import { useLibraryStore } from "../stores/library";
export function PlaylistMenu() {
  const playlists = useLibraryStore((state) => state.playlists);
  return (
    <>
      {playlists.map((playlist) => (
        <p>{playlist.name}</p>
      ))}
    </>
  );
}
