import { useLibraryStore } from "../stores/library";
import type { TagType, jsmediatagsError, Tags } from "jsmediatags/types";
import type { Song } from "../stores/library";

var jsmediatags = window.jsmediatags;
export function Dropdown() {
  const addSongs = useLibraryStore((state) => state.addSongs);
  const songs = useLibraryStore((state) => state.songs);
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filesList = [...(event.target.files || [])];
    console.log("filesList:", filesList);

    function awaitableJsmediatags(file: File) {
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
    }

    const getAudioDuration = (file: File): number => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener("canplaythrough", () => {
        return audio.duration;
      });
      return 0;
    };

    const extractMetadata = async (file: File) => {
      const song: Song = {
        title: "",
        artist: "",
        album: "",
        length: 0,
      };

      let tags: Tags = await (awaitableJsmediatags(file) as Promise<Tags>);

      song.title = tags.title || "";
      song.artist = tags.artist || "";
      song.album = tags.album || "";

      song.length = getAudioDuration(file);
      addSongs(song);
    };

    //TODO add song to store

    for (const file of filesList) {
      extractMetadata(file);
    }
  };

  return (
    <>
      <button>
        <label htmlFor="file-input" className="hover:cursor-pointer">
          <svg
            width="66"
            height="50"
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
          Add songs
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
