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
    // Smanjen padding (py-16 umesto 20) da ne bude "duže"
    <section className="w-full bg-white">
      {/* Smanjen padding levo/desno (px-6 lg:px-10) da se kontejner raširi */}
      <div className="max-w-[1920px] w-full mx-auto">
        
        {/* HEADER SEKCIJE */}
        <div className="mb-12">
          <h2 className="text-[12px] uppercase tracking-[0.4em] text-current">
            Inquiry / Knowledge Base
          </h2>
          <div className="mt-4 h-1 w-12 bg-primary" />
        </div>

        {/* FAQ GRID - md:grid-cols-2 sa većim gapom da se maksimalno raširi */}
        <div className="grid gap-x-20 gap-y-12 md:grid-cols-2">
          {questions.map((question, index) => {
            return (
              <div 
                key={question.id} 
                className="group flex flex-col border-b border-gray-100 pb-8 transition-colors hover:border-none"
              >
                <div className="flex items-start gap-6">
                  <span className="text-[10px] font-mono text-current mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="flex-1">
                    <h3 className="text-[14px] uppercase tracking-wider text-current mb-4 leading-tight">
                      {question.question}
                    </h3>

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