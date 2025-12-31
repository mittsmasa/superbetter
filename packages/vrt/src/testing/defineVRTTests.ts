/**
 * Define VRT tests for multiple stories
 */

import type {
  ComposedStory,
  DefineVRTTestsOptions,
  StoryModule,
} from '../types';
import { defineVRTTest } from './defineVRTTest';

/**
 * Default skip checker - skips stories with skip-vrt tag or screenshot.skip parameter
 */
function defaultShouldSkip(story: ComposedStory): boolean {
  // Check for skip-vrt tag
  if (story.tags?.includes('skip-vrt')) {
    return true;
  }
  // Check for screenshot.skip parameter
  if (story.parameters?.screenshot?.skip) {
    return true;
  }
  return false;
}

/**
 * Define VRT tests for all stories in a module collection
 *
 * @example
 * ```typescript
 * const storyFiles = import.meta.glob<Record<string, unknown>>(
 *   '../**\/*.stories.tsx',
 *   { eager: true },
 * );
 *
 * defineVRTTests(storyFiles, {
 *   composeStories,
 *   stabilizationDelay: 300,
 * });
 * ```
 */
export function defineVRTTests(
  storyFiles: Record<string, Record<string, unknown>>,
  options: DefineVRTTestsOptions,
): void {
  const {
    composeStories,
    testId = 'vrt-root',
    stabilizationDelay = 300,
    fileNameFormatter = (comp, name) => `${comp}-${name.toLowerCase()}.png`,
    shouldSkip = defaultShouldSkip,
  } = options;
  // Note: testNameFormatter は将来の拡張用に予約されています

  // Process each story file
  for (const [filePath, storyModule] of Object.entries(storyFiles)) {
    // Get the component name from the story module's title or file path
    const meta = storyModule.default as StoryModule['default'];
    let componentName = meta?.title?.replace(/\//g, '-');

    // If no title, derive from file path
    if (!componentName) {
      // Extract component name from path like "../components/button/index.stories.tsx"
      const match = filePath.match(/\/([^/]+)\/[^/]*\.stories\.[tj]sx?$/);
      componentName = match?.[1] ?? 'Unknown';
    }

    if (!componentName || componentName === 'Unknown') {
      continue;
    }

    // Compose all stories from the module
    const composedStories = composeStories(storyModule as StoryModule);

    // Create a test for each story
    for (const [storyName, story] of Object.entries(composedStories)) {
      // Skip if the story should be skipped
      if (shouldSkip(story)) {
        continue;
      }

      defineVRTTest(componentName, storyName, story, {
        testId,
        stabilizationDelay,
        fileNameFormatter,
      });
    }
  }
}
