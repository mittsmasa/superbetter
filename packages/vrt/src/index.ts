/**
 * @superbetter/vrt
 *
 * Storybook + Vitest Browser Mode VRT environment
 */

// Setup
export { setupVitestVRT } from './setup/vitest-setup';

// Storybook helpers
export { isVitestVRT, VRTScreenshotBoundary } from './storybook/index';
export type { DefineVRTTestOptions } from './testing/index';
// Testing utilities (main API)
export { defineVRTTest, defineVRTTests, testVRTStory } from './testing/index';

// Types (commonly used)
export type {
  ComposedStories,
  ComposedStory,
  DefineVRTTestsOptions,
  StoryModule,
} from './types';
