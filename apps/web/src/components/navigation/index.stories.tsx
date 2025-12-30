import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FooterNavigation } from '.';

const meta = {
  component: FooterNavigation,
} satisfies Meta<typeof FooterNavigation>;

export default meta;

type Story = StoryObj<typeof FooterNavigation>;

export const Default = {
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/me',
      },
    },
  },
} satisfies Story;
