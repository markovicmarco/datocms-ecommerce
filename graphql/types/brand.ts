<<<<<<< HEAD
import { gql } from '@/graphql/types'; // tvoj generisani gql

export const BRAND_IDENTITY_QUERY = gql(`
=======
import { graphql } from "./gql";

export const BRAND_IDENTITY_QUERY = graphql(`
>>>>>>> chore: strict gitignore for environment security and clean entity architecture
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
<<<<<<< HEAD
`);
=======
`);
>>>>>>> chore: strict gitignore for environment security and clean entity architecture
