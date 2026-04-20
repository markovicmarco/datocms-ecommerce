import ContentLink from '@/components/ContentLink';
import ScrollToTop from '@/components/ScrollToTop';
import '@/styles/global.css';
import { draftMode } from 'next/headers';

// Definišemo interfejs koji Next.js očekuje za Root Layout
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<any>; // Koristimo 'any' ili Record da izbegnemo strogu proveru ovde
}

export default async function RootLayout({ children, params }: LayoutProps) {
  // 1. Sačekaj params
  const resolvedParams = await params;
  
  // 2. Bezbedno izvuci lng sa fallback-om (zaštita od {} tipa)
  const lng = resolvedParams?.lng || 'en'; 
  
  const { isEnabled: isDraft } = await draftMode();
  
  return (
    <html lang={lng}>
      <body className="tracking-tight antialiased selection:bg-primary selection:text-black">
        {children}
        <ScrollToTop />
        {isDraft && <ContentLink />}
      </body>
    </html>
  );
}