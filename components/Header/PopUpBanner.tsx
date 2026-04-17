
"use client";

import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import { Image as DatoImage, type ResponsiveImageType } from 'react-datocms';
import type { PopupRecord } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type PropTypes = {
  setPopUp: Dispatch<SetStateAction<boolean>>;
  popup: PopupRecord;
  globalPageProps: ResolvedGlobalPageProps;
};

const PopUpBanner = ({ setPopUp, popup, globalPageProps }: PropTypes) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* BACKDROP - Jači blur za fokus na brend */}
      <div
        onClick={() => setPopUp(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
      />
      
      {/* MODAL CONTAINER */}
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative z-[210] w-full max-w-4xl bg-white border-2 border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] md:grid md:grid-cols-5 animate-in zoom-in-95 duration-500"
      >
        {/* IMAGE SIDE - Grayscale vibe */}
        <div className="relative h-64 md:h-full md:col-span-2 border-b-2 md:border-b-0 md:border-r-2 border-black grayscale hover:grayscale-0 transition-all duration-1000">
          <DatoImage
            data={popup.popupImage?.responsiveImage as ResponsiveImageType}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1">
            Featured
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-12 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
            {popup.preTitle ?? "System Announcement"}
          </p>

          <h2 className="mt-4 flex flex-col">
            <span className="text-4xl sm:text-5xl lg:text-7xl font-serif uppercase leading-[0.85] text-black">
              {popup.title}
            </span>
            <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black border-l-2 border-black pl-4 self-start md:self-auto inline-block">
              {popup.subtitle}
            </span>
          </h2>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              onClick={() => setPopUp(false)}
              className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] py-5 hover:bg-[#87CEEB] hover:text-black transition-all duration-500 text-center"
              href={`/${globalPageProps.params.lng}/${popup.button[0]?.slug ?? ''}`}
            >
              {popup.button[0]?.label}
            </Link>
            
            <button
              onClick={() => setPopUp(false)}
              className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
            >
              {popup.dismissButtonLabel ?? "Close"}
            </button>
          </div>

          {popup.underText && (
            <p className="mt-8 text-[9px] uppercase tracking-widest text-gray-300 leading-relaxed italic">
              {popup.underText}
            </p>
          )}
        </div>

        {/* CLOSE ICON - Gornji desni ugao */}
        <button
          onClick={() => setPopUp(false)}
          className="absolute -top-4 -right-4 bg-black text-white p-2 hover:rotate-90 transition-transform duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </section>
    </div>
  );
};

export default PopUpBanner;