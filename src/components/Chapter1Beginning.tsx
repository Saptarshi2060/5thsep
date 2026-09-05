import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { ArrowRight, Moon, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface Chapter1BeginningProps {
  onContinue: () => void;
}

interface ChatBubble {
  id: number;
  sender: 'boy' | 'girl';
  text: string;
  sub?: string;
}

export const Chapter1Beginning: React.FC<Chapter1BeginningProps> = ({ onContinue }) => {
  // Step starts at 0, goes up to 5 as messages fly and characters get closer
  const [step, setStep] = useState<number>(0);

  const messages: ChatBubble[] = [
    { id: 1, sender: 'boy', text: 'Hey 👋' },
    { id: 2, sender: 'girl', text: 'Heyy 😊' },
    { id: 3, sender: 'boy', text: 'Are you still awake?' },
    { id: 4, sender: 'girl', text: 'Haha yes, just watching reels' },
    { id: 5, sender: 'boy', text: 'Look at this stupid meme 🤣', sub: '💬 2:43 AM' },
    { id: 6, sender: 'girl', text: 'LMAOO why are you like this 😭❤️', sub: '💬 3:15 AM' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < messages.length) {
          soundManager.playPop();
          return prev + 1;
        }
        return prev;
      });
    }, 1600);
    return () => clearInterval(timer);
  }, [messages.length]);

  // Boy & Girl move closer: distance percentage changes from 80% down to 25%
  const distanceBetween = Math.max(25, 75 - step * 10);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-between p-4 py-8 relative max-w-4xl mx-auto">
      {/* Chapter header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase font-storybook">
          Chapter 1
        </span>
        <h2 className="font-serif-story text-2xl sm:text-3xl text-stone-800 mt-1">
          The Beginning
        </h2>
        <div className="flex items-center justify-center space-x-2 text-xs text-stone-500 mt-1">
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Late nights • Endlessly talking</span>
        </div>
      </div>

      {/* Main Animated Stage: Characters and Flying Messages */}
      <div className="w-full flex-1 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[360px] my-4">
        {/* Soft night ambient elements */}
        <div className="absolute top-2 right-10 flex items-center space-x-2 text-amber-300/70 text-xs">
          <Moon className="w-5 h-5 text-amber-300" />
          <span className="font-storybook text-stone-400">3:00 AM</span>
        </div>

        {/* Message flight bubbles */}
        <div className="w-full max-w-md min-h-[160px] flex flex-col justify-end space-y-2 mb-8 px-4 z-20">
          <AnimatePresence>
            {messages.slice(0, step).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`flex flex-col ${
                  msg.sender === 'boy' ? 'items-start' : 'items-end'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium shadow-xs max-w-[80%] ${
                    msg.sender === 'boy'
                      ? 'bg-amber-100/90 text-amber-950 border border-amber-200 rounded-bl-xs'
                      : 'bg-rose-500 text-white rounded-br-xs'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sub && (
                  <span className="text-[10px] text-stone-400 mt-0.5 px-1 font-mono">
                    {msg.sub}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Characters moving closer together */}
        <div
          className="w-full flex items-end justify-between px-4 sm:px-12 transition-all duration-1000 ease-out relative"
          style={{ maxWidth: `${Math.max(340, distanceBetween * 7)}px` }}
        >
          {/* Boy */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <BoyCharacter
              expression={step >= 4 ? 'laughing' : 'nervous_phone'}
              size="md"
            />
            <span className="text-xs font-handwriting text-stone-600 mt-1">
              {storyConfig.boyName}
            </span>
          </motion.div>

          {/* Floating emoji vibes in middle */}
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center space-y-1 mb-8 text-rose-400"
            >
              <Heart className="w-5 h-5 fill-rose-300 animate-pulse" />
              <span className="text-xs font-storybook text-rose-600">
                getting closer...
              </span>
            </motion.div>
          )}

          {/* Girl */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <GirlCharacter
              expression={step >= 4 ? 'laughing' : 'checking_phone'}
              size="md"
              flip={true}
            />
            <span className="text-xs font-handwriting text-stone-600 mt-1">
              {storyConfig.girlName}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Narration Quote */}
      <div className="text-center max-w-lg mx-auto px-4 mt-4">
        <blockquote className="font-serif-story text-base sm:text-lg text-stone-700 italic mb-6 leading-relaxed">
          "{storyConfig.quotes.chapter1}"
        </blockquote>

        <button
          onClick={() => {
            soundManager.playPop();
            onContinue();
          }}
          className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-sm shadow-md shadow-rose-200 transition-all inline-flex items-center space-x-2 group"
        >
          <span>Continue to Chapter 2</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
