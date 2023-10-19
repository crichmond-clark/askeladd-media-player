type songProps = {
  title: string;
  artist: string;
  album: string;
  length: number;
  index: number;
};

export function Song({ title, artist, album, length, index }: songProps) {
  return (
    <div className="song-grid  mb-2 grid text-xs  md:text-base xl:mb-4">
      <div className="">{index}</div>
      <div className="grid">
        <p className="">{title}</p>
        <p className="">{artist}</p>
      </div>
      <p className="hidden md:block">{album}</p>
      <div className="">
        <p>{length}</p>
      </div>
    </div>
  );
}
