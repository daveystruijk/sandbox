import { pg } from './postgres';
import { t } from './trpc';

export const router = t.router({
  getText: t.procedure.query(async () => {
    return ['hi'];
  }),
  getTables: t.procedure.query(async () => {
    const tables = await pg.query(
      `SELECT * FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    return tables.rows;
  }),
});

export type AppRouter = typeof router;
