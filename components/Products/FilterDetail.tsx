'use client';

import {
  isList,
  isListItem,
  isThematicBreak,
  type Record,
  type StructuredText,
} from 'datocms-structured-text-utils';
import type { Maybe } from 'graphql/jsutils/Maybe';
import { renderNodeRule } from 'react-datocms/structured-text';
import ReactMarkdown from 'react-markdown';
import DatoStructuredText from '@/components/DatoStructuredText';
import type { FragmentType } from '@/graphql/types';
import type { DatoImage_ResponsiveImageFragmentDoc } from '@/graphql/types/graphql';
import DatoImage from '../DatoImage';

type PropTypes = {
  name: string;
  subtitle: string;
  type: Maybe<string>;
  image: Maybe<FragmentType<typeof DatoImage_ResponsiveImageFragmentDoc>>;
  description: Maybe<StructuredText<Record, Record>>;
};

const FilterDetail = ({
  name,
  type,
  image,
  description,
  subtitle,
}: PropTypes) => {
  return (
    <section className="w-full bg-white relative">
      <div className="max-w-[1920px] mx-auto">
        
        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          
          {/* LEVA KOLONA: Tekstualni sadržaj */}
          <div className="lg:col-span-7 px-4 md:px-12 py-20 lg:py-32 flex flex-col justify-center">
            
            <div className="max-w-2xl">
              {/* Tip filtera (npr. Material, Collection) */}
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#87CEEB]">
                {type ?? "Explore Detail"}
              </span>

              {/* Naslov - Masivan i autoritativan */}
              <h1 className="mt-6 text-5xl md:text-8xl font-serif uppercase leading-[0.9] text-black italic">
                {name}
              </h1>

              {/* Subtitle / Intro */}
              <div className="mt-10 text-[14px] uppercase tracking-widest text-black font-bold leading-relaxed border-l-4 border-black pl-6">
                <ReactMarkdown>{subtitle || ''}</ReactMarkdown>
              </div>

              {/* Structured Text: Opis */}
              <div className="mt-16 prose-custom">
                <DatoStructuredText
                  data={description}
                  customNodeRules={[
                    renderNodeRule(isListItem, ({ children, key }) => (
                      <li key={key} className="flex items-center gap-4 py-2 border-b border-gray-50">
                        <span className="w-1.5 h-1.5 bg-[#87CEEB] shrink-0" />
                        <span className="text-[11px] uppercase tracking-wider text-gray-500">{children}</span>
                      </li>
                    )),
                    renderNodeRule(isThematicBreak, ({ key }) => (
                      <hr key={key} className="my-12 border-0 h-px bg-black opacity-10" />
                    )),
                    renderNodeRule(isList, ({ children, key }) => (
                      <ul key={key} className="space-y-2 my-8">
                        {children}
                      </ul>
                    )),
                  ]}
                />
              </div>
            </div>
          </div>

          {/* DESNA KOLONA: Sticky Image */}
          <div className="lg:col-span-5 relative h-[60vh] lg:h-screen sticky top-0 bg-gray-50 overflow-hidden border-l border-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
            {image && (
              <DatoImage
                fragment={image}
                className="h-full w-full object-cover"
                layout="fill"
                objectFit="cover"
              />
            )}
            
            {/* Overlay labela */}
            <div className="absolute bottom-12 right-12 bg-black text-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em]">
              Detail View / 01
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FilterDetail;