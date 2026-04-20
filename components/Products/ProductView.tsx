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

const ALL_SIZES = ['xs', 's', 'm', 'l', 'xl'];

const ProductView = ({ data, globalPageProps }: Props) => {
  if (!data.product) notFound();

  const variations = data.product.productVariations || [];
  const images = data.product.productImages || [];
  
  const [selectedColor, setSelectedColor] = useState(variations[0]?.color?.hex || '#000');
  const [selectedSize, setSelectedSize] = useState((variations[0]?.availableSizes as string[])?.[0] || 'm');
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const isOnSale = data.product.sale === 'on_sale';
  const price = data.product.price || 0;
  const salePrice = data.product.salePrice || price;

  const fragmentData = getFragmentData(ProductGeneralInterfaceFragmentDoc, data.generalInterface);
  const { 
    sale, reviews, color, size, currencySymbol, 
    priceUndertext, shippingText, primaryButton, secondaryButton 
  } = fragmentData ?? {};

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1920px] mx-auto min-h-screen flex flex-col lg:flex-row">
        
        {/* LEVI DEO: GALERIJA */}
        <div className="lg:w-3/5 border-r border-black/5 px-4 md:px-12 py-12 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Thumbnails */}
            <div className="md:col-span-2 order-last md:order-first flex md:flex-col gap-4">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-[3/4] border-2 transition-all duration-500 overflow-hidden ${
                    image.id === selectedImage?.id ? 'border-black' : 'border-transparent grayscale opacity-50'
                  }`}
                >
                  {image.responsiveImage && (
                    <DatoImage fragment={image.responsiveImage} className="h-full w-full object-cover" />
                  )}
                  <span className="absolute bottom-1 left-1 text-[8px] font-bold font-mono bg-white px-1">0{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="md:col-span-10 relative aspect-[3/4] border-2 border-black p-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.03)] group">
              <div className="w-full h-full overflow-hidden bg-gray-50">
                {selectedImage?.responsiveImage && (
                  <DatoImage
                    fragment={selectedImage.responsiveImage}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
              </div>
              {isOnSale && (
                <span className="absolute top-0 left-0 bg-black text-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.3em] z-10">
                  {sale}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DESNI DEO: INFO */}
        <div className="lg:w-2/5 px-4 md:px-12 py-12 lg:py-24 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center">
          <div className="max-w-md space-y-12">
            
            {/* Header */}
            <div className="space-y-4">
              <Link
                href={`/${globalPageProps.params.lng}/products?brands=${data.product.brand.id}`}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:underline transition-all"
              >
                {data.product.brand?.name}
              </Link>
              <h1 className="text-[12px] font-serif uppercase leading-[0.9] text-black italic tracking-tighter">
                {data.product.name}
              </h1>
              <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                <div className="flex text-black bg-primary px-2 py-0.5">
                  {data.product.reviewAverage || 5} ★
                </div>
                <span>{data.product.numberOfReviews || 0} {reviews}</span>
              </div>
            </div>

            {/* Price Area */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4 font-mono">
                <span className="text-[10px] font-bold tracking-tighter text-black">
                  {currencySymbol}{isOnSale ? salePrice : price}
                </span>
                {isOnSale && (
                  <span className="text-[10px] text-gray-300 line-through">
                    {currencySymbol}{price}
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 italic">
                {priceUndertext} — {shippingText}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-10">
              {/* Color Selection */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">{color}</span>
                <div className="flex gap-4">
                  {variations.map((v) => (
                    <button
                      key={v.id}
                      style={{ backgroundColor: v.color?.hex || '#000' }}
                      className={`h-10 w-10 border-2 transition-all ${
                        v.color?.hex === selectedColor ? 'border-black ring-4 ring-primary/20 scale-110' : 'border-black/5'
                      }`}
                      onClick={() => setSelectedColor(v.color?.hex || '#000')}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">{size}</span>
                <div className="grid grid-cols-5 gap-0 border-2 border-black">
                  {ALL_SIZES.map((s) => {
                    const currentVariation = variations.find(v => v.color?.hex === selectedColor);
                    const isAvailable = (currentVariation?.availableSizes as string[])?.includes(s);
                    
                    return (
                      <button
                        key={s}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(s)}
                        className={`h-14 flex items-center justify-center text-[11px] font-bold uppercase border-r border-black last:border-r-0 transition-all ${
                          !isAvailable ? 'bg-gray-50 text-gray-200 cursor-not-allowed' : 
                          selectedSize === s ? 'bg-black text-white' : 'bg-white text-black hover:bg-primary'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <button className="w-full bg-black text-white py-6 text-[12px] font-bold uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all duration-500 shadow-[10px_10px_0px_0px_rgba(var(--primary-rgb),0.3)]">
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