import { Route, Routes, Link } from "react-router-dom";
import { AddSongs } from "./AddSongs";
import { AddPlaylist } from "./AddPlaylist";
import { Library } from "./Library";
import { LibraryPlaylist } from "./LibraryPlaylist";
import { PlaylistMenu } from "./PlaylistMenu";
import { Playlist } from "./Playlist";

import { MdQueueMusic, MdMusicNote } from "react-icons/md";

export function Navbar() {
  return (
    <>
      <div className="flex p-3">
        <div className="mr-3 flex">
          <Link
            to="/"
            className="tooltip tooltip-bottom tooltip-primary mr-3 h-12 w-12 rounded-full border-2 border-grey-500 bg-transparent p-1 transition-all duration-200 hover:border-transparent"
            data-tip="library"
          >
            <MdMusicNote size={40} className="active:text-gray-200" />
          </Link>

          <Link
            to="/playlists"
            className="tooltip tooltip-bottom tooltip-primary h-12 w-12 rounded-full border-2 border-grey-500 bg-transparent p-1 transition-all duration-200 hover:border-transparent"
            data-tip="playlists"
          >
            <MdQueueMusic size={40} className="active:text-gray-200" />
          </Link>
        </div>
        <div className="flex">
          <div
            className="tooltip tooltip-bottom tooltip-primary ml-auto mr-3 flex flex-col"
            data-tip="add songs"
          >
            <AddSongs />
          </div>
          <div
            className="tooltip tooltip-bottom tooltip-primary ml-auto flex flex-col"
            data-tip="add playlist"
          >
            <AddPlaylist />
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/playlists" element={<PlaylistMenu />} />
        <Route path="/playlists/:name" element={<Playlist />} />
        <Route path="/add-to-playlist" element={<LibraryPlaylist />} />
      </Routes>
    </>
  );
}
