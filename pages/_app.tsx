import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Script from 'next/script';
import theme from '../chakra/theme';
import Fonts from '../chakra/Fonts';

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Fonts />
    <Component {...pageProps} />
    <Script
      strategy="afterInteractive"
      src="https://www.googletagmanager.com/gtag/js?id=G-1MMHL3L1HJ"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1MMHL3L1HJ');
      `}
    </Script>
  </ChakraProvider>
}
