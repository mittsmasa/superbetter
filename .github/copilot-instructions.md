## コンポーネント
以下のようなスタイルでコンポーネントを定義する
```tsx
import { css } from '@/styled-system/css';
import type { PropsWithChildren } from 'react';

export const ExampleButton = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={css({ textStyle: 'Heading.primary' })}
    >
      {children}
    </button>
  );
};

```

## ストーリー
以下のようなスタイルでストーリーを定義

```tsx
import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ExampleButton } from '.';

const meta = {
  component: ExampleButton,
  args: {
    onClick: fn(),
    children: 'ボタン',
  },
} satisfies Meta<typeof ExampleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

```