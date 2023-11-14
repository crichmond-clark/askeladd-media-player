import { usePlayerStore } from "../stores/player";
import { useEffect, useRef } from "react";

export function Player() {
  const selectedSong = usePlayerStore((state) => state.selectedSong);
  const setAudioElement = usePlayerStore((state) => state.setAudioElement);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // When selectedSong changes, update the audio source
    if (audioRef.current) {
      audioRef.current.autoplay = false;
      audioRef.current.src = selectedSong.song.filePath;
      audioRef.current.load(); // Reload the audio element
      setAudioElement(audioRef.current);

      const setAudioData = () => setDuration(audioRef.current!.duration);
      const setAudioTime = () => {
        setCurrentTime(audioRef.current!.currentTime);
        // Calculate the percentage of the song that has been played
        const fillPercent =
          (audioRef.current!.currentTime / audioRef.current!.duration) * 100;
        // Update the --fill-percent CSS variable
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            "--fill-percent",
            `${fillPercent}%`,
          );
        });
      };

      audioRef.current.addEventListener("loadeddata", setAudioData);
      audioRef.current.addEventListener("timeupdate", setAudioTime);
    }
  }, [selectedSong]);

  return (
    <audio ref={audioRef}>
      <source src={selectedSong.song.filePath} type="audio/mpeg" />
    </audio>
  );
}
