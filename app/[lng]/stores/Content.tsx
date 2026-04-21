'use client';

import { useState } from 'react';
import DatoImage from '@/components/DatoImage';
import { ContentPage } from '@/components/WithRealTimeUpdates/types';
import { PageProps, Query } from './meta';

const Content: ContentPage<PageProps, Query> = ({ data }) => {
  const [currentStore, setCurrentStore] = useState(0);
  const allStores = data.allStores || [];

  if (allStores.length === 0) return null;

  const nextStore = () => setCurrentStore((prev) => (prev === allStores.length - 1 ? 0 : prev + 1));
  const prevStore = () => setCurrentStore((prev) => (prev === 0 ? allStores.length - 1 : prev - 1));

  const store = allStores[currentStore];

  return (
    <main className="w-full min-h-screen bg-white flex flex-col lg:flex-row selection:bg-black selection:text-current">
      
       {/* SECTION: VISUAL_RENDER (Leva strana) */}
      <section className="w-full lg:w-3/5 h-[70vh] lg:h-screen relative overflow-hidden bg-[#F5F5F3]">
        {store.storeImage?.responsiveImage && (
          <div key={currentStore} className="h-full w-full animate-in fade-in zoom-in-105 duration-1000">
            <DatoImage
              fragment={store.storeImage.responsiveImage as any}
              className="h-full w-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-in-out"
              layout="fill"
            />
          </div>
        )}
        
        {/* Tactical System Overlay */}
        <div className="absolute bottom-0 right-0 z-30 hidden lg:block">
          <div className="btn-brutalist bg-white/80 pointer-events-none p-5">
            <div className="text-[9px] font-mono  uppercase tracking-[0.3em] text-current leading-loose">
              <span className="text-current opacity-100 text-[10px]">▲</span> LIVE_FEED <br />
              REF: {store.storeName?.substring(0, 3).toUpperCase()}_{currentStore + 100} <br />
              POS: {store.storeLocation?.latitude?.toFixed(4)} / {store.storeLocation?.longitude?.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Corner Branding */}
        <div className="absolute bottom-10 right-10 text-white mix-blend-difference opacity-30">
          <span className="text-[9px] font-mono  uppercase tracking-[1em]">
            _ARCHIVE
          </span>
        </div>
      </section>

      {/* SECTION: DATA_ENGINE (Leva strana) */}
      <section className="w-full lg:w-2/5 flex flex-col justify-between px-6 md:px-12 lg:px-20 py-16 border-r border-none/5 bg-white z-20">
        
        {/* Top Branding / Breadcrumb */}
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-black"></div>
          <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-current/40">
            JULHKOVA / {store.id || 'NULL_REF'}
          </span>
        </div>

        {/* Main Info Cluster */}
        <div className="space-y-12">
          <header className="space-y-4">
            <h2 className="text-[9px] font-mono  uppercase tracking-[0.5em] text-current">
              LOC / {store.country || 'GLOBAL'}
            </h2>
            <h1 className="text-[18px] font-serif italic leading-none tracking-wild text-current">
              {store.storeName}
            </h1>
          </header>

          <div className="max-w-xs border-l border-none pl-6">
            <p className="text-[10px] uppercase tracking-widest leading-relaxed text-current/60 font-medium">
              {store.storeDescription}
            </p>
          </div>

          <nav className="pt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${store.storeLocation?.latitude},${store.storeLocation?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-[9px] font-mono  uppercase tracking-[0.3em] text-current hover:text-current transition-colors"
            >
              <span className="group-hover:translate-x-1 transition-transform">VIEW COORDINATES</span>
            </a>
          </nav>
        </div>

        {/* Tactical Controller (Bottom) */}
        <div className="flex items-center gap-10">
          <div className="flex gap-5">
            <button onClick={prevStore} className="btn-brutalist h-10 w-10 flex items-center justify-center">
              PREV
            </button>
            <button onClick={nextStore} className="btn-brutalist h-10 w-10 flex items-center justify-center">
              NEXT
            </button>
          </div>
          
          <div className="h-px flex-1 bg-black/5"></div>

          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono  text-current/30 uppercase tracking-widest italic">Sequence</span>
            <span className="text-lg font-mono  tracking-tighter">
              {String(currentStore + 1).padStart(2, '0')}_{String(allStores.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Content;