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
  const { title, description, subDescription, materials } = getFragmentData(
    MaterialShowcaseFragmentDoc,
    fragment,
  );

  return (
    <section className="w-full bg-white py-24 border-t border-black/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* HEADER: Technical Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
            {/* Labela sekcije sada koristi text-primary */}
            <h2 className="text-[9px] font-bold uppercase tracking-[0.5em] text-primary mb-6">
              Core Components / Materials
            </h2>
            <h1 className="text-[12px] font-serif uppercase leading-[0.9] text-black italic">
              {title}
            </h1>
          </div>
          <div className="lg:col-span-7 lg:pt-12">
            <p className="text-[9px] font-bold uppercase tracking-widest text-black mb-4">
              {description}
            </p>
            <p className="max-w-2xl text-[9px] leading-relaxed text-gray-400 uppercase tracking-wider font-medium">
              {subDescription}
            </p>
          </div>
        </div>

        {/* MATERIALS GRID: The Archive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {materials.map((material, idx) => {
            return (
              <Link
                href={`/${globalPageProps.params.lng}/products?materials=${material.id}`}
                className="group relative bg-white overflow-hidden p-8"
                key={material.id}
              >
                {/* Index Number - Na hover dobija primary boju */}
                <span className="absolute top-8 left-8 text-[10px] font-mono font-bold text-gray-200 group-hover:text-primary transition-colors">
                  MTRL_{String(idx + 1).padStart(2, '0')}
                </span>

                {/* Image Container */}
                <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-gray-50 grayscale hover:grayscale-0 transition-all duration-700">
                  {material.details.image.responsiveImage && (
                    <DatoImage
                      fragment={material.details.image.responsiveImage}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      layout="fill"
                    />
                  )}
                </div>

                {/* Label Style Title */}
                <div className="flex items-center justify-between border-t-2 border-black pt-6">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                    {material.name}
                  </div>
                  {/* Ikonica strelice dobija crnu pozadinu na hover, ostaje brutalistički čista */}
                  <div className="h-6 w-6 flex items-center justify-center border border-black group-hover:bg-black group-hover:text-white transition-all">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MaterialShowcase;