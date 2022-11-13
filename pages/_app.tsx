import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} className="bg-[#F5F5F5]" />;
}

export default MyApp;
