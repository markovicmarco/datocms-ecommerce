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
  const relatedProducts = data.product?.relatedProducts || [];

  if (relatedProducts.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 border-t border-none/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="mb-12 flex items-end justify-between border-b border-none/5 pb-8">
          <div className="space-y-2">
            {/* Labela sada koristi text-current (tvoj novi krem ton) */}
            <span className="text-[9px] font-mono  text-current uppercase tracking-[0.3em]">
              Collection_Extension
            </span>
            <h2 className="text-[18px] font-serif italic uppercase tracking-wide text-current">
              Featured Selection
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400 pb-2">
            [{relatedProducts.length}] Units Available
          </span>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((product) => {
            const price = product.price || 0;
            const salePrice = product.salePrice || price;
            const isOnSale = product.sale === 'on_sale' && (product.salePrice ?? 0) < price;
            const firstImage = product.productImages[0]?.responsiveImage;
            
            return (
              <div key={product.id} className="group relative">
                <Link
                  href={`/${globalPageProps.params.lng}/product/${product.slug}`}
                  className="relative block aspect-[3/4] overflow-hidden bg-gray-50 transition-all duration-700"
                >
                  {/* IMAGE ENGINE */}
                  <div className="h-full w-full grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105">
                    {firstImage && (
                      <DatoImage
                        fragment={firstImage}
                        className="h-full w-full object-cover"
                        layout="fill"
                      />
                    )}
                  </div>

                  {/* SALE BADGE: Sada koristi bg-primary */}
                  {isOnSale && (
                    <div className="absolute top-0 left-0 bg-white text-current px-3 py-1 text-[10px]  uppercase tracking-widest z-10">
                      {sale}
                    </div>
                  )}

                  {/* QUICK ACTION BAR */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black text-white">
                    <span className="text-[9px]  uppercase tracking-[0.3em] block text-center">
                      View_Technical_Specs — {product.name}
                    </span>
                  </div>
                </Link>

                {/* INFO AREA */}
                <div className="mt-6 flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono  uppercase tracking-[0.2em] text-gray-400">
                      {product.brand?.name}
                    </span>
                    <Link
                      href={`/${globalPageProps.params.lng}/product/${product.slug}`}
                      /* Hover na ime sada vuče primary boju */
                      className="text-[9px]  uppercase tracking-wider text-current hover:text-current transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="flex flex-col items-end gap-1 font-mono">
                    <div className="flex items-center gap-2">
                      {isOnSale && (
                        <span className="text-[9px] text-gray-300 line-through">
                          {currencySymbol}{price}
                        </span>
                      )}
                      <span className="text-[9px]  text-current">
                        {currencySymbol}{isOnSale ? salePrice : price}
                      </span>
                    </div>
                    {isOnSale && (
                      <span className="text-[9px]  uppercase text-red-500 bg-red-50 px-1">
                        -{Math.round(((price - salePrice) / price) * 100)}%
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