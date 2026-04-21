'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
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

  const { showcase, generalInterface } = data;

  return (
    <div className="w-full bg-white selection:bg-primary selection:text-black antialiased overflow-x-hidden">
      
      {/* HERO SECTION: Technical Manifest */}
      <section className="max-w-[1920px] mx-auto px-6 md:px-16 pt-40 pb-24 border-b border-black/5">
        <div className="flex flex-col md:flex-row items-end justify-between gap-16">
          <div className="max-w-5xl space-y-8">
            <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-primary block">
              MANIFEST_COLLECTION / {new Date().getFullYear()}
            </span>
            <h1 className="text-[45px] font-serif uppercase leading-[0.8] text-black italic tracking-tighter">
              {showcase.title}
            </h1>
          </div>
          <div className="md:w-1/4 pb-4 border-l border-black/5 pl-8">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] leading-relaxed text-black/60">
              {showcase.description}
            </p>
            <Link
              href={`/${globalPageProps.params.lng}/${showcase.cta[0].slug}`}
              className="mt-10 inline-flex items-center text-[9px] font-mono font-black uppercase tracking-[0.4em] text-black hover:text-primary transition-none group"
            >
              <span className="border-b border-black group-hover:border-primary pb-1">INIT_SEQUENCE</span>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRIMARY DISPLAYS: The Tactical Overlay Look */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-px bg-black/5 border-b border-black/5 group/main">
        <div className="md:col-span-7 relative h-[70vh] md:h-screen bg-white overflow-hidden">
          <DatoImage
            fragment={showcase.displays[0].responsiveImage!}
            className="h-full w-full object-cover grayscale brightness-50 group-hover/main:grayscale-0 group-hover/main:brightness-100 transition-all duration-[1500ms] ease-out scale-105 group-hover/main:scale-100"
            layout="fill"
          />
          
          {/* TACTICAL OVERLAY - Replikacija tvoje slike */}
          <div className="absolute top-12 right-12 z-30">
            <div className="bg-white/90 backdrop-blur-sm p-5 border border-black/5 min-w-[180px] shadow-[4px_4px_0px_0px_rgba(var(--primary-rgb),0.2)]">
              <div className="text-[8px] font-mono uppercase tracking-[0.3em] text-black space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-[10px]"></span> 
                  <span>LIVE_FEED</span>
                </div>
                <div>REF: MASTER_EXP_01</div>
                <div className="text-black/40 tracking-normal italic">POS: 44.7866 / 20.4489</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative h-[50vh] md:h-screen bg-white overflow-hidden border-l border-black/5">
          <DatoImage
            fragment={showcase.displays[1].responsiveImage!}
            className="h-full w-full object-cover grayscale brightness-40 group-hover/main:grayscale-0 group-hover/main:brightness-100 transition-all duration-[1500ms] ease-out delay-100 scale-105 group-hover/main:scale-100"
            layout="fill"
          />
          <div className="absolute bottom-12 left-12 z-30 opacity-0 group-hover/main:opacity-100 transition-opacity duration-700">
             <div className="bg-white/90 backdrop-blur-sm p-4 border border-black/5">
               <span className="text-[7px] font-mono font-black tracking-[0.5em] text-black uppercase">
                 DET_VIEW // SCALE_REF_02
               </span>
             </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS: Catalog System - Half-Screen Architecture */}
<section className="w-full bg-white border-b border-black/5">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-black/5 border-t border-black/5">
    {showcase.collections.map((collection, idx) => (
      <Link
        key={collection.id}
        href={`/${globalPageProps.params.lng}/${showcase.collectionsCta[0].slug}${collection.id}`}
        className="group relative bg-white overflow-hidden transition-none flex flex-col"
      >
        {/* IMAGE CONTAINER: Čista arhitektura bez margina */}
        <div className="relative aspect-[16/9] md:aspect-square lg:aspect-[21/9] w-full overflow-hidden">
          {collection.details.image.responsiveImage && (
            <DatoImage
              fragment={collection.details.image.responsiveImage!}
              className="h-full w-full object-cover grayscale brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms] ease-out scale-105 group-hover:scale-100"
              layout="fill"
            />
          )}

          {/* TACTICAL OVERLAY: Plutajući beli boks (iz tvoje vizije) */}
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-black text-white px-4 py-2 flex items-center gap-4">
              <span className="text-[8px] font-mono tracking-[0.5em] uppercase">
                ENTRY_ID: 0{idx + 1}
              </span>
              <div className="w-1.5 h-1.5 bg-primary animate-pulse"></div>
            </div>
          </div>

          {/* HOVER DATA BOX: Pojavljuje se kao sistemski prozor */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30">
            <div className="bg-white/90 backdrop-blur-md p-8 border border-black/5 shadow-2xl min-w-[240px]">
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-primary tracking-[0.4em] block">
                  ACCESS_GRANTED
                </span>
                <h3 className="text-2xl font-serif italic uppercase text-black">
                  {collection.name}
                </h3>
                <div className="h-px w-full bg-black/10"></div>
                <span className="text-[8px] font-mono text-black/40 uppercase tracking-widest block">
                  EXPLORE_ARCHIVE_CORE →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DATA STRIP: Donja traka sa metapodacima */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-t border-black/5">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-black/30 uppercase tracking-[0.4em]">
              Collection_Type
            </span>
            <span className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-black">
              {collection.name}
            </span>
          </div>
          <div className="flex items-center gap-8">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[7px] font-mono text-black/30 uppercase tracking-widest italic">Inventory_State</span>
                <span className="text-[9px] font-mono text-black uppercase">Stored // Available</span>
             </div>
             <div className="h-10 w-10 flex items-center justify-center border border-black group-hover:bg-primary group-hover:border-primary transition-all">
                <span className="text-lg font-light">→</span>
             </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

     {/* MATERIALS: Technical Archive - Integrated Half-Screen Grid */}
<section className="w-full bg-black border-b border-white/5">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
    
    {/* LEFT MODULE: Textual Specs */}
    <div className="bg-black p-12 md:p-20 flex flex-col justify-between min-h-[500px]">
      <div className="space-y-12">
        <header className="space-y-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-primary block">
            MATERIAL_COMPOSITION
          </span>
          <h2 className="text-[18px] font-serif italic uppercase leading-[0.8] tracking-wide text-white">
            {showcase.materialsTitle}
          </h2>
        </header>
        
        <div className="max-w-md border-l border-white/20 pl-8">
          <p className="text-[10px] font-mono tracking-[0.2em] leading-relaxed text-white/40 uppercase">
            {showcase.materialsDescription}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="h-px w-12 bg-primary"></div>
        <span className="text-[8px] font-mono text-white tracking-[0.4em] uppercase">
          TECH_SPEC_V.2.6
        </span>
      </div>
    </div>

    {/* RIGHT MODULE: Visual Data (Sada se savršeno uklapa u grid) */}
    <div className="relative aspect-square md:aspect-auto h-full min-h-[500px] overflow-hidden group/mtrl">
      <DatoImage
        fragment={showcase.materialsDisplay[0].responsiveImage!}
        className="h-full w-full object-cover grayscale brightness-50 group-hover/mtrl:grayscale-0 group-hover/mtrl:brightness-100 transition-all duration-[2000ms] ease-out scale-110 group-hover:scale-100"
        layout="fill"
      />
      
      {/* TACTICAL OVERLAY - Replikacija tvog "Jo Malone" boksa */}
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-white text-black px-4 py-2 flex items-center gap-4">
          <span className="text-[8px] font-mono tracking-[0.5em] uppercase">
            MTRL_REF_01
          </span>
          <div className="w-1.5 h-1.5 bg-primary animate-pulse"></div>
        </div>
      </div>

      {/* FLOATING DATA BOX - Onaj beli boks sa tvog screenshota */}
      <div className="absolute bottom-10 left-10 z-30 opacity-0 group-hover/mtrl:opacity-100 transition-all duration-700 translate-y-4 group-hover/mtrl:translate-y-0">
        <div className="bg-white p-6 border border-black/5 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-primary text-[10px]">▲</span>
              <span className="text-[8px] font-mono font-black text-black tracking-[0.3em]">LIVE_ARCHIVE</span>
            </div>
            <div className="text-[10px] font-mono text-black/40">
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