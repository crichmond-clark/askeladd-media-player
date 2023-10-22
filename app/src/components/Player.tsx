import { usePlayerStore } from "../stores/player";
import { useEffect, useRef } from "react";

export function Player() {
  const selectedSong = usePlayerStore((state) => state.selectedSong);
  const setAudioElement = usePlayerStore((state) => state.setAudioElement);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // When selectedSong changes, update the audio source
    if (audioRef.current) {
      audioRef.current.autoplay = false;
      audioRef.current.src = selectedSong.filePath;
      audioRef.current.load(); // Reload the audio element
      setAudioElement(audioRef.current);
    }
  }, [selectedSong]);

  return (
    <audio controls ref={audioRef}>
      <source src={selectedSong.filePath} type="audio/mpeg" />
    </audio>
  );
}
