'use client';

import { useState } from 'react';
import DatoImage from '@/components/DatoImage';
import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import type { PageProps, Query } from './meta';

const Content: ContentPage<PageProps, Query> = ({ data }) => {
  const [currentStore, setCurrentStore] = useState(0);
  const allStores = data.allStores;

  const nextStore = () => setCurrentStore((prev) => (prev === allStores.length - 1 ? 0 : prev + 1));
  const prevStore = () => setCurrentStore((prev) => (prev === 0 ? allStores.length - 1 : prev - 1));

  return (
    <div className="w-full min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* LEFT SIDE: Data Panel */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 border-r border-black/5">
        <div className="max-w-md space-y-12">
          
          {/* Metadata */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#87CEEB]">
              Location_Archive / {allStores[currentStore].country}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif uppercase leading-[0.85] text-black italic tracking-tighter">
              {allStores[currentStore].storeName}
            </h1>
          </div>

          {/* Description Box */}
          <div className="border-l-2 border-black pl-8 py-2">
            <p className="text-[13px] uppercase tracking-widest leading-relaxed text-gray-500 font-medium">
              {allStores[currentStore].storeDescription}
            </p>
          </div>

          {/* Actions & Navigation */}
          <div className="space-y-12 pt-8">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${allStores[currentStore].storeLocation?.latitude},${allStores[currentStore].storeLocation?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.3em] text-black"
            >
              <span className="border-b-2 border-black group-hover:text-[#87CEEB] group-hover:border-[#87CEEB] transition-all">
                {data.generalInterface?.findOnMaps}
              </span>
              <span className="text-[#87CEEB] transition-transform group-hover:translate-x-2">→</span>
            </a>

            {/* Brutalist Controller */}
            <div className="flex items-center gap-8 border-t border-black/5 pt-12">
              <button
                onClick={prevStore}
                className="h-12 w-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all text-xl"
              >
                ←
              </button>
              
              <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Index</span>
                <span className="text-xl font-bold font-mono">
                  {String(currentStore + 1).padStart(2, '0')} / {String(allStores.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={nextStore}
                className="h-12 w-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all text-xl"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Visual Panel */}
      <div className="w-full lg:w-3/5 h-[60vh] lg:h-screen relative overflow-hidden bg-gray-100">
        {allStores[currentStore].storeImage?.responsiveImage && (
          <div key={currentStore} className="h-full w-full animate-in fade-in zoom-in-105 duration-1000">
            <DatoImage
              // USKLAĐENO: Koristimo fragment za potpunu TS kompatibilnost
              fragment={allStores[currentStore].storeImage.responsiveImage as any}
              className="h-full w-full object-cover"
              layout="fill"
            />
          </div>
        )}
        
        {/* Decorative System Overlay */}
        <div className="absolute top-12 right-12 z-10 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-md border border-black/5 p-4">
            <div className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-black">
              Lat: {allStores[currentStore].storeLocation?.latitude?.toFixed(4)}<br />
              Lng: {allStores[currentStore].storeLocation?.longitude?.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Content;