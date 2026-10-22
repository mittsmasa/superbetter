/**
 * VRT Test for all Storybook stories
 *
 * このファイルは、すべてのStorybookストーリーに対してVRTを実行します。
 * defineVRTTests関数を使用して、自動的にすべてのストーリーをテストします。
 */

import { composeStories } from '@storybook/nextjs-vite';
import { defineVRTTests } from '@superbetter/vrt';

// すべてのストーリーファイルを取得（サーバーサイド依存を持つものは除外）
// NOTE: next >=16.3 が import.meta.glob の型（Turbopack 用、generic なし）を持ち
// vite/client の generic 付き定義と衝突するため、型引数ではなくキャストで表明する
const storyFiles = import.meta.glob(
  [
    '../**/*.stories.tsx',
    // サーバーサイド依存（drizzle, better-auth等）を持つコンポーネントを除外
    '!../components/calendar-chart/**',
    '!../components/time-series-chart/**',
    // サーバーアクションへの依存があるコンポーネントを除外
    '!../components/entity-history-item/**',
    // app配下のサーバーサイドコードを除外（移動済みコンポーネントはcomponents配下にあるため問題なし）
    '!../app/**',
  ],
  {
    eager: true,
  },
) as Record<string, Record<string, unknown>>;

// すべてのストーリーに対してVRTテストを定義
defineVRTTests(storyFiles, {
  composeStories,
  stabilizationDelay: 300,
});
