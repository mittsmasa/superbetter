# Reconciliation Loop for Component Development

## Overview

**"Agentic Coding = Reconciliation Loop"**

The Reconciliation Loop is a development pattern where you define an ideal state (design, specification, tests) and iteratively align your implementation to that state through automated analysis and fixes.

For component development in SuperBetter, this means:
1. **Define ideal state**: Figma design + specification + Storybook stories
2. **Capture current state**: Implementation + visual snapshots
3. **Analyze differences**: Automated comparison
4. **Fix discrepancies**: Semi-automated corrections
5. **Verify**: Loop until convergence

## Why Use Reconciliation Loop?

✅ **Benefits:**
- Ensures design-implementation consistency
- Reduces manual back-and-forth with designers
- Catches visual regressions early
- Documents expected behavior in `.spec.md`
- Accelerates onboarding for new team members
- Provides clear acceptance criteria

## Quick Start

### Step 1: Create Component Specification

For an existing or new component, create a specification file:

```bash
# Copy template
cp .claude/templates/component.spec.md src/components/MyButton/MyButton.spec.md
```

Edit `src/components/MyButton/MyButton.spec.md`:

```markdown
# MyButton Specification

## Figma Design
- **Design File URL**: `https://figma.com/file/abc123/SuperBetter?node-id=123:456`
- **Node ID**: `123:456`
- **Last Updated**: `2025-01-16`

## Requirements
- [ ] Displays button with primary styling
- [ ] Supports disabled state
- [ ] Shows loading spinner when loading prop is true
- [ ] Handles click events

## Visual States
- [ ] **Default**: Blue background, white text
- [ ] **Hover**: Darker blue background
- [ ] **Disabled**: Gray background, reduced opacity
- [ ] **Loading**: Shows spinner, disables clicks

## Props
\`\`\`typescript
interface MyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}
\`\`\`

## Styling Guidelines
### Colors
- **Background**: `#3B82F6` → Hover: `#2563EB`
- **Text**: `#FFFFFF`

### Typography
- **Font Size**: `16px` → PandaCSS textStyle: `'Body.primary'`
- **Font Weight**: `600`

### Spacing
- **Padding**: `12px 24px` (vertical horizontal)
- **Gap**: `8px` (icon + text spacing)

### Layout
- **Display**: `flex`
- **Alignment**: `center`

## Acceptance Criteria
- [ ] Visual appearance matches Figma design
- [ ] All props are implemented
- [ ] All visual states have Storybook stories
- [ ] No linting or type errors
```

### Step 2: Run Reconciliation Loop

Execute the `/reconcile-component` command with your component name:

```
/reconcile-component MyButton
```

Claude will:
1. ✅ Read the specification file
2. ✅ Fetch Figma design data (if URL provided)
3. ✅ Analyze current implementation
4. ✅ Compare and identify differences
5. ✅ Present findings and propose fixes
6. ⏸️ Ask for confirmation before proceeding
7. ✅ Apply fixes
8. ✅ Run quality checks
9. ✅ Verify and loop if needed

### Step 3: Review and Iterate

After each reconciliation iteration:
1. Review the changes made
2. Test in Storybook: `pnpm storybook`
3. If issues remain, answer "yes" to continue loop
4. If satisfied, approve and commit changes

## Detailed Workflow

### Phase 1: Collect Ideal State

**What happens:**
- Reads `.spec.md` file
- Extracts Figma URL and node ID
- Fetches Figma design data via MCP
- Parses requirements and expected states

**What you provide:**
- Completed `.spec.md` file with Figma link
- Clear requirements checklist
- Expected props and visual states

### Phase 2: Capture Current State

**What happens:**
- Reads `index.tsx` implementation
- Reads `index.stories.tsx` stories
- Optionally launches Storybook and captures screenshots
- Analyzes props, styles, and story coverage

**What you provide:**
- Nothing (automated analysis)

### Phase 3: Analyze Differences

**What happens:**
- Compares Figma design vs PandaCSS styles
- Checks requirements fulfillment
- Identifies missing props or features
- Verifies story coverage for all visual states

**Output example:**
```
## Reconciliation Report

