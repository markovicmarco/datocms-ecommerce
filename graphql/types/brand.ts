export interface BrandIdentity {
  brandName: string;
  slug: string;
  schemaData: any; // Ovde ide tvoj JSON-LD za AI sisteme
  seo: {
    title: string;
    description: string;
    image?: {
      url: string;
    };
  };
}

export interface BrandQueryResult {
  brandIdentity: BrandIdentity | null;
}