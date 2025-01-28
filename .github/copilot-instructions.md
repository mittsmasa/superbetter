## ページ

以下のようなスタイルでページを定義する

```typescript
import { css } from '@/styled-system/css';
import { use } from 'react';

const Page = (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <main className={css({ textStyle: 'Body.primary' })}>
      <h1 className={css({ textStyle: 'Heading.primary' })}>
        Mission: {params.id}
      </h1>
      {/* Add more content here */}
    </main>
  );
};

export default Page;
```

## コンポーネント

以下のようなスタイルでコンポーネントを定義する

```typescript
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

```typescript
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