/**
 * VRT Test for all Storybook stories in @superbetter/ui
 */

import { composeStories } from '@storybook/react-vite';
import { defineVRTTests } from '@superbetter/vrt';

const storyFiles = import.meta.glob<Record<string, unknown>>(
  ['../components/**/*.stories.tsx'],
  {
    eager: true,
  },
);

defineVRTTests(storyFiles, {
  composeStories,
  stabilizationDelay: 300,
});
