'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthenticationModal from '../Header/AuthenticationModal';
import SuccessPopUp from '../Header/SuccessPopUp';

type Props = {
  isDraft: boolean;
};

export default function ScrollToTop({ isDraft }: Props) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  async function toggleDraft() {
    if (isDraft) {
      await fetch('/api/draft/disable');
      router.refresh();
    } else setModalOpen(true);
  }

  const triggerSuccessToast = () => {
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 5000);
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
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4"
          >
            {/* SUCCESS TOAST - Senka je sada u primary boji (krem) */}
            <AnimatePresence>
              {successToast && (
                <motion.div
                  className="w-[320px] md:w-[450px] border-2 border-black bg-white p-1 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <SuccessPopUp setSuccessToast={setSuccessToast} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* AUTH MODAL - Zadržana teška crna senka za ozbiljnost (Security) */}
            <AnimatePresence>
              {modalOpen && (
                <motion.div
                  className="w-[300px] md:w-[380px] border-2 border-black bg-white p-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                >
                  <AuthenticationModal
                    setModalOpen={setModalOpen}
                    refresh={router.refresh}
                    triggerSuccessToast={triggerSuccessToast}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TOGGLE BUTTON - Admin komanda usklađena sa Stealth Wealth tonom */}
            <div
              onClick={toggleDraft}
              className={`flex cursor-pointer items-center justify-center border-2 border-black px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                isDraft 
                ? 'bg-primary text-black hover:bg-black hover:text-white' 
                : 'bg-black text-white hover:bg-primary hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Indikator statusa sada koristi primary/crnu kombinaciju */}
                <span className={`h-1.5 w-1.5 shrink-0 ${isDraft ? 'bg-black animate-pulse' : 'bg-primary'}`} />
                {isDraft ? 'Enter Published Mode' : 'Enter Draft Mode'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}