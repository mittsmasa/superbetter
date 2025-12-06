import type { Meta, ReactRenderer, StoryObj } from '@storybook/nextjs-vite';
import { composeStories } from '@storybook/nextjs-vite';
import type React from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { css } from '@/styled-system/css';

type StoryModule = {
  default: Meta<ReactRenderer>;
  [key: string]: StoryObj | Meta<ReactRenderer>;
};

// ビューポート調整の制約
const VIEWPORT_CONSTRAINTS = {
  PADDING: 32, // 16px * 2 (上下左右)
  MIN_WIDTH: 320, // 最小幅
  MAX_WIDTH: 1920, // 最大幅
  MIN_HEIGHT: 100, // 最小高さ
  MAX_HEIGHT: 1080, // 最大高さ
  SETTLE_DELAY: 100, // レイアウト安定化待機 (ms)
} as const;

/**
 * コンポーネントサイズに基づいて適切なビューポートサイズを計算
 */
function calculateViewportSize(rect: DOMRect): {
  width: number;
  height: number;
} {
  const contentWidth = Math.ceil(rect.width);
  const contentHeight = Math.ceil(rect.height);

  return {
    width: Math.max(
      VIEWPORT_CONSTRAINTS.MIN_WIDTH,
      Math.min(VIEWPORT_CONSTRAINTS.MAX_WIDTH, contentWidth),
    ),
    height: Math.max(
      VIEWPORT_CONSTRAINTS.MIN_HEIGHT,
      Math.min(VIEWPORT_CONSTRAINTS.MAX_HEIGHT, contentHeight),
    ),
  };
}

// Viteのimport.meta.globでストーリーファイルを動的インポート
const storyFiles = import.meta.glob<StoryModule>('../**/*.stories.tsx', {
  eager: true,
});

// 各ストーリーファイルをループ
for (const [filePath, storyModule] of Object.entries(storyFiles)) {
  // ファイルパスからコンポーネント名を抽出
  const componentName = extractComponentName(filePath);

  // composeStoriesでストーリーを抽出
  const composedStories = composeStories(storyModule);

  // 各ストーリーをテスト化
  for (const [storyName, Story] of Object.entries(composedStories)) {
    // StoryをReactコンポーネントとして型アサーション
    const StoryComponent = Story as React.ComponentType;
    const storyWithMethods = Story as {
      tags?: string[];
      run?: () => Promise<void>;
    };

    // skip-vrtタグがある場合はスキップ
    if (storyWithMethods.tags?.includes('skip-vrt')) {
      continue;
    }

    test(`${componentName} - ${storyName}`, async () => {
      // 1. Story.run()でStorybookのplay関数などを実行
      if (storyWithMethods.run) {
        await storyWithMethods.run();
      }

      // 2. 16px padding のラッパー要素でレンダリング
      const { container } = await render(
        <div className={css({ padding: '16px' })}>
          <StoryComponent />
        </div>,
      );

      // 3. コンポーネントサイズを測定
      const rect = container.getBoundingClientRect();

      // 4. エラーハンドリング: サイズが異常値の場合はデフォルト値を使用
      if (
        rect.width <= 0 ||
        rect.height <= 0 ||
        !Number.isFinite(rect.width) ||
        !Number.isFinite(rect.height)
      ) {
        console.warn(
          `Invalid dimensions for ${componentName} - ${storyName}, using defaults`,
        );
        await page.viewport(
          VIEWPORT_CONSTRAINTS.MIN_WIDTH,
          VIEWPORT_CONSTRAINTS.MIN_HEIGHT,
        );
      } else {
        // 5. 動的ビューポート調整
        const { width, height } = calculateViewportSize(rect);
        await page.viewport(width, height);
      }

      // 6. レイアウト安定化待機
      await new Promise((resolve) =>
        setTimeout(resolve, VIEWPORT_CONSTRAINTS.SETTLE_DELAY),
      );

      // 7. コンポーネント全体のスクリーンショットを撮影して比較
      await expect(container).toMatchScreenshot(
        `${componentName}-${storyName.toLowerCase()}.png`,
      );
    });
  }
}

/**
 * ファイルパスからコンポーネント名を抽出
 * index.stories.tsxの場合はディレクトリ名のみ、それ以外はディレクトリ名-ファイル名を返す
 */
function extractComponentName(filePath: string): string {
  const parts = filePath.split('/').filter((p) => p !== '..');
  const storyFileIndex = parts.findIndex((p) => p.endsWith('.stories.tsx'));
  const dirName = parts[storyFileIndex - 1] || 'unknown';

  // ストーリーファイル名を取得（.stories.tsxを除く）
  const fileName = parts[storyFileIndex].replace('.stories.tsx', '');

  // index.stories.tsx の場合はディレクトリ名のみ、それ以外はディレクトリ名-ファイル名
  if (fileName === 'index') {
    return dirName;
  }
  return `${dirName}-${fileName}`;
}
