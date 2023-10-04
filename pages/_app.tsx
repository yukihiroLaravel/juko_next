import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          background-color: #f2f3f5;
        }
      `}</style>
    </>
  );
}

export default MyApp;
