export const dynamic = 'force-dynamic';

import { getFallbackLocale } from '@/app/i18n/settings';
import SideFilter from '@/components/Common/SideFilter';
import DatoImage from '@/components/DatoImage';
import FilterDetail from '@/components/Products/FilterDetail';
import Pagination from '@/components/Products/Pagination';
import { getFragmentData } from '@/graphql/types';
import {
  InitialParamsDocument,
  InitialParamsFragmentDoc,
  ProductModelOrderBy,
  ProductsDocument,
  ProductsGeneralInterfaceFragmentDoc,
  type SiteLocale,
} from '@/graphql/types/graphql';
import type { Record, StructuredText } from 'datocms-structured-text-utils';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import queryDatoCMS from '@/utils/queryDatoCMS';

type PageProps = {
  params: Promise<{ lng: string; slug: string }>;
  searchParams: Promise<{
    page?: string;
    orderBy?: ProductModelOrderBy;
    productName?: string;
    collections?: string;
    brands?: string;
    materials?: string;
  }>;
};

const Page = async ({ params, searchParams }: PageProps) => {
  const { lng } = await params;
  const resolvedSearchParams = await searchParams;
  const { isEnabled } = await draftMode();
  const fallbackLng = await getFallbackLocale();
  const pageNumber = Number.parseInt(resolvedSearchParams?.page ?? '1');
  const orderBy: ProductModelOrderBy =
    resolvedSearchParams?.orderBy ?? ProductModelOrderBy.CreatedAtAsc;
  const nameSearch = resolvedSearchParams?.productName ?? '';

  const initialParams = await queryDatoCMS(
    InitialParamsDocument,
    { locale: lng as SiteLocale, fallbackLocale: [fallbackLng] },
    isEnabled,
  );

  const { allBrands, allCollections, allMaterials } =
    getFragmentData(InitialParamsFragmentDoc, initialParams) ?? {};

  const collectionParams = resolvedSearchParams?.collections?.split('|').filter(c => c.length);
  const collections = collectionParams ?? allCollections.map(c => c.id);

  const brandParams = resolvedSearchParams?.brands?.split('|').filter(b => b.length);
  const brands = brandParams ?? allBrands.map(b => b.id);

  const materialParams = resolvedSearchParams?.materials?.split('|').filter(m => m.length);
  const materials = materialParams ?? allMaterials.map(m => m.id);

  const data = await queryDatoCMS(
    ProductsDocument,
    {
      locale: lng as SiteLocale,
      fallbackLocale: [fallbackLng],
      skip: (pageNumber - 1) * 12,
      orderBy,
      collections,
      brands,
      materials,
      nameSearch,
    },
    isEnabled,
  );

  let singleFilter = null;
  if (materials.length === 1) singleFilter = allMaterials.find(m => m.id === materials[0]);
  else if (collections.length === 1) singleFilter = allCollections.find(c => c.id === collections[0]);
  else if (brands.length === 1) singleFilter = allBrands.find(b => b.id === brands[0]);

  const { sale, currencySymbol, BrandRecord, CollectionRecord, MaterialRecord } =
    getFragmentData(ProductsGeneralInterfaceFragmentDoc, data.generalInterface) ?? {};

  const type =
    singleFilter?.__typename === 'BrandRecord' ? BrandRecord :
    singleFilter?.__typename === 'CollectionRecord' ? CollectionRecord :
    singleFilter?.__typename === 'MaterialRecord' ? MaterialRecord : null;

  return (
    <div className="bg-white">
      {singleFilter && (
        <FilterDetail
          type={type}
          name={singleFilter.name}
          subtitle={singleFilter.details.subtitle ?? ''}
          description={singleFilter.details.description as StructuredText<Record, Record>}
          image={singleFilter.details.image.responsiveImage}
        />
      )}

      <div className="max-w-[1920px] mx-auto border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          
          <aside className="col-span-1 border-r border-black/5 p-8 lg:p-12">
            <SideFilter
              initialParams={initialParams}
              generalInterface={data.generalInterface}
              paramaterCollections={collections}
              parameterBrands={brands}
              parameterMaterials={materials}
            />
          </aside>

          <main className="col-span-4 p-4 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-black/5 border border-black/5">
              {data.allProducts.map((product) => {
                const isOnSale = product.sale === 'on_sale';
                
                return (
                  <div key={product.id} className="group relative bg-white flex flex-col">
                    <Link href={`/${lng}/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden">
                      {product.productImages[0].responsiveImage && (
                        <DatoImage
                          fragment={product.productImages[0].responsiveImage}
                          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          layout="fill"
                        />
                      )}
                      
                      {/* SALE BADGE: Sada koristi bg-primary (krem) */}
                      {isOnSale && (
                        <div className="absolute top-0 left-0 bg-white px-4 py-1.5 text-[10px] uppercase tracking-widest text-black z-10">
                          {sale}
                        </div>
                      )}
                    </Link>

                    <div className="p-6 border-t border-black/5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter block">
                            {product.brand.name}
                          </span>
                          {/* NASLOV: group-hover sada koristi primary boju brenda */}
                          <h3 className="text-sm uppercase tracking-widest text-black group-hover:text-primary transition-colors leading-tight">
                            {product.name}
                          </h3>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-sm font-mono">
                            {currencySymbol}{isOnSale ? product.salePrice : product.price}
                          </span>
                          {isOnSale && (
                            <span className="text-[10px] font-mono text-red-500 line-through opacity-50">
                              {currencySymbol}{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Link 
                        href={`/${lng}/product/${product.slug}`}
                        className="mt-auto pt-4 text-[9px] uppercase tracking-[0.3em] text-gray-300 group-hover:text-black transition-colors"
                      >
                        View_Specs →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-20 border-t border-black/5 pt-12">
              <Pagination
                numberOfProducts={data._allProductsMeta.count}
                currentPage={pageNumber}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;