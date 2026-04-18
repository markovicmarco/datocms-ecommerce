"use client";

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { type Dispatch, Fragment, type SetStateAction } from 'react';

// Demo proizvodi - ostaju isti radi logike
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel.',
  },
];

type PropTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Cart({ open, setOpen }: PropTypes) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
        
        {/* BACKDROP - Tamniji i čistiji */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] border-l border-gray-100">
                    
                    {/* HEADER */}
                    <div className="flex-1 overflow-y-auto px-6 py-10">
                      <div className="flex items-start justify-between border-b border-gray-100 pb-6">
                        <Dialog.Title className="text-[12px] font-bold uppercase tracking-[0.3em] text-black">
                          Your Cart
                        </Dialog.Title>
                        <button
                          type="button"
                          className="btn-brutalist flex items-center justify-center transition-opacity"
                          onClick={() => setOpen(false)}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* DEMO INFO BOX - Brutalist stil */}
                      <div className="mt-8 bg-gray-50 border border-gray-100 p-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-black mb-2">
                          DatoCMS Integration Notice
                        </h3>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 leading-relaxed italic">
                          To enable live purchases, sync with Shopify or CommerceLayer is required.
                        </p>
                      </div>

                      <div className="mt-12">
                        <div className="flow-root">
                          <ul className="-my-8 divide-y divide-gray-100">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-8">
                                <div className="h-24 w-20 flex-shrink-0 overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                                  <Image
                                    src={product.imageSrc}
                                    width={100}
                                    height={100}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover"
                                  />
                                </div>

                                <div className="ml-6 flex flex-1 flex-col">
                                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-black">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-[9px] uppercase tracking-widest text-gray-400">
                                    {product.color}
                                  </p>
                                  <div className="flex flex-1 items-end justify-between text-[10px] uppercase tracking-widest">
                                    <p className="text-gray-400 font-medium">Qty {product.quantity}</p>
                                    <button
                                      type="button"
                                      className="btn-brutalist flex items-center justify-center"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-gray-100 px-6 py-10 bg-gray-50">
                      <div className="flex justify-between text-[12px] font-bold uppercase tracking-[0.2em] text-black">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-2 text-[9px] uppercase tracking-widest text-gray-400">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-10 flex flex-col gap-4">
                        <button className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] py-5 hover:bg-gray-800 transition-all active:scale-[0.98]">
                          Proceed to Checkout
                        </button>
                        <button
                          onClick={() => setOpen(false)}
                          className="btn-brutalist flex items-center justify-center transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}