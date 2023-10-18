import { AddButton } from "./AddSongs";

export function Navbar() {
  return (
    <>
      <div className="flex">
        <button className="ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light">
          Library
        </button>
        <button className="ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75 hover:bg-grey-light">
          Playlists
        </button>
        <div className="ml-auto mr-5 mt-5 flex flex-col">
          <AddButton />
        </div>
      </div>
    </>
  );
}