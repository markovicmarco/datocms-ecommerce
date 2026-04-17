'use client';

import ReactMarkdown from 'react-markdown';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { QuestionSectionFragmentDoc } from '@/graphql/types/graphql';

type Props = {
  fragment: FragmentType<typeof QuestionSectionFragmentDoc>;
};

const QuestionsSection = ({ fragment }: Props) => {
  const { questions } = getFragmentData(QuestionSectionFragmentDoc, fragment);

  return (
    <section className="w-full bg-white py-20 border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* HEADER SEKCIJE */}
        <div className="mb-16">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-black">
            Inquiry / Knowledge Base
          </h2>
          <div className="mt-4 h-1 w-12 bg-[#87CEEB]" />
        </div>

        {/* FAQ GRID */}
        <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {questions.map((question, index) => {
            return (
              <div 
                key={question.id} 
                className="group flex flex-col border-b border-gray-100 pb-10 transition-colors hover:border-black"
              >
                {/* NUMERACIJA I PITANJE */}
                <div className="flex items-start gap-6">
                  <span className="text-[10px] font-bold font-mono text-[#87CEEB] mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold uppercase tracking-wider text-black mb-6 leading-tight">
                      {question.question}
                    </h3>

                    {/* ODGOVOR */}
                    <div className="prose prose-sm max-w-none">
                      <div className="text-[12px] uppercase tracking-widest text-gray-400 leading-relaxed font-medium italic">
                        <ReactMarkdown>
                          {question.answer || ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
