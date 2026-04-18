import CustomColor from '@/components/Common/CustomColor';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Meta from '@/components/Meta';
import BrandSeo from './BrandSeo'; 
import type { ContentPage } from '@/components/WithRealTimeUpdates/types';
import type { PageProps, Query } from './meta';

const Content: ContentPage<PageProps, Query> = ({
  data,
  children,
  ...globalPageProps
}) => {
  const { params, isDraft } = globalPageProps as any;

  return (
    <BrandSeo params={params} isDraft={isDraft}> 
      <Meta data={data} />
      
      <Header data={data} globalPageProps={globalPageProps} />
      
      {/* Dynamic Branding Injection */}
      <CustomColor
        r={data.layout?.mainColor?.red || 250}
        g={data.layout?.mainColor?.green || 238}
        b={data.layout?.mainColor?.blue || 200}
      />
      
      <main>
        {children}
      </main>
      
      <Footer globalPageProps={globalPageProps} data={data} />
    </BrandSeo>
  );
};

export default Content;