'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';
import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import type { PageProps, Query } from './meta';
import DatoImage from '@/components/DatoImage';

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.showcase) {
    notFound();
  }

  const { showcase } = data;

  return (
    <div className="w-full bg-white selection:bg-primary selection:text-current antialiased overflow-x-hidden">
      
      {/* HERO SECTION: Monolithic Background Display 
          Sada je slika preko celog ekrana, a tekst je overlay.
      */}
      <section className="relative h-screen w-full bg-black overflow-hidden group/hero">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          {showcase.displays[0]?.responsiveImage && (
            <DatoImage
              fragment={showcase.displays[0].responsiveImage}
              className="h-full w-full object-cover grayscale brightness-[0.4] group-hover/hero:brightness-[0.5] transition-all duration-[3000ms] ease-out scale-110 group-hover/hero:scale-100"
              layout="fill"
            />
          )}
        </div>

        {/* TACTICAL OVERLAY - Plutajući sistemski podaci */}
        <div className="absolute top-32 right-6 md:right-16 z-30">
          <div className="bg-white/90 backdrop-blur-md p-5 border border-white/10 min-w-[200px] shadow-2xl">
            <div className="text-[8px] font-mono uppercase tracking-[0.3em] text-black space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-pulse text-current"></div>
                <span>SYSTEM_READY</span>
              </div>
              <div>LAT: 44.7866 / LON: 20.4489</div>
              <div className="text-black/40 italic">REF: {showcase.title?.substring(0, 8).toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* CONTENT OVERLAY: Manifest Title & CTA */}
        <div className="relative z-20 h-full flex flex-col justify-end max-w-[1920px] mx-auto px-6 md:px-16 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-12">
            
            {/* Levi sektor: Glavni naslov */}
            <div className="md:col-span-8 space-y-6">
              <span className="text-[9px] font-mono uppercase tracking-[0.8em] text-current/50 block">
                MANIFEST_COLLECTION / {new Date().getFullYear()}
              </span>
              <h1 className="text-[18px] font-serif uppercase leading-[0.85] text-current italic tracking-wide max-w-4xl">
                {showcase.title}
              </h1>
            </div>

            {/* Desni sektor: Opis i Inicijalizacija */}
            <div className="md:col-span-4 border-l border-black/10 pl-8 pb-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed text-current/60 max-w-xs">
                {showcase.description}
              </p>
              <Link
                href={`/${globalPageProps.params.lng}/${showcase.cta[0].slug}`}
                className="mt-12 inline-flex items-center text-[10px] font-mono font-black uppercase tracking-[0.5em] text-current group/btn"
              >
                <span className="relative">
                  INIT_SEQUENCE
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-current transition-all duration-500 group-hover/btn:w-full"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM SCANLINE DECOR */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
      </section>

      {/* COLLECTIONS: Catalog System - Half-Screen Architecture */}
      <section className="w-full bg-white border-b border-none/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border-t border-none/5">
          {showcase.collections.map((collection, idx) => (
            <Link
              key={collection.id}
              href={`/${globalPageProps.params.lng}/${showcase.collectionsCta[0].slug}${collection.id}`}
              className="group relative bg-white overflow-hidden transition-none flex flex-col"
            >
              <div className="relative aspect-[16/9] md:aspect-square lg:aspect-[21/9] w-full overflow-hidden">
                {collection.details.image.responsiveImage && (
                  <DatoImage
                    fragment={collection.details.image.responsiveImage}
                    className="h-full w-full object-cover grayscale brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms] ease-out scale-105 group-hover:scale-100"
                    layout="fill"
                  />
                )}

                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-black text-white px-4 py-2 flex items-center gap-4">
                    <span className="text-[8px] font-mono tracking-[0.5em] uppercase">
                      ENTRY_ID: 0{idx + 1}
                    </span>
                    <div className="animate-pulse"></div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30">
                  <div className="bg-white/90 backdrop-blur-md p-8 border border-none/5 shadow-2xl min-w-[240px]">
                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-current tracking-[0.4em] block">
                        ACCESS_GRANTED
                      </span>
                      <h3 className="text-2xl font-serif italic uppercase text-current">
                        {collection.name}
                      </h3>
                      <div className="h-px w-full bg-black/10"></div>
                      <span className="text-[8px] font-mono text-current/40 uppercase tracking-widest block">
                        EXPLORE_ARCHIVE_CORE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 flex justify-between items-center bg-white border-t border-none/5">
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono text-current/30 uppercase tracking-[0.4em]">
                    Collection_Type
                  </span>
                  <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-current">
                    {collection.name}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-[7px] font-mono text-current/30 uppercase tracking-widest italic">Inventory_State</span>
                    <span className="text-[9px] font-mono text-current uppercase">Stored // Available</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MATERIALS: Technical Archive - Integrated Half-Screen Grid */}
      <section className="w-full bg-transparent border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5">
          
          <div className="bg-white p-12 md:p-20 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-12">
              <header className="space-y-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-current block">
                  MATERIAL_COMPOSITION
                </span>
                <h2 className="text-[18px] font-serif italic uppercase leading-[0.8] tracking-wide text-current">
                  {showcase.materialsTitle}
                </h2>
              </header>
              
              <div className="max-w-md border-l border-black/10 pl-8">
                <p className="text-[10px] font-mono tracking-[0.2em] leading-relaxed text-current/40 uppercase">
                  {showcase.materialsDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-px w-12 bg-black"></div>
              <span className="text-[8px] font-mono text-current tracking-[0.4em] uppercase">
                TECH_SPEC_V.2.6
              </span>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-auto h-full min-h-[500px] overflow-hidden group/mtrl">
            {showcase.materialsDisplay[0]?.responsiveImage && (
              <DatoImage
                fragment={showcase.materialsDisplay[0].responsiveImage}
                className="h-full w-full object-cover grayscale brightness-50 group-hover/mtrl:grayscale-0 group-hover/mtrl:brightness-100 transition-all duration-[2000ms] ease-out scale-110 group-hover:scale-100"
                layout="fill"
              />
            )}
            
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-white text-current px-4 py-2 flex items-center gap-4">
                <span className="text-[8px] font-mono tracking-[0.5em] uppercase">
                  MTRL_REF_01
                </span>
                <div className="animate-pulse"></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 z-30 opacity-0 group-hover/mtrl:opacity-100 transition-all duration-700 translate-y-4 group-hover/mtrl:translate-y-0">
              <div className="bg-white p-6 border border-none/5 shadow-2xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-current text-[10px]">▲</span>
                    <span className="text-[8px] font-mono font-black text-current tracking-[0.3em]">LIVE_ARCHIVE</span>
                  </div>
                  <div className="text-[10px] font-mono text-current/40 uppercase">
                    DATA_POINT: {showcase.materialsTitle?.substring(0, 5).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;