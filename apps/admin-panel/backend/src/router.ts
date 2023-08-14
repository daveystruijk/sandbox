import { z } from 'zod';

import { helpers, pg } from './postgres';
import { t } from './trpc';

export type PostgresUnderlyingDataType = 'boolean' | 'int4' | 'varchar' | 'timestamp' | 'json';

export type PostgresColumn = {
  column_name: string;
  udt_name: PostgresUnderlyingDataType;
  is_nullable: boolean;
  is_updateable: boolean; // false for views
};

export type DataType = PostgresUnderlyingDataType;

export type Column = {
  name: string;
  dataType: DataType;
  isDisabled: boolean;
  isNullable: boolean;
};

export type Row = Record<string, unknown>;

const columnFromPostgresColumn = (pgColumn: PostgresColumn): Column => ({
  name: pgColumn.column_name,
  dataType: pgColumn.udt_name,
  isDisabled: pgColumn.column_name === 'id',
  isNullable: pgColumn.is_nullable,
});

export const router = t.router({
  getTables: t.procedure.query(async () => {
    const tables = await pg.manyOrNone(
      `SELECT * FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    return tables;
  }),
  getTableContents: t.procedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    const pgColumns = await pg.many<PostgresColumn>(
      `
      SELECT * FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name = $1
      `,
      [input.name],
    );

    const rows = await pg.manyOrNone<Row>(
      `
      SELECT *
      FROM ${new helpers.TableName(input.name)}
      LIMIT 200
      `,
    );

    return {
      columns: pgColumns.map(columnFromPostgresColumn),
      rows,
    };
  }),
});

export type AppRouter = typeof router;
