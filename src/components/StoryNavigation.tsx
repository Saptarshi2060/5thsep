import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface StoryNavigationProps {
  currentChapter: number;
  totalChapters: number;
  chapterNames: string[];
  onSelectChapter: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentChapter,
  totalChapters,
  chapterNames,
  onSelectChapter,
  onNext,
  onPrev,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto">
      <div className="bg-[#FFFDF9]/90 backdrop-blur-md border border-[#EBE2D5] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg shadow-stone-900/5 flex items-center justify-between sm:justify-center space-x-2 sm:space-x-4">
        {/* Previous button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onPrev();
          }}
          disabled={currentChapter === 0}
          className={`p-1.5 rounded-full transition-all ${
            currentChapter === 0
              ? 'opacity-30 cursor-not-allowed text-stone-400'
              : 'hover:bg-stone-100 text-stone-700 active:scale-95'
          }`}
          aria-label="Previous chapter"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Chapter Title Badge */}
        <div className="flex items-center space-x-2 px-1">
          <BookOpen className="w-3.5 h-3.5 text-rose-500 hidden sm:inline-block" />
          <span className="text-xs font-semibold text-stone-800 tracking-tight whitespace-nowrap">
            {chapterNames[currentChapter] || `Part ${currentChapter + 1}`}
          </span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center space-x-1.5 px-1">
          {Array.from({ length: totalChapters }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playPop();
                onSelectChapter(idx);
              }}
              title={chapterNames[idx] || `Part ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentChapter === idx
                  ? 'w-4 h-2 bg-rose-500 rounded-full'
                  : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to chapter ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onNext();
          }}
          disabled={currentChapter >= totalChapters - 1}
          className={`p-1.5 rounded-full transition-all ${
            currentChapter >= totalChapters - 1
              ? 'opacity-30 cursor-not-allowed text-stone-400'
              : 'hover:bg-stone-100 text-stone-700 active:scale-95'
          }`}
          aria-label="Next chapter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
