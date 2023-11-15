import { ChangeEvent } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useLibraryStore } from "../stores/library";

import type { SongType } from "../stores/library";

type SongOptionsProps = {
  isLibrary: boolean;
  isPlaylist: boolean;
  song: SongType;
  index: number;
};

export function SongOptions({
  isLibrary,
  isPlaylist,
  song,
  index,
}: SongOptionsProps) {
  const playlists = useLibraryStore((state) => state.playlists);
  const addSongToPlaylist = useLibraryStore((state) => state.addSongToPlaylist);
  const removeSongFromPlaylist = useLibraryStore(
    (state) => state.removeSongFromPlaylist,
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addSongToPlaylist(event.target.name, song);

      const modal = document.getElementById(`add-to-playlist-modal-${index}`);
      const form = modal?.querySelector("form");
      if (form) {
        form.reset();
      }
      // @ts-ignore
      modal?.close();
    }
  };

  const handleRemoveFromPlaylist = () => {
    removeSongFromPlaylist(song.collection, song.id);
  };

  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="cursor-pointer">
          <SlOptionsVertical />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box z-[1] w-52  p-2 shadow"
        >
          {isLibrary ? (
            <li className="menu-item">
              <a
                className="w-full text-left"
                onClick={() =>
                  // @ts-ignore
                  document
                    .getElementById(`add-to-playlist-modal-${index}`)
                    // @ts-ignore
                    .showModal()
                }
              >
                Add to playlist
              </a>
            </li>
          ) : isPlaylist ? ( // If the song is in a playlist, show the option to remove it from the playlist
            <li className="menu-item">
              <a
                className="w-full text-left"
                onClick={handleRemoveFromPlaylist}
              >
                Remove from playlist
              </a>
            </li>
          ) : null}
        </ul>
      </div>

      <dialog id={`add-to-playlist-modal-${index}`} className="modal">
        <div className="modal-box bg-grey-base">
          <h3 className="text-lg font-bold">select playlists</h3>
          <form id="modal-form">
            {Object.keys(playlists).map((playlistName) => (
              <div key={playlistName} className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{playlistName}</span>
                  <input
                    type="radio"
                    id={playlistName}
                    name={playlistName}
                    onChange={(e) => handleCheckboxChange(e)}
                    className="radio"
                  />
                </label>
              </div>
            ))}
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
