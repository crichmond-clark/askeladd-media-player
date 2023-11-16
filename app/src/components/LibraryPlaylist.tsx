import { useLibraryStore } from "../stores/library";
import { usePlayerStore } from "../stores/player";
import { Song } from "./Song";
import { Link } from "react-router-dom";
import type { SongType } from "../stores/library";
import { MdOutlinePlaylistAdd, MdArrowBack } from "react-icons/md";

export function LibraryPlaylist() {
  const songs = useLibraryStore((state) => state.songs);
  const addSongToPlaylist = useLibraryStore((state) => state.addSongToPlaylist);
  const selectedPlaylist = usePlayerStore((state) => state.selectedPlaylist);

  const addSongSetCollection = (playlistName: string, song: SongType) => {
    addSongToPlaylist(playlistName, song);
  };

  return (
    <>
      <Link
        to={`/playlists/${selectedPlaylist}`}
        className="tooltip tooltip-bottom tooltip-primary mx-auto"
        data-tip="back to playlist"
      >
        <MdArrowBack
          size={30}
          className="text-grey-text active:text-gray-200"
          data-theme="mytheme"
        />
      </Link>
      <div className="mx-2 my-12 grid place-items-center overflow-y-auto">
        {songs.map((song, index) => (
          <div key={index} className="mb-2 flex items-center">
            <Song song={song} index={index} />
            <button
              className="ml-4"
              onClick={() => addSongSetCollection(selectedPlaylist, song)}
            >
              <MdOutlinePlaylistAdd
                size={30}
                className=" active:text-gray-200"
                data-tip="add songs"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
