import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { romanticAudio } from '../audio';

interface AudioControlProps {
  onTogglePlay?: (isPlaying: boolean) => void;
}

export const AudioControl: React.FC<AudioControlProps> = ({ onTogglePlay }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isInteracted, setIsInteracted] = useState<boolean>(false);

  const handleToggle = async () => {
    setIsInteracted(true);
    const currentlyPlaying = await romanticAudio.togglePlay();
    setIsPlaying(currentlyPlaying);
    if (onTogglePlay) {
      onTogglePlay(currentlyPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pausar Starboy Beat' : 'Reproducir Starboy Beat'}
        className={`group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
          isPlaying
            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
            : 'bg-stone-950/80 hover:bg-stone-900 border-amber-500/30 text-amber-300/80 hover:text-amber-200'
        }`}
        title="Beat Instrumental: The Weeknd - Starboy"
      >
        {/* Vinyl / Disc icon with spinning animation when playing */}
        <div className="relative flex items-center justify-center">
          <Disc
            className={`w-4 h-4 text-amber-400 transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Audio label */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <Music className="w-3 h-3 text-amber-400" />
            <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-amber-200">
              Starboy Beat
            </span>
          </div>
          <span className="text-[9px] text-amber-400/70 font-mono hidden sm:inline">
            The Weeknd • Instrumental
          </span>
        </div>

        {/* Audio Equalizer Bars when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-3" />
            <span className="w-0.5 bg-amber-300 rounded-full animate-bounce h-2" style={{ animationDelay: '0.15s' }} />
            <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.3s' }} />
            <span className="w-0.5 bg-amber-300 rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.45s' }} />
          </div>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-amber-400/60 ml-0.5" />
        )}
      </button>

      {/* Helper hint for mobile/first touch */}
      {!isInteracted && (
        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-[10px] text-amber-300 animate-pulse pointer-events-none">
          <span>🎵 Toca para activar la música</span>
        </div>
      )}
    </div>
  );
};
