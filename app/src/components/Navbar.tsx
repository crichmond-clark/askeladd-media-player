import { Dropdown } from "./Dropdown";

export function Navbar() {
  return (
    <>
      <div className="flex">
        <button className="hover:bg-grey-light ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75">
          Library
        </button>
        <button className="hover:bg-grey-light ease-linea m-3 rounded px-4 py-2 text-grey-text transition-all duration-75">
          Playlists
        </button>
        <div className="ml-auto mr-5 mt-5 flex flex-col">
          <Dropdown />
        </div>
      </div>
    </>
  );
}