### Summary
Alignment: 70% (7/10 criteria met)

### Critical Issues (Must Fix)
1. Missing 'disabled' prop implementation
2. Loading state not handled

### Important Issues (Should Fix)
3. Background color mismatch: #3B82F6 (Figma) vs #60A5FA (current)
4. Missing hover state story in Storybook

### Minor Issues (Nice to Fix)
5. Padding slightly off: 12px 24px (Figma) vs 10px 20px (current)

### Recommendations
- Add 'disabled' and 'loading' props
- Update background color to match Figma
- Add Storybook stories for Hover and Disabled states
- Adjust padding to match design spec
```

### Phase 4: Present Findings

**What happens:**
- Claude presents detailed report
- Lists specific code changes needed
- Asks for confirmation to proceed

**What you do:**
- Review the findings
- Decide which issues to prioritize
- Confirm to proceed or request adjustments

### Phase 5: Execute Fixes

**What happens:**
- Updates component implementation
- Adds missing props/features
- Applies style corrections
- Creates/updates Storybook stories
- Runs `pnpm check:fix` and `pnpm type-check`

**What you provide:**
- Approval to proceed
- Priority guidance (if selective fixes)

### Phase 6: Verification Loop

**What happens:**
- Re-captures current state
- Compares against ideal state
- Reports remaining differences
- Asks if you want to continue

**What you do:**
- Verify changes in Storybook
- Decide to continue loop or finish
- Approve final result

## Best Practices

### 1. Start with a Good Specification

✅ **Do:**
- Provide accurate Figma URL and node ID
- List all functional requirements clearly
- Specify all expected visual states
- Include detailed styling guidelines

❌ **Don't:**
- Leave Figma URL blank (limits analysis)
- Write vague requirements ("make it nice")
- Skip visual states (incomplete testing)
- Omit styling details (guesswork needed)

### 2. Iterative Refinement

✅ **Do:**
- Run small iterations (fix 2-3 issues at a time)
- Verify changes visually after each loop
- Update `.spec.md` if requirements change

❌ **Don't:**
- Try to fix everything in one giant loop
- Skip visual verification in Storybook
- Ignore spec file updates

### 3. Leverage Figma Integration

✅ **Do:**
- Use Figma node IDs for specific components
- Keep Figma designs up-to-date
- Use Figma's design tokens/variables

❌ **Don't:**
- Link to outdated Figma files
- Point to entire pages (use specific nodes)
- Ignore Figma style changes

### 4. Maintain Storybook Stories

✅ **Do:**
- Create stories for all visual states
- Use descriptive story names
- Include interactive controls

❌ **Don't:**
- Skip edge cases (disabled, loading, error)
- Create generic "Default" story only
- Forget to export new stories

## Examples

### Example 1: New Component from Figma

**Scenario:** Designer created a `Badge` component in Figma. You need to implement it.

**Steps:**
1. Create component directory:
   ```bash
   mkdir -p src/components/Badge
   ```

2. Create spec file from template:
   ```bash
   cp .claude/templates/component.spec.md src/components/Badge/Badge.spec.md
   ```

3. Fill in Figma URL and requirements

4. Run reconciliation:
   ```
   /reconcile-component Badge
   ```

5. Claude will:
   - Detect no existing implementation
   - Offer to create from scratch using Figma design
   - Generate `index.tsx` and `index.stories.tsx`
   - Run quality checks

### Example 2: Update Existing Component

**Scenario:** Designer updated `PrimaryButton` colors in Figma. You need to sync implementation.

**Steps:**
1. Update `.spec.md` with new Figma node ID (if changed)

2. Update color values in spec:
   ```markdown
   ### Colors
   - **Background**: `#10B981` (was `#3B82F6`)
   ```

3. Run reconciliation:
   ```
   /reconcile-component PrimaryButton
   ```

4. Claude will:
   - Detect color mismatch
   - Propose specific style changes
   - Update implementation after approval

### Example 3: Add Missing States

**Scenario:** `IconButton` component lacks loading and disabled states.

**Steps:**
1. Update `.spec.md` requirements:
   ```markdown
   ## Requirements
   - [ ] Supports disabled state
   - [ ] Shows loading spinner when loading prop is true

   ## Visual States
   - [ ] **Disabled**: Gray background, reduced opacity
   - [ ] **Loading**: Shows spinner, disables clicks
   ```

2. Run reconciliation:
   ```
   /reconcile-component IconButton
   ```

3. Claude will:
   - Identify missing props and states
   - Add `disabled` and `loading` props
   - Implement state logic
   - Create Storybook stories for new states

## Troubleshooting

### Issue: "Specification file not found"

**Solution:** Create `.spec.md` file in component directory:
```bash
cp .claude/templates/component.spec.md src/components/[ComponentName]/[ComponentName].spec.md
```

### Issue: "Unable to fetch Figma design"

**Possible causes:**
- Invalid Figma URL or node ID
- Missing `FIGMA_API_KEY` environment variable
- Network issues

**Solution:**
1. Verify Figma URL is correct
2. Check node ID format: `123:456` (not `123-456`)
3. Ensure Figma API key is set in `.env`

### Issue: "Too many differences, overwhelming report"

**Solution:**
- Break reconciliation into smaller chunks
- Focus on critical issues first
- Update spec to be more specific

### Issue: "Reconciliation makes unwanted changes"

**Solution:**
- Review findings before confirming
- Provide specific guidance on what to fix
- Adjust `.spec.md` to reflect actual requirements
- Use manual edits for edge cases

## Advanced Tips

### Custom Acceptance Criteria

Modify `.spec.md` acceptance criteria to match your needs:

```markdown
## Acceptance Criteria
- [ ] Visual appearance matches Figma design (colors, spacing, typography)
- [ ] All required props are implemented
- [ ] All visual states have Storybook stories
- [ ] Component follows PandaCSS patterns
- [ ] No linting or type errors
- [ ] Accessible (ARIA attributes for buttons/inputs)
- [ ] Unit tests pass (if applicable)
- [ ] Mobile responsive (if applicable)
```

### Partial Reconciliation

If you only want to reconcile specific aspects:

```
/reconcile-component MyButton

