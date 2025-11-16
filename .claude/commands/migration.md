---
description: "Generate and manage database migrations"
allowed-tools: ["Bash", "Read", "Glob"]
---

Generate and manage database migration for: "$ARGUMENTS"

This command helps you safely create and apply database migrations using Drizzle ORM.

**What this command does:**
1. Generate migration files based on schema changes
2. Display the generated migration SQL for review
3. Guide you through applying the migration

**Safety First:**
Database migrations are critical operations. This command will:
- Generate migration files
- Show you the SQL to review
- Wait for your confirmation before applying

Let me proceed with the migration workflow:

## Step 1: Generate Migration Files

!pnpm drizzle:gen

## Step 2: Display Generated Migration

Let me show you the most recently generated migration file:

!bash -c "ls -t src/db/drizzle/*.sql 2>/dev/null | head -1 | xargs cat"

## Step 3: Review Instructions

**Please review the migration SQL above carefully.**

The migration has been generated but NOT yet applied to your database.

To apply this migration:
```bash
pnpm drizzle:migrate
```

To rollback or modify:
- Edit the SQL file in src/db/drizzle/
- Or modify your schema and regenerate

**Before applying:**
- [ ] Verify the SQL does what you expect
- [ ] Check for any data loss operations (DROP, DELETE)
- [ ] Ensure you have a database backup if needed
- [ ] Test on a development database first

**After applying:**
- [ ] Run type checking: pnpm type-check
- [ ] Test the database operations in your app
- [ ] Verify all queries work as expected

Would you like me to apply the migration now? Please confirm before proceeding.
