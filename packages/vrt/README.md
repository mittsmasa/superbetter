# @superbetter/vrt

Storybook + Vitest Browser Mode による Visual Regression Testing パッケージ。
Next.js/Vite + React プロジェクト向けに設計されています。

## Features

- フレームワーク非依存: composeStories を外部から注入する設計
- 自動スクリーンショットテスト: Storybook ストーリーから自動生成
- 高速実行: Vitest Browser Mode による並列実行
- 簡単統合: 60行のボイラープレートを5行に削減
- HTMLレポート: フィルター機能、画像拡大表示、コンパクトUI

## Installation

```bash
pnpm add -D @superbetter/vrt@workspace:*
```

## Quick Start

### 1. VRTテストファイルの作成

```typescript
// src/__visual-tests__/all-stories.visual.test.tsx
import { defineVRTTests } from '@superbetter/vrt';
import { composeStories } from '@storybook/nextjs-vite';

const storyFiles = import.meta.glob<Record<string, unknown>>(
  '../**/*.stories.tsx',
  { eager: true },
);

defineVRTTests(storyFiles, {
  composeStories,
  stabilizationDelay: 300,
});
```

### 2. Storybook Preview設定

```tsx
// .storybook/preview.tsx
import { isVitestVRT, VRTScreenshotBoundary } from '@superbetter/vrt/storybook';

const preview: Preview = {
  decorators: [
    (Story) => (
      <VRTScreenshotBoundary>
        <Story />
      </VRTScreenshotBoundary>
    ),
  ],
};
```

### 3. Vitest設定にレポーターを追加

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    reporters: ['default', '@superbetter/vrt/reporter'],
  },
});
```

### 4. テスト実行

```bash
# VRTテスト実行
pnpm run test:visual

# HTMLレポートを開く
open .vitest-vrt-report/index.html
```

## カスタマイズ

### 特定のストーリーをスキップ

```typescript
export const AnimatedStory: Story = {
  parameters: {
    screenshot: { skip: true },
  },
};
```

### カスタムファイル名フォーマッター

```typescript
defineVRTTests(storyFiles, {
  composeStories,
  fileNameFormatter: (componentName, storyName) =>
    `${componentName}__${storyName}`.toLowerCase(),
});
```

## License

UNLICENSED - Internal use only
