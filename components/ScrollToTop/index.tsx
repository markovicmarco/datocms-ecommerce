'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Funkcija za skrolovanje na vrh
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-10 right-10 z-[100]"
        >
          {/* TACTICAL SCROLL BUTTON */}
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center border-none bg-transparent px-6 py-4 transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:bg-primary active:border-primary active:text-black"
          >
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-3">
                {/* Indikator smera skrolovanja */}
                
                <span className="text-[27px] font-mono uppercase tracking-[0.2em] text-black/50">
                  △
                </span>
              </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-black/50">
                  TOP
                </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}