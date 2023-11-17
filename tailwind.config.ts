import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      320: '320px',
      430: '430px',
      744: '744px',
      1024: '1024px',
      1280: '1280px',
      1512: '1512px',
      1920: '1920px',
    },
  },
  plugins: [],
}
export default config
