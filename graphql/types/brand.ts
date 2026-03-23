import { gql } from '@/graphql/types'; // tvoj generisani gql

export const BRAND_IDENTITY_QUERY = gql(`
  query BrandIdentity($slug: String) {
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
`);
