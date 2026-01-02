import type { Preview } from '@storybook/react-vite';
import { VRTScreenshotBoundary } from '@superbetter/vrt/storybook';
import { css } from '../src/styled-system/css';
import './globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <VRTScreenshotBoundary>
        <div
          className={css({
            padding: '16px',
            width: '[fit-content]',
            backgroundColor: 'background',
            color: 'foreground',
          })}
        >
          <Story />
        </div>
      </VRTScreenshotBoundary>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#000' },
        light: { name: 'Light', value: '#F7F9F2' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;
