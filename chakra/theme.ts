import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  font: {
    body: 'Source Code Pro'
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme;