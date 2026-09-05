import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoupleVignette, VignetteType } from './CoupleVignette';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter3FirstLittleWorldProps {
  onContinue: () => void;
}

interface MiniScene {
  id: number;
  type: VignetteType;
  title: string;
  tagline: string;
}

export const Chapter3FirstLittleWorld: React.FC<Chapter3FirstLittleWorldProps> = ({ onContinue }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  const scenes: MiniScene[] = [
    { id: 1, type: 'walking', title: 'Dates.', tagline: 'Walking side by side, matching our steps.' },
    { id: 2, type: 'sitting_talking', title: 'Random conversations.', tagline: 'Talking about everything, and about nothing at all.' },
    { id: 3, type: 'sharing_food', title: 'Food.', tagline: 'Sharing every meal, stealing the best bite.' },
    { id: 4, type: 'feeding_each_other', title: 'Feeding each other.', tagline: '"Open wide!" followed by uncontrollable blushing.' },
    { id: 5, type: 'laughing_together', title: 'Laughing over absolutely nothing.', tagline: 'Tears in our eyes from laughing at silly inside jokes.' },
    { id: 6, type: 'taking_selfie', title: 'Imaginary selfies.', tagline: 'Making silly faces into the camera, keeping memories.' },
    { id: 7, type: 'holding_hands', title: 'Holding hands.', tagline: 'How perfectly fingers fit together for the first time.' },
    { id: 8, type: 'warm_hug', title: 'Hugs.', tagline: 'Where all the noise of the world immediately disappears.' },
    { id: 9, type: 'sweet_kiss', title: 'Kisses.', tagline: 'Gentle, sweet, and making the whole room fade away.' },
    { id: 10, type: 'under_stars', title: 'The little things.', tagline: 'Sitting quietly under the night sky, completely at home.' },
  ];

  React.useEffect(() => {
    let timer: number | null = null;
    if (isAutoplay) {
      timer = window.setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % scenes.length);
      }, 3000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoplay, scenes.length]);

  const handleNext = () => {
    soundManager.playPop();
    setCurrentIdx((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    soundManager.playPop();
    setCurrentIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const scene = scenes[currentIdx];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 3
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          Our First Little World
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Scene {currentIdx + 1} of {scenes.length}
        </p>
      </div>

      {/* Main Animated Stage with Vignettes */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2">
        {/* Caption Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${scene.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center mb-6"
          >
            <h3 className="font-serif-story text-2xl sm:text-3xl text-rose-600 font-medium">
              "{scene.title}"
            </h3>
            <p className="font-handwriting text-xl text-stone-600 mt-1">
              {scene.tagline}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Animated Couple Vignette */}
        <div className="relative min-h-[220px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <CoupleVignette type={scene.type} size="lg" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini Scene Navigation Stepper */}
        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-xs"
            aria-label="Previous scene"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Stepper dots */}
          <div className="flex space-x-1">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundManager.playPop();
                  setCurrentIdx(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIdx === idx ? 'w-5 bg-rose-500' : 'w-2 bg-stone-300'
                }`}
                aria-label={`View scene ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-xs"
            aria-label="Next scene"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Autoplay toggle */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 border ${
              isAutoplay
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            {isAutoplay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoplay ? 'Pause' : 'Autoplay'}</span>
          </button>
        </div>
      </div>

      {/* Climax Narration */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4">
        <blockquote className="font-serif-story text-lg sm:text-xl text-stone-800 italic mb-6">
          "{storyConfig.quotes.chapter3Outro}"
        </blockquote>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Chapter 4</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
