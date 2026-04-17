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
    <div className="w-full bg-white font-sans antialiased overflow-x-hidden">
      
      {/* HERO SECTION: Industrial Header */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-12 pt-32 pb-20 border-b border-black/5">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#87CEEB] mb-6 block">
              Global_Collection_Showcase
            </span>
            <h1 className="text-5xl md:text-[120px] font-serif uppercase leading-[0.8] text-black italic tracking-tighter">
              {showcase.title}
            </h1>
          </div>
          <div className="md:w-1/3 pb-4">
            <p className="text-[13px] uppercase tracking-widest leading-relaxed text-gray-500 font-medium">
              {showcase.description}
            </p>
            <Link
              href={`/${globalPageProps.params.lng}/${showcase.cta[0].slug}`}
              className="mt-8 inline-block text-[11px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-[#87CEEB] hover:border-[#87CEEB] transition-all"
            >
              {showcase.cta[0].label}
            </Link>
          </div>
        </div>
      </section>

      {/* PRIMARY DISPLAYS: Asymmetric Split */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-px bg-black/5">
        <div className="md:col-span-7 relative h-[70vh] md:h-screen bg-white group overflow-hidden">
          <DatoImage
            fragment={showcase.displays[0].responsiveImage!}
            className="h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
            layout="fill"
          />
        </div>
        <div className="md:col-span-5 relative h-[50vh] md:h-screen bg-white group overflow-hidden border-l border-black/5">
          <DatoImage
            fragment={showcase.displays[1].responsiveImage!}
            className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            layout="fill"
          />
          <div className="absolute bottom-12 left-12 z-10 hidden md:block">
            <span className="bg-black text-white px-4 py-2 text-[10px] font-mono tracking-widest uppercase">
              Ref_IMG_02 // Detail_View
            </span>
          </div>
        </div>
      </section>

      {/* COLLECTIONS: Grid System */}
      <section className="max-w-[1920px] mx-auto py-24 border-b border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-12">
          {showcase.collections.map((collection, idx) => (
            <Link
              key={collection.id}
              href={`/${globalPageProps.params.lng}/${showcase.collectionsCta[0].slug}${collection.id}`}
              className="group flex flex-col gap-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                {collection.details.image.responsiveImage && (
                  <DatoImage
                    fragment={collection.details.image.responsiveImage!}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    layout="fill"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="border-l-2 border-black pl-6 py-2">
                <span className="text-[9px] font-mono text-gray-400 block mb-1">CATALOG_0{idx + 1}</span>
                <h3 className="text-xl font-bold uppercase tracking-widest text-black mb-2">
                  {collection.name}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#87CEEB]">
                  {showcase.collectionsCta[0].label} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW PRODUCTS: Large Format */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-12 py-32">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#87CEEB] mb-12">
          Latest_Arrivals / {new Date().getFullYear()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {showcase.newProducts.map((product, idx) => (
            <Link
              key={product.slug}
              href={`/${globalPageProps.params.lng}/product/${product.slug}`}
              className={`group flex flex-col ${idx === 1 ? 'md:pt-48' : ''}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-black/5">
                <DatoImage
                  fragment={product.productImages[0].responsiveImage!}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  layout="fill"
                />
              </div>
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif italic uppercase text-black">{product.name}</h3>
                  <div className="text-[12px] font-mono mt-2 text-gray-400 uppercase tracking-tighter">
                    Price_Value: {generalInterface?.currencySymbol}
                    {product.sale !== 'not_on_sale' ? product.salePrice : product.price}
                    {product.sale !== 'not_on_sale' && (
                      <span className="ml-3 text-red-500 line-through opacity-50">
                        {product.price}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-10 w-10 flex items-center justify-center border border-black group-hover:bg-black group-hover:text-white transition-all">
                  <span className="text-sm">+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MATERIALS: Technical Archive */}
      <section className="bg-black text-white py-32">
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-serif italic uppercase leading-[0.9] mb-12">
              {showcase.materialsTitle}
            </h2>
            <p className="text-[14px] tracking-widest leading-loose text-gray-400 uppercase max-w-lg mb-12">
              {showcase.materialsDescription}
            </p>
            <div className="relative aspect-square md:aspect-video overflow-hidden">
               <DatoImage
                fragment={showcase.materialsDisplay[0].responsiveImage!}
                className="h-full w-full object-cover brightness-75 hover:brightness-100 transition-all duration-1000"
                layout="fill"
              />
            </div>
          </div>
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
            <DatoImage
              fragment={showcase.materialsDisplay[1].responsiveImage!}
              className="h-full w-full object-cover"
              layout="fill"
            />
            <div className="absolute top-0 right-0 p-8">
              <span className="text-[10px] font-mono tracking-[0.4em] bg-white text-black px-4 py-2 uppercase">
                Mat_Archive_02
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Content;