import { Component, createSignal } from 'solid-js';

import { Column } from '@sandbox/admin-panel-backend/src/router';

import { valueToInputString } from './transformations';

const attributes = (props) => {
  const byDataType = {
    'character varying': { type: 'text' },
    'timestamp without time zone': { type: 'datetime-local' },
    integer: { type: 'text', inputmode: 'numeric' },
    boolean: { type: 'checkbox', checked: props.value },
  };

  return byDataType[props.column.data_type];
};

export const Cell: Component<{
  rowId: number;
  key: string;
  value: unknown;
  column: Column;
  setMutation: (rowId: number, key: string, value: unknown) => void;
  unsetMutation: (rowId: number, key: string) => void;
}> = (props) => {
  let inputRef: HTMLInputElement;

  const [editing, setEditing] = createSignal(false);
  const [pendingChange, setPendingChange] = createSignal(undefined);

  const value = pendingChange()
    ? pendingChange()
    : valueToInputString(props.value, props.column.data_type);

  const onEnter = () => {
    setEditing(true);
  };

  const onExit = () => {
    inputRef.blur();
    setEditing(false);
    if (inputRef.value === props.value) {
      setPendingChange(undefined);
      props.unsetMutation(props.rowId, props.key);
    } else {
      setPendingChange(inputRef.value);
      props.setMutation(props.rowId, props.key, inputRef.value);
    }
  };

  return (
    <input
      ref={inputRef}
      value={value}
      onFocus={onEnter}
      onBlur={onExit}
      classList={{
        'hover:cursor-not-allowed': props.column.is_disabled,
        'bg-orange-200': pendingChange() !== undefined,
      }}
      disabled={props.column.is_disabled}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onExit();
        }
        if (e.key === 'Enter') {
          onExit();
        }
      }}
      {...attributes(props)}
    />
  );
};
