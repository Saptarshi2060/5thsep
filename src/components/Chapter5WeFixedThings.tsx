import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { CoupleVignette } from './CoupleVignette';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Sun, Heart } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter5WeFixedThingsProps {
  onContinue: () => void;
}

export const Chapter5WeFixedThings: React.FC<Chapter5WeFixedThingsProps> = ({ onContinue }) => {
  // Step 0: Sitting quietly & listening patiently
  // Step 1: Holding hands
  // Step 2: Warm gentle hug
  // Step 3: Smiling & walking forward together
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: "1. Giving space & listening",
      desc: "He didn't make excuses or rush her. He sat quietly beside her and listened.",
    },
    {
      title: "2. Reaching out a hand",
      desc: "A gentle touch, promising that whatever hurt, they would solve it together.",
    },
    {
      title: "3. The hug that heals",
      desc: "All the tension melted into warm comfort and whispered apologies.",
    },
    {
      title: "4. Walking forward stronger",
      desc: "Every resolved argument made their bond deeper than before.",
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto transition-colors duration-1000 bg-[#FFFDF9]">
      {/* Warm Golden Sun appearing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-6 right-10 flex items-center space-x-2 text-amber-500/80 pointer-events-none select-none"
      >
        <Sun className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
      </motion.div>

      {/* Header */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 5
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          We Fixed Things
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          {steps[step].title}
        </p>
      </div>

      {/* Main Animated Stage */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2 z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-end space-x-10 relative"
            >
              <div className="flex flex-col items-center">
                <div className="bg-white border border-stone-200 px-3 py-1 rounded-2xl text-xs text-stone-600 mb-2 font-storybook">
                  "I'm listening..."
                </div>
                <BoyCharacter expression="listening" size="lg" />
              </div>
              <div className="flex flex-col items-center">
                <GirlCharacter expression="listening" size="lg" flip={true} />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CoupleVignette type="holding_hands" size="lg" />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CoupleVignette type="warm_hug" size="lg" />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CoupleVignette type="walking" size="lg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step description */}
        <motion.p
          key={`desc-${step}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-handwriting text-xl text-rose-700 mt-6 max-w-sm px-4"
        >
          {steps[step].desc}
        </motion.p>

        {/* Steps indicator */}
        <div className="flex items-center space-x-2 mt-4">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playPop();
                setStep(idx);
              }}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                step === idx
                  ? 'bg-rose-500 text-white font-medium shadow-xs'
                  : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Narration Quote */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        <div className="space-y-1 mb-6">
          {storyConfig.quotes.chapter5.map((line, idx) => (
            <p key={idx} className="font-serif-story text-base sm:text-lg text-stone-700 italic">
              "{line}"
            </p>
          ))}
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Chapter 6</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
