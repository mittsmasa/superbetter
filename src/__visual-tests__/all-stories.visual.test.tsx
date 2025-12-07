import type { Meta, ReactRenderer, StoryObj } from '@storybook/nextjs-vite';
import { composeStories } from '@storybook/nextjs-vite';
import type React from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

type StoryModule = {
  default: Meta<ReactRenderer>;
  [key: string]: StoryObj | Meta<ReactRenderer>;
};

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
  for (const [storyName, Story] of Object.entries<
    React.ComponentType & {
      tags?: string[];
      run?: () => Promise<void>;
    }
  >(composedStories)) {
    // skip-vrtタグがある場合はスキップ
    if (Story.tags?.includes('skip-vrt')) {
      continue;
    }

    test(`${componentName} - ${storyName}`, async () => {
      if (Story.run) {
        await Story.run();
      }

      const container = page.getByTestId('vrt-root');

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
