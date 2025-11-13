import '../src/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';
import Script from 'next/script';
import { pixelMPlus } from '../src/fonts';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Script>
          {`document.body.classList.add('${pixelMPlus.className}');`}
        </Script>
      </div>
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
