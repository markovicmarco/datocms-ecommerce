'use client';

import type { Maybe } from 'graphql/jsutils/Maybe';
import { getLangNameFromCode } from 'language-name-map';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import type { SiteLocale } from '@/graphql/types/graphql';

type Props = {
  languages: SiteLocale[];
};

const LanguageSelector = ({ languages }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathArray = pathname.split('/');
  const currentLocale = pathArray[1] as SiteLocale;
  const searchParams = useSearchParams()!;

  const pathString = pathArray.slice(2).join('/');

  return (
    <div className="relative">
      {/* TRIGGER - Sada u tonu sa ostatkom interfejsa */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-3 px-3 py-2 group transition-none active:translate-x-[0.5px] active:translate-y-[0.5px]"
      >
        <span className="text-[9px] font-mono  uppercase tracking-[0.3em] text-current">
          {getLangNameFromCode(currentLocale)?.name || currentLocale}
        </span>
      </button>

      {/* DROPDOWN - Brutalist System Style */}
      <div
        className={`absolute right-0 z-[100] mt-2 min-w-[160px] bg-white/90 backdrop-blur-md border border-none shadow-[2px_2px_0px_0px_rgb(var(--color-primary)/0.4)] animate-in fade-in slide-in-from-top-1 duration-200 ${
          isOpen ? 'block' : 'hidden'
        }`}
        role="menu"
      >
        <div className="p-1">
          <div className="px-4 py-2 border-b border-none/5 mb-1">
            <span className="text-[7px] font-mono  text-gray-400 uppercase tracking-[0.2em]">Select_Region</span>
          </div>
          {languages.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}/${pathString}?${searchParams.toString()}`}
              className={`block px-4 py-3 text-[9px] font-mono  uppercase tracking-[0.2em] transition-none ${
                currentLocale === locale 
                  ? 'bg-black text-white' 
                  : 'text-current hover:bg-primary/10'
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