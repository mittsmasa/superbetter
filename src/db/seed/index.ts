import dotenv from 'dotenv';
import { seed } from 'drizzle-seed';
import { db, schema } from '../client';

dotenv.config();

const main = async () => {
  await seed(db, { users: schema.users }).refine((f) => ({
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
