"use client";

import { useState } from 'react';
import {
  isListItem,
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full bg-white relative border-b border-gray-100">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[100px] lg:min-h-[120px]">
          
          {/* HEADER / TRIGGER */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:col-span-12 w-full flex items-center justify-between px-6 md:px-12 py-10 group bg-white hover:bg-gray-50 transition-colors z-20"
          >
            <div className="flex items-baseline gap-8">
              <span className="text-[9px] font-mono opacity-30">
                {isOpen ? '[ 02 ]' : '[ 01 ]'}
              </span>
              <h2 className="text-[12px] font-serif uppercase italic tracking-tight text-current">
                {name}
              </h2>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-40 transition-opacity text-current">
                {isOpen ? 'Close_Archive' : 'View_Details'}
              </span>
              <span className="text-xl font-mono text-current">
                {isOpen ? '[ - ]' : '[ + ]'}
              </span>
            </div>
          </button>

          {/* COLLAPSIBLE CONTENT */}
          <div className={`lg:col-span-12 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-gray-100">
              
              {/* LEVA STRANA: Tekst */}
              <div className="lg:col-span-7 px-6 md:px-12 py-16 lg:py-24 border-r border-gray-100">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="h-px w-6 bg-black opacity-20"></span>
                    <span className="text-[9px]  uppercase tracking-[0.5em] text-current/40">
                      {type ?? "ARCHIVE_REF"}
                    </span>
                  </div>
                  
                  <div className="mt-8 text-[9px] uppercase tracking-[0.1em] text-current  leading-relaxed border-l-[4px] border-none pl-8">
                    <ReactMarkdown>{subtitle || ''}</ReactMarkdown>
                  </div>

                  <div className="mt-16 prose-custom">
                    <DatoStructuredText
                      data={description}
                      customNodeRules={[
                        renderNodeRule(isListItem, ({ children, key }) => (
                          <li key={key} className="flex items-center gap-4 py-4 border-b border-gray-50 group/item">
                            <span className="w-1.5 h-1.5 bg-black rotate-45 shrink-0 transition-transform group-hover/item:rotate-90" />
                            <span className="text-[9px] uppercase tracking-[0.2em] text-current/50 group-hover/item:text-current transition-colors">{children}</span>
                          </li>
                        )),
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* DESNA STRANA: Slika */}
              <div className="lg:col-span-5 relative h-[70vh] lg:h-auto bg-gray-50 overflow-hidden grayscale contrast-125 transition-all duration-1000 hover:grayscale-0">
                {image && (
                  <DatoImage
                    fragment={image}
                    className="h-full w-full object-cover"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
                <div className="absolute bottom-12 right-12 bg-black text-white px-6 py-4 text-[9px]  uppercase tracking-[0.4em]">
                  {name} // Image_Data
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FilterDetail;