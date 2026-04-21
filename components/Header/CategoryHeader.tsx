"use client";

import { Dialog, Popover, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
      <div className="lg:hidden fixed left-5 bottom-5 -translate-y-1/2 z-[60]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1 bg-transparent border-none transition-all active:bg-primary group"
        >
          <span className="[writing-mode:vertical-lr] rotate-180 text-[18px] font-mono uppercase tracking-[0.4em] text-current group-active:text-current animate-pulse">
            ...
          </span>
        </button>
      </div>

      <div className="bg-black text-white w-full border-b border-white/10 sticky top-0 z-50 backdrop-blur-md transition-all">
        
        {/* MOBILE MENU PANEL */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex justify-center items-start"> {/* Centriranje panela ako je max-w premašen */}
              <Transition.Child as={Fragment} enter="transition ease-in-out duration-400 transform" enterFrom="translate-y-[-10%] opacity-0" enterTo="translate-y-0 opacity-100" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-y-0 opacity-100" leaveTo="translate-y-[-10%] opacity-0">
                <Dialog.Panel className="relative flex h-full w-full flex-col bg-black text-white shadow-2xl overflow-hidden">
                  
                  {/* TOP BAR: Centrirani Language + Side Close */}
                  <div className="flex px-8 py-8 items-center border-b border-white/5">
                    <div className="flex-1 flex justify-center pl-6"> {/* Pl-6 balansira Close dugme da selektor bude u pravom centru */}
                      <Suspense>
                        <div className="scale-110"> {/* Malo povećan radi vidljivosti */}
                          <LanguageSelector languages={languages} />
                        </div>
                      </Suspense>
                    </div>
                    <button type="button" onClick={() => setOpen(false)} className="text-white hover:opacity-50 transition-opacity shrink-0">
                      <XMarkIcon className="h-7 w-7" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="px-8 py-12">
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="SEARCH"
                        className="w-full bg-transparent border-b border-white/20 p-4 text-[11px] font-mono uppercase tracking-[0.5em] text-center text-white outline-none focus:border-white transition-all placeholder:text-white/10"
                        onKeyDown={(e) => e.key === 'Enter' && (router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`), setOpen(false))}
                      />
                    </div>

                    <nav className="px-8 pb-20 space-y-6">
                      {categories?.map((category, index) => (
                        <Disclosure key={category.label}>
                          {({ open }) => (
                            <div className="border-b border-white/5 pb-6">
                              <Disclosure.Button className="flex w-full items-center justify-between group py-2">
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                                  0{index + 1} // {category.label}
                                </span>
                                <span className="text-[9px] font-mono text-white/30">
                                  {open ? '[ CLOSE ]' : '[ VIEW ]'}
                                </span>
                              </Disclosure.Button>

                              <Transition
                                enter="transition duration-300 ease-out"
                                enterFrom="opacity-0 -translate-y-2"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition duration-200 ease-in"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Disclosure.Panel className="pt-8 pb-4">
                                  <ul className="space-y-6 text-center"> {/* Centrirane podkategorije */}
                                    {category.column.flatMap(col => col.item).map((item, idx) => (
                                      <li key={`${item?.id}-${idx}`}>
                                        <Link 
                                          href={`/${globalPageProps.params.lng}/products?${item?._modelApiKey}s=${item?.id}`} 
                                          className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white block transition-all" 
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

                      <div className="border-b border-white/5 pb-6"> {/* Centrirani fiksni linkovi */}
                        {links?.map((link) => (
                          <Link 
                            key={link.label} 
                            href={`/${globalPageProps.params.lng}/${link.slug}`} 
                            className="flex w-full items-center justify-between group py-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                            {link.label}
                            </span>
                            <span className="text-[9px] font-mono text-white/30">
                              [ VIEW ]
                            </span>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* REST OF THE HEADER (DESKTOP) IS THE SAME... */}
        <header className="relative z-30">
          <nav className="w-full max-w-[1920px] mx-auto px-6 md:px-16 text-current">
            <div className="flex h-20 items-center justify-between gap-8">
              <div className="flex items-center gap-16">
                <Link href={`/${globalPageProps.params.lng}/home`} className="flex w-10 md:w-12 hover:opacity-70 brightness-0 invert transition-none">
                  <DatoImage data={data.layout?.logo.responsiveImage as ResponsiveImageType} className="object-contain" />
                </Link>

                <Popover.Group className="hidden lg:flex lg:space-x-12 h-full items-center">
                  {categories?.map((category) => (
                    <Popover key={category.label} className="flex h-full">
                      {({ open, close }) => (
                        <>
                          <Popover.Button className={classNames(open ? 'text-current' : 'text-white/50', 'text-[10px] font-mono uppercase tracking-[0.4em] hover:text-white focus:outline-none transition-all')}>
                            {category.label}
                          </Popover.Button>

                          <Transition as={Fragment} enter="transition ease-out duration-150" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Popover.Panel className="absolute inset-x-0 top-full bg-black border-b border-white/10 shadow-2xl text-white">
                              <div className="mx-auto max-w-[1920px] px-16 py-20">
                                <div className="grid grid-cols-4 gap-16">
                                  {category.column.map((section) => (
                                    <div key={section.label} className="space-y-8">
                                      <p className="font-mono text-current uppercase tracking-[0.4em] text-[9px] border-b border-white/10 pb-3">
                                        {section.label}
                                      </p>
                                      <ul className="space-y-4">
                                        {section.item.map((item) => (
                                          <li key={item.id}>
                                            <Link 
                                              href={`/${globalPageProps.params.lng}/products?${item._modelApiKey}s=${item.id}`} 
                                              className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-current transition-none block" 
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
                    <Link key={link.label} href={`/${globalPageProps.params.lng}/${link.slug}`} className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/50 hover:text-current transition-all">
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
                    className="h-9 w-44 bg-transparent border-b border-white/10 px-0 text-[10px] font-mono uppercase tracking-[0.3em] text-current focus:border-primary focus:ring-0 transition-all placeholder:text-white/70"
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/${globalPageProps.params.lng}/products?productName=${searchValue}`)}
                  />
                </div>
                
                <div className="hidden lg:block">
                  <Suspense><LanguageSelector languages={languages} /></Suspense>
                </div>

                <button onClick={() => setCartIsOpen(true)} className="group relative p-2 text-[10px] font-mono uppercase tracking-[0.3em] text-current hover:opacity-70 transition-opacity">
                  BAG
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}