/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: 'class',
  content: [
    './config/**/*.tsx',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      'demo-sm': '720px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      width: {
        1536: "1536px",
      },
      height: {
        150: "37.5rem",
      },
      margin: {
        30: "7.5rem",
      },
      fontFamily: {
        default: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        cal: ["var(--font-cal)", ...defaultTheme.fontFamily.sans],
        title: ["var(--font-title)", ...defaultTheme.fontFamily.sans],
        mono: ["Consolas", ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "Cal Sans",
            },
            h2: {
              fontFamily: "Cal Sans",
            },
            h3: {
              fontFamily: "Cal Sans",
            },
            h4: {
              fontFamily: "Cal Sans",
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.sky.300')}`,
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            kbd: {
              background: theme('colors.slate.100'),
              borderWidth: '1px',
              borderColor: theme('colors.slate.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.slate.700'),
              fontWeight: 500,
              fontSize: '0.875em',
              fontVariantLigatures: 'none',
              borderRadius: '4px',
              margin: '0 1px',
            },
            code: {
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
            },
            pre: {
              color: theme('colors.slate.50'),
              borderRadius: theme('borderRadius.xl'),
              padding: theme('padding.5'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            'p + pre': {
              marginTop: `${-4 / 14}em`,
            },
            'pre + pre': {
              marginTop: `${-16 / 14}em`,
            },
            'pre code': {
              flex: 'none',
              minWidth: '100%',
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.slate.700'),
              borderBottomColor: theme('colors.slate.200'),
            },
            'thead th': {
              paddingTop: 0,
              fontWeight: theme('fontWeight.semibold'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.slate.100'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '1px',
            },
            'tbody code': {
              fontSize: theme('fontSize.xs')[0],
            },
            'figure figcaption': {
              textAlign: 'center',
              fontStyle: 'italic',
            },
            'figure > figcaption': {
              marginTop: `${12 / 14}em`,
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      }),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}
