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
    <div className="fixed bottom-0 left-0 w-full z-[100] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border-t border-none/5 shadow-2xl px-6 md:px-16 py-8">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12">
          
          {/* LOGO AREA - Sveden na mali, oštar marker */}
          <div className="hidden md:flex md:col-span-1 items-center justify-start">
            <div className="w-6 h-6 grayscale brightness-0 opacity-80 hover:opacity-100 transition-all duration-500">
              {cookieNotice.cookieNoticeImage?.responsiveImage && (
                <DatoImage
                  data={cookieNotice.cookieNoticeImage.responsiveImage as ResponsiveImageType}
                  className="object-contain"
                />
              )}
            </div>
          </div>

          {/* TEXT AREA */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-primary animate-pulse md:hidden"></div> {/* Marker za mobile */}
              <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-current">
                {cookieNotice.header ?? "PRIVACY_PROTOCOL"}
              </h2>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-current/40 leading-relaxed max-w-2xl">
              {cookieNotice.subheader}
            </p>
          </div>

          {/* ACTION AREA */}
          <div className="md:col-span-4 flex flex-col md:flex-row items-center justify-end gap-6">
            <button
              onClick={() => setCookies(false)}
              className="text-[9px] font-mono uppercase tracking-[0.3em] text-current/40 hover:text-current transition-colors"
            >
              {cookieNotice.secondaryButtonLabel}
            </button>
            
            <button
              onClick={() => setCookies(false)}
              className="px-8 py-3 bg-black text-white text-[9px] font-mono font-black uppercase tracking-[0.4em] hover:bg-primary transition-all duration-300 shadow-xl"
            >
              {cookieNotice.primaryButtonLabel}
            </button>

            <button 
              onClick={() => setCookies(false)}
              className="hidden md:block text-current/20 hover:text-current transition-colors ml-4"
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