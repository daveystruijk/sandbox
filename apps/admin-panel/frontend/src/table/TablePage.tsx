import { useParams } from '@solidjs/router';
import { Component, Match, Switch, createResource } from 'solid-js';

import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { client } from '../trpc';
import { TableContents } from './TableContents';

export const TablePage: Component = () => {
  const params = useParams<{ name: string }>();

  const [contents] = createResource(
    () => [params.name] as const,
    async ([name]) => {
      return client.getTableContents.query({ name });
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
