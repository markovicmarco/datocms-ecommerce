import '@/styles/global.css';
import { draftMode } from 'next/headers';
import queryDatoCMS from '@/utils/queryDatoCMS'; // FIKS 1: Default import (bez zagrada)
import Script from 'next/script';

// FIKS 2: Definišemo upit direktno ovde da izbegnemo Module Not Found
const BRAND_IDENTITY_QUERY = `
  query BrandIdentity($slug: String!) {
    brandIdentity(filter: { slug: { eq: $slug } }) {
      brandName
      schemaData
      seo {
        title
        description
        image {
          url
        }
      }
    }
  }
`;

export default async function RootLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { isEnabled: isDraft } = await draftMode();
  const { lng } = await params;

  // FIKS 3: Pozivamo funkciju onako kako je definisana u tvom utils fajlu
  const data: any = await queryDatoCMS(BRAND_IDENTITY_QUERY as any, { slug: "eillence" }, isDraft);
  const brand = data?.brandIdentity;

  return (
    <html lang={lng}>
      <head>
        {brand?.schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(brand.schemaData) 
            }}
          />
        )}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
