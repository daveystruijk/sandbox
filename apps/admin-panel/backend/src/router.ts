import { z } from 'zod';
import { helpers } from './postgres';
import {
  arbitraryRows,
  informationSchema,
  PostgresColumn,
  PostgresUnderlyingDataType,
} from './queries';
import { t } from './trpc';

export type DataType = PostgresUnderlyingDataType;

export type Column = {
  name: string;
  dataType: DataType;
  isDisabled: boolean;
  isNullable: boolean;
  width?: number;
};

export type Row = Record<string, unknown>;

const columnFromPostgresColumn = (pgColumn: PostgresColumn): Column => ({
  name: pgColumn.column_name,
  dataType: pgColumn.udt_name,
  isDisabled:
    pgColumn.column_name === 'id' ||
    pgColumn.udt_name === 'timestamp' ||
    pgColumn.udt_name === 'timestamptz',
  isNullable: pgColumn.is_nullable === 'YES',
});

export const router = t.router({
  getTables: t.procedure.query(async () => {
    const tables = await informationSchema.tables.all();
    return tables;
  }),

  getTableContents: t.procedure
    .input(z.object({ tableName: z.string() }))
    .query(async ({ input }) => {
      const pgColumns = await informationSchema.columns.byTableName(input.tableName);
      const rows = await arbitraryRows.byTableName(input.tableName);
      return {
        columns: pgColumns.map((column) => columnFromPostgresColumn(column)),
        rows,
      };
    }),

  getMutationsPreview: t.procedure
    .input(
      z.object({
        tableName: z.string(),
        inserts: z.array(z.record(z.string())),
        updates: z.record(z.coerce.number(), z.record(z.string())),
      }),
    )
    .query(async ({ input }) => {
      const columns = await informationSchema.columns.byTableName(input.tableName);

      const columnSet = new helpers.ColumnSet(
        columns.map((column) => column.column_name),
        { table: input.tableName },
      );

      const insertQueries =
        input.inserts.length > 0 ? helpers.insert(input.inserts, columnSet) : undefined;

      // const updateQueries = helpers.update(
      //   Object.entries(input.updates).map(([key, values]) => ({ id: key, ...values })),
      //   columnSet,
      // );
      // console.log(updateQueries);

      return {
        insertQueries,
        // updateQueries,
      };
    }),
});

export type AppRouter = typeof router;