# In the findings review, specify:
"Only fix critical issues (missing props). Skip styling adjustments for now."
```

### Batch Reconciliation

To reconcile multiple components:

```bash
# Create a script
for component in Button Badge Card; do
  echo "/reconcile-component $component"
done
```

Or ask Claude:
```
"Reconcile all components in src/components/ that have .spec.md files"
```

## Reference

- **Command**: `.claude/commands/reconcile-component.md`
- **Template**: `.claude/templates/component.spec.md`
- **Conversion Guide**: `.claude/utils/figma-to-panda.md`
- **Project Patterns**: `CLAUDE.md`

## FAQ

**Q: Do I need Figma for reconciliation?**
A: No, but it helps. You can use just `.spec.md` with requirements and manual style descriptions.

**Q: Can I use this for existing components without Figma?**
A: Yes! Fill `.spec.md` with expected behavior and styles, even without Figma links.

**Q: How often should I run reconciliation?**
A: Whenever:
- Designer updates Figma
- Requirements change
- You suspect implementation drift
- Onboarding new components

**Q: Does this work with other design tools?**
A: Currently optimized for Figma. For other tools (Sketch, Adobe XD), use `.spec.md` with manual descriptions.

**Q: Can I reconcile entire features, not just components?**
A: This workflow is for components. For feature-level reconciliation (Next.js pages, API routes), see:
- Feature-level Reconciliation (coming soon)
- DB Migration Reconciliation (coming soon)
