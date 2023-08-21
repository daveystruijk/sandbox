import { A, Route, Router, Routes } from '@solidjs/router';
import { Component, createResource, ErrorBoundary, For, Suspense } from 'solid-js';
import { ErrorMessage } from './components/ErrorMessage';
import { Spinner } from './components/Spinner';
import { TablePage } from './table/TablePage';
import { client } from './trpc';

const Sidebar: Component = () => {
  // const [open, setOpen] = createSignal(false);

  return <div class="align-items-center flex w-12 shrink-0 flex-col"></div>;
};

const Root: Component = () => {
  const [tables] = createResource(async () => {
    return client.getTables.query();
  });

  return (
    <div class="flex h-screen flex-col items-stretch">
      <div class="flex h-12 shrink-0 flex-row">
        <div class="flex w-48">
          <A href="/">Logo</A>
        </div>
        <div class="flex grow"></div>
        <div class="flex w-12"></div>
      </div>
      <div class="flex w-screen grow flex-row items-stretch overflow-hidden">
        <div class="flex w-48 shrink-0 flex-col">
          <div class="px-3 py-1 text-center text-xs font-semibold uppercase text-slate-600">
            Tables
          </div>
          <Suspense fallback={<Spinner />}>
            <ErrorBoundary fallback={<ErrorMessage />}>
              <For each={tables()}>
                {(table) => (
                  <A
                    href={`/table/${table.table_name}`}
                    end={true}
                    class="mx-2 rounded px-2 py-1 text-xs text-slate-900 hover:bg-slate-300"
                  >
                    {table.table_name}
                  </A>
                )}
              </For>
            </ErrorBoundary>
          </Suspense>
        </div>
        <div class="flex grow flex-col overflow-hidden rounded-t bg-white shadow-md">
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
