import { Route, Routes, Link } from "react-router-dom";
import { AddSongs } from "./AddSongs";
import { AddPlaylist } from "./AddPlaylist";
import { Library } from "./Library";
import { LibraryPlaylist } from "./LibraryPlaylist";
import { PlaylistMenu } from "./PlaylistMenu";
import { Playlist } from "./Playlist";

export function Navbar() {
  return (
    <>
      <div className="flex">
        <Link
          to="/"
          className="ease-linea m-3 max-h-11 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light"
        >
          Library
        </Link>

        <Link
          to="/playlists"
          className="ease-linea m-3 max-h-11 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light"
        >
          Playlists
        </Link>
        <div className="ml-auto flex">
          <div className="m-3 ml-auto flex flex-col">
            <AddSongs />
          </div>
          <div className="m-3 ml-auto flex flex-col">
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
