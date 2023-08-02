import { A, Route, Routes } from '@solidjs/router';
import { For, Suspense, createResource } from 'solid-js';

import TableView from './TableView';
import { client } from './client';

function TablesMenuItem({ table }) {
  return (
    <A
      href={`/table/${table.table_name}`}
      end={true}
      class="hover:bg-slate-300 px-2 py-1 mx-2 rounded text-xs text-slate-900"
    >
      {table.table_name}
    </A>
  );
}

function TablesMenu({ tables }) {
  return (
    <div class="flex flex-col w-48 shrink-0">
      <div class="py-1 px-3 text-xs text-slate-600 text-center font-semibold uppercase">Tables</div>
      <Suspense fallback="Loading...">
        <For each={tables()}>{(table) => <TablesMenuItem table={table} />}</For>
      </Suspense>
    </div>
  );
}

function Header() {
  return (
    <div class="h-12 shrink-0">
      <A href="/">Logo</A>
    </div>
  );
}

export default function Page() {
  const [tables] = createResource(async () => {
    return client.getTables.query();
  });

  return (
    <div class="flex flex-col h-screen">
      <Header />
      <div class="flex flex-row grow w-screen">
        <TablesMenu tables={tables} />
        <div class="flex flex-col grow bg-white rounded-t shadow-md overflow-hidden">
          <Routes>
            <Route path="/table/:name" component={TableView} />
          </Routes>
        </div>
        <div class="flex flex-col w-12 shrink-0"></div>
      </div>
    </div>
  );
}
