"use client";

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
    <form className="lg:sticky lg:top-24 space-y-12 px-4 lg:px-0 bg-white">
      
      {/* SORTING SECTION - Zatvoreno po defaultu */}
      <Disclosure>
        {({ open }) => (
          <div className="border-b border-gray-100 pb-6">
            <Disclosure.Button className="flex w-full items-center justify-between group">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors">
                01 // Sort_By
              </span>
              <span className="text-[12px] font-mono text-black">
                {open ? '[ – ]' : '[ + ]'}
              </span>
            </Disclosure.Button>
            
            <Disclosure.Panel className="pt-8 animate-in fade-in duration-500">
              <ul className="space-y-4">
                {sortOptions.map((option) => {
                  const isSelected = searchParams.get('orderBy') === option.value || 
                    (!searchParams.get('orderBy') && option.value === '_publishedAt_DESC');
                  
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => exportQueryParameters('orderBy', option.value)}
                        className={`text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                          isSelected 
                          ? 'font-bold text-black' 
                          : 'text-gray-400 hover:text-black hover:translate-x-1'
                        }`}
                      >
                        {isSelected && <span className="h-px w-4 bg-black animate-in slide-in-from-left-2 duration-300"></span>}
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* FILTERS - Industrial Accordion (Zatvoreni po defaultu) */}
      <div className="space-y-2">
        {filters.map((section, index) => (
          <Disclosure key={section.id} defaultOpen={false}>
            {({ open }) => (
              <div className="border-b border-gray-100 pb-6 mb-6">
                <Disclosure.Button className="flex w-full items-center justify-between group">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-hover:text-black transition-colors">
                    0{index + 2} // {section.name}
                  </span>
                  <span className="text-[12px] font-mono text-black">
                    {open ? '[ – ]' : '[ + ]'}
                  </span>
                </Disclosure.Button>
                
                <Disclosure.Panel className="pt-8 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="space-y-5">
                    {section.options?.map((option, idx) => {
                      const isChecked = 
                        paramaterCollectionsFiltered.includes(option.id) ||
                        parameterBrandsFiltered.includes(option.id) ||
                        parameterMaterialsFiltered.includes(option.id);

                      return (
                        <div key={option.id} className="group flex items-center cursor-pointer">
                          <div className="relative flex items-center h-4">
                            <input
                              id={`f-${section.id}-${idx}`}
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
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
                              className="peer h-3.5 w-3.5 appearance-none border border-black/20 rounded-none checked:bg-black checked:border-black transition-all cursor-pointer"
                            />
                            <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                          </div>
                          <label
                            htmlFor={`f-${section.id}-${idx}`}
                            className={`ml-4 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${
                              isChecked ? 'text-black' : 'text-gray-400 hover:text-black'
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