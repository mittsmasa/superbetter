import nextEnv from '@next/env';
import { seed } from 'drizzle-seed';
import { db, schema } from '../client';

nextEnv.loadEnvConfig(process.cwd());

const main = async () => {
  await seed(db, { users: schema.user }).refine((f) => ({
    users: {
      count: 1,
      columns: {
        password: f.valuesFromArray({ values: ['superbetter'] }),
        name: f.valuesFromArray({ values: ['superbetter'] }),
        email: f.valuesFromArray({ values: ['superbetter@example.com'] }),
        emailVerified: f.timestamp(),
      },
    },
  }));
  process.exit(0);
};

await main();
