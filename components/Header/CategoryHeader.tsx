"use client";

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useRef, useState } from 'react';
import { Image as DatoImage, type ResponsiveImageType } from 'react-datocms';
import type {
  DropdownMenuRecord,
  LayoutQuery,
  LinkItemRecord,
  SiteLocale,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';
import Cart from './Cart';
import LanguageSelector from './LanguageSelector';

type PropTypes = {
  languages: SiteLocale[];
  data: LayoutQuery;
  globalPageProps: ResolvedGlobalPageProps;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CategoryHeader({
  globalPageProps,
  languages,
  data,
}: PropTypes) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get('productName') ?? '');
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const router = useRouter();
  const searchBar = useRef<HTMLInputElement>(null);

  const links = data.layout?.menu.filter(
    (item) => item._modelApiKey === 'link_item',
  ) as LinkItemRecord[];

  const categories = data.layout?.menu.filter(
    (item) => item._modelApiKey === 'dropdown_menu',
  ) as DropdownMenuRecord[];

  return (
    <>
      <Cart setOpen={setCartIsOpen} open={cartIsOpen} />
      
      <div className="bg-white w-full border-b border-gray-100">
        {/* Mobile menu - Zadržana logika */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
            {/* ... (Mobile menu content ostaje isti kao u tvom kodu) ... */}
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    {/* Ovde ide tvoj postojeći Tab.Group za mobile */}
                    <div className="flex px-4 pb-2 pt-5">
                        <button type="button" onClick={() => setOpen(false)} className="-m-2 p-2 text-gray-400">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {/* ... (Ostatak mobilnog menija) ... */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* DESKTOP NAV - PROMENJENO NA FULL WIDTH */}
        <header className="relative z-30">
          <nav aria-label="Top" className="w-full max-w-[1920px] mx-auto px-4 md:px-12">
            <div className="flex h-20 items-center justify-between gap-8">
              
              {/* Leva strana: Mobile Toggle + Logo */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="relative rounded-md p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Logo - Povećan malo radi balansa */}
                <Link href={`/${globalPageProps.params.lng}/home`} className="ml-4 lg:ml-0 flex w-10 md:w-12 transition-transform hover:scale-105">
                  <DatoImage
                    data={data.layout?.logo.responsiveImage as ResponsiveImageType}
                    className="object-contain"
                  />
                </Link>

                {/* Flyout menus - Brutalist stil */}
                <Popover.Group className="hidden lg:ml-12 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-10">
                    {categories?.map((category) => (
                      <Popover key={category.label} className="flex">
                        {({ open, close }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open ? 'text-black' : 'text-gray-500 hover:text-black',
                                  'relative z-10 flex cursor-pointer items-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none',
                                )}
                              >
                                {category.label}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 bg-white border-t border-gray-100 shadow-2xl">
                                <div className="mx-auto max-w-[1920px] px-12 py-12">
                                  <div className="grid grid-cols-12 gap-x-12">
                                    {/* Linkovi/Kolone */}
                                    <div className="col-span-8 grid grid-cols-3 gap-8">
                                      {category.column.map((section) => (
                                        <div key={section.label}>
                                          <p className="font-bold text-black uppercase tracking-widest text-[10px] mb-6">
                                            {section.label}
                                          </p>
                                          <ul className="space-y-4">
                                            {section.item.map((item) => (
                                              <li key={item.name}>
                                                <Link
                                                  href={`/${globalPageProps.params.lng}/products?${item._modelApiKey}s=${item.id}`}
                                                  className="hover:line-through text-gray-600 text-[11px] uppercase tracking-wider"
                                                  onClick={close}
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                    {/* Featured/Arrivals */}
                                    <div className="col-span-4 border-l border-gray-50 pl-12 grid grid-cols-2 gap-8">
                                        {/* Ovde idu tvoji New Arrival i Trending blokovi sa slikama */}
                                        {/* ... (Zadrži DatoImage logiku koju si imao) ... */}
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}

                    {links?.map((link) => (
                      <Link
                        key={link.label}
                        href={`/${globalPageProps.params.lng}/${link.slug}`}
                        className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>
              </div>

              {/* Desna strana: Search, Language, Cart */}
              <div className="flex items-center gap-4 md:gap-8">
                
                {/* Search - Moderni brutalist input */}
                <div className="hidden md:flex items-center relative group">
                  <input
                    type="text"
                    ref={searchBar}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={data.generalInterface?.searchPlaceholder || 'SEARCH'}
                    className="h-8 w-40 lg:w-64 bg-gray-50 border-none px-4 text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-black transition-all"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`);
                      }
                    }}
                  />
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute right-3" />
                </div>

                <div className="flex items-center gap-6">
                  <Suspense>
                    <LanguageSelector
                      languages={languages}
                      currencySymbol={data.generalInterface?.currencySymbol}
                    />
                  </Suspense>

                  {/* Cart */}
                  <button
                    onClick={() => setCartIsOpen(true)}
                    className="group flex items-center p-2 relative"
                  >
                    <ShoppingBagIcon className="h-5 w-5 text-black group-hover:opacity-50 transition-opacity" />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      0
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </nav>
        </header>
      </div>
    </>
  );
}