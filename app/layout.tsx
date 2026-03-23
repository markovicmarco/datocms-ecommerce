import ContentLink from '@/components/ContentLink';
import ScrollToTop from '@/components/ScrollToTop';
import '@/styles/global.css';
import { draftMode } from 'next/headers';
import { queryDatoCMS } from '@/utils/queryDatoCMS'; // Tvoj postojeći utils
import { BRAND_IDENTITY_QUERY } from '@/graphql/brand'; // Napravi ovaj query
import Script from 'next/script';

type Params = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Params) {
  const { isEnabled: isDraft } = await draftMode();

  // Povlačimo AEO podatke iz DatoCMS-a
  // Napomena: Ovde možeš proslediti slug ako imaš multi-domain setup, 
  // ili povući primarni brend identitet.
  const data = await queryDatoCMS({
    document: BRAND_IDENTITY_QUERY,
    variables: { slug: "eillence" }, // Ili dinamički iz params/env
    isDraft,
  });

  const brand = data?.brandIdentity;

  return (
    <html lang="en">
      <head>
        {/* Klasičan SEO za AI i Pretraživače */}
        {brand?.seo && (
          <>
            <title>{brand.seo.title}</title>
            <meta name="description" content={brand.seo.description} />
            {brand.seo.image && <meta property="og:image" content={brand.seo.image.url} />}
          </>
        )}

        {/* SRCE AEO OPTIMIZACIJE: JSON-LD strukturirani podaci */}
        {brand?.schemaData && (
          <Script
            id="brand-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(brand.schemaData) 
            }}
          />
        )}
      </head>
      <body className={'tracking-tight antialiased'}>
        {children}
        <ScrollToTop isDraft={isDraft} />
        {isDraft && <ContentLink />}
      </body>
    </html>
  );
}
