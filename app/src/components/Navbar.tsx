import { Route, Routes, Link } from "react-router-dom";
import { AddSongs } from "./AddSongs";
import { AddPlaylist } from "./AddPlaylist";
import { Library } from "./Library";
import { PlaylistMenu } from "./PlaylistMenu";
export function Navbar() {
  return (
    <>
      <div className="flex">
        <button className="ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light">
          <Link to="/">Library</Link>
        </button>
        <button className="ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light">
          <Link to="/playlists">Playlists</Link>
        </button>
        <div className="m-3 ml-auto flex flex-col">
          <AddSongs />
        </div>
        <div className="m-3 ml-auto flex flex-col">
          <AddPlaylist />
          <p>playlists</p>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/playlists" element={<PlaylistMenu />} />
      </Routes>
    </>
  );
}
