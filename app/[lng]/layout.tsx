import '@/styles/global.css';
import { draftMode } from 'next/headers';
import queryDatoCMS from '@/utils/queryDatoCMS'; // FIKS: Import bez zagrada jer je default export
import Script from 'next/script';

// FIKS: Uklonjen import eksternog graphql fajla koji je pravio "Module not found"
// Definišemo osnovni upit direktno ovde
const BRAND_IDENTITY_QUERY = `
  query BrandIdentity {
    _site {
      globalSeo {
        siteName
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
  const { lng } = await params;

  return (
    <html lang={lng}>
      <body className="antialiased selection:bg-black selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}