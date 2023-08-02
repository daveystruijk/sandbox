import { z } from 'zod';

import { helpers, pg } from './postgres';
import { t } from './trpc';

export const router = t.router({
  getTables: t.procedure.query(async () => {
    const tables = await pg.manyOrNone(
      `SELECT * FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    return tables;
  }),
  getTableDetails: t.procedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    const tableDetails = await pg.many(
      `SELECT * FROM information_schema.columns WHERE table_schema = 'public' and table_name = $1`,
      [input.name],
    );
    const tableData = await pg.manyOrNone(`SELECT * FROM ${new helpers.TableName(input.name)}`);
    return {
      columns: tableDetails,
      data: tableData,
    };
  }),
});

export type AppRouter = typeof router;
