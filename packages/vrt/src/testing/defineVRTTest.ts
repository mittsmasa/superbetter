/**
 * Define a single VRT test
 */

import { test } from 'vitest';
import type { ComposedStory } from '../types';
import { testVRTStory } from './testVRTStory';

export interface DefineVRTTestOptions {
  /** Test ID for screenshot boundary element. Default: 'vrt-root' */
  testId?: string;
  /** Delay in ms for rendering stabilization. Default: 300 */
  stabilizationDelay?: number;
  /** Custom file name formatter */
  fileNameFormatter?: (componentName: string, storyName: string) => string;
}

/**
 * Define a VRT test for a single composed story
 */
export function defineVRTTest(
  componentName: string,
  storyName: string,
  story: ComposedStory,
  options: DefineVRTTestOptions = {},
): void {
  const {
    testId = 'vrt-root',
    stabilizationDelay = 300,
    fileNameFormatter = (comp, name) => `${comp}-${name.toLowerCase()}.png`,
  } = options;

  const fileName = fileNameFormatter(componentName, storyName);

  test(`${componentName} - ${storyName}`, async () => {
    await testVRTStory(story, componentName, storyName, {
      testId,
      stabilizationDelay,
      fileName,
    });
  });
}
