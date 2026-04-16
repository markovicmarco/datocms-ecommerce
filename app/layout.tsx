import ContentLink from '@/components/ContentLink';
import ScrollToTop from '@/components/ScrollToTop';
import '@/styles/global.css';
import { draftMode } from 'next/headers';

type Params = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Params) {
  const { isEnabled: isDraft } = await draftMode();
  
  // RootLayout je sada "providni" omotač.
  // Ne dodajemo <html> ili <body> ovde jer ih generiše BrandSeo.
  return (
    <>
      {children}
      <ScrollToTop isDraft={isDraft} />
      {isDraft && <ContentLink />}
    </>
  );
}