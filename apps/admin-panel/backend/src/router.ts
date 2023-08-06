import { z } from 'zod';

import { helpers, pg } from './postgres';
import { t } from './trpc';

export type Column = {
  column_name: string;
  is_nullable: boolean;
  data_type: string;
  is_disabled: boolean;
};

export type Entry = Record<string, unknown>;

export const router = t.router({
  getTables: t.procedure.query(async () => {
    const tables = await pg.manyOrNone(
      `SELECT * FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    return tables;
  }),
  getTableContents: t.procedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    const columns = await pg.many<Column>(
      `SELECT * FROM information_schema.columns WHERE table_schema = 'public' and table_name = $1`,
      [input.name],
    );
    const entries = await pg.manyOrNone<Entry>(
      `SELECT * FROM ${new helpers.TableName(input.name)}`,
    );
    return {
      columns: columns.map((column) => ({
        ...column,
        is_disabled: column.column_name === 'id',
      })),
      entries,
    };
  }),
});

export type AppRouter = typeof router;
