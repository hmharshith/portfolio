import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const themeConfig = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  } as ThemeConfig,
  styles: {
    global: {
      body: {
        fontFamily: 'Nunito',
      },
    },
  },
};

const theme = extendTheme(themeConfig)

export default theme;