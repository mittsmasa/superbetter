/**
 * Test a single VRT story
 */

import { expect } from 'vitest';
import { page } from 'vitest/browser';
import type { ComposedStory, TestVRTStoryOptions } from '../types';

/**
 * Run a VRT test for a single composed story
 */
export async function testVRTStory(
  story: ComposedStory,
  componentName: string,
  storyName: string,
  options: TestVRTStoryOptions,
): Promise<void> {
  const { testId = 'vrt-root', stabilizationDelay = 300, fileName } = options;

  // Step 1: Render the story
  try {
    if (!story.run) {
      throw new Error(
        `Story "${componentName} > ${storyName}" does not have a run() method.\n` +
          'This may happen if:\n' +
          `1. You're using an incompatible Storybook version (requires Storybook 10+)\n` +
          '2. The story was not composed correctly\n' +
          '3. The composeStories function is not from the correct framework package',
      );
    }

    await story.run();
  } catch (error) {
    throw new Error(
      `Failed to render story "${componentName} > ${storyName}".\n` +
        `Error: ${error instanceof Error ? error.message : String(error)}\n` +
        'Check if the story has proper args or if there are runtime errors.',
    );
  }

  // Step 2: Wait for stabilization
  await new Promise((resolve) => setTimeout(resolve, stabilizationDelay));

  // Step 3: Find the VRT root element and take screenshot
  const element = page.getByTestId(testId);

  // Take screenshot and compare
  await expect(element).toMatchScreenshot(fileName);
}
