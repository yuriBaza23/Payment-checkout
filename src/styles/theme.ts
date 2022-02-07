// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
})

// 3. Extend the theme
export const theme = extendTheme({ breakpoints })