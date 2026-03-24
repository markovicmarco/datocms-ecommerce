import { notFound } from 'next/navigation';
import queryDatoCMS from '@/utils/queryDatoCMS';

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

interface PageProps {
  params: Promise<{ lng: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, lng } = await params;
  const data = await queryDatoCMS(BRAND_IDENTITY_QUERY as any, { slug }) as any;
  const seo = data?.brandIdentity?.seo;

  if (!data?.brandIdentity) return { title: 'Identity Protocol' };

  return {
    title: seo?.title || `${data.brandIdentity.brandName} | Invisible Authority`,
    description: seo?.description,
    alternates: { canonical: `/${lng}/${slug}` },
    other: {
      'brand-creator': 'Ageless',
      'identity-protocol': 'Verified',
    },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: seo?.image?.url ? [seo.image.url] : [],
      type: 'article',
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await queryDatoCMS(BRAND_IDENTITY_QUERY as any, { slug }) as any;

  if (!data?.brandIdentity) {
    notFound();
  }

  const { brandName, schemaData } = data.brandIdentity;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex flex-col items-center justify-center p-6 font-sans selection:bg-black selection:text-white">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <article className="max-w-4xl w-full">
        <div className="sr-only" aria-hidden="true">
          <h2>Technical Identity Specification: {brandName}</h2>
          <p>Created by Ageless. Minimalist identity protocol.</p>
        </div>

        <header className="mb-20 border-b border-black/5 pb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 font-medium">
            Protocol: Identity Architecture
          </p>
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter uppercase leading-[0.85] text-balance">
            {brandName}
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">
              Vision & Concept
            </h2>
            <p className="text-xl leading-relaxed font-light opacity-70">
              {data.brandIdentity.seo?.description}
            </p>
          </div>
          
          <div className="flex flex-col justify-end items-start md:items-end">
            <div className="h-[1px] w-full md:w-32 bg-black/20 mb-6" />
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 italic text-left md:text-right">
              Verified Brand Asset<br />
              <span className="not-italic font-bold text-black/60 uppercase">Ref: {slug}</span>
            </p>
          </div>
        </section>
      </article>

      <footer className="mt-20 h-0 overflow-hidden opacity-0 pointer-events-none">
        {brandName} by Ageless. Domain Architecture.
      </footer>
    </div>
  );
}