# EntityLink Component Specification

## Design Reference

**Figma URL**: [PLEASE FILL IN - Figma design URL with node ID]

Example format: `https://www.figma.com/design/FILE_ID?node-id=NODE_ID`

## Component Purpose

EntityLink is a clickable card component used to display and navigate to SuperBetter entities (Quests, Powerups, Villains, Epic Wins). It supports:
- Title and optional description
- Disabled state
- Optional reorder handle for drag-and-drop functionality

## Requirements Checklist

### Core Functionality
- [x] Renders as a clickable link using MotionLink
- [x] Displays title (required)
- [x] Displays description (optional)
- [x] Supports disabled state
- [x] Supports reorder handle slot (optional)

### Visual States
- [x] Default state - interactive, with hover/active effects from MotionLink
- [x] Disabled state - greyed out appearance, non-interactive
- [x] With description - shows truncated description (max 3 lines)
- [x] Without description - compact single-line display
- [x] With reorder handle - shows drag handle icon on the right

### Typography & Spacing
- [x] Title renders as ReactNode (no specific textStyle applied, allows flexible content)
- [x] Description uses `textStyle: 'Body.tertiary'` with `color: 'foreground.secondary'`
- [x] Padding: `4px 4px 4px 8px` (top right bottom left)
- [x] Additional right padding when reorder handle present: `32px`
- [x] Gap between title and description: `8px`
- [x] Content area gap: `4px`

### Colors
- [x] Border color disabled state: `foreground.disabled`
- [x] Text color disabled state: `foreground.disabled`
- [x] Description text color: `foreground.secondary`

### Accessibility
- [x] Link is keyboard accessible (via MotionLink)
- [x] Disabled state prevents interaction (via MotionLink disabled prop)
- [x] Description has proper semantic markup (p tag)

### Reorder Handle (EntityLinkReorderHandle)
- [x] Icon: Menu icon at 24px size
- [x] Positioned absolutely at vertical center, right aligned
- [x] Minimum touch target: 30px × 30px (minHeight: 30px, minWidth: 30px)
- [x] Stops event propagation for drag events (onPointerDown stopPropagation)
- [x] Touch action disabled for drag interaction (touchAction: 'none')

## Expected Visual Variants (Storybook Stories)

### Currently Implemented
- [x] Default - with title and description

### Missing Variants
- [ ] Disabled - shows disabled state styling
- [ ] Without Description - shows compact single-line layout
- [ ] With Reorder Handle - shows drag handle
- [ ] Disabled with Reorder Handle - combined state
- [ ] Long Title - tests text wrapping/truncation behavior
- [ ] Long Description - tests 3-line clamp behavior

## Design Tokens to Verify (if Figma data available)

### Colors
- Border color (default): _[To be extracted from Figma]_
- Border color (disabled): `foreground.disabled`
- Text color (default): _[To be extracted from Figma]_
- Text color (disabled): `foreground.disabled`
- Description text color: `foreground.secondary`

### Typography
- Title font size: _[To be extracted from Figma]_
- Title font weight: _[To be extracted from Figma]_
- Title line height: _[To be extracted from Figma]_
- Description: `textStyle: 'Body.tertiary'`

### Spacing
- Padding: `4px 4px 4px 8px`
- Padding right (with handle): `32px`
- Gap (title to description): `8px`
- Gap (content area): `4px`

### Layout
- Display: flex
- Flex direction: column (for title/description stack)
- Description line clamp: 3

## Notes

- Component uses MotionLink for link behavior and pixel border styling
- Reorder handle is implemented as a separate component (EntityLinkReorderHandle)
- Handle is positioned absolutely within a relative container
- Description truncates to 3 lines using lineClamp CSS property

---

**Instructions for Claude Code:**
1. Fill in the Figma URL with the design reference
2. Review the requirements checklist and mark items as complete/incomplete
3. Add any missing visual variants to the Storybook stories
4. Extract design tokens from Figma if URL is provided
5. Ensure all visual states are properly implemented and tested
