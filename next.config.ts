import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  //output: 'export',
  //basePath: '/a11ydemo',
  //distDir: 'dist',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
