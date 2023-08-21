import { A, Route, Router, Routes } from '@solidjs/router';
import { Component, ErrorBoundary, For, Suspense, createResource } from 'solid-js';

import { ErrorMessage } from './components/ErrorMessage';
import { Spinner } from './components/Spinner';
import { TablePage } from './table/TablePage';
import { client } from './trpc';

const Sidebar: Component = () => {
  // const [open, setOpen] = createSignal(false);

  return <div class="flex flex-col align-items-center w-12 shrink-0"></div>;
};

const Root: Component = () => {
  const [tables] = createResource(async () => {
    return client.getTables.query();
  });

  return (
    <div class="flex flex-col h-screen items-stretch">
      <div class="flex flex-row h-12 shrink-0">
        <div class="flex w-48">
          <A href="/">Logo</A>
        </div>
        <div class="flex grow"></div>
        <div class="flex w-12"></div>
      </div>
      <div class="flex flex-row grow w-screen items-stretch overflow-hidden">
        <div class="flex flex-col w-48 shrink-0">
          <div class="py-1 px-3 text-xs text-slate-600 text-center font-semibold uppercase">
            Tables
          </div>
          <Suspense fallback={<Spinner />}>
            <ErrorBoundary fallback={<ErrorMessage />}>
              <For each={tables()}>
                {(table) => (
                  <A
                    href={`/table/${table.table_name}`}
                    end={true}
                    class="hover:bg-slate-300 px-2 py-1 mx-2 rounded text-xs text-slate-900"
                  >
                    {table.table_name}
                  </A>
                )}
              </For>
            </ErrorBoundary>
          </Suspense>
        </div>
        <div class="flex flex-col grow bg-white rounded-t shadow-md overflow-hidden">
          <Routes>
            <Route path="/table/:tableName" component={TablePage} />
          </Routes>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export const App: Component = () => {
  return (
    <Router>
      <Root />
    </Router>
  );
};
