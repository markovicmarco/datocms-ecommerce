import queryDatoCMS from '@/utils/queryDatoCMS'; 
import Script from 'next/script';

const BRAND_IDENTITY_QUERY = `
  query BrandIdentity($slug: String!) {
    brandIdentity(filter: { slug: { eq: $slug } }) {
      brandName
      schemaData
      seo {
        title
        description
        image { url }
      }
    }
  }
`;

export default async function BrandSeo({
  children,
  params,
  isDraft,
}: {
  children: React.ReactNode;
  params: { lng: string; slug?: string }; // Slug je sada dinamički
  isDraft: boolean;
}) {
  const { lng, slug } = params;

  // Fallback strategija: ako nema sluga u URL-u (npr. home), koristi "eillence"
  const currentSlug = slug || "eillence"; 

  const data: any = await queryDatoCMS(
    BRAND_IDENTITY_QUERY as any, 
    { slug: currentSlug }, 
    isDraft
  );
  
  const brand = data?.brandIdentity;

  return (
    <html lang={lng}>
      <head>
        {brand?.seo && (
          <>
            <title>{brand.seo.title}</title>
            <meta name="description" content={brand.seo.description} />
            <meta property="og:title" content={brand.seo.title} />
            <meta property="og:description" content={brand.seo.description} />
            {brand.seo.image && <meta property="og:image" content={brand.seo.image.url} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={brand.seo.image?.url} />
         </>
       )}
       {brand?.schemaData && (
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ 
             __html: JSON.stringify(brand.schemaData) 
           }} 
          />
        )}
     </head>
      <body className="tracking-tight antialiased">
        {children}
      </body>
    </html>
  );
}