# Button Specification

> This specification defines the ideal state for the Button component. Used by `/reconcile-component` command to align implementation with design and requirements.

## Figma Design

- **Design File URL**: `[To be filled with Figma link]`
- **Node ID**: `[To be filled]`
- **Last Updated**: `2025-01-16`

## Requirements

Functional requirements for the Button component:

- [x] Displays button with primary styling by default
- [x] Supports secondary variant
- [x] Supports disabled state
- [x] Supports full-width option
- [x] Handles click events
- [x] Provides tactile feedback on tap (via useTapFeeling hook)
- [x] Uses pixel-style border (pixelBorder pattern)
- [ ] Supports loading state (future enhancement)
- [ ] Supports icon + text combination (future enhancement)

## Visual States

Expected visual variants for Storybook:

- [x] **Default (Primary)**: Primary background color with alt border
- [x] **Primary Disabled**: Disabled background color with disabled border
- [x] **Secondary**: Secondary background color with alt border
- [x] **Secondary Disabled**: Secondary background with disabled border and text
- [ ] **Hover**: Interactive feedback state (implemented via useTapFeeling)
- [ ] **Active/Pressed**: Press state (implemented via useTapFeeling)
- [ ] **Full Width**: Button stretched to 100% width
- [ ] **Loading**: Shows loading spinner (future)

## Props

Expected component props and their types:

```typescript
interface ButtonProps {
  children: React.ReactNode // Button label or content
  variant?: 'primary' | 'secondary' // Button style variant (default: 'primary')
  full?: boolean // Full-width button (default: false)
  disabled?: boolean // Disabled state
  type?: 'button' | 'submit' | 'reset' // Button type (default: 'button')
  onClick?: () => void // Click event handler
}
```

## Additional Component: ButtonLink

The Button component also exports a `ButtonLink` variant for navigation:

```typescript
interface ButtonLinkProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  href: string // Next.js Link href
}
```

## Styling Guidelines

Key visual properties from implementation:

### Colors

**Primary Variant:**
- **Background**: `background.alt` token
- **Text**: `foreground.alt` token
- **Border**: `interactive.border.alt` token (2px)
- **Disabled Background**: `foreground.disabled` token
- **Disabled Border**: `interactive.border.disabled` token

**Secondary Variant:**
- **Background**: `background` token
- **Text**: `foreground` token
- **Border**: `interactive.border.alt` token (2px)
- **Disabled Text**: `foreground.disabled` token
- **Disabled Border**: `interactive.border.disabled` token

### Typography
- **Font**: PandaCSS textStyle: `'Body.primary'`
- **Font Size**: Inherited from `Body.primary` textStyle
- **Font Weight**: Inherited from `Body.primary` textStyle

### Spacing
- **Padding**: `8px` (all sides)
- **Border Width**: `2px` (via pixelBorder pattern)

### Layout
- **Display**: Inline button (default)
- **Full Width**: `width: 100%` when `full={true}`
- **Cursor**: `pointer` (default), `not-allowed` (disabled)

### Special Effects
- **Border**: Uses `pixelBorder` pattern for retro pixel-art style
- **Transition**: `width 0.2s` for full-width animation
- **Tap Feedback**: Implemented via `useTapFeeling` hook (scale/transform effect)

### Accessibility
- **Disabled Cursor**: Cursor changes to `unset` or `not-allowed` when disabled
- **Pointer Events**: Disabled for ButtonLink when `disabled={true}`

## Implementation Details

### CVA (Class Variance Authority) Usage

The component uses `cva` for variant management:

```typescript
const button = cva({
  base: {
    cursor: 'pointer',
    padding: '8px',
    textStyle: 'Body.primary',
    transition: '[width 0.2s]',
    _disabled: {
      cursor: 'unset',
    },
  },
  variants: {
    full: {
      true: { width: '[100%]' },
    },
    variant: {
      primary: {
        backgroundColor: 'background.alt',
        color: 'foreground.alt',
        _disabled: { backgroundColor: 'foreground.disabled' },
      },
      secondary: {
        backgroundColor: 'background',
        color: 'foreground',
        _disabled: { color: 'foreground.disabled' },
      },
    },
  },
  defaultVariants: { variant: 'primary', full: false },
})
```

### Pixel Border Pattern

Uses project-specific `pixelBorder` utility:

```typescript
pixelBorder({
  borderWidth: 2,
  borderColor: props.disabled
    ? 'interactive.border.disabled'
    : 'interactive.border.alt',
})
```

### Tap Feeling Hook

Provides tactile feedback on user interaction:

```typescript
const feeling = useTapFeeling()
// Applied via feeling.props and feeling.cssRaw
```

## Acceptance Criteria

Conditions for successful reconciliation:

- [x] Visual appearance matches design tokens (colors, spacing, typography)
- [x] All required props are implemented (variant, full, disabled, onClick)
- [x] Primary and Secondary variants work correctly
- [x] Disabled state prevents interactions and updates visual style
- [x] Pixel border pattern applied consistently
- [x] Full-width option works correctly
- [x] Component follows PandaCSS patterns (cva, textStyle, pixelBorder)
- [x] TypeScript types are properly defined
- [x] No linting or type errors
- [x] Storybook stories cover main variants (Default, Disabled, Secondary, SecondaryDisabled)
- [ ] Storybook stories for Full-width variant (missing)
- [ ] Hover/Active state documentation (implemented but not explicitly in Storybook)

## Current Storybook Coverage

Existing stories:
1. ✅ **Default**: Primary variant, enabled
2. ✅ **Disabled**: Primary variant, disabled
3. ✅ **Secondary**: Secondary variant, enabled
4. ✅ **SecondaryDisabled**: Secondary variant, disabled

Missing stories:
1. ❌ **Full Width**: Demonstrates `full={true}` option
2. ❌ **ButtonLink**: Demonstrates link variant

## Notes

- The component uses design tokens extensively, making it theme-aware
- The `useTapFeeling` hook provides interactive feedback without explicit hover states
- ButtonLink component shares most styling but uses Next.js Link under the hood
- The pixel border pattern is a SuperBetter-specific design convention
- Type is strongly typed to prevent invalid button types

## Future Enhancements

Potential improvements to consider:

1. **Loading State**: Add `loading` prop with spinner
2. **Icon Support**: Add `icon` prop for icon + text combination
3. **Size Variants**: Add `size` prop (small, medium, large)
4. **Full Width Story**: Add Storybook story demonstrating full-width option
5. **ButtonLink Story**: Create separate story file for ButtonLink component
6. **Accessibility**: Add ARIA attributes for better screen reader support

## References

- Implementation: `src/components/button/index.tsx`
- Stories: `src/components/button/index.stories.tsx`
- PandaCSS Patterns: `@/styled-system/patterns` (pixelBorder)
- Design Tokens: Theme configuration in PandaCSS
- Tap Feeling Hook: `@/hooks/feeling`
