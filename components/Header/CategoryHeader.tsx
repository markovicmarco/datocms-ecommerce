"use client";

import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
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

  const links = data.layout?.menu.filter(
    (item) => item._modelApiKey === 'link_item',
  ) as LinkItemRecord[];

  const categories = data.layout?.menu.filter(
    (item) => item._modelApiKey === 'dropdown_menu',
  ) as DropdownMenuRecord[];

  return (
    <>
      <Cart setOpen={setCartIsOpen} open={cartIsOpen} />

      {/* FLOATING MOBILE TRIGGER */}
      <div className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[60]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-brutalist flex items-center justify-center transition-transform active:scale-90"
        >
          <Bars3Icon className="h-5 w-5" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] font-bold uppercase tracking-[0.4em] py-1">
            Menu
          </span>
        </button>
      </div>

      <div className="bg-white w-full border-b border-gray-100 sticky top-0 z-50">
        {/* MOBILE MENU PANEL */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-2xl text-black">
                  <div className="flex px-4 pb-2 pt-5 justify-end border-b border-gray-50">
                    <button type="button" onClick={() => setOpen(false)} className="p-2">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="px-6 py-8">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="SEARCH"
                      className="w-full bg-gray-50 border-none px-4 py-4 text-[9px] uppercase tracking-widest focus:ring-1 focus:ring-black"
                      onKeyDown={(e) => e.key === 'Enter' && (router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`), setOpen(false))}
                    />
                  </div>
                  <nav className="px-6 space-y-10">
                    {categories?.map((category) => (
                      <div key={category.label}>
                        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] mb-4 border-l-2 border-black pl-3">{category.label}</h3>
                        <ul className="space-y-4 pl-4 border-l border-gray-100">
                          {category.column.flatMap(col => col.item).map((item, idx) => (
                            <li key={`${item?.id}-${idx}`}>
                              <Link href={`/${globalPageProps.params.lng}/products?${item?._modelApiKey}s=${item?.id}`} className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-black" onClick={() => setOpen(false)}>
                                {item?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="pt-4 space-y-6">
                      {links?.map((link) => (
                        <Link key={link.label} href={`/${globalPageProps.params.lng}/${link.slug}`} className="block text-[9px] font-bold uppercase tracking-[0.3em]" onClick={() => setOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                  <div className="mt-auto px-6 py-10 border-t border-gray-50 bg-gray-50/50">
                    <Suspense><LanguageSelector languages={languages} currencySymbol={data.generalInterface?.currencySymbol} /></Suspense>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* MAIN HEADER */}
        <header className="relative z-30">
          <nav className="w-full max-w-[1920px] mx-auto px-4 md:px-12">
            <div className="flex h-20 items-center justify-between gap-8">
              <div className="flex items-center gap-12">
                <Link href={`/${globalPageProps.params.lng}/home`} className="flex w-10 md:w-12 transition-transform hover:scale-105">
                  <DatoImage data={data.layout?.logo.responsiveImage as ResponsiveImageType} className="object-contain" />
                </Link>

                {/* DESKTOP POPPER GROUP - VRACEN SADRŽAJ KOJI JE FALIO */}
                <Popover.Group className="hidden lg:flex lg:space-x-10 h-full items-center">
                  {categories?.map((category) => (
                    <Popover key={category.label} className="flex h-full">
                      {({ open, close }) => (
                        <>
                          <Popover.Button className={classNames(open ? 'text-black' : 'text-gray-500', 'text-[9px] font-bold uppercase tracking-[0.2em] hover:text-black focus:outline-none h-full')}>
                            {category.label}
                          </Popover.Button>

                          <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute inset-x-0 top-full bg-white border-t border-gray-100 shadow-2xl">
                              <div className="mx-auto max-w-[1920px] px-12 py-12">
                                <div className="grid grid-cols-12 gap-x-12">
                                  <div className="col-span-8 grid grid-cols-3 gap-8">
                                    {category.column.map((section) => (
                                      <div key={section.label}>
                                        <p className="font-bold text-black uppercase tracking-widest text-[9px] mb-6">{section.label}</p>
                                        <ul className="space-y-4">
                                          {section.item.map((item) => (
                                            <li key={item.id}>
                                              <Link href={`/${globalPageProps.params.lng}/products?${item._modelApiKey}s=${item.id}`} className="hover:line-through text-gray-600 text-[11px] uppercase tracking-wider" onClick={() => close()}>
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
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
                    <Link key={link.label} href={`/${globalPageProps.params.lng}/${link.slug}`} className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black">
                      {link.label}
                    </Link>
                  ))}
                </Popover.Group>
              </div>

              {/* DESNA STRANA */}
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="SEARCH"
                    className="h-8 w-48 bg-gray-50 border-none px-4 text-[9px] uppercase tracking-widest focus:ring-1 focus:ring-black"
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`)}
                  />
                </div>
                <div className="hidden lg:block">
                  <Suspense><LanguageSelector languages={languages} currencySymbol={data.generalInterface?.currencySymbol} /></Suspense>
                </div>
                <button onClick={() => setCartIsOpen(true)} className="group flex items-center p-2 relative">
                  <ShoppingBagIcon className="h-5 w-5 text-black group-hover:opacity-50 transition-opacity" />
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}