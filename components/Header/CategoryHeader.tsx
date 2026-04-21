"use client";

import { Dialog, Popover, Transition, Disclosure } from '@headlessui/react';
import {
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useState } from 'react';
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
          className="flex flex-col items-center justify-center py-2 px-1 bg-transparent border-y border-r border-white/10 backdrop-blur-md transition-all active:bg-primary group"
        >
          <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] font-mono uppercase tracking-[0.4em] text-black group-active:text-black animate-pulse">
            MENU
          </span>
        </button>
      </div>

      <div className="bg-black w-full border-b border-white/10 sticky top-0 z-50">
        
        {/* MOBILE MENU PANEL */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                <Dialog.Panel className="relative flex h-full w-full max-w-xs flex-col bg-black border-none shadow-2xl">
                  
                  {/* CLOSE BUTTON - Fixed at top */}
                  <div className="flex px-6 pb-2 pt-6 justify-end shrink-0">
                    <button type="button" onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {/* SCROLLABLE CONTENT */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="px-8 py-10">
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="SEARCH"
                        className="w-full bg-transparent border-b border-white/20 p-4 text-[10px] font-mono uppercase tracking-widest text-white outline-none focus:border-white transition-all placeholder:text-white/20"
                        onKeyDown={(e) => e.key === 'Enter' && (router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`), setOpen(false))}
                      />
                    </div>

                    <nav className="px-8 pb-12 space-y-4">
                      {categories?.map((category, index) => (
                        <Disclosure key={category.label}>
                          {({ open }) => (
                            <div className="border-b border-white/5 pb-4">
                              <Disclosure.Button className="flex w-full items-center justify-between group py-3">
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50 group-hover:text-white transition-colors">
                                  0{index + 1} // {category.label}
                                </span>
                                <span className="text-[10px] font-mono text-white">
                                  {open ? '[ – ]' : '[ + ]'}
                                </span>
                              </Disclosure.Button>

                              <Transition
                                enter="transition duration-300 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-150 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="pt-6 pb-2 pl-4 border-l border-white/10 ml-1">
                                  <ul className="space-y-6">
                                    {category.column.flatMap(col => col.item).map((item, idx) => (
                                      <li key={`${item?.id}-${idx}`}>
                                        <Link 
                                          href={`/${globalPageProps.params.lng}/products?${item?._modelApiKey}s=${item?.id}`} 
                                          className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white block" 
                                          onClick={() => setOpen(false)}
                                        >
                                          {item?.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Disclosure.Panel>
                              </Transition>
                            </div>
                          )}
                        </Disclosure>
                      ))}

                      {/* STATIC LINKS */}
                      <div className="pt-8 space-y-6">
                        {links?.map((link) => (
                          <Link 
                            key={link.label} 
                            href={`/${globalPageProps.params.lng}/${link.slug}`} 
                            className="block text-[10px] font-mono uppercase tracking-[0.4em] text-white/50 hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>

                  {/* FOOTER - Fixed at bottom */}
                  <div className="shrink-0 px-8 py-10 border-t border-white/5 bg-black">
                    <Suspense><LanguageSelector languages={languages} /></Suspense>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* MAIN DESKTOP HEADER */}
        <header className="relative z-30">
          <nav className="w-full max-w-[1920px] mx-auto px-6 md:px-16">
            <div className="flex h-20 items-center justify-between gap-8">
              
              <div className="flex items-center gap-16">
                <Link href={`/${globalPageProps.params.lng}/home`} className="flex w-10 md:w-12 transition-none hover:opacity-70 brightness-0 invert">
                  <DatoImage data={data.layout?.logo.responsiveImage as ResponsiveImageType} className="object-contain" />
                </Link>

                <Popover.Group className="hidden lg:flex lg:space-x-12 h-full items-center">
                  {categories?.map((category) => (
                    <Popover key={category.label} className="flex h-full">
                      {({ open, close }) => (
                        <>
                          <Popover.Button className={classNames(open ? 'text-white' : 'text-white/50', 'text-[10px] font-mono uppercase tracking-[0.4em] hover:text-white focus:outline-none transition-all')}>
                            {category.label}
                          </Popover.Button>

                          <Transition as={Fragment} enter="transition ease-out duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Popover.Panel className="absolute inset-x-0 top-full bg-black border-b border-white/10 shadow-2xl">
                              <div className="mx-auto max-w-[1920px] px-16 py-20">
                                <div className="grid grid-cols-4 gap-16">
                                  {category.column.map((section) => (
                                    <div key={section.label} className="space-y-8">
                                      <p className="font-mono text-white uppercase tracking-[0.4em] text-[9px] border-b border-white/10 pb-3">
                                        {section.label}
                                      </p>
                                      <ul className="space-y-4">
                                        {section.item.map((item) => (
                                          <li key={item.id}>
                                            <Link 
                                              href={`/${globalPageProps.params.lng}/products?${item._modelApiKey}s=${item.id}`} 
                                              className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-none block" 
                                              onClick={() => close()}
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                  {links?.map((link) => (
                    <Link key={link.label} href={`/${globalPageProps.params.lng}/${link.slug}`} className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all">
                      {link.label}
                    </Link>
                  ))}
                </Popover.Group>
              </div>

              <div className="flex items-center gap-10">
                <div className="hidden lg:flex items-center">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder=" SEARCH"
                    className="h-9 w-44 bg-transparent border-b border-white/10 px-0 text-[10px] font-mono uppercase tracking-[0.3em] text-white focus:border-primary focus:ring-0 transition-all placeholder:text-white/70"
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`)}
                  />
                </div>
                
                <div className="hidden lg:block">
                  <Suspense><LanguageSelector languages={languages} /></Suspense>
                </div>

                <button onClick={() => setCartIsOpen(true)} className="group relative p-2">
                  <ShoppingBagIcon className="h-5 w-5 text-white group-hover:text-primary transition-colors" />
                </button>
              </div>

            </div>
          </nav>
        </header>
      </div>
    </>
  );
}