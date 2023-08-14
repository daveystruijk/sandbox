import { clamp, isEmpty, keyBy } from 'lodash';
import { Component, ErrorBoundary, For, Show, createEffect, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Column, Row } from '@sandbox/admin-panel-backend/src/router';

import { ErrorMessage } from '../components/ErrorMessage';
import { Cell } from './Cell';
import { columnWidth } from './calculations';

export const TableContents: Component<{ contents: { columns: Column[]; rows: Row[] } }> = (
  props,
) => {
  const [mutations, setMutations] = createStore<Record<number, Row>>({});
  const primaryKey = 'id'; // TODO: dynamic?
  const columnsByName = createMemo(() => keyBy(props.contents.columns, 'name'));

  const setMutation = (rowId: number, columnName: string, value: unknown) => {
    setMutations(rowId, {});
    setMutations(rowId, columnName, value);
  };

  const unsetMutation = (rowId: number, columnName: string) => {
    if (!(rowId in mutations)) {
      return;
    }
    setMutations(rowId, columnName, undefined);
    if (isEmpty(mutations[rowId])) {
      setMutations(rowId, undefined);
    }
  };

  return (
    <div class="flex flex-col h-full">
      <div class="relative overflow-x-auto h-full">
        <ErrorBoundary fallback={<ErrorMessage />}>
          <table class="">
            <thead class="sticky top-0">
              <tr class="px-2">
                <For each={props.contents.columns}>
                  {(column, i) => {
                    const size = columnWidth(props.contents.rows, column);
                    return (
                      <th
                        class="text-left text-xs"
                        style={{
                          width: `${Math.max(size, 40)}px`,
                          'min-width': `${clamp(size, 40, 200)}px`,
                        }}
                      >
                        <div class="flex flex-col gap-1 px-1 py-1">
                          <span class="text-slate-600">{column.name}</span>
                          <span class="text-slate-300">
                            {column.dataType}
                            {column.isNullable ? '?' : ''}
                          </span>
                        </div>
                      </th>
                    );
                  }}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={props.contents.rows}>
                {(row) => {
                  return (
                    <tr>
                      <For each={Object.entries(row)}>
                        {([key, value]) => (
                          <td>
                            <Cell
                              rowId={row[primaryKey] as number}
                              initialValue={value}
                              column={columnsByName()[key]}
                              setMutation={setMutation}
                              unsetMutation={unsetMutation}
                            />
                          </td>
                        )}
                      </For>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
        </ErrorBoundary>
      </div>
      <Show when={Object.keys(mutations).length}>
        <div class="flex h-16 bg-white p-2">
          <div class="flex grow"></div>
          <div class="flex self-center">{Object.keys(mutations).length} rows changed</div>
          <div class="flex w-12 bg-green-100">{Object.keys(mutations).length} rows changed</div>
        </div>
      </Show>
    </div>
  );
};
