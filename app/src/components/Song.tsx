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

  const handleSongDbClick = async (
    selectedSong: SelectedSongType,
  ): Promise<void> => {
    await setSelectedSong(selectedSong);
    if (selectedSong.song.collection === "library") {
      await setSelectedCollection({ name: "library", songs: librarySongs });
    }
    await play();
  };

  return (
    <>
      <div
        className="song-grid grid rounded  p-2 text-xs hover:cursor-pointer hover:bg-grey-dark focus:bg-grey-dark md:text-base"
        onDoubleClick={() => handleSongDbClick({ index, song })}
      >
        <div className="">{index + 1}</div>
        <div className="grid">
          <p className="text-gray-400">{song.title}</p>
          <p className="">{song.artist}</p>
        </div>
        <p className="hidden md:block">{song.album}</p>
        <div className="">
          <p>
            {Math.floor(song.length / 60)}:
            {String(Math.round(song.length % 60)).padStart(2, "0")}
          </p>
        </div>
      </div>
    </>
  );
}
