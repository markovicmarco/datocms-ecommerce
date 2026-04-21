"use client";

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { Maybe } from 'graphql/jsutils/Maybe';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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
    { id: 'collections', name: CollectionRecord, options: allCollections, active: paramaterCollectionsFiltered },
    { id: 'materials', name: MaterialRecord, options: allMaterials, active: parameterMaterialsFiltered },
    { id: 'brands', name: BrandRecord, options: allBrands, active: parameterBrandsFiltered },
  ];

  function exportQueryParameters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-between w-full h-16 px-6 md:px-16 bg-black border-b border-none/5 sticky top-20 z-40 backdrop-blur-md">
      
      {/* LEVA STRANA: Filteri */}
      <div className="flex items-center gap-10">
        {filters.map((section) => (
          <Popover key={section.id} className="relative">
            {({ open }) => (
              <>
                <Popover.Button className={`flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.4em] outline-none transition-colors ${section.active.length > 0 ? 'text-current' : 'text-current/40 hover:text-current'}`}>
                  <span className='text-white'>{section.name}</span>
                  {section.active.length > 0 && (
                    <span className="text-current">[{section.active.length}]</span>
                  )}
                  <span className="text-[15px] text-white opacity-40">{open ? '-' : '+'}</span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 mt-4 w-64 bg-white border border-none/5 shadow-2xl p-8 z-50">
                    <div className="space-y-5">
                      {section.options?.map((option, idx) => {
                        const isChecked = section.active.includes(option.id);
                        return (
                          <div key={option.id} className="group flex items-center cursor-pointer" 
                               onClick={() => {
                                 let currentList = [...section.active];
                                 if (isChecked) currentList = currentList.filter(id => id !== option.id);
                                 else currentList.push(option.id);
                                 exportQueryParameters(section.id, currentList.join('|'));
                               }}>
                            <div className="relative flex items-center h-4">
                              <div className={`h-3 w-3 border border-none/20 backdrop-blur-md transition-all ${isChecked ? 'bg-transparent border-none' : 'group-hover:border-black'}`} />
                              {isChecked && <div className="absolute inset-0 m-auto w-1 h-1 bg-current" />}
                            </div>
                            <span className={`ml-4 text-[9px] uppercase tracking-widest transition-colors ${isChecked ? 'text-current' : 'text-current/40 hover:text-current'}`}>
                              {option.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </div>

      {/* DESNA STRANA: Sorting */}
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.4em] text-current/40 hover:text-current outline-none">
              <span className='text-white'>// Sort_By</span>
              <span className="text-[15px] text-white opacity-40">{open ? '-' : '+'}</span>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 mt-4 w-64 bg-white border border-none/5 shadow-2xl p-8 z-50">
                <ul className="space-y-5">
                  {sortOptions.map((option) => {
                    const isSelected = searchParams.get('orderBy') === option.value || 
                      (!searchParams.get('orderBy') && option.value === '_publishedAt_DESC');
                    
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          onClick={() => exportQueryParameters('orderBy', option.value)}
                          className={`text-[9px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 w-full text-left ${
                            isSelected ? 'text-current' : 'text-current/40 hover:text-current hover:translate-x-1'
                          }`}
                        >
                          {isSelected && <div className="h-1 w-1 bg-primary" />}
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SideFilter;