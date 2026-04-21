'use client';

import {
  isLink,
  type Record,
  type StructuredText,
} from 'datocms-structured-text-utils';
import Link from 'next/link';
import type { SetStateAction } from 'react';
import { renderNodeRule } from 'react-datocms/structured-text';
import DatoStructuredText from '@/components/DatoStructuredText';
import {
  type LayoutModelNotificationField,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  notification: LayoutModelNotificationField;
  setNotificationStrip: React.Dispatch<SetStateAction<boolean>>;
  globalPageProps: ResolvedGlobalPageProps;
};

const NotificationStrip = ({
  notification,
  globalPageProps,
  setNotificationStrip,
}: Props) => {
  return (
    <div className="w-full bg-primary relative z-[60] border-b border-black/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-3 flex items-center justify-center relative">
        
        <div className="text-[9px] uppercase tracking-[0.2em]  text-white text-center">
          <DatoStructuredText
            data={notification.value as StructuredText<Record, Record>}
            customNodeRules={[
              renderNodeRule(isLink, ({ node, children, key }) => {
                // Generisanje putanje sa jezikom
                const path = `/${globalPageProps.params.lng}${node.url}`;
                
                return (
                  <Link
                    key={key}
                    href={path || '#'}
                    className="ml-4 inline-block border-none pb-0.5 hover:opacity-50 transition-opacity animate-pulse"
                  >
                    {children}
                  </Link>
                );
              }),
            ]}
          />
        </div>

        <button
          type="button"
          className="absolute right-4 md:right-12 text-white hover:opacity-50 transition-opacity"
          onClick={() => setNotificationStrip(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationStrip;