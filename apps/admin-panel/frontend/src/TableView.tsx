import { useParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { createSolidTable, flexRender, getCoreRowModel } from '@tanstack/solid-table';
import { For, Match, Show, Suspense, Switch, createResource } from 'solid-js';

import { client } from './client';

function Table({ name, details }) {
  const table = createSolidTable({
    get data() {
      return details().data;
    },
    get columns() {
      return details().columns.map((row) => ({
        id: row.column_name,
        header: row.column_name,
      }));
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="flex grow">
      <table>
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>}
                </For>
              </tr>
            )}
          </For>
        </tbody>
        <tfoot>
          <For each={table.getFooterGroups()}>
            {(footerGroup) => (
              <tr>
                <For each={footerGroup.headers}>
                  {(header) => (
                    <th>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tfoot>
      </table>
    </div>
  );
}

export default function TableView() {
  const params = useParams<{ name: string }>();

  const [details] = createResource(
    () => [params.name] as const,
    async ([name]) => {
      return client.getTableDetails.query({ name });
    },
  );

  return (
    <Show when={details()}>
      <Table name={params.name} details={details} />
    </Show>
  );
}
