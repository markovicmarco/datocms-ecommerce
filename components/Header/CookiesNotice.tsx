"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Image as DatoImage, type ResponsiveImageType } from 'react-datocms';
import type { CookieNoticeRecord } from '@/graphql/types/graphql';

type PropTypes = {
  setCookies: Dispatch<SetStateAction<boolean>>;
  cookieNotice: CookieNoticeRecord;
};

const CookiesNotice = ({ setCookies, cookieNotice }: PropTypes) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border-t border-gray-100 shadow-[0_-1px_1px_rgba(0,0,0,0.04)] px-4 md:px-12 py-8">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          
          {/* IMAGE AREA - Skriven na mobilnom, oštar na desktopu */}
          <div className="hidden md:block md:col-span-2">
            <div className="relative aspect-video overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gray-100">
              <DatoImage
                data={cookieNotice.cookieNoticeImage?.responsiveImage as ResponsiveImageType}
                className="h-full w-full object-cover scale-105"
              />
            </div>
          </div>

          {/* TEXT AREA */}
          <div className="md:col-span-6 flex flex-col gap-2">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-black">
              {cookieNotice.header ?? "Cookies & Privacy"}
            </h2>
            <p className="text-[9px] uppercase tracking-wider text-gray-500 leading-relaxed max-w-xl">
              {cookieNotice.subheader}
            </p>
          </div>

          {/* ACTION AREA */}
          <div className="md:col-span-4 flex flex-col md:flex-row items-center justify-end gap-6">
            <button
              onClick={() => setCookies(false)}
              className="btn-brutalist flex items-center justify-center transition-colors"
            >
              {cookieNotice.secondaryButtonLabel}
            </button>
            
            <button
              onClick={() => setCookies(false)}
              className="btn-brutalist flex items-center justify-center transition-all duration-300"
            >
              {cookieNotice.primaryButtonLabel}
            </button>

            {/* Suptilni iksić za zatvaranje */}
            <button 
              onClick={() => setCookies(false)}
              className="hidden md:block text-gray-300 hover:text-black transition-colors ml-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookiesNotice;