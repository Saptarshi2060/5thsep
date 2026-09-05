import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { CoupleVignette } from './CoupleVignette';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Flame } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter7ChaoticUsProps {
  onContinue: () => void;
}

interface ComicFrame {
  id: number;
  emoji: string;
  label: string;
  comment: string;
  type: 'chaotic_squabble' | 'sharing_food' | 'laughing_together' | 'warm_hug' | 'sweet_kiss';
}

export const Chapter7ChaoticUs: React.FC<Chapter7ChaoticUsProps> = ({ onContinue }) => {
  const [frameIdx, setFrameIdx] = useState<number>(0);

  const frames: ComicFrame[] = [
    {
      id: 1,
      emoji: "😂",
      label: "Laughing hysterically",
      comment: "Laughed until our bellies hurt and made zero sense.",
      type: 'laughing_together',
    },
    {
      id: 2,
      emoji: "🍟😤",
      label: "The 'I said I wasn't hungry' war",
      comment: "Immediately steals half the French fries anyway.",
      type: 'chaotic_squabble',
    },
    {
      id: 3,
      emoji: "🍜🍕",
      label: "Devouring food together",
      comment: "No elegance. Just pure two hungry raccoons feast.",
      type: 'sharing_food',
    },
    {
      id: 4,
      emoji: "🙄❤️",
      label: "Playful eye-rolls",
      comment: "Acting annoyed for 2 seconds then immediately hugging.",
      type: 'warm_hug',
    },
    {
      id: 5,
      emoji: "💋🥹",
      label: "Becoming soft again",
      comment: "Because staying mad at that cute face is impossible.",
      type: 'sweet_kiss',
    },
  ];

  const current = frames[frameIdx];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto">
      {/* Header with comic flair */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase font-storybook">
          Chapter 7
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1 flex items-center justify-center space-x-2">
          <span>The Chaotic Us</span>
          <span className="text-xl">⚡</span>
        </h2>

        {/* Humorous 3-part tag */}
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-handwriting text-stone-600 mt-2">
          <span className="text-rose-500 font-semibold">{storyConfig.quotes.chapter7.tag1}</span>
          <span>•</span>
          <span className="text-stone-500 italic">{storyConfig.quotes.chapter7.tag2}</span>
          <span>•</span>
          <span className="text-amber-600 font-bold">{storyConfig.quotes.chapter7.tag3}</span>
        </div>
      </div>

      {/* Comic Book Strip Panel */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2 z-10">
        <div className="w-full max-w-md bg-[#FFFDF7] border-2 border-dashed border-amber-300/80 rounded-3xl p-6 shadow-sm flex flex-col items-center relative">
          {/* Badge */}
          <div className="absolute -top-3.5 bg-amber-400 text-amber-950 px-3 py-0.5 rounded-full text-xs font-bold font-storybook tracking-wide shadow-xs flex items-center space-x-1">
            <span>{current.emoji}</span>
            <span>{current.label}</span>
          </div>

          {/* Animated vignette */}
          <div className="min-h-[200px] flex items-center justify-center w-full my-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, rotate: -3, scale: 0.95 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 3, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <CoupleVignette type={current.type} size="lg" />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            key={`comment-${current.id}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-handwriting text-lg sm:text-xl text-stone-700 max-w-xs"
          >
            "{current.comment}"
          </motion.p>
        </div>

        {/* Rapid comic switcher */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-5">
          {frames.map((frame, idx) => (
            <button
              key={frame.id}
              onClick={() => {
                soundManager.playPop();
                setFrameIdx(idx);
              }}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                frameIdx === idx
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {frame.emoji} {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Transition to Today */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        <p className="font-handwriting text-xl text-stone-600 mb-6">
          And after 365 days of laughter, food, and chaos... that brings us to today.
        </p>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Today (5 Sept 2026)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
