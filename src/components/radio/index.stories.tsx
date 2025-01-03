import { css } from '@/styled-system/css';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '.';

const meta = {
  component: Radio,
  args: {
    label: 'ラジオボタン',
    name: 'radio-button',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (props) => (
    <div className={css({ display: 'flex', flexDirection: 'column' })}>
      <Radio {...props} />
      <Radio {...props} />
    </div>
  ),
} satisfies Story;
