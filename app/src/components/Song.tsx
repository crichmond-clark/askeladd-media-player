import type { SongType } from "../stores/library";
import { usePlayerStore } from "../stores/player";

type songProps = {
  song: SongType;
  index: number;
};

export function Song({ song, index }: songProps) {
  const setSelectedSong = usePlayerStore((state) => state.setSelectedSong);
  const play = usePlayerStore((state) => state.play);

  const handleSongClick = (song: SongType): void => {
    setSelectedSong(song);
  };

  return (
    <>
      <div
        className="song-grid  mb-2 grid text-xs  hover:cursor-pointer md:text-base xl:mb-4"
        onClick={() => handleSongClick(song)}
        onDoubleClick={() => play()}
      >
        <div className="">{index}</div>
        <div className="grid">
          <p className="text-gray-400">{song.title}</p>
          <p className="">{song.artist}</p>
        </div>
        <p className="hidden md:block">{song.album}</p>
        <div className="">
          <p>{song.length}</p>
        </div>
      </div>
    </>
  );
}
