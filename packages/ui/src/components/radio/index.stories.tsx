import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '../../styled-system/css';
import { Radio } from '.';

const meta = {
  component: Radio,
  args: {
    label: 'Radio button',
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
