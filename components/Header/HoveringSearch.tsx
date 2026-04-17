'use client';

import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useState } from 'react';
import type { SiteLocale } from '@/graphql/types/graphql';

type PropTypes = {
  lng: SiteLocale;
  setSerachIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HoveringSearch = ({ lng, setSerachIsOpen }: PropTypes) => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-300">
      <input
        type="text"
        autoFocus
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="ENTER SEARCH QUERY"
        className="h-10 w-64 md:w-80 border-b-2 border-black bg-white px-0 text-[11px] uppercase tracking-[0.2em] font-bold text-black placeholder:text-gray-300 focus:outline-none transition-all duration-500 focus:w-72 md:focus:w-96"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.push(`/${lng}/products?productName=${searchValue}`);
            setSearchValue('');
            setSerachIsOpen(false);
          }
        }}
      />
      
      {/* Suptilni indikator sa desne strane */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
        <span className="text-[9px] text-gray-300 font-bold tracking-widest">[ENTER]</span>
        <div className="w-1.5 h-1.5 bg-black animate-pulse" />
      </div>

      {/* Dugme za brzo zatvaranje ako zatreba */}
      <button 
        onClick={() => setSerachIsOpen(false)}
        className="absolute -top-6 right-0 text-[9px] font-bold tracking-[0.2em] text-gray-400 hover:text-black uppercase transition-colors"
      >
        Close [Esc]
      </button>
    </div>
  );
};

export default HoveringSearch;