import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Blokiramo samo tehničke rute
    },
    // Ovde ćemo kasnije dodati sitemap koji će izlistati sve tvoje brendove
    sitemap: 'https://tvoj-domen.com/sitemap.xml',
  };
}