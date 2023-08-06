import { useParams } from '@solidjs/router';
import { Component, Match, Show, Switch, createResource } from 'solid-js';

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
      <Show when={false}>
        <div class="flex flex-col h-12 shrink-0 bg-slate-400"></div>
      </Show>
    </Switch>
  );
};
