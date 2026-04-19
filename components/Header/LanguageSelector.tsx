'use client';

import type { Maybe } from 'graphql/jsutils/Maybe';
import { getLangNameFromCode } from 'language-name-map';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import type { SiteLocale } from '@/graphql/types/graphql';

type Props = {
  languages: SiteLocale[];
  currencySymbol: Maybe<string>;
};

const LanguageSelector = ({ languages, currencySymbol }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const currentLocale = pathArray[1] as SiteLocale;
  const searchParams = useSearchParams()!;

  const pathString = pathArray.slice(2).join('/');

  return (
    <div className="relative">
      {/* TRIGGER - Minimalistički tekst bez pozadine */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 px-2 py-1 transition-all duration-300 active:scale-95 group"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black group-hover:opacity-50 transition-opacity">
          {getLangNameFromCode(currentLocale)?.name || currentLocale}
        </span>
        <span className="text-[9px] font-medium text-gray-400">
          ({currencySymbol})
        </span>
        {/* Mali indikator koji se rotira */}
        <svg 
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* DROPDOWN - Oštar i visok kontrast */}
      <div
        className={`absolute right-0 z-[100] mt-4 min-w-[140px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-2 duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
        role="menu"
      >
        <div className="py-1">
          {languages.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}/${pathString}?${searchParams.toString()}`}
              className={`block px-6 py-3 text-[9px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-gray-50 ${
                currentLocale === locale ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
              role="menuitem"
            >
              {getLangNameFromCode(locale)?.name || locale}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
