import { useLibraryStore } from "../stores/library";
import type { Tags } from "jsmediatags/types";
import type { SongType } from "../stores/library";

var jsmediatags = window.jsmediatags;
export function AddButton() {
  const addSongs = useLibraryStore((state) => state.addSongs);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filesList = [...(event.target.files || [])];

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
      let song: SongType = {
        title: "no title",
        artist: "no artist",
        album: "no album",
        length: 0,
        filePath: URL.createObjectURL(file),
      };

      let tags: Tags = await awaitableJsmediatags(file);

      song.title = tags.title || "";
      song.artist = tags.artist || "";
      song.album = tags.album || "";

      song.length = await getAudioDuration(file);

      addSongs(song);
    };

    for (const file of filesList) {
      await extractMetadata(file); // Wait for metadata extraction to finish before moving to the next file
    }
  };

  return (
    <>
      <button>
        <label htmlFor="file-input" className="hover:cursor-pointer">
          <svg
            className="w-12"
            viewBox="0 0 66 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="66" height="50" rx="5" fill="#3F3F3F" />
            <rect x="29" y="7" width="8" height="37" fill="#828282" />
            <rect
              x="14"
              y="30"
              width="8"
              height="37"
              transform="rotate(-90 14 30)"
              fill="#828282"
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
