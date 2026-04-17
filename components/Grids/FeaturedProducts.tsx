'use client';

import Link from 'next/link';
import { getFragmentData } from '@/graphql/types';
import {
  ProductGeneralInterfaceFragmentDoc,
  type ProductQuery,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';
import DatoImage from '../DatoImage';

type PropTypes = {
  data: ProductQuery;
  globalPageProps: ResolvedGlobalPageProps;
};

const FeaturedProducts = ({ data, globalPageProps }: PropTypes) => {
  const fragmentData = getFragmentData(
    ProductGeneralInterfaceFragmentDoc,
    data.generalInterface!,
  );

  const { sale, currencySymbol } = fragmentData;

  return (
    <section className="w-full bg-white py-20 border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        {/* SECTION HEADER - Minimalist */}
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-black border-l-4 border-black pl-4">
            Featured Selection
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            {data.product?.relatedProducts.length} Items Found
          </span>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {data.product?.relatedProducts.map((product) => {
            const isOnSale = product?.sale === 'on_sale';
            
            return (
              <div key={product.id} className="group relative">
                <Link
                  href={`/${globalPageProps.params.lng}/product/${product.slug}`}
                  className="relative block aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 transition-all duration-700 group-hover:border-black"
                >
                  {/* IMAGE - Starts grayscale, turns color on hover */}
                  <div className="h-full w-full grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105">
                    <DatoImage
                      fragment={product.productImages[0].responsiveImage!}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* SALE BADGE - Brutalist style */}
                  {isOnSale && (
                    <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] animate-in slide-in-from-left duration-500">
                      {sale}
                    </div>
                  )}

                  {/* QUICK ADD / VIEW HOVER - Optional tech feel */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm border-t border-black">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black block text-center">
                      View Details — Quick View
                    </span>
                  </div>
                </Link>

                {/* CONTENT AREA */}
                <div className="mt-6 flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#87CEEB]">
                      {product.brand?.name}
                    </span>
                    <Link
                      href={`/${globalPageProps.params.lng}/product/${product.slug}`}
                      className="text-[14px] font-bold uppercase tracking-wider text-black hover:opacity-50 transition-opacity"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      {isOnSale && (
                        <span className="text-[11px] text-gray-300 line-through tracking-tighter">
                          {currencySymbol}{product.price}
                        </span>
                      )}
                      <span className={`text-[13px] font-bold tracking-tight ${isOnSale ? 'text-black' : 'text-black'}`}>
                        {currencySymbol}{isOnSale ? product.salePrice : product.price}
                      </span>
                    </div>
                    {isOnSale && (
                      <span className="text-[9px] font-black uppercase tracking-tighter text-black bg-gray-100 px-2 py-0.5">
                        Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
