import '@/styles/global.css';
import { draftMode } from 'next/headers';
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { isEnabled: isDraft } = await draftMode();
  const { lng } = await params;

  // Povlačimo podatke za primarni entitet (npr. Eillence)
  const data: any = await queryDatoCMS(BRAND_IDENTITY_QUERY as any, { slug: "eillence" }, isDraft);
  const brand = data?.brandIdentity;

  return (
    <html lang={lng}>
      <head>
        {/* RAW HTML SCRIPT - Google ovo vidi trenutno, bez hidratacije */}
        {brand?.schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ 
              __html: JSON.stringify(brand.schemaData) 
            }}
          />
        )}
      </head>
      <body className="antialiased selection:bg-black selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
