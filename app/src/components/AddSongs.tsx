import { useLibraryStore } from "../stores/library";
import type { Tags } from "jsmediatags/types";
import type { SongType } from "../stores/library";
import { v4 as uuidv4 } from "uuid";

var jsmediatags = window.jsmediatags;
export function AddSongs() {
  const addSongs = useLibraryStore((state) => state.addSongs);

  //extract metadata from files
  const awaitableJsmediatags = (file: File): Promise<Tags> => {
    return new Promise(function (resolve, reject) {
      jsmediatags.read(file, {
        onSuccess: function (tag) {
          resolve(tag.tags);
        },
        onError: function (error) {
          reject(error);
        },
      });
    });
  };

  //create a new audio element and get the duration of the file
  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("canplaythrough", () => {
        const seconds = audio.duration;
        resolve(seconds);
      });
    });
  };

  //extract metadata, create a new sopng and add it to the library
  const extractMetadata = async (file: File): Promise<void> => {
    const song: SongType = {
      id: uuidv4(),
      title: "no title",
      artist: "no artist",
      album: "no album",
      length: 0,
      filePath: URL.createObjectURL(file),
      collection: "library",
    };

    const tags: Tags = await awaitableJsmediatags(file);

    song.title = tags.title || "";
    song.artist = tags.artist || "";
    song.album = tags.album || "";

    song.length = await getAudioDuration(file);

    addSongs(song);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filesList = [...(event.target.files || [])];

    for (const file of filesList) {
      await extractMetadata(file);
    }
  };

  return (
    <>
      <button>
        <label htmlFor="file-input" className="hover:cursor-pointer">
          <svg
            className="h-12 w-12 rounded-full border-2 border-grey-500 bg-transparent p-1 transition-all duration-200 hover:border-transparent"
            viewBox="0 0 66 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <rect width="66" height="50" rx="5" fill="#828282" /> */}
            <rect x="29" y="7" width="8" height="37" fill="#3f3f3f" />
            <rect
              x="14"
              y="30"
              width="8"
              height="37"
              transform="rotate(-90 14 30)"
              fill="#3f3f3f"
            />
          </svg>
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="audio/*"
          multiple
          hidden
          onChange={(event) => handleFileSelect(event)}
        />
      </button>
    </>
  );
}
