import React from 'react';

const Highlighter = (rawTagName: any, props: any, ...children: any) => {
  if (rawTagName === 'mark')
    return (
      <mark
        key={props?.key}
        className="relative inline-block bg-primary px-1.5 py-0.5 text-black  uppercase tracking-tighter text-[0.95em] leading-none transition-colors"
      >
        {/* Pozadina je oštra, a boja sada dolazi iz --color-primary varijable */}
        {children}
      </mark>
    );

  return React.createElement(rawTagName, props, ...children);
};

export default Highlighter;