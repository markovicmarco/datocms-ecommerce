import queryDatoCMS from '@/utils/queryDatoCMS'; 

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
  params: Promise<any>; // Promenjeno u Promise<any> za maksimalnu kompatibilnost
  isDraft: boolean;
}) {
  // 1. Otpakujemo params koristeći await
  const resolvedParams = await params;
  const lng = resolvedParams?.lng || 'en';
  const slug = resolvedParams?.slug;

  // Fallback strategija
  const currentSlug = slug || "eillence"; 

  const data: any = await queryDatoCMS(
    BRAND_IDENTITY_QUERY as any, 
    { slug: currentSlug }, 
    isDraft
  );
  
  const brand = data?.brandIdentity;

  return (
    <>
      {/* Next.js automatski pomera ove tagove u <head>.
        Izbacili smo <html>, <head> i <body> jer su oni u layout.tsx
      */}
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

      {children}
    </>
  );
}