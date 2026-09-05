import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { storyConfig } from '../storyConfig';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    soundManager.setOnStateChange((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      soundManager.setOnStateChange(() => {});
    };
  }, []);

  const toggleMusic = () => {
    setHasInteracted(true);
    soundManager.toggleMusic(storyConfig.musicUrl);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
      <button
        onClick={toggleMusic}
        className={`group flex items-center space-x-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 shadow-md backdrop-blur-md ${
          isPlaying
            ? 'bg-rose-50/90 border-rose-300 text-rose-700 shadow-rose-100'
            : 'bg-white/85 border-stone-200 text-stone-700 hover:border-stone-300 shadow-stone-100'
        }`}
        title={isPlaying ? 'Pause music' : 'Play our song'}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-semibold tracking-wide">
              {storyConfig.musicTitle}
            </span>
            {/* Subtle animated music bars */}
            <div className="flex items-end space-x-0.5 h-4 px-0.5">
              <span className="w-0.5 bg-rose-400 rounded-full animate-music-bar-1" />
              <span className="w-0.5 bg-rose-500 rounded-full animate-music-bar-2" />
              <span className="w-0.5 bg-rose-400 rounded-full animate-music-bar-3" />
            </div>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-stone-600">
              🎵 {storyConfig.musicTitle}
            </span>
          </>
        )}
      </button>

      {/* Gentle hint on first load */}
      {!hasInteracted && !isPlaying && (
        <span className="hidden sm:inline-block text-[11px] text-stone-500 bg-white/75 px-2 py-0.5 rounded-full border border-stone-200">
          Click for music 🎶
        </span>
      )}
    </div>
  );
};
