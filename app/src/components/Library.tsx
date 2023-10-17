import { Song } from "./Song";

export function Library() {
  const songs = ["song1", "song2", "song3", "song4", "song5"];
  return (
    <div className="flex flex-col justify-center">
      {songs.map(() => (
        <Song />
      ))}
    </div>
  );
}
