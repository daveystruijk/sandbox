import {
  ColumnDef,
  RowData,
  createSolidTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/solid-table';
import { clamp } from 'lodash';
import { Component, For, createSignal } from 'solid-js';

import { Column, Entry } from '@sandbox/admin-panel-backend/src/router';

import { Cell } from './Cell';
import { ColumnHeader } from './ColumnHeader';
import { columnWidth } from './calculations';

declare module '@tanstack/solid-table' {
  // Add metadata to column information
  interface ColumnMeta<TData extends RowData, TValue> {
    dataType: string;
    isDisabled: boolean;
  }
}

export const TableContents: Component<{ contents: { columns: Column[]; entries: Entry[] } }> = (
  props,
) => {
  const [mutations, setMutations] = createSignal([]);

  const table = createSolidTable({
    get data() {
      return props.contents.entries;
    },
    get columns() {
      return props.contents.columns.map(
        (column) =>
          ({
            id: column.column_name,
            accessorKey: column.column_name,
            header: () => <ColumnHeader column={column} />,
            cell: (info) => <Cell info={info} />,
            size: columnWidth(props.contents.entries, column),
            meta: {
              dataType: column.data_type,
              isDisabled: column.is_disabled,
            },
          } as ColumnDef<Entry, unknown>),
      );
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div class="relative overflow-x-auto h-full">
      <table class="">
        <thead class="border-b border-slate-200">
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr class="px-2">
                <For each={headerGroup.headers}>
                  {(header, i) => (
                    <th
                      class="border-slate-200 text-left text-xs sticky"
                      classList={{ 'border-l': i() !== 0 }}
                      style={{
                        width: `${header.column.columnDef.size}px`,
                        'min-width': `${clamp(header.column.columnDef.size, 40, 100)}px`,
                        'max-width': '400px',
                      }}
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
              <tr class="h-6 hover:bg-slate-50">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="h-6 text-left text-xs p-0 hover:bg-slate-100">
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
};
