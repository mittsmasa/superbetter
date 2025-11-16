# Figma to PandaCSS Conversion Guide

> Guidelines for converting Figma design properties to PandaCSS styles for the SuperBetter project.

## Overview

When using `/reconcile-component`, this guide helps translate Figma design tokens and properties into PandaCSS `css()` function calls that follow project conventions.

## Import Pattern

Always import from styled-system:

```typescript
import { css } from '@/styled-system/css'
```

## Typography Conversion

### Figma → PandaCSS textStyle

SuperBetter uses predefined `textStyle` patterns instead of individual font properties.

**Common textStyle Patterns:**
- `textStyle: 'Heading.primary'` - Primary headings
- `textStyle: 'Heading.secondary'` - Secondary headings
- `textStyle: 'Body.primary'` - Body text
- `textStyle: 'Body.secondary'` - Secondary body text
- `textStyle: 'Caption'` - Small text, captions

**Figma to textStyle mapping:**

| Figma Properties | PandaCSS textStyle |
|------------------|-------------------|
| Font Size: 24px, Weight: Bold | `textStyle: 'Heading.primary'` |
| Font Size: 18px, Weight: SemiBold | `textStyle: 'Heading.secondary'` |
| Font Size: 16px, Weight: Regular | `textStyle: 'Body.primary'` |
| Font Size: 14px, Weight: Regular | `textStyle: 'Body.secondary'` |
| Font Size: 12px, Weight: Regular | `textStyle: 'Caption'` |

**Example:**

```typescript
// ❌ Don't: Individual font properties
<div className={css({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.5
})}>

// ✅ Do: Use textStyle
<div className={css({
  textStyle: 'Body.primary'
})}>
```

### Custom Typography (when textStyle doesn't match)

If Figma design doesn't match existing textStyles, specify properties individually:

```typescript
<div className={css({
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '-0.02em'
})}>
```

## Color Conversion

### Color Properties

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Fill (background) | `bg` or `backgroundColor` |
| Text color | `color` |
| Stroke (border) | `borderColor` |

**Example:**

```typescript
// Figma: Fill #3B82F6, Text #FFFFFF
<div className={css({
  bg: '#3B82F6',
  color: '#FFFFFF'
})}>
```

### Using Design Tokens (if available)

If PandaCSS theme tokens are defined, prefer tokens over hex values:

```typescript
// ✅ Prefer: Design tokens
<div className={css({
  bg: 'blue.500',
  color: 'white'
})}>

// ❌ Avoid: Hard-coded hex (unless no token exists)
<div className={css({
  bg: '#3B82F6',
  color: '#FFFFFF'
})}>
```

## Spacing Conversion

### Padding and Margin

Figma spacing values can be directly translated:

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Padding | `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` |
| Margin | `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` |
| Gap (Auto Layout) | `gap`, `rowGap`, `columnGap` |

**Example:**

```typescript
// Figma: Padding 16px, Gap 8px
<div className={css({
  p: '16px',
  gap: '8px'
})}>
```

**Shorthand usage:**

```typescript
// Equal padding on all sides
p: '16px'

// Horizontal and vertical
px: '16px', // Horizontal (left + right)
py: '8px'   // Vertical (top + bottom)

// Individual sides
pt: '8px',  // Padding top
pr: '16px', // Padding right
pb: '8px',  // Padding bottom
pl: '16px'  // Padding left
```

## Layout Conversion

### Figma Auto Layout → Flexbox

Figma's Auto Layout translates to CSS Flexbox:

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Horizontal layout | `display: 'flex', flexDirection: 'row'` |
| Vertical layout | `display: 'flex', flexDirection: 'column'` |
| Space between | `justifyContent: 'space-between'` |
| Center align | `alignItems: 'center'` |
| Gap | `gap: '8px'` |

**Example:**

```typescript
// Figma: Horizontal Auto Layout, Gap 8px, Center aligned
<div className={css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px'
})}>
```

### Common Layout Patterns

**Centered content:**
```typescript
css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
```

**Vertical stack:**
```typescript
css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
})
```

**Horizontal row:**
```typescript
css({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center'
})
```

## Borders and Corners

### Standard Borders

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Border width | `borderWidth` or `border` |
| Border color | `borderColor` |
| Border radius | `borderRadius` |

**Example:**

```typescript
// Figma: 1px solid border, #E5E7EB color, 8px radius
<div className={css({
  border: '1px solid',
  borderColor: '#E5E7EB',
  borderRadius: '8px'
})}>
```

