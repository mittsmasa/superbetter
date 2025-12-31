/**
 * Storybook helpers for VRT
 */

import type React from 'react';

/**
 * Check if we're running in Vitest VRT mode
 */
export function isVitestVRT(): boolean {
  if (typeof window !== 'undefined') {
    return !!(window as Window & { __VITEST_VRT__?: boolean }).__VITEST_VRT__;
  }
  return false;
}

/**
 * Screenshot boundary component for VRT
 * Wraps stories with a div that has the VRT test ID
 */
export function VRTScreenshotBoundary({
  children,
  testId = 'vrt-root',
}: {
  children: React.ReactNode;
  testId?: string;
}): React.ReactElement {
  return <div data-testid={testId}>{children}</div>;
}
