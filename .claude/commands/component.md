---
description: "Create a new UI component with Storybook story"
allowed-tools: ["Write", "Task", "Bash", "Read", "Glob"]
---

Create a new component "$ARGUMENTS" following the SuperBetter project's component patterns.

The implementation will include:
1. Component file (`index.tsx`) with PandaCSS styling
2. Storybook story file (`index.stories.tsx`)
3. TypeScript type definitions
4. Proper exports and naming conventions

I will follow these implementation steps:

1. **Analyze existing components** to understand current patterns
2. **Create component directory** under `src/components/`
3. **Implement component** with PandaCSS styling using `css()` function
4. **Create Storybook story** for visual testing
5. **Run quality checks** (linting and type checking)

!Task general-purpose "Create a new UI component named '$ARGUMENTS' in the src/components/ directory. Follow the project's component patterns:

**Component Implementation (index.tsx):**
- Use PandaCSS css() function for styling
- Follow textStyle patterns (e.g., textStyle: 'Heading.primary', 'Body.primary')
- Use pixelBorder utility for borders when appropriate
- Add proper TypeScript types (use PropsWithChildren for wrapper components)
- Export component with proper types
- Use single quotes for strings

**Storybook Story (index.stories.tsx):**
- Create story following existing patterns in src/components/
- Include default story and variants if applicable
- Use proper meta configuration

**Quality Checks:**
After implementation:
1. Run pnpm check:fix to auto-fix any linting issues
2. Run pnpm type-check to verify TypeScript types
3. Recommend testing in Storybook with pnpm storybook

Please review existing components first to understand the patterns, then implement the new component."
