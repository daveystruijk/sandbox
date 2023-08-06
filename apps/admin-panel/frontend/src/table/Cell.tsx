import { CellContext } from '@tanstack/solid-table';
import { Component, createSignal } from 'solid-js';

import { Entry } from '@sandbox/admin-panel-backend/src/router';

import { dataTypeToInputType, valueToInputString } from './transformations';

export const Cell: Component<{ info: CellContext<Entry, unknown> }> = (props) => {
  let inputRef: HTMLInputElement;

  const [editing, setEditing] = createSignal(true);

  const value = valueToInputString(
    props.info.getValue(),
    props.info.column.columnDef.meta.dataType,
  );

  const onEnter = () => {
    setEditing(true);
  };

  const onExit = () => {
    inputRef.blur();
    setEditing(false);
    // TODO: update mutations
  };

  return (
    <input
      class="px-1 py-1 h-full w-full bg-transparent focus:outline outline-slate-400 focus:bg-white text-slate-900 truncate"
      classList={{
        'hover:cursor-not-allowed': props.info.column.columnDef.meta.isDisabled,
      }}
      ref={inputRef}
      type={dataTypeToInputType(props.info.column.columnDef.meta.dataType)}
      value={value}
      disabled={props.info.column.columnDef.meta.isDisabled}
      onFocus={onEnter}
      onBlur={onExit}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          // TODO: reset value to last-pending or original
          onExit();
        }
        if (e.key === 'Enter') {
          onExit();
        }
      }}
    />
  );
};
