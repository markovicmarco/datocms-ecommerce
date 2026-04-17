'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { getFragmentData } from '@/graphql/types';
import {
  ProductGeneralInterfaceFragmentDoc,
  type ProductQuery,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';
import DatoImage from '../DatoImage';

type Props = {
  data: ProductQuery;
  globalPageProps: ResolvedGlobalPageProps;
};

const allSizes = ['xs', 's', 'm', 'l', 'xl'];

const ProductView = ({ data, globalPageProps }: Props) => {
  if (!data.product) notFound();

  const [selectedColor, setSelectedColor] = useState(data.product.productVariations[0].color.hex);
  const [selectedSize, setSelectedSize] = useState((data.product.productVariations[0].availableSizes as Array<string>)[0]);
  const [selectedImage, setSelectedImage] = useState(data.product.productImages[0]);

  const isOnSale = data.product?.sale === 'on_sale';
  const { sale, reviews, color, size, currencySymbol, priceUndertext, shippingText, primaryButton, secondaryButton } =
    getFragmentData(ProductGeneralInterfaceFragmentDoc, data.generalInterface) ?? {};

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1920px] mx-auto min-h-screen flex flex-col lg:flex-row">
        
        {/* LEVI DEO: GALERIJA (Sticky) */}
        <div className="lg:w-3/5 border-r border-gray-100 px-4 md:px-12 py-12 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Thumbnails - Oštri i numerisani osećaj */}
            <div className="md:col-span-2 order-last md:order-first flex md:flex-col gap-4">
              {data.product.productImages.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-[3/4] border-2 transition-all duration-500 overflow-hidden ${
                    image.id === selectedImage.id ? 'border-black' : 'border-transparent grayscale opacity-50'
                  }`}
                >
                  <DatoImage fragment={image.responsiveImage!} className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[8px] font-bold font-mono bg-white px-1">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Main Image - Massive and Sharp */}
            <div className="md:col-span-10 relative aspect-[3/4] border-2 border-black p-1 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.03)] group">
              <div className="w-full h-full overflow-hidden bg-gray-50">
                <DatoImage
                  fragment={selectedImage.responsiveImage!}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {isOnSale && (
                <span className="absolute top-0 left-0 bg-black text-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.3em]">
                  {sale}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DESNI DEO: INFO & KUPOVINA */}
        <div className="lg:w-2/5 px-4 md:px-12 py-12 lg:py-24 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center">
          
          <div className="max-w-md space-y-12">
            {/* Header */}
            <div className="space-y-4">
              <Link
                href={`/${globalPageProps.params.lng}/products?brands=${data.product.brand.id}`}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#87CEEB] hover:line-through transition-all"
              >
                {data.product.brand?.name}
              </Link>
              <h1 className="text-4xl md:text-6xl font-serif uppercase leading-[0.9] text-black">
                {data.product.name}
              </h1>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <div className="flex text-black bg-[#87CEEB] px-2 py-0.5">
                  {data.product.reviewAverage} ★
                </div>
                <span>{data.product.numberOfReviews} {reviews}</span>
              </div>
            </div>

            {/* Price Area */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-mono font-bold tracking-tighter text-black">
                  {currencySymbol}{isOnSale ? data.product.salePrice : data.product.price}
                </span>
                {isOnSale && (
                  <span className="text-xl font-mono text-gray-300 line-through">
                    {currencySymbol}{data.product.price}
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 italic">
                {priceUndertext} — {shippingText}
              </p>
            </div>

            {/* Selection (Color & Size) */}
            <div className="space-y-10">
              {/* Color */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">{color}</span>
                <div className="flex gap-4">
                  {data.product.productVariations.map((variation) => (
                    <button
                      key={variation.id}
                      style={{ backgroundColor: variation.color.hex }}
                      className={`h-10 w-10 border-2 transition-all ${
                        variation.color.hex === selectedColor ? 'border-black ring-4 ring-[#87CEEB]/20 scale-110' : 'border-gray-100'
                      }`}
                      onClick={() => setSelectedColor(variation.color.hex)}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">{size}</span>
                <div className="grid grid-cols-5 gap-0 border-2 border-black">
                  {allSizes.map((s) => {
                    const isAvailable = data.product?.productVariations
                      .find(v => v.color.hex === selectedColor)
                      ?.availableSizes.includes(s);
                    
                    return (
                      <button
                        key={s}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(s)}
                        className={`h-14 flex items-center justify-center text-[11px] font-bold uppercase border-r border-black last:border-r-0 transition-all ${
                          !isAvailable ? 'bg-gray-50 text-gray-200 cursor-not-allowed' : 
                          selectedSize === s ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#87CEEB]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <button className="w-full bg-black text-white py-6 text-[12px] font-bold uppercase tracking-[0.4em] hover:bg-[#87CEEB] hover:text-black transition-all duration-500 shadow-[10px_10px_0px_0px_rgba(135,206,235,0.3)]">
                {primaryButton}
              </button>
              <button className="w-full border-2 border-black text-black py-6 text-[12px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500">
                {secondaryButton}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductView;