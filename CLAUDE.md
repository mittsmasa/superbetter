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
- **Authentication**: NextAuth.js v5
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
- Uses NextAuth.js v5 with multiple providers
- Protected routes under `(private)` directory
- Server actions for data mutations

## Slash Commands

### Implementation Guidelines
- When implementing slash commands in `.claude/commands/` directory, write all content in English
- Use English for descriptions, comments, and documentation within command files
- This ensures consistency and maintainability across command implementations