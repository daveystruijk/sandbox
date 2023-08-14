import { Component, createMemo, createSignal } from 'solid-js';

import { Column } from '@sandbox/admin-panel-backend/src/router';

import { inputStringFromValue, valueFromInputString } from './transformations';

export const Cell: Component<{
  rowId: number;
  column: Column;
  initialValue: unknown;
  setMutation: (rowId: number, key: string, value: unknown) => void;
  unsetMutation: (rowId: number, key: string) => void;
}> = (props) => {
  let inputRef: HTMLInputElement;

  const [value, setValue] = createSignal(props.initialValue);

  const hasChanges = createMemo(() => value() !== props.initialValue);

  const onInput = () => {
    setValue(valueFromInputString(inputRef.value, props.column.dataType));
    if (hasChanges()) {
      props.setMutation(props.rowId, props.column.name, inputRef.value);
    } else {
      props.unsetMutation(props.rowId, props.column.name);
    }
  };

  const extraProps = {
    varchar: { type: 'text' },
    timestamp: { type: 'datetime-local' },
    integer: { type: 'text', inputmode: 'numeric' },
    boolean: { type: 'checkbox', checked: value() },
  };

  return (
    <input
      ref={inputRef}
      value={inputStringFromValue(value(), props.column.dataType)}
      onInput={onInput}
      classList={{
        'hover:cursor-not-allowed': props.column.isDisabled,
        'bg-orange-100': hasChanges(),
      }}
      disabled={props.column.isDisabled}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          inputRef.blur();
        }
        if (e.key === 'Enter') {
          inputRef.blur();
        }
      }}
      {...extraProps[props.column.dataType]}
    />
  );
};
