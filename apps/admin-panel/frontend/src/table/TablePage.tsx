import { useParams } from '@solidjs/router';
import { Component, Match, Switch, createResource } from 'solid-js';

import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { client } from '../trpc';
import { TableContents } from './TableContents';
import { columnWidth } from './calculations';

export const TablePage: Component = () => {
  const params = useParams<{ name: string }>();

  const [contents] = createResource(
    () => [params.name] as const,
    async ([name]) => {
      const result = await client.getTableContents.query({ name });
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
        <TableContents contents={contents()} />
      </Match>
    </Switch>
  );
};
