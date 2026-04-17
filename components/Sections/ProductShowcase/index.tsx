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
  const { direction, pretitle, title, description, button, collection } =
    getFragmentData(CollectionCardShowcaseFragmentDoc, fragment);

  const isLeft = direction === 'left';

  return (
    <section className="w-full bg-white border-t border-black/5 overflow-hidden">
      <div className="max-w-[1920px] mx-auto min-h-screen flex flex-col md:flex-row">
        
        {/* TEXT CONTENT - Arhitektonski blok */}
        <div className={`md:w-2/5 flex flex-col justify-center px-4 md:px-12 py-20 bg-white z-10 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#87CEEB]">
                {pretitle}
              </span>
              <h2 className="text-5xl md:text-8xl font-serif uppercase leading-[0.85] text-black italic">
                {title}
              </h2>
            </div>
            
            <p className="max-w-md text-[13px] uppercase tracking-widest text-gray-500 leading-relaxed font-medium">
              {description}
            </p>

            <Link
              href={`/${globalPageProps.params.lng}/${button[0].slug}`}
              className="inline-block border-2 border-black bg-black px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-[#87CEEB] hover:text-black shadow-[8px_8px_0px_0px_rgba(135,206,235,0.3)]"
            >
              {button[0].label}
            </Link>
          </div>
        </div>

        {/* VISUAL GRID - High Tech Gallery */}
        <div className={`md:w-3/5 grid grid-cols-2 grid-rows-2 h-[80vh] md:h-screen bg-gray-100 ${isLeft ? 'md:order-2 border-l' : 'md:order-1 border-r'} border-black/5`}>
          
          {/* Main Large Image */}
          <div className="col-span-2 row-span-1 md:row-span-2 relative overflow-hidden group">
            {collection[0].details.image.responsiveImage && (
              <DatoImage
                fragment={collection[0].details.image.responsiveImage}
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                layout="fill"
              />
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-6 right-6 text-white text-[10px] font-mono font-bold tracking-widest bg-black px-3 py-1">
              MAIN_COLLECTION_01
            </div>
          </div>

          {/* Secondary Small Image 1 */}
          <div className="col-span-1 row-span-1 relative overflow-hidden group border-t border-r border-white/20">
            {collection[1].details.image.responsiveImage && (
              <DatoImage
                fragment={collection[1].details.image.responsiveImage}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                layout="fill"
              />
            )}
            <div className="absolute inset-0 bg-[#87CEEB]/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Secondary Small Image 2 */}
          <div className="col-span-1 row-span-1 relative overflow-hidden group border-t border-white/20">
            {collection[2].details.image.responsiveImage && (
              <DatoImage
                fragment={collection[2].details.image.responsiveImage}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
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
