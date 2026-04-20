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
            className="group flex items-center justify-center border-1 border-black bg-black px-6 py-4 transition-all duration-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:bg-primary active:border-primary active:text-black"
          >
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-3">
                {/* Indikator smera skrolovanja */}
                
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
                  RETURN
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em] italic">
                TO_TOP
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}