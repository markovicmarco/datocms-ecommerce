"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import DatoImage from '@/components/DatoImage';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { HeroSectionFragmentDoc } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
  globalPageProps: ResolvedGlobalPageProps;
};

const Hero = ({ fragment, globalPageProps }: Props) => {
  const data = getFragmentData(HeroSectionFragmentDoc, fragment);
  
  const {
    id,
    heroTitle,
    heroSubtitle,
    heroImage,
    socialLabel,
    socials,
  } = data;

  const slides: { before: any; after: any }[] = [];
  
  if (Array.isArray(heroImage)) {
    for (let i = 0; i < heroImage.length; i += 2) {
      const beforeAsset = heroImage[i];
      const afterAsset = heroImage[i + 1];

      if (beforeAsset?.responsiveImage && afterAsset?.responsiveImage) {
        slides.push({
          before: beforeAsset.responsiveImage,
          after: afterAsset.responsiveImage,
        });
      }
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <div 
      className="bg-white w-full" 
      data-sidebar={id}
    >
      <section className="mx-auto w-full max-w-[1920px] flex flex-col">
        
        {/* TOP TITLE */}
        <header className="py-6 md:py-10 border-b border-gray-100 px-4">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] font-serif uppercase tracking-[0.2em] text-black leading-[0.8]">
            {heroTitle ?? "Find Your Style"}
          </h1>
        </header>

        {/* SUBTITLE */}
        <div className="mx-auto max-w-xs md:max-w-md text-center py-6 md:py-8">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] font-medium text-black leading-relaxed">
            {heroSubtitle}
          </p>
        </div>

        {/* MAIN SLIDER - Izmenjen za mobilnu visinu */}
        <div className="flex items-start justify-center p-2 md:p-4 pt-4 md:pt-6 bg-white">
          <div 
            className="group relative w-full 
                       /* MOBILNI: 80% visine ekrana, portretni odnos */
                       h-[80vh] aspect-[3/4] 
                       /* DESKTOP: Vraća se na tvoj original */
                       md:h-auto md:max-h-[50vh] md:aspect-[3/1] lg:aspect-[4/1] 
                       overflow-hidden rounded-sm shadow-sm cursor-crosshair"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, index: number) => (
              <div 
                key={index}
                className={`absolute inset-0 flex h-full w-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Before Image */}
                <div className="relative w-1/2 h-full border-r border-white/10 overflow-hidden">
                  <DatoImage
                    fragment={slide.before}
                    className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-black/20 backdrop-blur-sm text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-[0.2em]">
                    Original
                  </div>
                </div>

                {/* After Image */}
                <div className="relative w-1/2 h-full overflow-hidden">
                  <DatoImage
                    fragment={slide.after}
                    className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-[0.2em]">
                    Refined
                  </div>
                </div>
              </div>
            ))}
            
            {/* Središnja linija */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/40 z-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <footer className="px-4 md:px-12 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-black">
            {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
              <span key={season} className="hover:line-through cursor-pointer transition-all duration-500">
                {season}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">
              {socialLabel ?? 'Socials'}
            </span>
            <div className="flex gap-4">
              {socials.map((social) => (
                <Link 
                  key={social.id} 
                  href={social.url ?? "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-40 hover:opacity-100 transition-all duration-500 transform hover:-translate-y-0.5"
                >
                  <img 
                    src={social.icon.url} 
                    alt={social.name ?? "Social Media"} 
                    className="h-3.5 w-3.5 grayscale" 
                  />
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Hero;