import { helpers, pg } from './postgres';

export type PostgresUnderlyingDataType =
  | 'bool'
  | 'int4'
  | 'varchar'
  | 'timestamp'
  | 'timestamptz'
  | 'json';

export type PostgresColumn = {
  column_name: string;
  udt_name: PostgresUnderlyingDataType;
  is_nullable: string;
  is_updatable: string; // 'NO' for views
};

export const informationSchema = {
  tables: {
    all: async () =>
      pg.manyOrNone(
        `
        SELECT *
        FROM information_schema.tables
        WHERE table_schema = 'public'
        `,
      ),
  },
  columns: {
    byTableName: async (tableName: string) =>
      pg.many<PostgresColumn>(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = $1
        `,
        [tableName],
      ),
  },
};

export const arbitraryRows = {
  byTableName: async (tableName: string, limit = 200) =>
    pg.manyOrNone(
      `
      SELECT *
      FROM ${new helpers.TableName(tableName)}
      LIMIT $1
      `,
      [limit],
    ),
};
