import dotenv from 'dotenv';
import { sql } from 'drizzle-orm';
import { db } from '../client';
import { testTypes } from '../schema/superbetter';

dotenv.config();

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
