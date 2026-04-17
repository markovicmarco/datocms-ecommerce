import React from 'react';

const Highlighter = (rawTagName: any, props: any, ...children: any) => {
  if (rawTagName === 'mark')
    return (
      <mark
        key={props?.key}
        className="relative inline-block bg-[#87CEEB] px-1.5 py-0.5 text-black font-bold uppercase tracking-tighter text-[0.95em] leading-none"
      >
        {/* Pozadina je oštra, a tekst unutra blago zbijen za "label" efekat */}
        {children}
      </mark>
    );

  return React.createElement(rawTagName, props, ...children);
};

export default Highlighter;