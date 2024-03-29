import { useParams } from '@solidjs/router';
import { Component, createResource, Match, Switch } from 'solid-js';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { client } from '../trpc';
import { columnWidth } from './calculations';
import { TableContents } from './TableContents';

export const TablePage: Component = () => {
  const params = useParams<{ tableName: string }>();

  const [contents] = createResource(
    () => [params.tableName] as const,
    async ([tableName]) => {
      const result = await client.getTableContents.query({ tableName });
      return {
        columns: result.columns.map((column) => ({
          ...column,
          width: columnWidth(result.rows, column),
        })),
        rows: result.rows,
      };
    },
  );

  return (
    <Switch>
      <Match when={contents.error}>
        <ErrorMessage />
      </Match>
      <Match when={contents.loading}>
        <Spinner />
      </Match>
      <Match when={contents()}>
        {(c) => <TableContents tableName={params.tableName} contents={c()} />}
      </Match>
    </Switch>
  );
};
