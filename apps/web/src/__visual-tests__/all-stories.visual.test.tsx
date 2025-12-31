/**
 * VRT Test for all Storybook stories
 *
 * このファイルは、すべてのStorybookストーリーに対してVRTを実行します。
 * defineVRTTests関数を使用して、自動的にすべてのストーリーをテストします。
 */

import { composeStories } from '@storybook/nextjs-vite';
import { defineVRTTests } from '@superbetter/vrt';

// すべてのストーリーファイルを取得（サーバーサイド依存を持つものは除外）
const storyFiles = import.meta.glob<Record<string, unknown>>(
  [
    '../**/*.stories.tsx',
    // サーバーサイド依存（drizzle, better-auth等）を持つコンポーネントを除外
    '!../components/calendar-chart/**',
    '!../components/time-series-chart/**',
    // app/(private) 配下はサーバーサイドコードへの依存があるため除外
    '!../app/**',
  ],
  {
    eager: true,
  },
);

// すべてのストーリーに対してVRTテストを定義
defineVRTTests(storyFiles, {
  composeStories,
  stabilizationDelay: 300,
});
