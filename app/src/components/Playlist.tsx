import { usePlayerStore } from "../stores/player";
import { useLibraryStore } from "../stores/library";
import { Song } from "./Song";
import { Link } from "react-router-dom";
import { SongOptions } from "./SongOptions";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export function Playlist() {
  const selectedPlaylist = usePlayerStore((state) => state.selectedPlaylist);
  const songs = useLibraryStore(
    (state) => state.playlists[selectedPlaylist].songs,
  );

  return (
    <>
      <div className="flex justify-center">
        <h2 className="mb-2 mr-4 text-3xl">{selectedPlaylist}</h2>
        <Link
          to="/add-to-playlist"
          className="tooltip tooltip-bottom tooltip-primary"
          data-tip="add songs to playlist"
        >
          <MdOutlinePlaylistAdd size={30} className="active:text-gray-200" />
        </Link>
      </div>
      <div className="mx-2 my-12 grid place-items-center">
        {songs.map((song, index) => (
          <div
            key={index}
            className="mb-2 flex items-center justify-center hover:bg-grey-dark focus:bg-grey-dark md:text-base"
          >
            <Song song={song} index={index} />
            <SongOptions
              isLibrary={false}
              isPlaylist={true}
              song={song}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}
