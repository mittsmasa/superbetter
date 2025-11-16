---
description: "Create a new SuperBetter entity with full CRUD operations"
allowed-tools: ["Write", "Task", "Bash", "Read", "Glob", "Grep"]
---

Create a new SuperBetter entity "$ARGUMENTS" with complete implementation including database schema, server actions, and routes.

SuperBetter entities are core gamification elements like Quests, Powerups, Villains, Epic Wins, and Missions. This command will scaffold a new entity following the established patterns.

The implementation will include:
1. **Database Schema**: Main table and history table in Drizzle ORM
2. **Server Actions**: CRUD operations with proper error handling
3. **Route Structure**: List view, detail view, and entity-specific components
4. **Migrations**: Generated and ready to apply

I will follow these implementation steps:

1. **Analyze existing entities** (Quest, Powerup, etc.) to understand patterns
2. **Define database schema** with main table and history table
3. **Create server actions** for data operations
4. **Set up route directory** with pages and components
5. **Generate migration files**
6. **Run quality checks**

!Task general-purpose "Create a new SuperBetter entity named '$ARGUMENTS' with full implementation following the existing patterns (Quest, Powerup, Villain, Epic Win, Mission).

**Step 1: Analyze Existing Patterns**
Review these files to understand the entity pattern:
- src/db/schema/superbetter.ts (for schema patterns)
- src/app/(private)/quest/ (for route structure)
- src/app/(private)/_actions/ (for server action patterns)

**Step 2: Database Schema (src/db/schema/superbetter.ts)**
Add two tables:
1. Main table (e.g., 'entityname' in plural form)
   - id (uuid, primary key)
   - userId (uuid, reference to users table)
   - content (text)
   - orderIndex (integer)
   - createdAt (timestamp)
   - updatedAt (timestamp)
2. History table (e.g., 'entitynameHistory')
   - id (uuid, primary key)
   - entityId (uuid, reference to main table)
   - userId (uuid, reference to users table)
   - createdAt (timestamp)

**Step 3: Server Actions (src/app/(private)/_actions/)**
Create these action files:
- get-[entity].ts - Fetch entity data
- post-[entity]-history.ts - Track entity activities

Follow the Result<T, E> pattern for error handling used in existing actions.

**Step 4: Route Structure (src/app/(private)/[entity]/)**
Create:
- page.tsx - List view with add/edit/delete functionality
- [id]/page.tsx - Detail view (if needed)
- _actions/ - Entity-specific server actions (edit, post, reorder, delete)
- _components/ - Entity-specific UI components

**Step 5: Generate Migration**
Run: pnpm drizzle:gen

**Step 6: Quality Checks**
After implementation:
1. Run pnpm type-check
2. Run pnpm check:fix
3. Review generated migration SQL in src/db/drizzle/

**Important Notes:**
- Use BetterAuth session for userId
- Follow single quotes convention
- Use PandaCSS for component styling
- Ensure all operations require authentication
- DO NOT apply the migration automatically - let the user review and apply it manually

Please implement the complete entity following these steps."
