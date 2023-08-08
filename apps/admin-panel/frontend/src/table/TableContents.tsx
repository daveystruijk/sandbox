import { clamp, isEmpty, keyBy } from 'lodash';
import { Component, ErrorBoundary, For, Show, createMemo, createSignal } from 'solid-js';

import { Column, Entry } from '@sandbox/admin-panel-backend/src/router';

import { ErrorMessage } from '../components/ErrorMessage';
import { Cell } from './Cell';
import { columnWidth } from './calculations';

export const TableContents: Component<{ contents: { columns: Column[]; entries: Entry[] } }> = (
  props,
) => {
  const [mutations, setMutations] = createSignal({});
  const primaryKey = 'id'; // TODO: dynamic?
  const columnsByName = createMemo(() => keyBy(props.contents.columns, 'column_name'));

  const setMutation = (rowId: number, key: string, value: unknown) => {
    console.log(mutations());
    setMutations((mutations) => ({
      ...mutations,
      [rowId]: {
        ...mutations[rowId],
        [key]: value,
      },
    }));
  };

  const unsetMutation = (rowId: number, key: string) => {
    console.log(mutations());
    const m = { ...mutations() };
    delete m[rowId][key];
    if (isEmpty(m[rowId])) {
      delete m[rowId];
    }
    setMutations(m);
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
                    const size = columnWidth(props.contents.entries, column);
                    return (
                      <th
                        class="text-left text-xs"
                        style={{
                          width: `${Math.max(size, 40)}px`,
                          'min-width': `${clamp(size, 40, 100)}px`,
                          'max-width': '400px',
                        }}
                      >
                        <div class="flex flex-col gap-1 px-1 py-1">
                          <span class="text-slate-600">{column.column_name}</span>
                          {/*<span class="text-slate-300">{props.column.data_type}</span>*/}
                        </div>
                      </th>
                    );
                  }}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={props.contents.entries}>
                {(row) => {
                  return (
                    <tr>
                      <For each={Object.entries(row)}>
                        {([key, value]) => (
                          <td>
                            <Cell
                              rowId={row[primaryKey] as number}
                              key={key}
                              value={value}
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
      <Show when={Object.keys(mutations()).length}>
        <div class="flex h-16 bg-white p-2">
          <div class="flex grow"></div>
          <div class="flex w-12 bg-green-100">{Object.keys(mutations()).length} rows changed</div>
        </div>
      </Show>
    </div>
  );
};
