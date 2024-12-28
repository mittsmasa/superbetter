import type { Meta, StoryObj } from '@storybook/react';
import { FooterNavigation } from '.';

const meta = {
  component: FooterNavigation,
} satisfies Meta<typeof FooterNavigation>;

export default meta;

type Story = StoryObj<typeof FooterNavigation>;

export const Default = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/me',
      },
    },
  },
} satisfies Story;
