import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '40em',
      // => @media (min-width: 40em) { ... } -> 640px

      md: '48em',
      // => @media (min-width: 48em) { ... } -> 768px

      lg: '64em',
      // => @media (min-width: 64em) { ... } -> 1024px

      xl: '80em',
      // => @media (min-width: 80em) { ... } -> 1280px

      '2xl': '96em',
      // => @media (min-width: 96em) { ... } -> 1536px
    },
    extend: {
      colors: {
        primaryLighter: 'var(--primary--lighter)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primary--hover)',
        background: 'var(--background)',
        backgroundSecondary: 'var(--background--secondary)',
        backgroundLevel1: 'var(--background--level1)',
        backgroundLevel1Hover: 'var(--background-level1-hover)',
        foreground: 'var(--foreground)',
        foregroundMuted: 'var(--foreground--muted)',
        foregroundMutedOnSecondary: 'var(--foreground--muted--onSecondary)',
        foregroundPrimary: 'var(--foreground--primary)',
        foregroundOnPrimary: 'var(--foreground--onPrimary)',
        foregroundLevel1Hover: 'var(--foreground-level1-hover)',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        autowrap: 'repeat(auto-fit, minmax(20rem, 1fr))',
      },
    },
  },
  plugins: [
    containerQueries,
    // plugin(function ({ addVariant }) {
    //   addVariant('darkmode', '&:data-mode:"dark"');
    //   addVariant('lightmode', '&:data-mode:"light"');
    // }),
  ],
};
export default config;
