"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import type { ResolvedGlobalPageProps } from "@/utils/globalPageProps";

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
  globalPageProps: ResolvedGlobalPageProps;
};

const Hero = ({ fragment }: Props) => {
  const data = getFragmentData(HeroSectionFragmentDoc, fragment);
  const { id, heroTitle, heroSubtitle, heroImage, socialLabel, socials } = data;

  const slides = heroImage?.filter((img) => img?.responsiveImage).map((img) => img.responsiveImage) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Ref za čuvanje ID-a intervala kako bismo mogli da ga obrišemo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Funkcija za pokretanje intervala
  const startInterval = () => {
    if (slides.length <= 1) return;
    // Čistimo postojeći ako postoji, za svaki slučaj
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Smena na 5 sekundi
  };

  // Funkcija za zaustavljanje intervala
  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Pokrećemo interval na mountu
  useEffect(() => {
    startInterval();
    // Čistimo na unmountu
    return stopInterval;
  }, [slides.length]);

  return (
    <div 
      className="bg-white w-full selection:bg-primary selection:text-current group" 
      data-sidebar={id}
      // Dodajemo event listenere na ceo Hero kontejner
      onMouseEnter={stopInterval}
      onMouseLeave={startInterval}
    >
      
      <section className="relative w-full h-[90vh] overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Skaliranje slike ostaje aktivno, daje dubinu */}
            <div className="h-full w-full animate-in zoom-in-105 duration-[15000ms] ease-linear">
              <DatoImage
                fragment={slide as any}
                // KLJUČNA PROMENA: Po defaultu grayscale/brightness, na hover (group-hover) dobija boju i brightness
                className="h-full w-full object-cover object-center 
                           grayscale brightness-50 contrast-110
                           transition-all duration-700 ease-in-out
                           group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
                priority={index === 0}
                layout="fill"
              />
            </div>
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-20" />

        {/* SYSTEM STATUS OVERLAY - High contrast */}
        <div className="absolute top-12 left-12 z-30 hidden md:block">
          <div className="text-[8px] font-mono  text-current uppercase tracking-[0.4em] space-y-1">
            {/* Dinamički status na osnovu hovera cele grupe */}
            <p className="group-hover:text-white transition-colors duration-500">
              {slides.length > 1 ? `BRUTALIST_${currentIndex + 1}/${slides.length}` : `RENDER_SEQUENCE`}
            </p>
            <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500">
              EXPERIENCE: {id ? `${id?.substring(0, 4).toUpperCase()}` : 'LIVE_FEED'}
            </p>
          </div>
        </div>

        {/* MAIN TITLE - Suptilno se menja na hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6">
          <h1 className="text-white text-5xl md:text-9xl font-serif italic uppercase leading-none tracking-tighter transition-all duration-700 group-hover:tracking-tight group-hover:scale-[1.01]">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-sm text-white/40 group-hover:text-white/60 transition-colors duration-700 text-[9px] font-mono uppercase tracking-[0.3em] leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ARCHIVE FOOTER */} 
      <footer className="px-4 md:px-12 py-10 border-t border-none/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white z-40 relative"> 
        <div className="flex gap-10 text-[9px] font-mono  tracking-[0.4em] uppercase text-current/30"> 
          {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => ( 
            <span key={season} className="hover:text-current hover:line-through cursor-pointer transition-none"> 
              {season} 
            </span> 
          ))} 
        </div> 

        <div className="flex items-center gap-10"> 
          <span className="text-[9px] font-mono italic uppercase tracking-[0.5em] text-current/40 animate-pulse"> 
            {socialLabel ?? 'ARCHIVE_SOCIAL'} 
          </span> 
          <div className="flex gap-6"> 
            {socials.map((social) => ( 
              <Link key={social.id} href={social.url ?? "#"} target="_blank" className="opacity-30 hover:opacity-100 transition-none"> 
                <img src={social.icon.url} alt={social.name as any} className="h-3 w-3 grayscale" /> 
              </Link> 
            ))} 
          </div> 
        </div> 
      </footer>
    </div>
  );
};

export default Hero;