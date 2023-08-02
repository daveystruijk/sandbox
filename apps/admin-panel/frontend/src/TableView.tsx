import { useParams } from '@solidjs/router';
import { createSolidTable, flexRender, getCoreRowModel } from '@tanstack/solid-table';
import { For, Show, createResource } from 'solid-js';

import { client } from './client';

function Table({ name, details }) {
  const table = createSolidTable({
    get data() {
      return details().data.map((row) => ({
        ...row,
      }));
    },
    get columns() {
      return details().columns.map((col) => ({
        id: col.column_name,
        header: col.column_name,
        accessorKey: col.column_name,
      }));
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="relative overflow-x-auto h-full">
      <table class="w-full">
        <thead class="border-b border-slate-200">
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr class="px-2">
                <For each={headerGroup.headers}>
                  {(header, i) => (
                    <th
                      class="px-1 py-1 border-slate-200 text-left text-xs text-slate-600"
                      classList={{ 'border-l': i() !== 0 }}
                    >
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
              <tr class="hover:bg-slate-50">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="px-1 py-1 truncate text-left text-xs text-slate-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )}
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
      <Show when={false}>
        <div class="flex flex-col h-12 shrink-0 bg-slate-400"></div>
      </Show>
    </Show>
  );
}
