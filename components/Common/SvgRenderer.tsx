'use client';

import type { URL } from 'node:url';
import React, { useEffect, useState } from 'react';

type Props = {
  url: string | URL;
  className?: string;
};

const SvgRenderer = ({ url, className = "h-6 w-6" }: Props) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const svgText = await response.text();
        
        // Dinamičko čišćenje: Forsiramo currentColor kako bi Tailwind klase iz roditelja radile
        const cleanSvg = svgText
          .replace(/fill="[^"]*"/g, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
          
        setSvgContent(cleanSvg);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    fetchSvg();
  }, [url]);

  return (
    <div
      className={`
        inline-flex items-center justify-center 
        transition-all duration-300
        /* Promenjeno: hover efekat sada koristi primary boju (krem) */
        text-current hover:text-current
        [&_svg]:h-full [&_svg]:w-full [&_svg]:fill-current
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgRenderer;
