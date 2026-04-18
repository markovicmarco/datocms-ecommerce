'use client';

import Link from 'next/link';
import { Image as DatoImage, type ResponsiveImageType } from 'react-datocms';
import type { LayoutQuery } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';
import SvgRenderer from '../Common/SvgRenderer';

type Props = {
  data: LayoutQuery;
  globalPageProps: ResolvedGlobalPageProps;
};

const Footer = ({ data, globalPageProps }: Props) => {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      {/* NEWSLETTER SECTION - Brutalist style */}
      {data.generalInterface?.displayNewsletterFooter && (
        <div className="w-full border-b border-gray-100">
          <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-7">
                {/* Tag Newsletter sada koristi primary boju (krem) */}
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  {data.generalInterface?.newsletter}
                </span>
                <h2 className="mt-4 text-4xl md:text-6xl font-serif uppercase leading-tight text-black">
                  {data.generalInterface?.subscribeToOurNewsletter}
                </h2>
              </div>

              <div className="md:col-span-5">
                <form className="flex flex-col sm:flex-row gap-0 border-2 border-black">
                  <input
                    placeholder={data.generalInterface?.emailPlaceholder ?? 'EMAIL@ADDRESS.COM'}
                    className="flex-1 bg-white px-6 py-5 text-[11px] uppercase tracking-widest outline-none focus:placeholder:opacity-0"
                  />
                  {/* Button hover efekat usklađen sa brendom */}
                  <button
                    type="button"
                    className="btn-brutalist flex items-center justify-center transition-all duration-500"
                  >
                    {data.generalInterface?.newsletterButton}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN FOOTER LINKS */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-20">
        <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          
          {/* LOGO & BRAND INFO */}
          <div className="col-span-full lg:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="relative h-12 w-12 grayscale hover:grayscale-0 transition-all duration-700">
                <DatoImage
                  data={data.layout?.footerLogo?.responsiveImage as ResponsiveImageType}
                  className="h-full w-full object-contain"
                />
              </Link>
              <span className="text-[14px] font-bold uppercase tracking-[0.3em] text-black">
                {data.layout?.footerTitle}
              </span>
            </div>
            
            <p className="text-[11px] uppercase tracking-wider text-gray-400 leading-relaxed max-w-xs">
              {data.layout?.footerSubtitle}
            </p>

            <div className="flex gap-6">
              {data.layout?.socialMediaLinks.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:opacity-50 transition-opacity"
                  key={social.id}
                >
                  <div className="w-5 h-5">
                    <SvgRenderer url={social.icon.url} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* DYNAMIC COLUMNS */}
          {data.layout?.footerColumns.map((column) => (
            <div key={column.id} className="lg:col-span-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black mb-10">
                {column.label}
              </h3>
              <nav className="flex flex-col gap-4">
                {column.footerItem.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${globalPageProps.params.lng}/${item.slug}`}
                    className="text-[11px] uppercase tracking-wider text-gray-500 hover:text-black hover:line-through transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* COPYRIGHT AREA */}
        <div className="mt-32 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">
            {data.layout?.copyrightText}
          </div>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-black cursor-pointer">Privacy Policy</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-black cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;