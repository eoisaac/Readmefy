/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-pre-code': theme('colors.primary'),
            '--tw-prose-pre-bg': theme('colors.slate-50'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
