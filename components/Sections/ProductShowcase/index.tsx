'use client';

import Link from 'next/link';
import DatoImage from '@/components/DatoImage';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { CollectionCardShowcaseFragmentDoc } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  fragment: FragmentType<typeof CollectionCardShowcaseFragmentDoc>;
  globalPageProps: ResolvedGlobalPageProps;
};

const ProductShowcase = ({ fragment, globalPageProps }: Props) => {
  const data = getFragmentData(CollectionCardShowcaseFragmentDoc, fragment);
  const { direction, pretitle, title, description, button, collection } = data;

  const isLeft = direction === 'left';

  return (
    <section className="w-full bg-white border-t border-black/5 overflow-hidden group/section">
      <div className="max-w-[1920px] mx-auto min-h-screen flex flex-col md:flex-row">
        
        {/* TEXT CONTENT - System Engine Block */}
        <div className={`md:w-2/5 flex flex-col justify-center px-6 md:px-16 py-24 bg-white z-20 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-primary block">
                {pretitle || 'COLLECTION_REF'}
              </span>
              <h2 className="text-[18px] font-serif italic uppercase leading-[0.85] text-black tracking-wide">
                {title}
              </h2>
            </header>
            
            <div className="border-l border-black pl-8 py-2">
              <p className="max-w-xs text-[10px] uppercase tracking-widest text-black/60 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            <Link
              href={`/${globalPageProps.params.lng}/${button[0].slug}`}
              className="btn-brutalist inline-flex items-center justify-center px-10 py-5"
            >
              <span className="relative z-10">{button[0].label}</span>
            </Link>
          </div>
        </div>

        {/* VISUAL GRID - Archive Multi-View */}
        <div className={`md:w-3/5 grid grid-cols-2 grid-rows-2 h-[80vh] md:h-screen bg-black ${isLeft ? 'md:order-2 border-l' : 'md:order-1 border-r'} border-black/5`}>
          
          {/* Main Large Frame */}
          <div className="col-span-2 row-span-1 md:row-span-2 relative overflow-hidden group/frame border-b md:border-b-0 border-white/5">
            {collection[0]?.details?.image?.responsiveImage && (
              <div className="h-full w-full transition-all duration-[2000ms] ease-out group-hover/section:scale-105">
                <DatoImage
                  fragment={collection[0].details.image.responsiveImage}
                  className="h-full w-full object-cover grayscale brightness-50 group-hover/section:grayscale-0 group-hover/section:brightness-100 transition-all duration-1000"
                  layout="fill"
                />
              </div>
            )}
            <div className="absolute top-8 left-8 text-white/40 text-[8px] font-mono font-bold tracking-[0.4em] z-30">
              [PRIMARY_VIEW_01]
            </div>
          </div>

          {/* Secondary View A */}
          <div className="col-span-1 row-span-1 relative overflow-hidden group/frame border-r border-white/5">
            {collection[1]?.details?.image?.responsiveImage && (
              <DatoImage
                fragment={collection[1].details.image.responsiveImage}
                className="h-full w-full object-cover grayscale brightness-40 group-hover/section:grayscale-0 group-hover/section:brightness-90 transition-all duration-1000 delay-100"
                layout="fill"
              />
            )}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          </div>

          {/* Secondary View B */}
          <div className="col-span-1 row-span-1 relative overflow-hidden group/frame">
            {collection[2]?.details?.image?.responsiveImage && (
              <DatoImage
                fragment={collection[2].details.image.responsiveImage}
                className="h-full w-full object-cover grayscale brightness-40 group-hover/section:grayscale-0 group-hover/section:brightness-90 transition-all duration-1000 delay-200"
                layout="fill"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;