import { useLibraryStore } from "../stores/library";

export function AddPlaylist() {
  const addPlaylist = useLibraryStore((state) => state.addPlaylist);

  const createPlaylist = () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
      addPlaylist({ name: playlistName, songs: [] });
    }
  };
  return (
    <>
      <button onClick={createPlaylist}>
        <svg
          className="h-12 w-12 rounded-full border-2 border-grey-500 bg-transparent p-1 transition-all duration-200 hover:border-transparent"
          viewBox="0 0 66 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <rect width="66" height="50" rx="5" fill="#828282" /> */}
          <rect x="29" y="7" width="8" height="37" fill="#6B7280" />
          <rect
            x="14"
            y="30"
            width="8"
            height="37"
            transform="rotate(-90 14 30)"
            fill="#6B7280"
          />
        </svg>
      </button>
    </>
  );
}
