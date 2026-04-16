import { MetadataRoute } from 'next';
import queryDatoCMS from '@/utils/queryDatoCMS';

const ALL_SLUGS_QUERY = `
  query AllBrandSlugs {
    allBrandIdentities {
      slug
      _updatedAt
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Povlačimo sve slugove iz baze (bez draft moda za sitemap)
  const data: any = await queryDatoCMS(ALL_SLUGS_QUERY as any, {}, false);
  const brands = data?.allBrandIdentities || [];

  const baseUrl = 'https://tvoj-domen.com'; // Ovde stavi svoj glavni domen

  // Mapiramo svaki brend u sitemap format
  const brandEntries = brands.map((brand: any) => ({
    url: `${baseUrl}/en/${brand.slug}`, // Možeš dodati logiku za više jezika ako želiš
    lastModified: new Date(brand._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...brandEntries,
  ];
}