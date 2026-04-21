'use client';

import type { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import DatoImage from '@/components/DatoImage';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import {
  MaterialProductFragmentFragmentDoc,
  ProductGeneralInterfaceFragmentDoc,
  ProductInfoSectionFragmentDoc,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  ProductInfoFragment: FragmentType<typeof ProductInfoSectionFragmentDoc>;
  MaterialFragment: Maybe<
    FragmentType<typeof MaterialProductFragmentFragmentDoc>
  >;
  globalPageProps: ResolvedGlobalPageProps;
  generalInterfaceFragment: Maybe<
    FragmentType<typeof ProductGeneralInterfaceFragmentDoc>
  >;
};

const ProductInfoSection = ({
  ProductInfoFragment,
  MaterialFragment,
  globalPageProps,
  generalInterfaceFragment,
}: Props) => {
  const {
    materials,
    style: styleString,
    weather: weatherString,
    occasions: occasionsString,
    more,
  } = getFragmentData(
    ProductGeneralInterfaceFragmentDoc,
    generalInterfaceFragment,
  ) ?? {};

  const { material, style, weather, occasions } = getFragmentData(
    ProductInfoSectionFragmentDoc,
    ProductInfoFragment,
  );

  const { details, name, id } =
    getFragmentData(MaterialProductFragmentFragmentDoc, MaterialFragment) ?? {};

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* TEHNIČKI GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEVA STRANA: INFO GRID */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            
            {/* ITEM: MATERIALS - Sada koristi text-primary */}
            <div className="group space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500" />
                <h3 className="text-[12px]  uppercase tracking-[0.3em] text-black">
                  {materials}
                </h3>
              </div>
              <p className="text-[9px]  uppercase tracking-wider text-black leading-tight">
                {material}
              </p>
            </div>

            {/* ITEM: STYLE */}
            <div className="group space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500" />
                <h3 className="text-[12px]  uppercase tracking-[0.3em] text-black">
                  {styleString}
                </h3>
              </div>
              <p className="text-[9px]  uppercase tracking-wider text-black leading-tight">
                {style}
              </p>
            </div>

            {/* ITEM: WEATHER */}
            <div className="group space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500" />
                <h3 className="text-[12px]  uppercase tracking-[0.3em] text-black">
                  {weatherString}
                </h3>
              </div>
              <p className="text-[9px]  uppercase tracking-wider text-black leading-tight">
                {weather}
              </p>
            </div>

            {/* ITEM: OCCASION */}
            <div className="group space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-black group-hover:w-12 transition-all duration-500" />
                <h3 className="text-[12px]  uppercase tracking-[0.3em] text-black">
                  {occasionsString}
                </h3>
              </div>
              <p className="text-[9px]  uppercase tracking-wider text-black leading-tight">
                {occasions}
              </p>
            </div>
          </div>

          {/* DESNA STRANA: MATERIAL SPOTLIGHT */}
          <div className="lg:col-span-4 border-none">
            <div className="border border-gray-100">
              <div className="p-6 space-y-6 bg-white">
                <div className="space-y-2">
                  <span className="text-[12px]  uppercase tracking-[0.2em] text-gray-400">
                    Sourced Material
                  </span>
                  <p className="text-[9px]  uppercase tracking-widest text-black">
                    {name}
                  </p>
                </div>

                <Link
                  href={`/${globalPageProps.params.lng}/products/?materials=${id}`}
                  className="inline-block w-full border-none py-4 text-center text-[10px]  uppercase tracking-[0.3em] hover:text-black transition-all duration-300 animate-pulse"
                >
                  {more}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductInfoSection;