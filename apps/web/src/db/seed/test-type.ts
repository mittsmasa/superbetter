import nextEnv from '@next/env';
import { sql } from 'drizzle-orm';
import { db } from '../client';
import { testTypes } from '../schema/superbetter';

nextEnv.loadEnvConfig(process.cwd());

const main = async () => {
  await db
    .insert(testTypes)
    .values({
      name: 'pos-neg',
    })
    .onDuplicateKeyUpdate({ set: { name: sql`name` } });
  process.exit(0);
};

await main();
