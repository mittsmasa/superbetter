import '../src/app/globals.css';
import type { Preview } from '@storybook/react';
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
  },
};

export default preview;
