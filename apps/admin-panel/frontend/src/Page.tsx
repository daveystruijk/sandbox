import { A, Route, Routes } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { For, Match, Suspense, Switch, createResource } from 'solid-js';

import TableView from './TableView';
import { client } from './client';

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
      <Suspense fallback="Loading...">
        <For each={tables()}>{(table) => <TablesMenuItem table={table} />}</For>
      </Suspense>
    </div>
  );
}

function Header() {
  return <div>Logo</div>;
}

export default function Page() {
  const [tables] = createResource(async () => {
    return client.getTables.query();
  });

  return (
    <div class="flex flex-col h-screen">
      <Header />
      <div class="flex flex-row grow">
        <TablesMenu tables={tables} />
        <div class="grow bg-white rounded-tl">
          <Routes>
            <Route path="/table/:name" component={TableView} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
