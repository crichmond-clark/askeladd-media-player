import { Link } from "react-router-dom";
import { useLibraryStore } from "../stores/library";
import { usePlayerStore } from "../stores/player";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { MdQueueMusic } from "react-icons/md";

export function PlaylistMenu() {
  const playlists = useLibraryStore((state) => state.playlists);
  const playlistNames = Object.keys(playlists);
  const setSelectedPlaylist = usePlayerStore(
    (state) => state.setSelectedPlaylist,
  );
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleSetPlaylist = (playlistName: string) => {
    setSelectedPlaylist(playlistName);
  };
  return (
    <>
      <MdQueueMusic size={40} className="mx-auto mb-10 mt-0" />
      <ul ref={parent} className="grid grid-cols-5 place-items-center  ">
        {playlistNames.map((playlistName: string) => (
          <Link
            className="col-span-1 col-start-3 mb-2 w-full rounded p-2 text-center text-xs hover:cursor-pointer hover:bg-grey-dark focus:bg-grey-dark md:text-base"
            to={`/playlists/${playlistName}`}
            onClick={() => handleSetPlaylist(playlistName)}
          >
            {playlistName}
          </Link>
        ))}
      </ul>
    </>
  );
}
