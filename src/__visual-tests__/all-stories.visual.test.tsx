import type { Meta, ReactRenderer, StoryObj } from '@storybook/nextjs-vite';
import { composeStories } from '@storybook/nextjs-vite';
import type React from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

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

      // 2. vitest-browser-reactでコンポーネント全体をレンダリング
      const { container } = await render(<StoryComponent />);

      // 3. コンポーネント全体のスクリーンショットを撮影して比較
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
