import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, CloudRain } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter4NotEveryDayProps {
  onContinue: () => void;
}

export const Chapter4NotEveryDay: React.FC<Chapter4NotEveryDayProps> = ({ onContinue }) => {
  // Phase 0: Disagreement speech bubbles
  // Phase 1: Distance & rain starts, girl sad, boy realizes
  // Phase 2: Boy turns, looking regretful, steps forward carefully
  const [phase, setPhase] = useState<number>(0);

  const dialogueBubbles = [
    { sender: 'boy', text: "That's not even what I meant..." },
    { sender: 'girl', text: "It just felt like you didn't care about what I was saying." },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto transition-colors duration-1000 bg-[#F4F1EE]">
      {/* Animated Soft Rain Effect in Phase >= 1 */}
      {phase >= 1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-6 bg-blue-300/40 rounded-full"
              style={{
                left: `${(i * 4.2 + 3) % 96}%`,
                top: `${(i * 18) % 60}%`,
                animation: `rainDrop ${1.2 + (i % 5) * 0.2}s linear infinite`,
                animationDelay: `${(i * 0.15)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase font-storybook">
          Chapter 4
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-700 mt-1">
          Not Every Day Was Perfect
        </h2>
        <div className="flex items-center justify-center space-x-1.5 text-xs text-stone-400 mt-1">
          <CloudRain className="w-3.5 h-3.5 text-stone-400" />
          <span>Growing pains • Real emotions</span>
        </div>
      </div>

      {/* Main Animated Stage */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2 z-10">
        {/* Overhead Rain Cloud */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1 text-4xl mb-4 text-stone-400 select-none"
          >
            <span>🌧️</span>
            <span className="text-2xl text-stone-400">💧</span>
          </motion.div>
        )}

        {/* Characters positioning based on phase */}
        <div className="w-full max-w-md flex items-end justify-between px-6 sm:px-12 relative min-h-[220px]">
          {/* Boy */}
          <motion.div
            animate={{
              x: phase === 0 ? 0 : phase === 1 ? -25 : 15,
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="flex flex-col items-center relative"
          >
            {/* Dialogue bubble */}
            {phase === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-12 bg-white/95 border border-stone-300 px-3 py-1.5 rounded-2xl text-xs text-stone-700 font-storybook shadow-xs whitespace-nowrap"
              >
                "{dialogueBubbles[0].text}"
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl text-[11px] text-amber-900 font-storybook shadow-xs whitespace-nowrap"
              >
                (He realized his words hurt her...)
              </motion.div>
            )}

            <BoyCharacter
              expression={
                phase === 0
                  ? 'angry'
                  : phase === 1
                  ? 'sad_regret'
                  : 'apologetic_reach'
              }
              size="lg"
              flip={phase === 1}
            />
          </motion.div>

          {/* Emotional Distance Divider */}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center mb-12 text-stone-400"
            >
              <span className="text-xs font-handwriting text-stone-500">
                silence...
              </span>
              <div className="w-20 sm:w-28 h-px bg-stone-300 my-1" />
            </motion.div>
          )}

          {/* Girl */}
          <motion.div
            animate={{
              x: phase === 0 ? 0 : phase === 1 ? 25 : 0,
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="flex flex-col items-center relative"
          >
            {/* Dialogue bubble */}
            {phase === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-14 bg-white/95 border border-stone-300 px-3 py-1.5 rounded-2xl text-xs text-stone-700 font-storybook shadow-xs max-w-[160px] text-center"
              >
                "{dialogueBubbles[1].text}"
              </motion.div>
            )}

            <GirlCharacter
              expression={phase === 0 ? 'angry' : 'crying_sad'}
              size="lg"
              flip={phase === 0 ? true : false}
            />
          </motion.div>
        </div>

        {/* Phase interactive advance button */}
        <div className="mt-6 flex space-x-2">
          <button
            onClick={() => {
              soundManager.playPop();
              setPhase((prev) => (prev + 1) % 3);
            }}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium rounded-full transition-all"
          >
            {phase === 0
              ? 'Watch what happens next →'
              : phase === 1
              ? 'See him approach her →'
              : 'Replay moment ↺'}
          </button>
        </div>
      </div>

      {/* Narration Quote list */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        <div className="space-y-1 mb-6">
          {storyConfig.quotes.chapter4.map((line, idx) => (
            <p key={idx} className="font-serif-story text-sm sm:text-base text-stone-600 italic">
              "{line}"
            </p>
          ))}
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-stone-700 hover:bg-stone-800 active:scale-95 text-white font-medium text-sm shadow-md transition-all inline-flex items-center space-x-2 group"
        >
          <span>See how we fixed things →</span>
        </button>
      </div>
    </div>
  );
};
