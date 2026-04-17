'use client';

import { useEffect } from 'react';

/**
 * INSTANT VIEWPORT RESET
 * Osigurava da svaka nova stranica krene od nulte koordinate.
 * Brutalizam ne trpi "nasleđeni" skrol.
 */
export default function ScrollUp() {
  useEffect(() => {
    // Force-ovanjem na 'instant' izbegavamo smooth scroll ako je globalno definisan
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, []);

  return null;
}
