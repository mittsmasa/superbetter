import { setProjectAnnotations } from '@storybook/nextjs-vite';
import { beforeAll } from 'vitest';
import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);

beforeAll(async () => {
  // タイムゾーンをUTCに設定
  process.env.TZ = 'UTC';

  // Storybookのグローバルセットアップを実行
  // await annotations.beforeAll?.();

  // フォントの読み込みを待つ
  if (typeof document !== 'undefined') {
    await document.fonts.ready;
  }
});
