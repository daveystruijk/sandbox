import { createQuery } from '@tanstack/solid-query';
import { For, Match, Switch } from 'solid-js';

import { client } from './client';

const fetchTables = () => ({
  queryKey: ['fetchTables'],
  queryFn: async () => {
    const text = await client.getTables.query();
    console.log(text);
    return text;
  },
});

function TablesMenuItem({ table }) {
  return (
    <div>
      <p>{table.table_name}</p>
    </div>
  );
}

function TablesMenu({ tables }) {
  return (
    <div class="">
      <Switch>
        <Match when={tables.isLoading}>
          <p>Loading...</p>
        </Match>
        <Match when={tables.isError}>
          <p>Error: {tables.error.message}</p>
        </Match>
        <Match when={tables.isSuccess}>
          <For each={tables.data}>{(table) => <TablesMenuItem table={table} />}</For>
        </Match>
      </Switch>
    </div>
  );
}

export default function Page() {
  const tables = createQuery(fetchTables);

  return (
    <div>
      <TablesMenu tables={tables} />
    </div>
  );
}
