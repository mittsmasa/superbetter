# CLAUDE.md
必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbo mode
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Database
- `pnpm drizzle:migrate` - Run database migrations
- `pnpm drizzle:push` - Push schema changes to database  
- `pnpm drizzle:studio` - Open Drizzle Studio for database management
- `pnpm drizzle:gen` - Generate migration files
- `pnpm drizzle:seed` - Seed database with test data

### Code Quality
- `pnpm check` - Run Biome linter and formatter checks
- `pnpm check:fix` - Auto-fix Biome issues
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests with Vitest

### Storybook
- `pnpm storybook` - Start Storybook development server
- `pnpm storybook:build` - Build Storybook

### Setup
1. `pnpm install` - Install dependencies
2. `docker compose up -d` - Start MySQL database
3. `pnpm drizzle:migrate` - Run migrations
4. `pnpm drizzle:seed` - (Optional) Seed test data

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: PandaCSS with custom design system
- **Database**: MySQL with Drizzle ORM
- **Authentication**: BetterAuth with Google OAuth
- **Testing**: Vitest
- **Linting**: Biome
- **Package Manager**: pnpm

### Application Structure
This is a SuperBetter gamification app with core entities:
- **Quests**: Long-term goals/tasks
- **Powerups**: Positive activities/habits  
- **Villains**: Negative patterns to overcome
- **Epic Wins**: Achievements and rewards
- **Missions**: Daily/weekly/monthly challenges

### Key Directories
- `src/app/(private)/` - Protected routes with authentication
- `src/components/` - Reusable UI components with Storybook stories
- `src/db/schema/` - Database schema definitions
- `src/assets/` - Static assets including pixel art icons
- `src/styled-system/` - Generated PandaCSS files

### Database Schema
Core tables: users, quests, powerups, villains, epicwins, missions, with corresponding history tables for tracking activities. User profiles store challenge, values, and hidden identity.

### Styling Conventions
- Use PandaCSS `css()` function for styling
- Follow textStyle patterns: `textStyle: 'Heading.primary'`, `textStyle: 'Body.primary'`
- Import from `@/styled-system/css`
- Single quotes for strings (Biome config)

### Component Patterns
- Export components with proper TypeScript types
- Include Storybook stories for all components
- Use PropsWithChildren for wrapper components
- Follow naming: PascalCase for components, camelCase for props

### Authentication
- Uses BetterAuth with Google OAuth provider
- Protected routes under `(private)` directory
- Server actions for data mutations
- Session management with database strategy

## Implementation Checklists

### Component Implementation
When creating or modifying UI components, follow this checklist:

- [ ] Create directory under `src/components/[component-name]/`
- [ ] Create `index.tsx` with component implementation
- [ ] Use PandaCSS `css()` function for styling
- [ ] Follow textStyle patterns (e.g., `textStyle: 'Heading.primary'`)
- [ ] Use `pixelBorder` utility for consistent borders
- [ ] Add TypeScript types (use `PropsWithChildren` for wrapper components)
- [ ] Create `index.stories.tsx` with Storybook story
- [ ] Export component with proper types
- [ ] Run `pnpm check:fix` for linting
- [ ] Test in Storybook (`pnpm storybook`)

### Entity/Feature Implementation
When adding new SuperBetter entities or features:

- [ ] Define schema in `src/db/schema/superbetter.ts`
  - [ ] Create main table (e.g., `quests`, `powerups`)
  - [ ] Create corresponding history table (e.g., `questHistory`, `powerupHistory`)
- [ ] Create server actions in `src/app/(private)/_actions/`
  - [ ] `get-[entity].ts` - Fetch data
  - [ ] `post-[entity]-history.ts` - Track activities
- [ ] Set up route directory `src/app/(private)/[entity]/`
  - [ ] `page.tsx` - List view
  - [ ] `[id]/page.tsx` - Detail view
  - [ ] `_actions/` - Entity-specific server actions
  - [ ] `_components/` - Entity-specific UI components
- [ ] Generate migration: `pnpm drizzle:gen`
- [ ] Review generated SQL in `src/db/drizzle/`
- [ ] Apply migration: `pnpm drizzle:migrate`
- [ ] Run type checking: `pnpm type-check`
- [ ] Test functionality with authentication

### Infrastructure Changes
For system-wide changes (auth, database schema, configuration):

- [ ] Review security implications
- [ ] Update environment variables if needed (`.env`, `.env.example`)
- [ ] Modify configurations:
  - [ ] `src/lib/auth.ts` for authentication changes
  - [ ] `src/db/schema/` for database schema changes
  - [ ] `drizzle.config.ts` for Drizzle ORM configuration
- [ ] Create migration files: `pnpm drizzle:gen`
- [ ] Test migration on local database
- [ ] Update documentation in CLAUDE.md or README
- [ ] Run full type check: `pnpm type-check`
- [ ] Run linting: `pnpm check:fix`
- [ ] Consider backward compatibility

### Quality Assurance
Always run these checks before committing:

- [ ] Type checking: `pnpm type-check`
- [ ] Linting and formatting: `pnpm check:fix`
- [ ] Tests: `pnpm test` (if applicable)
- [ ] Visual testing in Storybook (for UI changes)
- [ ] Manual testing with authentication flow

## Slash Commands

### Implementation Guidelines
- When implementing slash commands in `.claude/commands/` directory, write all content in English
- Use English for descriptions, comments, and documentation within command files
- This ensures consistency and maintainability across command implementations