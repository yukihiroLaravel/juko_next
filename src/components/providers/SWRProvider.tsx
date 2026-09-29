'use client';

import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';

type SWRProviderProps = {
  children: ReactNode;
};

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
          if (error.status === 401 || error.status === 403) return;
          if (error.status === 404) return;
          if (retryCount >= 3) return;
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
