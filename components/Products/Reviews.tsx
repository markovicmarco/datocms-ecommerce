'use client';

import { getFragmentData } from '@/graphql/types';
import {
  ProductGeneralInterfaceFragmentDoc,
  type ProductQuery,
} from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';
import React, { type FC } from 'react';
import ReactMarkdown from 'react-markdown';

type PropTypes = {
  data: ProductQuery;
  globalPageProps: ResolvedGlobalPageProps;
};

// Minimalistički indikator ocene - Sada koristi primary boju (krem)
const RatingBadge: FC<{ score: number }> = ({ score }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          /* Popunjeni kvadratići sada koriste bg-primary */
          className={`w-3 h-3 ${i < Math.round(score) ? 'bg-primary' : 'bg-gray-100'}`} 
        />
      ))}
    </div>
    <span className="text-[10px] font-bold font-mono tracking-tighter text-black">
      {score.toFixed(1)}
    </span>
  </div>
);

const Reviews = ({ data, globalPageProps }: PropTypes) => {
  const { reviewButton, reviews: reviewsLabel } = getFragmentData(
    ProductGeneralInterfaceFragmentDoc,
    data.generalInterface!,
  );

  return (
    <section className="w-full bg-white py-20 border-t border-black/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* HEADER: Brutalist Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 border-b-2 border-black pb-8">
          <div className="space-y-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-primary">
              Verified Feedback
            </h2>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-serif italic text-black leading-none">
                {data.product?.reviewAverage}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                  Average Rating
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                  Based on {data.product?.numberOfReviews} {reviewsLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Senka tastera sada koristi primary-rgb varijablu */}
          <button className="px-8 py-4 border-2 border-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(var(--primary-rgb),0.3)]">
            {reviewButton}
          </button>
        </div>

        {/* REVIEWS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {data.product?.featuredReviews.map((review) => {
            const date = new Date(review.reviewDate);
            const formattedDate = new Intl.DateTimeFormat(
              globalPageProps.params.lng,
              { year: 'numeric', month: 'short', day: 'numeric' }
            ).format(date);

            return (
              <div key={review.id} className="group flex flex-col space-y-6">
                {/* Meta Info */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-black">
                      {review.reviewerName}
                    </span>
                    <span className="block text-[9px] font-mono uppercase tracking-tighter text-gray-400">
                      {formattedDate}
                    </span>
                  </div>
                  <RatingBadge score={review.reviewScore} />
                </div>

                {/* Content */}
                <div className="text-[13px] leading-relaxed text-gray-600 font-medium tracking-wide">
                  <ReactMarkdown>{review.review || ''}</ReactMarkdown>
                </div>
                
                {/* Visual Accent - Sada u primary boji na hover */}
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-0.5 w-8 bg-primary" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Reviews;