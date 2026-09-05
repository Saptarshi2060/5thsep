import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { CoupleVignette } from './CoupleVignette';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Calendar, Heart } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter8TodayProps {
  onContinue: () => void;
}

export const Chapter8Today: React.FC<Chapter8TodayProps> = ({ onContinue }) => {
  // Section 0: The 365 Days Reflection
  // Section 1: Today's Sincere Apology & Accountability
  // Section 2: Reaching out, gentle reconciliation & small hug
  const [section, setSection] = useState<number>(0);

  const apologyLines = storyConfig.quotes.todayReflection.apologyLines;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto">
      {/* Date Milestone Pill */}
      <div className="text-center mb-4 z-10">
        <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2 font-storybook">
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>{storyConfig.currentDate} • Exactly One Year</span>
        </div>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800">
          Chapter 8 — Today
        </h2>
      </div>

      {/* SECTION 0: 365 Days Milestone */}
      {section === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex-1 flex flex-col items-center justify-center my-4"
        >
          {/* Sitting Together in Reflection */}
          <div className="flex items-end space-x-8 mb-6">
            <BoyCharacter expression="smiling" size="lg" />
            <GirlCharacter expression="smiling" size="lg" flip={true} />
          </div>

          {/* Stats List */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-md w-full px-4 mb-6">
            {storyConfig.quotes.todayReflection.stats.slice(0, 4).map((st, i) => (
              <div
                key={i}
                className="bg-white/90 border border-stone-200 p-2.5 rounded-2xl text-center shadow-xs"
              >
                <span className="font-serif-story text-xs sm:text-sm text-stone-800 font-semibold block">
                  {st}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center max-w-sm px-4 space-y-1 mb-8">
            <p className="font-handwriting text-xl text-stone-600">
              "So many hugs. So many little moments."
            </p>
            <p className="font-serif-story text-lg text-rose-600 font-medium">
              "And somehow... we're still here."
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              setSection(1);
            }}
            className="px-6 py-2.5 rounded-full bg-stone-700 hover:bg-stone-800 text-white font-medium text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <span>Read what I need to tell you today →</span>
          </button>
        </motion.div>
      )}

      {/* SECTION 1: Today's Sincere Apology (Zero manipulation, pure accountability) */}
      {section === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex-1 flex flex-col items-center justify-center my-4 max-w-lg"
        >
          {/* Boy sitting alone, looking regretful, acknowledging girl's pain */}
          <div className="flex items-end justify-between w-full max-w-xs px-6 mb-8 relative">
            <div className="flex flex-col items-center">
              <BoyCharacter expression="sad_regret" size="md" />
              <span className="text-[11px] font-handwriting text-stone-500 mt-1">
                (Regretful & listening)
              </span>
            </div>

            <div className="flex flex-col items-center">
              <GirlCharacter expression="crying_sad" size="md" flip={true} />
              <span className="text-[11px] font-handwriting text-stone-500 mt-1">
                (Hurt by his words)
              </span>
            </div>
          </div>

          {/* Sincere text progression */}
          <div className="bg-[#FFFDF9] border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-3 mb-6 w-full">
            <p className="font-serif-story text-base sm:text-lg text-stone-800">
              "And today, I got something very important wrong."
            </p>
            <p className="font-serif-story text-xl sm:text-2xl text-stone-900 font-semibold">
              "I hurt you."
            </p>
            <p className="font-handwriting text-3xl text-rose-600 font-bold">
              "I'm sorry."
            </p>

            <div className="w-16 h-px bg-stone-200 mx-auto my-3" />

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              "You didn't deserve to cry because of my words. I don't want to make excuses for it. I was wrong."
            </p>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              "I'm still learning how to love someone without letting anger speak for me. And I want to do better."
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              setSection(2);
            }}
            className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <span>See how we move forward →</span>
          </button>
        </motion.div>
      )}

      {/* SECTION 2: Moving Forward Patiently */}
      {section === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex-1 flex flex-col items-center justify-center my-4 max-w-lg text-center"
        >
          {/* Animated Vignette: Listening, offering hand, small sincere embrace */}
          <div className="min-h-[220px] flex items-center justify-center mb-6">
            <CoupleVignette type="listening_reconcile" size="lg" />
          </div>

          <div className="space-y-2 mb-8 px-4">
            <p className="font-serif-story text-base sm:text-lg text-stone-800 leading-relaxed">
              "I know an animation can't undo what happened."
            </p>
            <p className="font-handwriting text-2xl text-rose-600 font-bold">
              "But I hope this reminds you of what I'm trying to build with you."
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onContinue();
            }}
            className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
          >
            <span>Chapter 9 — If I Could Go Back</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
