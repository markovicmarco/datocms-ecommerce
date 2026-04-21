'use client';

import type { Dispatch, SetStateAction } from 'react';

type Props = {
  setSuccessToast: Dispatch<SetStateAction<boolean>>;
};

const SuccessPopUp = ({ setSuccessToast }: Props) => {
  return (
    <div
      role="alert"
      className="fixed bottom-8 right-8 z-[200] w-full max-w-sm border-2 border-black bg-white p-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-right duration-500"
    >
      <div className="border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Pulsirajući indikator uspeha - sada u primary boji */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <p className="text-[9px]  uppercase tracking-[0.3em] text-black">
              Status: Live Connection
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setSuccessToast(false)}
            className="text-gray-300 hover:text-black transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Bočna linija usklađena sa brendom */}
        <div className="space-y-2 border-l-2 border-primary pl-4">
          <strong className="block text-[9px]  uppercase tracking-wider text-black">
            Draft Mode Enabled
          </strong>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 leading-relaxed">
            Real-time synchronization with DatoCMS endpoint is now active. 
            Previewing unpublished changes.
          </p>
        </div>

        {/* Progress bar koji koristi primary boju brenda */}
        <div className="w-full bg-gray-50 h-[2px] mt-2 overflow-hidden">
          <div className="bg-primary h-full animate-progress-shrink origin-left" />
        </div>
      </div>
    </div>
  );
};

export default SuccessPopUp;