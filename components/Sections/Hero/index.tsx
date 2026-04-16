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
    heroTitle,
    heroSubtitle,
    heroImage,
    socialLabel,
    featuredCollections,
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
    <div className="bg-white min-h-screen flex flex-col">
      <section className="mx-auto w-full max-w-[1920px] flex-grow flex flex-col">
        
        {/* TOP TITLE - Fokus na eleganciju i prostor */}
        <header className="py-16 md:py-24 border-b border-gray-100 px-4">
          <h1 className="text-center text-3xl md:text-[10rem] font-serif uppercase tracking-tight text-black leading-none transition-all duration-1000">
            {heroTitle ?? "Find Your Style"}
          </h1>
        </header>

        {/* MAIN SLIDER - Od ivice do ivice unutar kontejnera */}
        <div className="flex-grow flex items-center justify-center p-4 md:p-8 bg-white">
          <div 
            className="group relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-sm shadow-sm cursor-crosshair"
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
                <div className="relative w-1/2 h-full border-r border-white/10 overflow-hidden">
                  <DatoImage
                    fragment={slide.before}
                    className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-black/20 backdrop-blur-sm text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-[0.2em]">
                    Original
                  </div>
                </div>

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
            
            {/* Suptilna linija koja se pojavljuje samo na hover */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/40 z-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR - Direktno prema vizuelnom predlošku */}
        <footer className="px-4 md:px-12 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* SEASONS / COLLECTIONS */}
          <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase font-bold text-black">
            {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
              <span key={season} className="hover:line-through cursor-pointer transition-all">
                {season}
              </span>
            ))}
          </div>

          {/* CURATED SUBTITLE */}
          <div className="max-w-md text-center">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium text-black underline underline-offset-8 decoration-gray-200">
              {heroSubtitle}
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              {socialLabel ?? 'Socials'}
            </span>
            <div className="flex gap-5">
              {socials.map((social) => (
                <Link 
                  key={social.id} 
                  href={social.url ?? "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-all transform hover:-translate-y-1"
                >
                  <img 
                    src={social.icon.url} 
                    alt={social.name ?? "Social Media"} 
                    className="h-4 w-4 grayscale hover:grayscale-0" 
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