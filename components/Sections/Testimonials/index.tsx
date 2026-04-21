'use client';

import ReactMarkdown from 'react-markdown';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { TestimonialSectionFragmentDoc } from '@/graphql/types/graphql';

type Props = {
  fragment: FragmentType<typeof TestimonialSectionFragmentDoc>;
};

const TestimonialsSection = ({ fragment }: Props) => {
  const { title, testimonial: testimonials } = getFragmentData(
    TestimonialSectionFragmentDoc,
    fragment,
  );

  // Dupliramo niz da bi marquee bio beskončan i gladak
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-24 border-t border-black/5 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        
        {/* HEADER: Archive Header Style */}
        <header className="mb-16 px-6 md:px-16 space-y-4">
          <span className="text-[9px] font-mono  uppercase tracking-[0.6em] text-black/20 block">
            LIVE FEED / CLIENT VALIDATION
          </span>
          <h2 className="text-[18px] font-serif italic uppercase leading-none text-black tracking-wide">
            {title || 'System_Feedback'}
          </h2>
        </header>

        {/* MARQUEE CONTAINER */}
        <div className="relative flex overflow-x-hidden border-y border-black/5 bg-gray-50/30 py-2">
          <div className="flex animate-marquee whitespace-nowrap group-hover:pause-none">
            {doubledTestimonials.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="inline-block w-[350px] md:w-[450px] mx-4 bg-white border border-black/5 p-8 transition-none hover:border-none"
              >
                {/* Status Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[7px] font-mono  text-black/20 uppercase tracking-widest">
                    ENTRY_REF_{idx.toString().padStart(3, '0')}
                  </span>
                </div>

                {/* Quote Content - Text wrapping is handled for marquee */}
                <div className="text-[10px] leading-relaxed text-black/80 font-medium tracking-widest uppercase whitespace-normal h-24 overflow-hidden italic">
                  <ReactMarkdown>
                    {item.testimonial || ''}
                  </ReactMarkdown>
                </div>

                {/* Author Metadata */}
                <div className="mt-8 flex items-center gap-4 border-t border-black/5 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase italic tracking-[0.1em] text-black/20">
                      {item.author}
                    </span>
                    <span className="text-[7px] font-mono text-black/20 uppercase tracking-widest">
                      VERIFIED_SOURCE_2026
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Animation Config (dodaj u tailwind.config.js ako već nemaš) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;