import '../src/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';
import { VRTScreenshotBoundary } from '@superbetter/vrt/storybook';
import Script from 'next/script';
import { css } from '@/styled-system/css';
import { pixelMPlus } from '../src/fonts';

const preview: Preview = {
  decorators: [
    (Story) => (
      <VRTScreenshotBoundary>
        <div
          className={css({
            padding: '16px',
            width: '[fit-content]',
          })}
        >
          <Story />
          <Script>
            {`document.body.classList.add('${pixelMPlus.className}');`}
          </Script>
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
        dark: { name: 'Dark', value: '#333' },
        light: { name: 'Light', value: '#F7F9F2' },
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;
