import ContentLink from '@/components/ContentLink';
import ScrollToTop from '@/components/ScrollToTop';
import '@/styles/global.css';
import { draftMode } from 'next/headers';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { isEnabled: isDraft } = await draftMode();
  
  return (
    <html lang={params.lng}>
      <body className="tracking-tight antialiased selection:bg-primary selection:text-black">
        {children}
        <ScrollToTop />
        {isDraft && <ContentLink />}
      </body>
    </html>
  );
}