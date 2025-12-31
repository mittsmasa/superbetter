/**
 * Vitest setup for VRT
 */

import { beforeAll } from 'vitest';

/**
 * Setup VRT environment
 */
export function setupVitestVRT(): void {
  beforeAll(async () => {
    // Set VRT flag on window
    if (typeof window !== 'undefined') {
      (window as Window & { __VITEST_VRT__?: boolean }).__VITEST_VRT__ = true;
    }

    // Set timezone to UTC for consistent screenshots
    process.env.TZ = 'UTC';

    // Wait for fonts to load
    if (typeof document !== 'undefined') {
      await document.fonts.ready;
    }
  });
}
