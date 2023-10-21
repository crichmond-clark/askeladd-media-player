import { usePlayerStore } from "../stores/player";
import { useEffect, useRef } from "react";

export function Player() {
  const selectedSong = usePlayerStore((state) => state.selectedSong);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // When selectedSong changes, update the audio source
    if (audioRef.current) {
      audioRef.current.src = selectedSong.filePath;
      audioRef.current.load(); // Reload the audio element
      audioRef.current.play(); // Start playback
    }
  }, [selectedSong]);

  return (
    <audio controls autoPlay ref={audioRef}>
      <source src={selectedSong.filePath} type="audio/mpeg" />
    </audio>
  );
}
