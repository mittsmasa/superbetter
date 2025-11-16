# [Component Name] Specification

> This specification defines the ideal state for the component. Used by `/reconcile-component` command to align implementation with design and requirements.

## Figma Design

- **Design File URL**: `[Figma file URL]`
- **Node ID**: `[Figma node ID]` (optional, for specific component node)
- **Last Updated**: `[YYYY-MM-DD]`

### How to get Figma Node ID:
1. Open Figma design
2. Select the component/frame
3. Right-click → "Copy link to selection"
4. Extract node ID from URL: `?node-id=123-456` → Node ID is `123:456` (replace `-` with `:`)

## Requirements

Functional requirements for the component:

- [ ] Requirement 1: Description of functionality
- [ ] Requirement 2: Description of functionality
- [ ] Requirement 3: Description of functionality

## Visual States

Expected visual variants for Storybook:

- [ ] **Default**: Standard appearance
- [ ] **Hover**: Mouse hover state (if interactive)
- [ ] **Active/Pressed**: Click/press state (if interactive)
- [ ] **Disabled**: Disabled state (if applicable)
- [ ] **Focus**: Keyboard focus state (if interactive)
- [ ] **Loading**: Loading/pending state (if async)
- [ ] **Error**: Error state (if applicable)

## Props

Expected component props and their types:

```typescript
interface [ComponentName]Props {
  // Prop name: type - description
  prop1: string // Description of prop1
  prop2?: number // Optional prop, description
  prop3: 'option1' | 'option2' // Union type prop
  children?: React.ReactNode // For wrapper components
}
```

## Styling Guidelines

Key visual properties from Figma design:

### Colors
- **Background**: `[color value or token]`
- **Text**: `[color value or token]`
- **Border**: `[color value or token]`

### Typography
- **Font Family**: `[font]`
- **Font Size**: `[size]` → PandaCSS textStyle: `[e.g., 'Body.primary']`
- **Font Weight**: `[weight]`
- **Line Height**: `[height]`

### Spacing
- **Padding**: `[padding values]`
- **Margin**: `[margin values]`
- **Gap**: `[gap value]` (for flex/grid layouts)

### Layout
- **Display**: `[flex | grid | block]`
- **Alignment**: `[alignment details]`
- **Width/Height**: `[dimensions]`

### Special Effects
- **Border Radius**: `[radius]` (use `pixelBorder` if pixel-style)
- **Box Shadow**: `[shadow values]`
- **Transitions**: `[transition properties]`

## Acceptance Criteria

Conditions for successful reconciliation:

- [ ] Visual appearance matches Figma design (colors, spacing, typography)
- [ ] All required props are implemented
- [ ] All visual states have Storybook stories
- [ ] Component follows PandaCSS patterns (css(), textStyle, pixelBorder)
- [ ] TypeScript types are properly defined
- [ ] No linting or type errors
- [ ] Accessible (proper ARIA attributes if needed)

## Notes

Additional context, edge cases, or implementation considerations:

- Note 1
- Note 2

## References

- Figma Design: `[link]`
- Related Components: `[links to related components]`
- Design System Docs: `[links]`
