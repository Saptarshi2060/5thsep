import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter2ButterfliesProps {
  onContinue: () => void;
}

export const Chapter2Butterflies: React.FC<Chapter2ButterfliesProps> = ({ onContinue }) => {
  // Modes: 0 = Giddy texting, 1 = Blushing butterflies, 2 = Falling asleep with phone
  const [momentIndex, setMomentIndex] = useState<number>(0);

  const moments = [
    {
      title: "The Notification Jump",
      caption: "Every time the screen lit up with their name, your heart skipped a beat.",
      boyExp: 'laughing' as const,
      girlExp: 'blushing' as const,
      boyThought: "SHE REPLIED!! ⚡️😆",
      girlThought: "Why am I smiling like an idiot? 🙈",
    },
    {
      title: "The Butterfly Effect",
      caption: "Butterflies weren't just in the stomach—they were everywhere.",
      boyExp: 'blushing' as const,
      girlExp: 'laughing' as const,
      boyThought: "Can't stop blushing... 🌸",
      girlThought: "You're so cute haha ✨",
    },
    {
      title: "Falling Asleep Texting",
      caption: "Fighting heavy eyelids just to squeeze in one more 'goodnight'.",
      boyExp: 'sleeping' as const,
      girlExp: 'sleeping' as const,
      boyThought: "zzZ (still holding phone)",
      girlThought: "zzZ (fell asleep smiling)",
    },
  ];

  const current = moments[momentIndex];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto overflow-hidden">
      {/* Animated Floating Butterflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '15%', y: '25%', delay: 0, scale: 1 },
          { x: '80%', y: '20%', delay: 1.2, scale: 0.8 },
          { x: '35%', y: '65%', delay: 0.6, scale: 0.9 },
          { x: '75%', y: '70%', delay: 1.8, scale: 1.1 },
          { x: '50%', y: '30%', delay: 2.2, scale: 0.7 },
        ].map((bf, idx) => (
          <motion.div
            key={idx}
            className="absolute text-xl select-none"
            style={{ left: bf.x, top: bf.y }}
            animate={{
              y: [0, -15, 0, -10, 0],
              x: [0, 8, -6, 4, 0],
              rotate: [0, 15, -10, 5, 0],
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: bf.delay,
            }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      {/* Chapter header */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 2
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          The Butterflies
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          {current.title} • {momentIndex + 1} of {moments.length}
        </p>
      </div>

      {/* Main Animated Vignette */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[340px] my-4 z-10">
        {/* Pillow / Cozy bed rug */}
        <div className="w-80 h-10 bg-[#F5EBE1] border border-[#E8D9C9] rounded-full shadow-inner mb-6 flex items-center justify-center space-x-6">
          <span className="text-xs text-stone-400 font-storybook">☁️ cozy late night ☁️</span>
        </div>

        <div className="flex items-end justify-center space-x-12 sm:space-x-20 relative">
          {/* Boy with thought bubble */}
          <div className="flex flex-col items-center relative">
            <motion.div
              key={`boy-${momentIndex}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-12 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl text-xs text-amber-950 font-storybook shadow-xs whitespace-nowrap"
            >
              💭 {current.boyThought}
            </motion.div>
            <BoyCharacter expression={current.boyExp} size="lg" />
          </div>

          {/* Girl with thought bubble */}
          <div className="flex flex-col items-center relative">
            <motion.div
              key={`girl-${momentIndex}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-12 bg-rose-50 border border-rose-200 px-3 py-1 rounded-2xl text-xs text-rose-950 font-storybook shadow-xs whitespace-nowrap"
            >
              💭 {current.girlThought}
            </motion.div>
            <GirlCharacter expression={current.girlExp} size="lg" flip={true} />
          </div>
        </div>

        {/* Caption for this moment */}
        <motion.p
          key={`caption-${momentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-handwriting text-xl text-rose-700 mt-6 max-w-sm px-4"
        >
          {current.caption}
        </motion.p>

        {/* Moment Switcher Tabs */}
        <div className="flex items-center space-x-2 mt-4">
          {moments.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playPop();
                setMomentIndex(idx);
              }}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                momentIndex === idx
                  ? 'bg-rose-500 text-white font-medium shadow-xs'
                  : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
              }`}
            >
              Phase {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Narration Quote */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        <blockquote className="font-serif-story text-base sm:text-lg text-stone-700 italic mb-6 leading-relaxed">
          "{storyConfig.quotes.chapter2}"
        </blockquote>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Chapter 3</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
