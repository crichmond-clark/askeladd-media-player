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
      <button>
        <label htmlFor="file-input" className="hover:cursor-pointer">
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
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="audio/*"
          multiple
          hidden
          onChange={createPlaylist}
        />
      </button>
    </>
  );
}
