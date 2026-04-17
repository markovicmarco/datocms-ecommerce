'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

type PropTypes = {
  numberOfProducts: number;
  currentPage: number;
};

const Pagination = ({ numberOfProducts, currentPage }: PropTypes) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pageItems = [];

  function exportQueryParameters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  // Logika za generisanje brojeva strana
  for (let i = 1; i < numberOfProducts; i += 12) {
    const pageNumber = (i - 1) / 12 + 1;
    const isSelected = pageNumber === currentPage;
    pageItems.push(
      <button
        key={pageNumber}
        type="button"
        className={`relative inline-flex h-12 w-12 items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-r border-black/5 last:border-r-0 ${
          isSelected 
            ? 'bg-black text-white' 
            : 'bg-white text-black hover:bg-[#87CEEB] hover:text-black'
        }`}
        onClick={() => exportQueryParameters('page', pageNumber.toString())}
      >
        {String(pageNumber).padStart(2, '0')}
      </button>,
    );
  }

  const firstProductIndex = 1 + (currentPage - 1) * 12;
  const lastProductIndex = Math.min(currentPage * 12, numberOfProducts);

  return (
    <div className="w-full border-t border-black/5 bg-white py-12">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 flex flex-col items-center gap-8">
        
        {/* STATS AREA */}
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
          Index <span className="text-black">{firstProductIndex} — {lastProductIndex}</span> 
          <span className="mx-4 text-gray-200">/</span> 
          Total <span className="text-black">{numberOfProducts}</span>
        </div>

        {/* NAVIGATION AREA */}
        <nav className="inline-flex border-2 border-black overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* PREVIOUS */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => exportQueryParameters('page', (currentPage - 1).toString())}
            className={`flex items-center justify-center w-12 h-12 border-r-2 border-black transition-colors ${
              currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#87CEEB]'
            }`}
          >
            <ChevronLeftIcon className="h-4 w-4 stroke-[3px]" />
          </button>

          {/* PAGE NUMBERS */}
          <div className="hidden sm:flex">
            {pageItems}
          </div>

          {/* MOBILE CURRENT PAGE INDICATOR */}
          <div className="flex sm:hidden h-12 px-6 items-center justify-center text-[11px] font-bold tracking-widest bg-black text-white">
            PAGE {currentPage}
          </div>

          {/* NEXT */}
          <button
            type="button"
            disabled={lastProductIndex === numberOfProducts}
            onClick={() => exportQueryParameters('page', (currentPage + 1).toString())}
            className={`flex items-center justify-center w-12 h-12 border-l-2 border-black transition-colors ${
              lastProductIndex === numberOfProducts ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#87CEEB]'
            }`}
          >
            <ChevronRightIcon className="h-4 w-4 stroke-[3px]" />
          </button>
        </nav>

      </div>
    </div>
  );
};

export default Pagination;