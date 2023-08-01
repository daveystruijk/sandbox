import { A, Route, Routes, useParams } from '@solidjs/router';
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
    <A
      href={`/table/${table.table_name}`}
      end={true}
      class="hover:bg-slate-300 px-2 py-1 mx-2 rounded"
    >
      {table.table_name}
    </A>
  );
}

function TablesMenu({ tables }) {
  return (
    <div class="flex flex-col w-48">
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

function Header() {
  return <div>Logo</div>;
}

function TableView() {
  const params = useParams();
  return <div class="grow bg-white rounded-tl">View</div>;
}

export default function Page() {
  const tables = createQuery(fetchTables);

  return (
    <div class="flex flex-col h-screen">
      <Header />
      <div class="flex flex-row grow">
        <TablesMenu tables={tables} />
        <Routes>
          <Route path="/table/:name" component={TableView} />
        </Routes>
      </div>
    </div>
  );
}
