import { useLibraryStore } from "../stores/library";

export function Library() {
  const songs = useLibraryStore((state) => state.songs);

  return (
    <div className="flex flex-col justify-center">
      {songs.map((song) => (
        <h1 className="text-center text-grey-text">
          {song.title} - {song.length}
        </h1>
      ))}
    </div>
  );
}
