import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    prefix: 'myapp',
    layout: {
      radius: {
        // small: "2px", // rounded-small
        // medium: "4px", // rounded-medium
        // large: "6px", // rounded-large
      },
    },
    themes: {
      light: {},
      dark: {
        colors: {
          // primary: {
          //   DEFAULT: "#f00",
          //   foreground: "#000000",
          // },
          // focus: "#BEF264"
        }
      },
    },
  })],
}
export default config
