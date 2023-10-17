var jsmediatags = window.jsmediatags;

import { resolveObjectURL } from "buffer";
import type { TagType, jsmediatagsError } from "jsmediatags/types";
import { render } from "react-dom";

export function Dropdown() {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = [...(event.target.files || [])];
    console.log("filesList:", filesList);
    const mango: TagType[] = [];

    const extractMetadata = (file: File) => {
      jsmediatags.read(file, {
        onSuccess: function (tag: TagType) {
          if (tag.tags.title) {
            mango.push(tag);
          }
        },
        onError: function (error: jsmediatagsError) {
          console.log(error);
        },
      });
    };

    const getAudioDuration = async (file: File) => {
      const audio = new Audio();
      const blob = new Blob([file], { type: "audio/*" });
      audio.src = URL.createObjectURL(blob);
      audio.addEventListener("canplaythrough", () => {
        const duration = audio.duration;

        console.log(`The duration of the audio file is ${duration} seconds.`);
      });
    };

    for (let file of filesList) {
      extractMetadata(file);
      getAudioDuration(file);
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
          onChange={handleFileSelect}
        />
      </button>
    </>
  );
}
