'use client';

import { ContentLink as DatoContentLink } from 'react-datocms/content-link';
import { useRouter, usePathname } from 'next/navigation';

/**
 * CMS DIRECT CONNECT
 * Omogućava "Visual Editing" u realnom vremenu.
 * Admin alat koji premošćuje kod i sadržaj.
 */
export default function ContentLink() {
  const router = useRouter();
  const pathname = usePathname();

  // Ako nisi u Draft modu, react-datocms biblioteka ovo automatski renderuje kao null
  return (
    <div className="content-link-overlay font-mono">
      <DatoContentLink
        onNavigateTo={(path) => {
          // Osiguravamo da navigacija unutar CMS preview-a bude brza
          router.push(path, { scroll: false });
        }}
        currentPath={pathname}
      />
    </div>
  );
}
