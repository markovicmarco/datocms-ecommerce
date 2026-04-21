'use client';

import Link from 'next/link';
import DatoImage from '@/components/DatoImage';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { MaterialShowcaseFragmentDoc } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  fragment: FragmentType<typeof MaterialShowcaseFragmentDoc>;
  globalPageProps: ResolvedGlobalPageProps;
};

const MaterialShowcase = ({ fragment, globalPageProps }: Props) => {
  const data = getFragmentData(MaterialShowcaseFragmentDoc, fragment);
  const { title, description, subDescription, materials } = data;

  return (
    <section className="w-full bg-white border-t border-none/5 selection:bg-primary selection:text-current">
      
      {/* INTEGRATED HEADER: Sada je deo istog grid sistema */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div className="space-y-8">
            <span className="text-[9px] font-mono  uppercase tracking-[0.6em] text-current/40 block">
              HIGH-QUALITY // MATERIALS
            </span>
            <h2 className="text-[18px] font-serif italic uppercase leading-[0.8] text-current tracking-wide">
              {title}
            </h2>
          </div>
          <div className="border-l border-none/5 pl-8 space-y-4">
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-current">
              {description}
            </p>
            <p className="max-w-md text-[9px] leading-relaxed text-current/40 uppercase tracking-[0.2em] font-medium">
              {subDescription}
            </p>
          </div>
        </div>
      </div>

      {/* HALF-SCREEN MATERIALS GRID: Hirurški precizan spoj */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border-t border-none/5">
        {materials.map((material, idx) => (
          <Link
            href={`/${globalPageProps.params.lng}/products?materials=${material.id}`}
            className="group relative aspect-square md:aspect-[16/10] lg:aspect-[21/9] w-full overflow-hidden bg-gray-50 transition-none"
            key={material.id}
          >
            {/* BASE IMAGE */}
            <div className="absolute inset-0 w-full h-full grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms] ease-out scale-105 group-hover:scale-100">
              {material.details.image.responsiveImage && (
                <DatoImage
                  fragment={material.details.image.responsiveImage}
                  className="h-full w-full object-cover"
                  layout="fill"
                />
              )}
            </div>

            {/* TACTICAL OVERLAY - Replikacija tvog "Jo Malone" screenshota */}
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-transparent text-white px-4 py-2 flex items-center gap-4">
                <span className="text-[9px] font-mono  tracking-[0.5em] uppercase text-white/50">
                  JULHKOVA
                </span>
                <span className="text-[8px] font-mono  text-white tracking-[0.2em] animate-pulse">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* FLOATING BOX: Onaj beli boks koji lebdi na hoveru */}
            <div className="absolute bottom-0 right-0 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-30">
              <div className="bg-white/95 backdrop-blur-md p-8 border border-none/5 shadow-2xl min-w-[280px] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono font-black text-current/40 tracking-[0.4em]">CHOSE</span>
                  </div>
                  <div className="h-px w-full bg-black/5"></div>
                  <div>
                    <span className="text-[8px] font-mono text-current/40 block mb-1">MATERIAL:</span>
                    <h3 className="text-2xl font-serif italic uppercase text-current leading-none">
                      {material.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-[8px] font-mono  text-current/40 uppercase tracking-[0.3em]">
                      DETAILS
                    </span>
                    <span className="text-[7px] font-mono text-current/20 uppercase italic leading-none">
                      REF: {material.id.substring(0, 8)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM INFO BAR: Statična traka koja daje "Inventory" osećaj */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
               <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-[#D8D8D8] uppercase tracking-widest">TYPE</span>
                    <span className="text-[14px] font-mono uppercase text-[#D8D8D8] tracking-widest animate-pulse">{material.name}</span>
                  </div>
               </div>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
};

export default MaterialShowcase;