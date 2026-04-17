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

  return (
    <section className="w-full bg-white py-24 border-t border-black/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* HEADER: System Title */}
        <div className="mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#87CEEB] mb-4">
            User Feedback / Testimonials
          </h2>
          <h1 className="text-4xl md:text-5xl font-serif uppercase leading-tight text-black italic">
            {title}
          </h1>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
          {testimonials.map((item) => {
            return (
              <div 
                key={item.id} 
                className="group relative bg-white p-8 md:p-12 flex flex-col justify-between min-h-[350px] transition-colors hover:bg-gray-50"
              >
                {/* Quote Content */}
                <div className="relative z-10">
                  <div className="text-[14px] leading-relaxed text-black font-medium tracking-wide italic">
                    <ReactMarkdown>
                      {item.testimonial || ''}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Author & Verification */}
                <div className="mt-12 flex items-center justify-between border-t border-black/5 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                      {item.author}
                    </span>
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">
                      Verified Client / 2026
                    </span>
                  </div>
                  
                  {/* Digital Signature Icon */}
                  <div className="h-8 w-8 flex items-center justify-center bg-[#87CEEB]/10 text-[#87CEEB]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-1 h-1 bg-[#87CEEB]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
