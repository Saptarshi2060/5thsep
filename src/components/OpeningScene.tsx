import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoyCharacter } from './BoyCharacter';
import { GirlCharacter } from './GirlCharacter';
import { soundManager } from '../utils/soundManager';
import { Sparkles, Heart, Bell, Check, ArrowRight } from 'lucide-react';
import { storyConfig } from '../storyConfig';

interface OpeningSceneProps {
  onContinue: () => void;
  onDateClick: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onContinue, onDateClick }) => {
  // Stages:
  // 0: Initial dark intro with notification prompt
  // 1: Boy hesitating ("Should I send it?")
  // 2: Boy clicked Follow ("Request sent ❤️")
  // 3: Girl's phone notification arrives
  // 4: Girl smiles & clicks Accept
  // 5: Screen lights up with "And that's where our story began."
  const [stage, setStage] = useState<number>(0);

  const handleStartInteraction = () => {
    soundManager.playNotification();
    setStage(1);
  };

  const handleSendRequest = () => {
    soundManager.playPop();
    setStage(2);
    setTimeout(() => {
      soundManager.playNotification();
      setStage(3);
    }, 1800);
  };

  const handleAcceptRequest = () => {
    soundManager.playChime();
    setStage(4);
    setTimeout(() => {
      setStage(5);
    }, 1400);
  };

  return (
    <div
      className={`min-h-[85vh] flex flex-col items-center justify-center relative p-4 transition-colors duration-1000 ${
        stage >= 5 ? 'bg-[#FAF7F2]' : 'bg-[#1C1917]'
      }`}
    >
      {/* Background ambient stars / particles in dark mode */}
      {stage < 5 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white/40 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-200/50 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-white/30 rounded-full" />
        </div>
      )}

      {/* Date Header with Easter egg trigger */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center cursor-pointer select-none"
        onClick={onDateClick}
        title="Click me!"
      >
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full border border-stone-700/60 bg-stone-900/50 backdrop-blur-xs text-stone-300 hover:text-amber-200 hover:border-amber-400/50 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold tracking-wider uppercase font-storybook text-sm">
            {storyConfig.anniversaryDate}
          </span>
        </div>
        <p className="text-[11px] text-stone-500 mt-1 font-handwriting">
          (A special date in history...)
        </p>
      </motion.div>

      {/* STAGE 0: Initial tap to open the memory */}
      {stage === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-6 cursor-pointer"
            onClick={handleStartInteraction}
          >
            <Bell className="w-7 h-7 animate-bounce" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl font-serif-story text-stone-200 mb-2">
            A year ago today...
          </h2>
          <p className="text-sm text-stone-400 mb-8 max-w-xs leading-relaxed">
            A small moment that quietly changed everything.
          </p>

          <button
            onClick={handleStartInteraction}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-lg shadow-rose-900/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          >
            <span>Open our story</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* STAGES 1 & 2: Boy's Phone (Original Social Interface) */}
      {(stage === 1 || stage === 2) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center max-w-xs w-full"
        >
          {/* Character reaction above phone */}
          <div className="mb-4 flex flex-col items-center">
            <BoyCharacter
              expression={stage === 1 ? 'nervous_phone' : 'blushing'}
              size="md"
            />
            <p className="font-handwriting text-xl text-stone-300 mt-2 text-center">
              {stage === 1 ? '"Should I send it...?"' : 'Heart is pounding... ❤️'}
            </p>
          </div>

          {/* Social Profile Card mockup (Original design, soft storybook style) */}
          <div className="w-full bg-[#262626] border border-stone-700 rounded-3xl p-5 shadow-2xl text-stone-100">
            <div className="flex items-center space-x-3 mb-4">
              {/* Girl avatar placeholder cartoon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-amber-200 p-0.5">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-xl">
                  👧
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wide">
                  {storyConfig.girlName}
                </h4>
                <p className="text-[11px] text-stone-400">@her_profile</p>
              </div>
            </div>

            <div className="border-t border-stone-700/60 pt-3 flex justify-between text-xs text-stone-400 mb-4 px-2">
              <div className="text-center">
                <span className="font-bold text-stone-200 block">12</span>
                <span>posts</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-stone-200 block">240</span>
                <span>followers</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-stone-200 block">180</span>
                <span>following</span>
              </div>
            </div>

            {/* The Follow Action */}
            {stage === 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSendRequest}
                className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Follow</span>
                <Heart className="w-4 h-4 fill-white/80" />
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-full py-2.5 bg-stone-800 border border-stone-600 text-rose-300 font-medium rounded-xl text-sm text-center flex items-center justify-center space-x-2"
              >
                <span>Request sent</span>
                <span className="animate-pulse text-rose-400">❤️</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* STAGE 3 & 4: Girl's Phone Notification arrives */}
      {(stage === 3 || stage === 4) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center max-w-xs w-full"
        >
          {/* Girl reaction */}
          <div className="mb-4 flex flex-col items-center">
            <GirlCharacter
              expression={stage === 3 ? 'checking_phone' : 'smiling_accept'}
              size="md"
            />
            <p className="font-handwriting text-xl text-rose-300 mt-2 text-center">
              {stage === 3 ? '"Wait... who is this?"' : 'She smiled. ✨'}
            </p>
          </div>

          {/* Girl's phone notification card */}
          <div className="w-full bg-[#2A2426] border border-rose-900/50 rounded-3xl p-5 shadow-2xl text-stone-100">
            <div className="flex items-center space-x-2 text-[11px] text-rose-300/80 mb-3">
              <Bell className="w-3.5 h-3.5 text-rose-400" />
              <span>New Notification • Just now</span>
            </div>

            <div className="flex items-center space-x-3 mb-4 bg-stone-900/40 p-3 rounded-2xl border border-stone-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-lg">
                  👦
                </div>
              </div>
              <div className="text-xs">
                <p className="font-semibold text-stone-200">
                  {storyConfig.boyName}
                </p>
                <p className="text-stone-400">requested to follow you.</p>
              </div>
            </div>

            {/* Accept / Decline actions */}
            {stage === 3 ? (
              <div className="flex space-x-2">
                <button
                  disabled
                  className="w-1/3 py-2 bg-stone-800/80 text-stone-500 rounded-xl text-xs"
                >
                  Delete
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAcceptRequest}
                  className="w-2/3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-xl text-xs shadow-md flex items-center justify-center space-x-1.5 animate-pulse"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept</span>
                </motion.button>
              </div>
            ) : (
              <div className="w-full py-2 bg-rose-500/20 border border-rose-500/50 text-rose-200 rounded-xl text-xs text-center font-medium flex items-center justify-center space-x-1">
                <span>Accepted</span>
                <span>✨</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* STAGE 5: The screen lights up into the storybook! */}
      {stage === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-lg px-4"
        >
          {/* Adorable meeting vignette */}
          <div className="flex items-end justify-center space-x-8 mb-6 relative">
            <BoyCharacter expression="waving" size="md" />
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl text-rose-500 mb-8"
            >
              ❤️
            </motion.div>
            <GirlCharacter expression="smiling" size="md" flip={true} />
          </div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif-story text-2xl sm:text-3xl text-stone-800 mb-3"
          >
            "{storyConfig.quotes.opening}"
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md"
          >
            A single tap on a screen. One girl smiling at her phone. And the beginning of an unforgettable year.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playPop();
              onContinue();
            }}
            className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-200 transition-all flex items-center space-x-2.5 group"
          >
            <span>Begin Chapter 1</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
