'use client';

import { isHeading, isList, isListItem } from 'datocms-structured-text-utils';
import { notFound } from 'next/navigation';
import { renderNodeRule } from 'react-datocms';
import DatoStructuredText from '@/components/DatoStructuredText';
import FeaturedProducts from '@/components/Grids/FeaturedProducts';
import ProductInfoSection from '@/components/Products/Product/Blocks/ProductInfoSection';
import QuestionsSection from '@/components/Products/Product/Blocks/QuestionsSection';
import ProductView from '@/components/Products/ProductView';
import Reviews from '@/components/Products/Reviews';
import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import type { PageProps, Query } from './meta';

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.product) {
    notFound();
  }

  return (
    <div className="w-full bg-white antialiased">
      {/* GLAVNI VIEW PROIZVODA */}
      <ProductView data={data} globalPageProps={globalPageProps} />

      {/* DETALJNI OPIS & BLOKOVI */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-24 border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Labela sekcije - Sada koristi text-primary */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary sticky top-32">
              Product_Deep_Dive / 01
            </span>
          </div>

          {/* Dinamički sadržaj iz CMS-a */}
          <div className="lg:col-span-9 max-w-4xl">
            {data.product.description && (
              <DatoStructuredText
                data={data.product.description}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case 'ProductFeatureSectionRecord':
                      return (
                        <div className="my-20 border-y border-black/5 py-12">
                          <ProductInfoSection
                            ProductInfoFragment={record}
                            MaterialFragment={data.product?.material}
                            generalInterfaceFragment={data.generalInterface}
                            globalPageProps={globalPageProps}
                          />
                        </div>
                      );
                    case 'FeaturedQuestionsSectionRecord':
                      return (
                        <div className="my-20 bg-gray-50 p-8 md:p-16">
                          <QuestionsSection fragment={record} />
                        </div>
                      );
                    default:
                      return null;
                  }
                }}
                customNodeRules={[
                  // Brutalistički Naslovi unutar opisa
                  renderNodeRule(isHeading, ({ children, key }) => {
                    return (
                      <h3
                        key={key}
                        className="mb-8 mt-16 text-3xl md:text-5xl font-serif italic uppercase text-black tracking-tighter"
                      >
                        {children}
                      </h3>
                    );
                  }),
                  // Liste transformisane u "Data Grid"
                  renderNodeRule(isList, ({ children, key }) => {
                    return (
                      <div
                        key={key}
                        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10 my-12"
                      >
                        {children}
                      </div>
                    );
                  }),
                  // Stavke liste kao tehničke ćelije
                  renderNodeRule(isListItem, ({ children, key }) => {
                    return (
                      <div
                        key={key}
                        className="bg-white p-4 flex items-center gap-4 group transition-all"
                      >
                        {/* Bullet point u primary boji */}
                        <span className="text-primary font-mono text-[10px] font-bold">●</span>
                        
                        {/* Hover na tekst ćelije sada vuče primary boju */}
                        <div className="text-[11px] font-bold uppercase tracking-widest text-black group-hover:text-primary transition-colors">
                          {children}
                        </div>
                      </div>
                    );
                  }),
                ]}
              />
            )}
          </div>
        </div>
      </div>

      {/* FOOTER SEKCIJE */}
      <div className="border-t border-black/5">
        <FeaturedProducts data={data} globalPageProps={globalPageProps} />
      </div>
      
      <div className="bg-black text-white py-24">
        <Reviews data={data} globalPageProps={globalPageProps} />
      </div>
    </div>
  );
};

export default Content;