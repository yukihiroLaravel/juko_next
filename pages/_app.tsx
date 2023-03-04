import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthenticatedLayout } from '@/features/login/layout/AuthenticatedLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticatedLayout>
      <Component {...pageProps} className="bg-[#F5F5F5]" />
    </AuthenticatedLayout>
  );
}

export default MyApp;
