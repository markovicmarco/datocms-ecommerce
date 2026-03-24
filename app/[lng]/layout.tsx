import '@/styles/global.css';
import { draftMode } from 'next/headers';
// POPRAVKA: Uvozimo default export (bez zagrada)
import queryDatoCMS from '@/utils/queryDatoCMS'; 
import Script from 'next/script';

// Definišemo upit direktno ovde da izbegnemo "Module not found" grešku
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

  // Opciono: Možeš pozvati queryDatoCMS ovde ako ti trebaju globalni podaci
  // const data = await queryDatoCMS(BRAND_IDENTITY_QUERY);

  return (
    <html lang={lng}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}