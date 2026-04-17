'use client';

import { Disclosure } from '@headlessui/react';
import type { Maybe } from 'graphql/jsutils/Maybe';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import {
  InitialParamsFragmentDoc,
  ProductsGeneralInterfaceFragmentDoc,
} from '@/graphql/types/graphql';

type PropTypes = {
  initialParams: Maybe<FragmentType<typeof InitialParamsFragmentDoc>>;
  generalInterface: Maybe<
    FragmentType<typeof ProductsGeneralInterfaceFragmentDoc>
  >;
  paramaterCollections: string[];
  parameterBrands: string[];
  parameterMaterials: string[];
};

const SideFilter = ({
  initialParams,
  paramaterCollections,
  parameterBrands,
  parameterMaterials,
  generalInterface,
}: PropTypes) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  
  const paramaterCollectionsFiltered = paramaterCollections.filter(p => p !== '');
  const parameterBrandsFiltered = parameterBrands.filter(p => p !== '');
  const parameterMaterialsFiltered = parameterMaterials.filter(p => p !== '');

  const {
    BrandRecord, MaterialRecord, CollectionRecord,
    newArrivals, mostPopular, topRated, price, sales,
  } = getFragmentData(ProductsGeneralInterfaceFragmentDoc, generalInterface) ?? {};

  const { allCollections, allBrands, allMaterials } =
    getFragmentData(InitialParamsFragmentDoc, initialParams) ?? {};

  const sortOptions = [
    { label: newArrivals, value: '_publishedAt_DESC' },
    { label: mostPopular, value: 'numberOfReviews_DESC' },
    { label: topRated, value: 'reviewAverage_DESC' },
    { label: price, value: 'price_DESC' },
    { label: sales, value: 'sale_DESC' },
  ];

  const filters = [
    { id: 'collections', name: CollectionRecord, options: allCollections },
    { id: 'materials', name: MaterialRecord, options: allMaterials },
    { id: 'brands', name: BrandRecord, options: allBrands },
  ];

  function exportQueryParameters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <form className="lg:sticky lg:top-24 space-y-12 px-4 lg:px-0">
      
      {/* SORTING SECTION - Technical List */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#87CEEB]">
          Sort_By
        </h3>
        <ul className="space-y-3">
          {sortOptions.map((option) => {
            const isSelected = searchParams.get('orderBy') === option.value || 
              (!searchParams.get('orderBy') && option.value === '_publishedAt_DESC');
            
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => exportQueryParameters('orderBy', option.value)}
                  className={`text-[11px] uppercase tracking-widest transition-all ${
                    isSelected 
                    ? 'font-bold text-black translate-x-2' 
                    : 'text-gray-400 hover:text-black hover:translate-x-1'
                  }`}
                >
                  {isSelected && <span className="mr-2 text-[#87CEEB]">→</span>}
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* FILTERS - Industrial Accordion */}
      <div className="border-t-2 border-black pt-8 space-y-2">
        {filters.map((section) => (
          <Disclosure key={section.id} defaultOpen={true}>
            {({ open }) => (
              <div className="border-b border-gray-100 last:border-none pb-4 mb-4">
                <Disclosure.Button className="flex w-full items-center justify-between py-2 group">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black group-hover:text-[#87CEEB]">
                    {section.name}
                  </span>
                  <span className="text-xs font-mono text-gray-300">
                    {open ? '[ – ]' : '[ + ]'}
                  </span>
                </Disclosure.Button>
                
                <Disclosure.Panel className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-3">
                    {section.options?.map((option, idx) => {
                      const isChecked = 
                        paramaterCollectionsFiltered.includes(option.id) ||
                        parameterBrandsFiltered.includes(option.id) ||
                        parameterMaterialsFiltered.includes(option.id);

                      return (
                        <div key={option.id} className="group flex items-center cursor-pointer">
                          <div className="relative flex items-center h-5">
                            <input
                              id={`f-${section.id}-${idx}`}
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                // Logika ostaje ista, samo je UI čistiji
                                let currentList = section.id === 'collections' ? [...paramaterCollectionsFiltered] :
                                                 section.id === 'brands' ? [...parameterBrandsFiltered] : 
                                                 [...parameterMaterialsFiltered];
                                
                                if (isChecked) {
                                  currentList = currentList.filter(id => id !== option.id);
                                } else {
                                  currentList.push(option.id);
                                }
                                exportQueryParameters(section.id, currentList.join('|'));
                              }}
                              className="peer h-4 w-4 appearance-none border-2 border-black rounded-none checked:bg-black transition-all cursor-pointer"
                            />
                            {/* Custom Brutalist Checkmark */}
                            <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block left-0.5" 
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                              <path d="M20 6L9 17L4 12" />
                            </svg>
                          </div>
                          <label
                            htmlFor={`f-${section.id}-${idx}`}
                            className={`ml-3 text-[10px] font-mono uppercase tracking-tight cursor-pointer transition-colors ${
                              isChecked ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
                            }`}
                          >
                            {option.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

    </form>
  );
};

export default SideFilter;
