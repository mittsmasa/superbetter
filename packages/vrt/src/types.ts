/**
 * Common types used across the package
 */

import type React from 'react';

export interface VitestBrowserVRTPluginOptions {
  /** Timezone ID for consistent screenshot rendering. Default: 'Asia/Tokyo' */
  timezoneId?: string;
  /** Browser viewport size. Default: { width: 1280, height: 768 } */
  viewport?: { width: number; height: number };
  /** Screenshot comparison threshold (0-1). Default: 0.1 */
  threshold?: number;
}

export interface StoryModule {
  default: {
    title?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type ComposedStory = React.ComponentType & {
  parameters?: {
    screenshot?: {
      skip?: boolean;
    };
  };
  tags?: string[];
  run?: () => Promise<void>;
};

export type ComposedStories = Record<string, ComposedStory>;

export interface DefineVRTTestsOptions {
  /** Framework-specific composeStories function (required) */
  composeStories: (storyModule: StoryModule) => ComposedStories;
  /** Test ID for screenshot boundary element. Default: 'vrt-root' */
  testId?: string;
  /** Delay in ms for rendering stabilization. Default: 300 */
  stabilizationDelay?: number;
  /** Custom file name formatter */
  fileNameFormatter?: (componentName: string, storyName: string) => string;
  /** Custom function to skip stories */
  shouldSkip?: (story: ComposedStory) => boolean;
  /** Custom test name formatter */
  testNameFormatter?: (componentName: string, storyName: string) => string;
}

export interface TestVRTStoryOptions {
  /** Test ID for screenshot boundary element. Default: 'vrt-root' */
  testId?: string;
  /** Delay in ms for rendering stabilization. Default: 300 */
  stabilizationDelay?: number;
  /** Screenshot file name */
  fileName: string;
}

export interface VRTReportOptions {
  /** Path to Vitest JSON output file */
  jsonOutputPath: string;
  /** Directory to output HTML report */
  htmlOutputDir: string;
}
