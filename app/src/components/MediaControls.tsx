import { ChangeEvent } from "react";
import { Player } from "./Player";
import { usePlayerStore } from "../stores/player";

import { MdOutlineVolumeUp } from "react-icons/md";
import { IoShuffleOutline } from "react-icons/io5";

export function MediaControls() {
  const selectedSong = usePlayerStore((state) => state.selectedSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playPause = usePlayerStore((state) => state.playPause);
  const nextSong = usePlayerStore((state) => state.nextSong);
  const prevSong = usePlayerStore((state) => state.prevSong);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const audioElement = usePlayerStore(
    (state) => state.audioElement,
  ) as HTMLAudioElement;
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const setShuffleIndexArray = usePlayerStore(
    (state) => state.setShuffleIndexArray,
  );
  const handleProgressBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;

    const newTime = parseFloat(e.target.value);
    audioElement.currentTime = newTime;
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    audioElement.volume = volume;
    const volumeBar = document.querySelector(".volume-bar") as HTMLInputElement;
    const min = Number(volumeBar.min);
    const max = Number(volumeBar.max);
    // Calculate visible width
    const val = ((Number(volumeBar.value) - min) * 100) / max;

    // Change these variables to the colors you need
    const fillLeft = "#7C7C7C";
    const fillRight = "rgba(217, 217, 217, .1)";

    volumeBar.style.background = `linear-gradient(to right, ${fillLeft} ${val}%, ${fillRight} ${val}%`;
  };

  const handleShuffle = () => {
    setShuffleIndexArray();
  };

  return (
    <>
      {selectedSong && <Player />}
      <div className="mt-auto grid h-fit  bg-grey-dark py-4 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center md:col-start-2">
          <div>
            {/* previous button */}
            <button className="mr-3 mt-2" onClick={() => prevSong()}>
              <svg
                width="42"
                height="62"
                viewBox="0 0 42 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1_19)">
                  <path
                    d="M5.7933 24.786C4.45456 25.9673 4.43757 28.0493 5.75686 29.2523L31.8616 53.0558C33.7791 54.8043 36.8617 53.4584 36.8829 50.8635L37.2678 3.68559C37.289 1.09071 34.2288 -0.305278 32.283 1.41165L5.7933 24.786Z"
                    fill="#3F3F3F"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1_19"
                    x="0.778221"
                    y="0.65509"
                    width="40.4897"
                    height="61.1897"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1_19"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1_19"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>

            {!isPlaying ? (
              /* play button */
              <button onClick={playPause}>
                <svg
                  width="77"
                  height="77"
                  viewBox="0 0 77 77"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="38.5" cy="38.5" r="38.5" fill="#3F3F3F" />
                  <path
                    d="M52 38.5L33.25 54.5215L33.25 22.4785L52 38.5Z"
                    fill="#696969"
                  />
                </svg>
              </button>
            ) : (
              /* pause button */
              <button onClick={playPause}>
                <svg
                  width="77"
                  height="77"
                  viewBox="0 0 77 77"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="38.5" cy="38.5" r="38.5" fill="#3F3F3F" />
                  <rect x="30" y="25" width="7" height="28" fill="#696969" />
                  <rect x="41" y="25" width="7" height="28" fill="#696969" />
                </svg>
              </button>
            )}
            {/* next button */}
            <button className="ml-3 mt-2" onClick={() => nextSong()}>
              <svg
                width="41"
                height="62"
                viewBox="0 0 41 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1_16)">
                  <path
                    d="M35.8309 24.786C37.1696 25.9673 37.1866 28.0493 35.8673 29.2523L9.76262 53.0558C7.84513 54.8043 4.76253 53.4584 4.74135 50.8635L4.35638 3.68559C4.3352 1.09071 7.39543 -0.305278 9.34119 1.41165L35.8309 24.786Z"
                    fill="#3F3F3F"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1_16"
                    x="0.35627"
                    y="0.65509"
                    width="40.4897"
                    height="61.1897"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1_16"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1_16"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>

            <div className="cursor-pointer" onClick={handleShuffle}>
              <IoShuffleOutline />
            </div>
          </div>

          <div className="flex items-center px-4  md:w-full xl:px-0">
            <p>
              {Math.floor(currentTime / 60)}:
              {String(Math.round(currentTime % 60)).padStart(2, "0")}
            </p>
            <input
              id="progress-bar"
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleProgressBarChange(e)
              }
              className="progress-bar mx-2 h-2 w-full cursor-pointer appearance-none rounded-lg"
            />
            <p>
              {Math.floor(duration / 60)}:
              {String(Math.round(duration % 60)).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center place-self-center md:mt-0 lg:col-start-3">
          <MdOutlineVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-bar mx-2 h-2 cursor-pointer appearance-none rounded-lg bg-grey-text"
          />
        </div>
      </div>
    </>
  );
}
