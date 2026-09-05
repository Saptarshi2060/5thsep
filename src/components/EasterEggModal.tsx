import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      soundManager.playChime();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#FFFDF9] border border-[#F2E8DC] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-center overflow-hidden"
          >
            {/* Soft decorative background circles */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-100/60 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-100/60 rounded-full blur-xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                <Heart className="w-7 h-7 fill-rose-400 text-rose-500 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-1 text-amber-600/80 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>A Secret Memory</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <h3 className="font-serif-story text-xl sm:text-2xl text-stone-800 mb-3 leading-snug">
              "P.S. I still can't believe you actually accepted my request."
            </h3>

            <p className="font-handwriting text-2xl text-rose-600 mb-6">
              Best notification ever. ❤️
            </p>

            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium rounded-full text-sm transition-all shadow-md shadow-rose-200"
              >
                Keep reading our story ✨
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
