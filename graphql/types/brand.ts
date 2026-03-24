export interface BrandIdentity {
  brandName: string;
  schemaData: any; // JSON-LD struktura iz DatoCMS-a
  seo: {
    title: string;
    description: string;
    image: {
      url: string;
    };
  };
}

export interface BrandQueryResult {
  brandIdentity: BrandIdentity | null;
}