### Pixel Border (SuperBetter specific)

SuperBetter has a special `pixelBorder` utility for retro pixel-style borders.

**Usage:**

```typescript
import { pixelBorder } from '@/lib/utils'

// ❌ Don't: Regular border radius for pixel style
<div className={css({
  borderRadius: '4px'
})}>

// ✅ Do: Use pixelBorder utility
<div className={css(pixelBorder)}>
```

**When to use `pixelBorder`:**
- Components with retro/pixel art aesthetic
- Matching SuperBetter's game-inspired design
- When Figma design shows sharp, pixelated corners

**When NOT to use `pixelBorder`:**
- Modern, smooth rounded corners
- Circular elements
- Standard card designs

## Box Shadow

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Drop Shadow | `boxShadow` |

**Example:**

```typescript
// Figma: Drop Shadow (0px 4px 8px rgba(0,0,0,0.1))
<div className={css({
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
})}>
```

**Common shadow patterns:**

```typescript
// Small shadow
boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'

// Medium shadow
boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'

// Large shadow
boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
```

## Sizing

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Width | `w` or `width` |
| Height | `h` or `height` |
| Min/Max Width | `minW`, `maxW` |
| Min/Max Height | `minH`, `maxH` |

**Example:**

```typescript
// Figma: Width 200px, Height 40px
<div className={css({
  w: '200px',
  h: '40px'
})}>

// Responsive width with max constraint
<div className={css({
  w: '100%',
  maxW: '600px'
})}>
```

## Opacity and Visibility

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Opacity | `opacity` |
| Visible/Hidden | `visibility` or `display: 'none'` |

**Example:**

```typescript
// Figma: 50% opacity
<div className={css({
  opacity: 0.5
})}>
```

## Position and Z-Index

| Figma Property | PandaCSS Property |
|----------------|-------------------|
| Position | `position` |
| Top/Right/Bottom/Left | `top`, `right`, `bottom`, `left` |
| Z-Index (layer order) | `zIndex` |

**Example:**

```typescript
// Figma: Absolute position, top 10px, left 20px
<div className={css({
  position: 'absolute',
  top: '10px',
  left: '20px',
  zIndex: 10
})}>
```

## Complete Example

### Figma Design Properties

```
Component: PrimaryButton
- Fill: #3B82F6
- Text: "Click me", #FFFFFF, 16px, Weight 600
- Padding: 12px 24px
- Border Radius: 8px
- Gap: 8px (icon + text)
- Layout: Horizontal, Center aligned
- Hover: Fill #2563EB
```

### Converted PandaCSS Component

```typescript
import { css } from '@/styled-system/css'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={css({
        // Layout
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',

        // Spacing
        px: '24px',
        py: '12px',

        // Colors
        bg: '#3B82F6',
        color: '#FFFFFF',

        // Typography
        textStyle: 'Body.primary',
        fontWeight: 600,

        // Borders
        border: 'none',
        borderRadius: '8px',

        // Cursor
        cursor: 'pointer',

        // Hover state
        _hover: {
          bg: '#2563EB'
        }
      })}
    >
      {children}
    </button>
  )
}
```

## Tips for Reconciliation

1. **Start with layout**: Get flex/grid structure right first
2. **Apply spacing**: Padding, margin, gap
3. **Add colors**: Background, text, borders
4. **Typography**: Use textStyle when possible
5. **Fine-tune**: Border radius, shadows, hover states
6. **Test in Storybook**: Visual verification against Figma

## Common Pitfalls

❌ **Mixing units**: Use consistent units (prefer `px` or design tokens)

```typescript
// ❌ Don't
{ p: '16px', m: '1rem', gap: '8' }

// ✅ Do
{ p: '16px', m: '16px', gap: '8px' }
```

❌ **Ignoring hover/active states**: Always implement interactive states

```typescript
// ❌ Don't (missing hover)
{ bg: '#3B82F6' }

// ✅ Do
{ bg: '#3B82F6', _hover: { bg: '#2563EB' } }
```

❌ **Not using project conventions**: Always check existing components

```typescript
// ❌ Don't
{ fontSize: '16px', fontWeight: 400 }

// ✅ Do
{ textStyle: 'Body.primary' }
```

## Reference

- PandaCSS Documentation: https://panda-css.com/
- SuperBetter Component Patterns: `src/components/`
- Project Styling Guide: `CLAUDE.md`
