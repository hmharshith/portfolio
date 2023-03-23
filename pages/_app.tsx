import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '../chakra/theme';
import Fonts from '../chakra/Fonts';

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Fonts />
    <Component {...pageProps} />
  </ChakraProvider>
}
