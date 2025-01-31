import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'src/public/sw.js',
});

const nextConfig: NextConfig = {
  webpack: (config) => {
    // For svgr
    // biome-ignore lint/suspicious/noExplicitAny: 公式の型定義に従っている
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // 既存のルールを再適用しますが、?urlで終わるsvgインポートのみに適用
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // その他の*.svgインポートをReactコンポーネントに変換
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    // 既存のルールを除外
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withSerwist(nextConfig);
