import type { SelectedSongType } from "../stores/player";
import type { SongType } from "../stores/library";
import { usePlayerStore } from "../stores/player";
import { useLibraryStore } from "../stores/library";

type songProps = {
  song: SongType;
  index: number;
};

export function Song({ song, index }: songProps) {
  const librarySongs = useLibraryStore((state) => state.songs);
  const setSelectedSong = usePlayerStore((state) => state.setSelectedSong);
  const setSelectedCollection = usePlayerStore(
    (state) => state.setSelectedCollection,
  );
  const play = usePlayerStore((state) => state.play);

  const handleSongClick = (selectedSong: SelectedSongType): void => {
    setSelectedSong(selectedSong);
    if (selectedSong.song.collection === "library") {
      setSelectedCollection({ name: "library", songs: librarySongs });
    }
  };

  return (
    <>
      <div
        className="song-grid  mb-2 grid text-xs  hover:cursor-pointer md:text-base xl:mb-4"
        onClick={() => handleSongClick({ index, song })}
        onDoubleClick={() => play()}
      >
        <div className="">{index + 1}</div>
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
