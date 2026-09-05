import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { Moon, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface FinalSceneProps {
  onRestart: () => void;
  onDateClick: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ onRestart, onDateClick }) => {
  const [isZoomedOut, setIsZoomedOut] = useState<boolean>(false);

  const gratitudePoints = [
    "Thank you for every laugh.",
    "Every hug.",
    "Every kiss.",
    "Every meal.",
    "Every stupid argument.",
    "Every apology.",
    "Every moment you cared.",
    "Every moment you stayed.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#0A071E] text-stone-100 flex flex-col items-center justify-between p-4 py-12 relative overflow-hidden select-none">
      {/* Starry night sky particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${(i % 3) * 1.2 + 1}px`,
              height: `${(i % 3) * 1.2 + 1}px`,
              left: `${(i * 7.7) % 98}%`,
              top: `${(i * 11.3) % 95}%`,
              opacity: (i % 5) * 0.15 + 0.3,
              animation: `pulseSoft ${2 + (i % 4)}s ease-in-out infinite alternate`,
            }}
          />
        ))}

        {/* Crescent Moon */}
        <div className="absolute top-12 right-12 sm:right-24 flex flex-col items-center opacity-90">
          <div className="text-4xl text-amber-200 drop-shadow-[0_0_12px_rgba(253,230,138,0.5)]">
            🌙
          </div>
          <span className="text-[10px] text-amber-200/60 font-storybook mt-1">
            Midnight Sky
          </span>
        </div>
      </div>

      {/* Header Milestone */}
      <div className="text-center z-10 max-w-xl mx-auto">
        <div
          onClick={onDateClick}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-950/60 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer hover:border-amber-300 transition-colors shadow-lg"
          title="Click me!"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{storyConfig.anniversaryDate} → {storyConfig.currentDate}</span>
        </div>

        <h1 className="font-serif-story text-2xl sm:text-4xl text-white font-medium mt-4 tracking-tight leading-tight">
          One year since you accepted my request.
        </h1>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-300 mt-2">
          One year since a tiny notification changed my life.
        </p>
      </div>

      {/* Main Animated Starry Vignette (Zoom Out Support) */}
      <motion.div
        animate={{ scale: isZoomedOut ? 0.75 : 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="w-full max-w-2xl flex flex-col items-center justify-center relative my-8 z-10"
      >
        {/* Grassy knoll silhouette */}
        <div className="relative w-full max-w-md flex flex-col items-center">
          {/* Sitting Couple: Girl resting head on boy's shoulder */}
          <div className="flex items-end -space-x-6 z-20 mb-[-12px]">
            <BoyCharacter expression="holding_hand" size="lg" />
            <motion.div
              style={{ transformOrigin: 'bottom left' }}
              animate={{ rotate: [-6, -8, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GirlCharacter expression="resting_shoulder" size="lg" flip={true} />
            </motion.div>
          </div>

          {/* Grassy curved hill */}
          <div className="w-full h-16 bg-[#162032] border-t border-indigo-400/20 rounded-t-[100%] shadow-2xl relative z-10 flex items-center justify-center">
            {/* Little fireflies near grass */}
            <div className="absolute top-2 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full blur-[1px] animate-pulse" />
            <div className="absolute top-4 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full blur-[1px] animate-pulse delay-300" />
          </div>
        </div>

        {/* Camera zoom toggle button */}
        <button
          onClick={() => {
            soundManager.playPop();
            setIsZoomedOut(!isZoomedOut);
          }}
          className="mt-4 px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 hover:text-white rounded-full text-xs transition-colors backdrop-blur-xs"
        >
          {isZoomedOut ? '🔍 Zoom closer' : '🌌 Zoom out to the stars'}
        </button>
      </motion.div>

      {/* Heartfelt Gratitude & Letter */}
      <div className="w-full max-w-lg bg-indigo-950/40 border border-indigo-500/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-center space-y-4 z-10 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-indigo-200/90 text-left sm:px-4">
          {gratitudePoints.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-rose-400 text-xs">✨</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="w-20 h-px bg-indigo-500/30 mx-auto my-4" />

        <div className="space-y-1">
          <p className="font-serif-story text-base sm:text-lg text-rose-200">
            "I'm sorry for today."
          </p>
          <p className="font-serif-story text-base sm:text-lg text-amber-200 font-semibold">
            "I'm grateful for this year."
          </p>
        </div>

        {/* Grand 1-Year Greeting */}
        <div className="pt-2">
          <h2 className="font-serif-story text-3xl sm:text-4xl text-rose-400 font-bold tracking-tight">
            Happy 1st year of us. ❤️
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-stone-300 mt-2">
            "Here's to everything we've already lived..."
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl text-amber-300 font-semibold mt-1">
            "...and everything we haven't lived yet."
          </p>
        </div>

        {/* Final Touching Sign-off */}
        <div className="pt-4 border-t border-indigo-500/20">
          <p className="font-serif-story text-sm text-stone-300">
            Thank you for pressing Accept.
          </p>
          <div className="text-2xl mt-1 text-rose-500 animate-pulse">
            ❤️
          </div>
        </div>
      </div>

      {/* Replay or restart button */}
      <div className="mt-8 z-10 text-center">
        <button
          onClick={() => {
            soundManager.playPop();
            onRestart();
          }}
          className="inline-flex items-center space-x-2 text-xs text-indigo-300 hover:text-white transition-colors px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-900/30 backdrop-blur-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Read our story from the beginning</span>
        </button>
      </div>
    </div>
  );
};
