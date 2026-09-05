/**
 * OUR FIRST YEAR — AN ANIMATED LOVE STORY
 * 
 * A handcrafted interactive animated storybook celebrating our one-year anniversary
 * from 5 September 2025 to 5 September 2026.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OpeningScene } from './components/OpeningScene';
import { Chapter1Beginning } from './components/Chapter1Beginning';
import { Chapter2Butterflies } from './components/Chapter2Butterflies';
import { Chapter3FirstLittleWorld } from './components/Chapter3FirstLittleWorld';
import { Chapter4NotEveryDay } from './components/Chapter4NotEveryDay';
import { Chapter5WeFixedThings } from './components/Chapter5WeFixedThings';
import { Chapter6LittleWaysWeCare } from './components/Chapter6LittleWaysWeCare';
import { Chapter7ChaoticUs } from './components/Chapter7ChaoticUs';
import { Chapter8Today } from './components/Chapter8Today';
import { Chapter9IfICouldGoBack } from './components/Chapter9IfICouldGoBack';
import { FinalScene } from './components/FinalScene';
import { MusicPlayer } from './components/MusicPlayer';
import { StoryNavigation } from './components/StoryNavigation';
import { EasterEggModal } from './components/EasterEggModal';
import { storyConfig } from './storyConfig';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [easterEggClicks, setEasterEggClicks] = useState<number>(0);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);

  const chapterNames = [
    'The Opening',
    'Ch 1: The Beginning',
    'Ch 2: Butterflies',
    'Ch 3: Our Little World',
    'Ch 4: Not Perfect',
    'Ch 5: We Fixed Things',
    'Ch 6: How We Care',
    'Ch 7: The Chaotic Us',
    'Ch 8: Today',
    'Ch 9: If I Could Go Back',
    'Final: One Year',
  ];

  const totalChapters = chapterNames.length;

  // Scroll to top whenever chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapter]);

  // Keyboard navigation (Left / Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentChapter((prev) => Math.min(totalChapters - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentChapter((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalChapters]);

  // Secret Easter Egg Trigger: Click "5 September 2025" 3 times
  const handleDateClick = () => {
    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);
    if (newCount >= 3) {
      setIsEasterEggOpen(true);
      setEasterEggClicks(0);
    }
  };

  const handleNextChapter = () => {
    setCurrentChapter((prev) => Math.min(totalChapters - 1, prev + 1));
  };

  const handlePrevChapter = () => {
    setCurrentChapter((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen relative flex flex-col font-body storybook-paper overflow-x-hidden">
      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Main Chapter Content with Animated Transitions */}
      <main className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentChapter === 0 && (
              <OpeningScene
                onContinue={handleNextChapter}
                onDateClick={handleDateClick}
              />
            )}
            {currentChapter === 1 && (
              <Chapter1Beginning onContinue={handleNextChapter} />
            )}
            {currentChapter === 2 && (
              <Chapter2Butterflies onContinue={handleNextChapter} />
            )}
            {currentChapter === 3 && (
              <Chapter3FirstLittleWorld onContinue={handleNextChapter} />
            )}
            {currentChapter === 4 && (
              <Chapter4NotEveryDay onContinue={handleNextChapter} />
            )}
            {currentChapter === 5 && (
              <Chapter5WeFixedThings onContinue={handleNextChapter} />
            )}
            {currentChapter === 6 && (
              <Chapter6LittleWaysWeCare onContinue={handleNextChapter} />
            )}
            {currentChapter === 7 && (
              <Chapter7ChaoticUs onContinue={handleNextChapter} />
            )}
            {currentChapter === 8 && (
              <Chapter8Today onContinue={handleNextChapter} />
            )}
            {currentChapter === 9 && (
              <Chapter9IfICouldGoBack
                onContinue={handleNextChapter}
                onDateClick={handleDateClick}
              />
            )}
            {currentChapter === 10 && (
              <FinalScene
                onRestart={() => setCurrentChapter(0)}
                onDateClick={handleDateClick}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Story Navigation */}
      <StoryNavigation
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        chapterNames={chapterNames}
        onSelectChapter={(idx) => setCurrentChapter(idx)}
        onNext={handleNextChapter}
        onPrev={handlePrevChapter}
      />
    </div>
  );
}
