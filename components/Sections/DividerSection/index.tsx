import Link from 'next/link';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { DividerSectionFragmentDoc } from '@/graphql/types/graphql';
import type { ResolvedGlobalPageProps } from '@/utils/globalPageProps';

type Props = {
  fragment: FragmentType<typeof DividerSectionFragmentDoc>;
  globalPageProps: ResolvedGlobalPageProps;
};

export default function DividerSection({ fragment, globalPageProps }: Props) {
  const { preTitle, subtitle, title, button } = getFragmentData(
    DividerSectionFragmentDoc,
    fragment,
  );

  return (
    <div className="w-full bg-white border-b border-gray-100 py-12 px-4 md:px-12">
      <div className="mx-auto max-w-[1920px] grid grid-cols-1 md:grid-cols-12 items-center gap-8">
        
        {/* LEVA STRANA: PreTitle i Title */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <div className="text-[7px] uppercase tracking-[0.3em] font-mono text-black/40 mb-3">
            {preTitle}
          </div>
          <h2 className="text-[12px]  uppercase tracking-wide text-black italic leading-[1.1]">
            {title}
          </h2>
        </div>

        {/* SREDINA: Prazan prostor za balans */}
        <div className="hidden md:block md:col-span-1" />

        {/* DESNA STRANA: Subtitle i Button */}
        <div className="md:col-span-7 flex flex-col md:flex-row items-center justify-between gap-12">
          <p className="max-w-md text-[7px] md:text-[9px] uppercase tracking-[0.05em] font-medium text-black/40 leading-relaxed text-left">
            {subtitle}
          </p>
          
          <div className="flex items-center gap-6 self-end md:self-center">
             {button?.[0] && (
              <Link
                href={`/${globalPageProps.params.lng}/${button[0].slug}`}
                className="text-[11px] uppercase tracking-[0.2em] font-mono italic text-black border-none hover:opacity-50 transition-all whitespace-nowrap animate-pulse"
              >
                {button[0].label}
              </Link>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
