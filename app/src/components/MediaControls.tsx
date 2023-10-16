import { useState } from "react";

export function MediaControls() {
  const [isPlaying, setIsPlaying] = useState(false);

  const changePlayState = () => setIsPlaying(!isPlaying);

  return (
    <>
      <div className="mt-auto flex h-28 place-content-center items-center bg-grey-dark">
        {/* previous button */}
        <button className="mr-3 mt-2">
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
          <button onClick={changePlayState}>
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
          <button onClick={changePlayState}>
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
        <button className="ml-3 mt-2">
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
      </div>
    </>
  );
}
