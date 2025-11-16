---
description: "Reconcile component implementation with ideal state (Figma + Spec + Storybook)"
allowed-tools: ["Read", "Write", "Edit", "Task", "Bash", "Glob", "Grep", "mcp__framelink-figma__get_figma_data", "mcp__chrome-devtools__take_snapshot", "mcp__chrome-devtools__take_screenshot", "mcp__chrome-devtools__navigate_page"]
---

Execute Reconciliation Loop for component "$ARGUMENTS" to align implementation with ideal state.

## Reconciliation Loop Concept

This command implements "Agentic Coding = Reconciliation Loop" pattern:
1. Define ideal state (Figma design + specification + Storybook story)
2. Capture current implementation state
3. Analyze differences
4. Propose fixes
5. Execute fixes
6. Loop until convergence

## Implementation Steps

### Step 1: Collect Ideal State
1. **Figma Design**: Fetch design data via Figma MCP
2. **Specification**: Read `src/components/$ARGUMENTS/$ARGUMENTS.spec.md`
3. **Expected Stories**: Parse requirements for Storybook variants

### Step 2: Capture Current State
1. **Component Implementation**: Read `src/components/$ARGUMENTS/index.tsx`
2. **Current Stories**: Read `src/components/$ARGUMENTS/index.stories.tsx`
3. **Visual State**: Launch Storybook and capture screenshots via Chrome DevTools MCP

### Step 3: Analyze Differences
1. **Visual Diff**: Compare Figma design vs Storybook screenshots
2. **Spec Diff**: Check requirements fulfillment
3. **Story Coverage**: Verify all required variants exist

### Step 4: Present Findings
- List discrepancies with priority (Critical/Important/Minor)
- Provide specific suggestions for each issue
- Ask user for confirmation before proceeding

### Step 5: Execute Fixes
- Update component implementation (PandaCSS styles, props, etc.)
- Add/update Storybook stories
- Run quality checks (type-check, linting)

### Step 6: Verification Loop
- Return to Step 2 to verify fixes
- Continue until user confirms convergence

## Task Execution

!Task general-purpose "Execute Reconciliation Loop for component '$ARGUMENTS':

**Phase 1: Collect Ideal State**

1. Check if specification file exists: 'src/components/$ARGUMENTS/$ARGUMENTS.spec.md'
   - If not exists, create a template and ask user to fill Figma URL and requirements
   - If exists, read it to extract:
     - Figma design URL and node ID
     - Requirements checklist
     - Expected visual states/variants

2. If Figma URL is provided in spec:
   - Use mcp__framelink-figma__get_figma_data to fetch design data
   - Extract style information (colors, typography, spacing, layout)
   - Note: Convert Figma styles to PandaCSS format later

**Phase 2: Capture Current State**

1. Read current implementation:
   - 'src/components/$ARGUMENTS/index.tsx'
   - 'src/components/$ARGUMENTS/index.stories.tsx'

2. Analyze current implementation:
   - Props and TypeScript types
   - PandaCSS styles used
   - Story variants coverage

3. (Optional) Launch Storybook and capture screenshots:
   - Run 'pnpm storybook' in background if not already running
   - Use Chrome DevTools MCP to navigate and screenshot each story
   - Note: This step can be skipped for first iteration to save time

**Phase 3: Analyze Differences**

Compare ideal state vs current state:

1. **Visual Differences** (if Figma data available):
   - Colors (background, text, border)
   - Typography (font size, weight, line height)
   - Spacing (padding, margin, gap)
   - Layout (flex, grid, alignment)
   - Border radius, shadows, etc.

2. **Specification Differences**:
   - Check each requirement in .spec.md
   - Identify missing features
   - Identify incomplete implementations

3. **Story Coverage**:
   - Required variants from spec vs existing stories
   - Missing interactive states (hover, active, disabled, etc.)

**Phase 4: Present Findings**

Generate a report with:

1. **Summary**: Overall alignment status (percentage or qualitative)
2. **Critical Issues**: Must-fix items (e.g., missing required props)
3. **Important Issues**: Should-fix items (e.g., incorrect colors)
4. **Minor Issues**: Nice-to-fix items (e.g., minor spacing differences)
5. **Recommendations**: Specific code changes needed

Ask user:
- Do you want to proceed with fixes?
- Which issues should be prioritized?
- Should I execute all fixes or selective ones?

**Phase 5: Execute Fixes**

Based on user confirmation:

1. **Update Component Implementation**:
   - Modify 'src/components/$ARGUMENTS/index.tsx'
   - Apply PandaCSS style corrections
   - Add missing props/features
   - Follow project patterns (textStyle, pixelBorder, etc.)

2. **Update Storybook Stories**:
   - Add missing story variants
   - Update existing stories if needed
   - Ensure proper meta configuration

3. **Run Quality Checks**:
   - 'pnpm check:fix' for linting
   - 'pnpm type-check' for TypeScript validation

**Phase 6: Verification Loop**

After fixes:

1. Ask user to verify changes:
   - 'Review the changes I made'
   - 'Would you like to see Storybook screenshots?'
   - 'Are there any remaining issues?'

2. If issues remain:
   - Return to Phase 2 (capture current state)
   - Continue loop

3. If user confirms convergence:
   - Mark reconciliation as complete
   - Suggest committing changes

**Important Guidelines:**

- Always respect existing project patterns (PandaCSS, textStyle, pixelBorder)
- Use single quotes for strings (Biome config)
- Follow TypeScript best practices
- Don't make assumptions - ask user when uncertain
- Present clear, actionable differences
- Focus on semi-automated workflow: provide analysis and suggestions, let user make final decisions
- Be iterative: small fixes → verify → repeat is better than big bang changes"
