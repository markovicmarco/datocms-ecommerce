import { executeQuery } from '@datocms/cda-client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export default async function queryDatoCMS<
  TResult = unknown,
  TVariables = Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  isDraft?: boolean,
): Promise<TResult> {
  return executeQuery(document, {
    token: process.env.DATOCMS_READONLY_API_TOKEN!,
    variables,
    includeDrafts: isDraft,
    excludeInvalid: true,
    ...(isDraft
      ? {
          contentLink: 'v1',
          baseEditingUrl: process.env.DATOCMS_BASE_EDITING_URL,
        }
      : {}),
    requestInitOptions: {
      cache: isDraft ? 'no-store' : 'force-cache',
      next: isDraft ? undefined : { tags: ['datocms'] },
    },
  });
}
