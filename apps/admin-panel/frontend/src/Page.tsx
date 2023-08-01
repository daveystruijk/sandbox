import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';

import { client } from './client';

const fetchText = () => ({
  queryKey: ['fetchText'],
  queryFn: async () => {
    const text = await client.getText.query();
    return text;
  },
});

export default function Page() {
  const query = createQuery(fetchText);

  return (
    <div>
      <Switch>
        <Match when={query.isLoading}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <For each={query.data}>{(todo) => <p>{todo}</p>}</For>
        </Match>
      </Switch>
    </div>
  );
}
