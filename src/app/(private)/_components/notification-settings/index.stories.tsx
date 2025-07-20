import type { Meta, StoryObj } from '@storybook/react';
import { NotificationSettings } from './index';

const meta = {
  title: 'Private/NotificationSettings',
  component: NotificationSettings,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialSettings: {
      dailyMissionReminder: true,
      reminderTime: '20:00:00',
      enablePushNotifications: false,
    },
  },
};

export const NotificationsDisabled: Story = {
  args: {
    initialSettings: {
      dailyMissionReminder: false,
      reminderTime: '20:00:00',
      enablePushNotifications: false,
    },
  },
};

export const EarlyReminder: Story = {
  args: {
    initialSettings: {
      dailyMissionReminder: true,
      reminderTime: '08:00:00',
      enablePushNotifications: true,
    },
  },
};

export const LateReminder: Story = {
  args: {
    initialSettings: {
      dailyMissionReminder: true,
      reminderTime: '22:30:00',
      enablePushNotifications: true,
    },
  },
};