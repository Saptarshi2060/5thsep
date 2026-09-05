import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { CoupleVignette } from './CoupleVignette';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter6LittleWaysWeCareProps {
  onContinue: () => void;
}

interface CareMoment {
  id: number;
  phrase: string;
  action: string;
  icon: string;
  vignette: 'blanket_care' | 'sharing_food' | 'laughing_together' | 'warm_hug';
}

export const Chapter6LittleWaysWeCare: React.FC<Chapter6LittleWaysWeCareProps> = ({ onContinue }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const careMoments: CareMoment[] = [
    {
      id: 1,
      phrase: '"Did you eat?"',
      action: "Bringing her favorite snack when she's exhausted.",
      icon: "🍲",
      vignette: 'sharing_food',
    },
    {
      id: 2,
      phrase: '"Are you okay?"',
      action: "Noticing a change in tone before anyone else does.",
      icon: "🧣",
      vignette: 'blanket_care',
    },
    {
      id: 3,
      phrase: '"Text me when you reach."',
      action: "Keeping one eye on the phone until she's home safe.",
      icon: "📱",
      vignette: 'warm_hug',
    },
    {
      id: 4,
      phrase: '"Come here."',
      action: "Pulling her close just to make the heavy day feel lighter.",
      icon: "🫂",
      vignette: 'warm_hug',
    },
    {
      id: 5,
      phrase: '"I missed you."',
      action: "Saying it even if they only parted a few hours ago.",
      icon: "✨",
      vignette: 'laughing_together',
    },
  ];

  const current = careMoments[activeIdx];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto overflow-hidden">
      {/* Floating Sparkles and Warm Lights */}
      <div className="absolute inset-0 pointer-events-none">
        {['🍲', '✨', '💛', '🧣', '☕', '⭐'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-40 select-none"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 6
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          The Little Ways We Care
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          {storyConfig.quotes.chapter6Intro}
        </p>
      </div>

      {/* Main Animated Stage */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2 z-10">
        {/* Active Care Tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full shadow-xs mb-2">
              <span className="text-base">{current.icon}</span>
              <span className="font-serif-story text-xl sm:text-2xl text-rose-600 font-semibold">
                {current.phrase}
              </span>
            </div>
            <p className="font-handwriting text-lg sm:text-xl text-stone-600">
              {current.action}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Animated Couple Scene */}
        <div className="min-h-[220px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <CoupleVignette type={current.vignette} size="lg" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive buttons for each little phrase */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 max-w-md px-2">
          {careMoments.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playPop();
                setActiveIdx(idx);
              }}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                activeIdx === idx
                  ? 'bg-rose-500 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {item.phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Narration Quote */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        <blockquote className="font-serif-story text-base sm:text-lg text-stone-700 italic mb-6">
          "{storyConfig.quotes.chapter6Outro}"
        </blockquote>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Chapter 7</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
