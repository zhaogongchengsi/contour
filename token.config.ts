import { defineTheme } from 'pinceau'

export default defineTheme({
  media: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },

  color: {
    white: '#FFFFFF',
    black: '#191919',
    primary: '#ED4D31',
    secondary: '#4560B0',
    tertiary: '#FBEFDE'
  },

  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem'
  }
})
