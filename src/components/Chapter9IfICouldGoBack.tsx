import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Heart, Sparkles, Check } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter9IfICouldGoBackProps {
  onContinue: () => void;
  onDateClick: () => void;
}

export const Chapter9IfICouldGoBack: React.FC<Chapter9IfICouldGoBackProps> = ({
  onContinue,
  onDateClick,
}) => {
  // Phase 0: Standing in front of the Follow button, looking back
  // Phase 1: Rapid memory filmstrip flash montage
  // Phase 2: He smiles confidently: "I'd still send it." -> Clicks Follow!
  // Phase 3: Girl's phone glows: "Accept ❤️"
  const [phase, setPhase] = useState<number>(0);

  const memoryFlashes = [
    { title: "Late nights", emoji: "🌙" },
    { title: "Laughing", emoji: "😂" },
    { title: "Fighting", emoji: "🌧️" },
    { title: "Making up", emoji: "🤝" },
    { title: "Food", emoji: "🍜" },
    { title: "Dates", emoji: "🚶‍♂️🚶‍♀️" },
    { title: "Hugs", emoji: "🫂" },
    { title: "Kisses", emoji: "💋" },
    { title: "Caring", emoji: "🧣" },
  ];

  const handleStartFlashback = () => {
    soundManager.playPop();
    setPhase(1);
    setTimeout(() => {
      setPhase(2);
    }, 2800);
  };

  const handleFollowClick = () => {
    soundManager.playPop();
    setPhase(3);
    soundManager.playChime();
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto">
      {/* Date Header with Easter egg trigger */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 9
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          If I Could Go Back
        </h2>
        <div
          onClick={onDateClick}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-stone-200 bg-white/80 text-stone-700 text-xs font-semibold mt-2 cursor-pointer hover:border-rose-300 transition-colors shadow-xs"
          title="Click me!"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{storyConfig.anniversaryDate}</span>
        </div>
      </div>

      {/* Main Animated Stage */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[360px] my-2 z-10">
        {/* PHASE 0: Hesitation at the origin */}
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <div className="mb-6">
              <BoyCharacter expression="nervous_phone" size="lg" />
            </div>

            <p className="font-serif-story text-lg sm:text-xl text-stone-800 italic mb-2">
              "If I could go back to this exact moment..."
            </p>
            <p className="font-handwriting text-2xl text-stone-600 mb-8">
              "Knowing everything I know now..."
            </p>

            <button
              onClick={handleStartFlashback}
              className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-medium text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <span>Relive the year in a flash ✨</span>
            </button>
          </motion.div>
        )}

        {/* PHASE 1: Rapid Filmstrip Memory Flash */}
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center w-full max-w-md"
          >
            <p className="text-xs uppercase font-storybook tracking-widest text-amber-600 mb-4">
              Everything we lived...
            </p>

            <div className="grid grid-cols-3 gap-3 w-full px-4">
              {memoryFlashes.map((mem, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white border border-stone-200 p-3 rounded-2xl shadow-xs flex flex-col items-center justify-center"
                >
                  <span className="text-2xl mb-1">{mem.emoji}</span>
                  <span className="text-xs font-semibold text-stone-700 font-storybook">
                    {mem.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Boy Smiles & Clicks Follow */}
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center max-w-sm w-full"
          >
            <div className="mb-4">
              <BoyCharacter expression="smiling" size="lg" />
            </div>

            <p className="font-handwriting text-3xl text-rose-600 font-bold mb-6">
              "I'd still send it."
            </p>

            {/* Follow Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollowClick}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl text-sm sm:text-base shadow-lg shadow-rose-200 transition-all flex items-center justify-center space-x-2 animate-pulse"
            >
              <span>Follow</span>
              <Heart className="w-5 h-5 fill-white" />
            </motion.button>
          </motion.div>
        )}

        {/* PHASE 3: Girl's Phone: Accept ❤️ */}
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center max-w-sm w-full"
          >
            <div className="mb-4">
              <GirlCharacter expression="smiling_accept" size="lg" flip={true} />
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full py-3.5 bg-rose-500 text-white font-bold rounded-2xl text-base sm:text-lg shadow-xl shadow-rose-300/50 flex items-center justify-center space-x-2"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Accepted ❤️</span>
            </motion.div>

            <p className="font-handwriting text-2xl text-rose-700 mt-4">
              "The best decision of both our lives."
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4 z-10">
        {phase === 3 ? (
          <button
            onClick={() => {
              soundManager.playPop();
              onContinue();
            }}
            className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
          >
            <span>The Final Scene & Anniversary Letter</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <p className="text-xs text-stone-400 font-storybook">
            Follow the steps above to reach our final scene...
          </p>
        )}
      </div>
    </div>
  );
};
