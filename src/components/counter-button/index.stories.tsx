import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { flex } from '@/styled-system/patterns';
import { CounterButton } from './index';

const meta = {
  component: CounterButton,
  args: {
    label: 'カウンター',
  },
} satisfies Meta<typeof CounterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'count',
  },
};

export const WithDefaultValue: Story = {
  args: {
    name: 'count',
    defaultValue: 3,
  },
};

export const WithForm: Story = {
  render: (args) => {
    return (
      <form
        className={flex({ gap: '16px', flexDirection: 'column' })}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          alert(`Count: ${formData.get('items')}`);
        }}
      >
        <CounterButton {...args} />
        <button type="submit">Submit</button>
      </form>
    );
  },
  args: {
    name: 'items',
  },
};

export const WithOnChange: Story = {
  render: (args) => {
    const [count, setCount] = useState(args.defaultValue ?? 0);

    return (
      <div className={flex({ gap: '16px', flexDirection: 'column' })}>
        <CounterButton
          {...args}
          defaultValue={count}
          onChange={(value) => {
            setCount(value);
            args.onChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    name: 'count',
    defaultValue: 0,
    onChange: fn(),
  },
};

export const WithLongLabel: Story = {
  args: {
    name: 'count',
    label:
      'すっごく長いラベルを想定しています。1行に収まらないほど長いラベルです。',
  },
};
