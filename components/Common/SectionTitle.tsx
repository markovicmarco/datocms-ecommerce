import type { Maybe } from 'graphql/jsutils/Maybe';
import Markdown from 'react-markdown';

const SectionTitle = ({
  title,
  paragraph,
  width = 'max-w-3xl',
  center,
  mb = 'mb-20',
}: {
  title: string;
  paragraph: Maybe<string>;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <div
      className={`w-full ${center ? 'mx-auto text-center items-center' : 'items-start'} flex flex-col ${mb}`}
    >
      {/* Decorative Technical Line - Sada koristi primary boju */}
      <div className={`h-[2px] w-12 bg-primary mb-6 ${center ? 'mx-auto' : ''}`} />

      <div className={`w-full ${width}`}>
        <h2 className="text-[12px] font-serif italic leading-[0.85] text-black uppercase tracking-wide">
          {title}
        </h2>
        
        {paragraph && (
          <div className="text-[9px] leading-relaxed uppercase tracking-[0.15em] font-medium text-gray-500 max-w-2xl">
            <Markdown>{paragraph}</Markdown>
          </div>
        )}
      </div>

      {/* Optional: System Index line for center-aligned titles */}
      {center && (
        <div className="mt-8 text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-gray-200">
          Section_Index / 2026
        </div>
      )}
    </div>
  );
};

export default SectionTitle;