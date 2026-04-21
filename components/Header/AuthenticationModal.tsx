"use client";

import { type Dispatch, type SetStateAction, useState } from 'react';

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
  triggerSuccessToast: () => void;
};

const AuthenticationModal = ({
  setModalOpen,
  refresh,
  triggerSuccessToast,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  async function enableDraft() {
    try {
      const response = await fetch(`/api/draft/enable?token=${inputValue}`);
      if (response.status === 200) {
        refresh();
        setModalOpen(false);
        triggerSuccessToast();
        return;
      }
      throw new Error('Wrong token!');
    } catch (error) {
      setInputValue('');
      setHasError(true);
    }
  }

  return (
    <div
      className="bg-white border-2 border-black p-6 md:p-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] max-w-md w-full animate-in zoom-in-95 duration-300"
      role="alert"
    >
      <div className="flex items-center gap-4">
        {/* Štit ikona u tvom stilu */}
        <div className="shrink-0 bg-black p-3 text-white">
          <svg
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <div>
          <h3 className="text-[9px]  uppercase tracking-[0.3em] text-black">
            System Access
          </h3>
          <p className="text-[9px] uppercase tracking-widest text-gray-400">
            Authorization Required
          </p>
        </div>
      </div>

      <p className="mt-8 text-[9px] uppercase tracking-wider text-gray-500 leading-relaxed border-l-2 border-gray-100 pl-4">
        Enter the secret token to decrypt and access the latest drafts. 
        Unauthorised access is logged.
      </p>

      <div className="mt-8">
        <label htmlFor="UserToken" className="text-[9px]  uppercase tracking-[0.2em] text-black mb-2 block">
          Access Token
        </label>
        <input
          type="password"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHasError(false);
          }}
          id="UserToken"
          className={`w-full bg-gray-50 border-none p-4 text-sm tracking-[0.5em] focus:ring-1 focus:ring-black transition-all ${
            hasError ? 'bg-red-50 text-red-600 ring-1 ring-red-500' : 'text-black'
          }`}
          placeholder="••••••••"
        />
        {hasError && (
          <p className="mt-2 text-[9px] uppercase tracking-widest  text-red-500">
            Invalid Token. Access Denied.
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={enableDraft}
          className="btn-brutalist flex items-center justify-center transition-all active:scale-95"
        >
          Verify Identity
        </button>

        <button
          className="btn-brutalist flex items-center justify-center transition-all"
          onClick={() => setModalOpen(false)}
        >
          Abort
        </button>
      </div>
    </div>
  );
};

export default AuthenticationModal;