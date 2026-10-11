import { useState } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { speakRussian, isSpeechSupported } from "@/lib/audio-speech";

interface SpeakButtonProps {
  text: string;
  size?: number;
  className?: string;
  showSlowToggle?: boolean;
  label?: string;
}

export function SpeakButton({
  text,
  size = 18,
  className = "",
  showSlowToggle = false,
  label,
}: SpeakButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [slow, setSlow] = useState(false);

  if (!isSpeechSupported()) {
    return null;
  }

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const speed = slow ? 0.65 : 0.9;
    await speakRussian(text, speed);
    // Simple duration estimate or reset on end
    setTimeout(() => {
      setIsPlaying(false);
    }, Math.max(1200, text.length * 90));
  };

  const toggleSlow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlow((s) => !s);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={handlePlay}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors border border-primary/20"
        title={isPlaying ? "Ferma audio" : `Ascolta pronuncia russa: "${text}"`}
        aria-label="Ascolta pronuncia russa"
      >
        {isPlaying ? (
          <Volume2 size={size} className="animate-pulse text-primary" />
        ) : (
          <Volume2 size={size} />
        )}
        {label && <span>{label}</span>}
      </button>

      {showSlowToggle && (
        <button
          type="button"
          onClick={toggleSlow}
          className={`rounded px-1.5 py-0.5 text-[10px] font-mono border transition-colors ${
            slow
              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30"
              : "text-muted-foreground hover:bg-muted border-border"
          }`}
          title={slow ? "Velocità rallentata (0.65x)" : "Velocità normale (0.9x)"}
        >
          {slow ? "🐢 Lenta" : "1x"}
        </button>
      )}
    </div>
  );
}
