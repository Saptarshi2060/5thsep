import React from 'react';
import { motion } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';

export type VignetteType = 
  | 'walking'
  | 'sitting_talking'
  | 'sharing_food'
  | 'feeding_each_other'
  | 'laughing_together'
  | 'taking_selfie'
  | 'holding_hands'
  | 'warm_hug'
  | 'sweet_kiss'
  | 'under_stars'
  | 'blanket_care'
  | 'rain_distance'
  | 'listening_reconcile'
  | 'chaotic_squabble';

interface CoupleVignetteProps {
  type: VignetteType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CoupleVignette: React.FC<CoupleVignetteProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`flex items-center justify-center relative select-none ${className}`}>
      {/* 1. WALKING TOGETHER */}
      {type === 'walking' && (
        <div className="flex items-end space-x-6 relative">
          <motion.div
            animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BoyCharacter expression="walking" size={size} />
          </motion.div>
          {/* Floating little heart between them */}
          <motion.div
            className="text-rose-400 text-lg absolute left-1/2 -top-2 transform -translate-x-1/2"
            animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <motion.div
            animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          >
            <GirlCharacter expression="walking" size={size} />
          </motion.div>
        </div>
      )}

      {/* 2. SITTING AND TALKING */}
      {type === 'sitting_talking' && (
        <div className="flex items-center justify-center relative">
          {/* Bench / Log */}
          <div className="absolute bottom-4 w-72 h-4 bg-[#8D6E63] rounded-full shadow-sm" />
          <div className="absolute bottom-1 w-64 flex justify-between px-6">
            <div className="w-3 h-4 bg-[#5D4037] rounded-sm" />
            <div className="w-3 h-4 bg-[#5D4037] rounded-sm" />
          </div>

          <div className="flex items-end space-x-8 z-10">
            <div className="relative">
              <BoyCharacter expression="smiling" size={size} />
              {/* Little speech bubble */}
              <motion.div
                className="absolute -top-7 -right-2 bg-white/90 border border-stone-200 px-2.5 py-1 rounded-full text-xs shadow-xs text-stone-700 font-storybook"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💭 ...and then!
              </motion.div>
            </div>

            <div className="relative">
              <GirlCharacter expression="listening" size={size} flip={true} />
              <motion.div
                className="absolute -top-6 -left-2 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full text-xs shadow-xs text-rose-700 font-storybook"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                ✨ really? hehe
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SHARING FOOD (Café table, pizza / noodles) */}
      {type === 'sharing_food' && (
        <div className="flex items-center justify-center relative">
          <div className="flex items-end space-x-12 z-10">
            <BoyCharacter expression="eating" size={size} />
            <GirlCharacter expression="eating" size={size} flip={true} />
          </div>

          {/* Table in middle */}
          <div className="absolute bottom-0 z-20 flex flex-col items-center">
            {/* Table top */}
            <div className="w-36 h-6 bg-[#E0D5C1] border-b-4 border-[#C8B89E] rounded-md flex items-center justify-center space-x-3 shadow-xs">
              {/* Food dish / noodles */}
              <div className="relative">
                <span className="text-xl">🍜</span>
                <motion.span
                  className="absolute -top-3 left-1 text-xs text-stone-400"
                  animate={{ y: [-2, -8], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ~
                </motion.span>
              </div>
              <span className="text-lg">🍕</span>
              <span className="text-sm">🧃</span>
            </div>
            {/* Table stand */}
            <div className="w-4 h-12 bg-[#8C7B68]" />
            <div className="w-20 h-2 bg-[#706050] rounded-full" />
          </div>
        </div>
      )}

      {/* 4. FEEDING EACH OTHER */}
      {type === 'feeding_each_other' && (
        <div className="flex items-end space-x-4 relative">
          <BoyCharacter expression="blushing" size={size} />
          {/* Spoon with bite */}
          <motion.div
            className="absolute left-1/2 top-1/3 transform -translate-x-1/2 z-20 flex items-center"
            animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-2xl">🥄🍓</span>
          </motion.div>
          <GirlCharacter expression="blushing" size={size} flip={true} />
        </div>
      )}

      {/* 5. LAUGHING TOGETHER */}
      {type === 'laughing_together' && (
        <div className="flex items-end space-x-6 relative">
          <motion.div
            animate={{ rotate: [-2, 3, -2], y: [0, -6, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <BoyCharacter expression="laughing" size={size} />
          </motion.div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex space-x-1 text-base">
            <span className="animate-bounce">😂</span>
            <span className="animate-bounce delay-100">✨</span>
            <span className="animate-bounce delay-200">😆</span>
          </div>
          <motion.div
            animate={{ rotate: [3, -2, 3], y: [0, -6, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
          >
            <GirlCharacter expression="laughing" size={size} flip={true} />
          </motion.div>
        </div>
      )}

      {/* 6. TAKING IMAGINARY SELFIES */}
      {type === 'taking_selfie' && (
        <div className="flex items-end space-x-2 relative">
          {/* Camera Phone held up */}
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 bg-stone-900 border-2 border-stone-700 px-3 py-1.5 rounded-xl shadow-lg flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center space-x-1 text-[10px] text-stone-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>REC 00:01</span>
            </div>
            <div className="text-sm">📸 ✌️🥰</div>
          </motion.div>

          {/* Flash animation trigger */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
          />

          <BoyCharacter expression="smiling" size={size} />
          <GirlCharacter expression="smiling" size={size} flip={true} />
        </div>
      )}

      {/* 7. HOLDING HANDS */}
      {type === 'holding_hands' && (
        <div className="flex items-end space-x-1 relative">
          <BoyCharacter expression="holding_hand" size={size} />
          {/* Connected hands & glowing heart */}
          <motion.div
            className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xl drop-shadow-md">🤝</span>
            <span className="text-xs text-rose-500 font-semibold">❤️</span>
          </motion.div>
          <GirlCharacter expression="smiling" size={size} flip={true} />
        </div>
      )}

      {/* 8. WARM HUG */}
      {type === 'warm_hug' && (
        <div className="relative flex items-center justify-center">
          <motion.div
            className="flex items-end -space-x-10"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BoyCharacter expression="hugging" size={size} />
            <GirlCharacter expression="hugging" size={size} flip={true} />
          </motion.div>
          {/* Floating hearts */}
          <motion.div
            className="absolute -top-6 text-xl text-rose-400"
            animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.div>
        </div>
      )}

      {/* 9. SWEET TINY KISS */}
      {type === 'sweet_kiss' && (
        <div className="relative flex items-center justify-center">
          <motion.div
            className="flex items-end -space-x-8"
            animate={{ x: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BoyCharacter expression="kissing" size={size} />
            <GirlCharacter expression="kissing" size={size} flip={true} />
          </motion.div>
          <motion.div
            className="absolute -top-6 text-2xl"
            animate={{ scale: [1, 1.3, 1], y: [0, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            💖
          </motion.div>
        </div>
      )}

      {/* 10. UNDER STARS */}
      {type === 'under_stars' && (
        <div className="relative flex flex-col items-center">
          {/* Moon and gentle sparkles */}
          <div className="absolute -top-12 flex items-center space-x-6">
            <motion.div
              className="text-amber-200 text-3xl"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌙
            </motion.div>
            <motion.div
              className="text-amber-100 text-xs"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>

          <div className="flex items-end -space-x-6 z-10">
            <BoyCharacter expression="smiling" size={size} />
            {/* Girl resting head on his shoulder */}
            <motion.div
              style={{ transformOrigin: 'bottom left' }}
              animate={{ rotate: [-5, -7, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GirlCharacter expression="resting_shoulder" size={size} flip={true} />
            </motion.div>
          </div>
        </div>
      )}

      {/* 11. BLANKET CARE & TEA */}
      {type === 'blanket_care' && (
        <div className="relative flex items-end space-x-6">
          <div className="relative">
            <BoyCharacter expression="caring_blanket" size={size} />
            <div className="absolute top-1/2 -right-4 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 text-xs shadow-xs">
              ☕ Tea for you
            </div>
          </div>
          {/* Girl wrapped in blanket */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#E879F9]/20 rounded-3xl -m-2 -z-0 blur-xs" />
            <GirlCharacter expression="smiling" size={size} flip={true} />
            <div className="absolute -top-4 -left-2 text-sm">🧣✨</div>
          </div>
        </div>
      )}

      {/* 12. RAIN & DISTANCE (DURING ARGUMENT) */}
      {type === 'rain_distance' && (
        <div className="flex items-end justify-between w-full max-w-sm px-6 relative">
          {/* Boy facing away, regretful */}
          <div className="flex flex-col items-center">
            <BoyCharacter expression="sad_regret" size={size} />
            <span className="text-xs text-stone-400 mt-2">...</span>
          </div>

          {/* Broken heart / distance */}
          <div className="flex flex-col items-center justify-center mb-10 text-stone-300">
            <span className="text-2xl opacity-40">💔</span>
            <div className="w-16 h-0.5 bg-stone-200 my-1" />
          </div>

          {/* Girl facing away, crying softly */}
          <div className="flex flex-col items-center">
            <GirlCharacter expression="crying_sad" size={size} flip={true} />
            <span className="text-xs text-stone-400 mt-2">...</span>
          </div>
        </div>
      )}

      {/* 13. LISTENING & RECONCILE */}
      {type === 'listening_reconcile' && (
        <div className="flex items-end space-x-6 relative">
          <BoyCharacter expression="apologetic_reach" size={size} />
          {/* Reaching hands connecting */}
          <motion.div
            className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 z-20 text-rose-500 text-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤝
          </motion.div>
          <GirlCharacter expression="forgiving_hand" size={size} flip={true} />
        </div>
      )}

      {/* 14. CHAOTIC SQUABBLE (PLAYFUL COMEDY) */}
      {type === 'chaotic_squabble' && (
        <div className="flex items-end space-x-6 relative">
          <motion.div
            animate={{ x: [-4, 4, -4], rotate: [-4, 4, -4] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <BoyCharacter expression="angry" size={size} />
          </motion.div>
          <div className="text-xl -mt-10">
            <span>⚡🍟🗯️</span>
          </div>
          <motion.div
            animate={{ x: [4, -4, 4], rotate: [4, -4, 4] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            <GirlCharacter expression="angry" size={size} flip={true} />
          </motion.div>
        </div>
      )}
    </div>
  );
};
