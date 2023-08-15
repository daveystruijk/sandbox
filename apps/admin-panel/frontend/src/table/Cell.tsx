import { Component, createMemo, createSignal } from 'solid-js';

import { Column, DataType } from '@sandbox/admin-panel-backend/src/router';

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
  const [editing, setEditing] = createSignal(false);

  const hasChanges = createMemo(() => value() !== props.initialValue);

  const onInput = () => {
    try {
      const newValue = valueFromInputString(inputRef.value, props.column);
      console.log(value());
      console.log(newValue);
      setValue(newValue);
      if (hasChanges()) {
        props.setMutation(props.rowId, props.column.name, inputRef.value);
      } else {
        props.unsetMutation(props.rowId, props.column.name);
      }
      inputRef.setCustomValidity('');
    } catch (e) {
      props.unsetMutation(props.rowId, props.column.name);
      inputRef.setCustomValidity((e as Error).message);
      inputRef.reportValidity();
    }
  };

  const extraProps: Record<DataType, Record<string, unknown>> = {
    varchar: { type: 'text' },
    timestamp: { type: 'text' },
    timestamptz: { type: 'text' },
    json: { type: 'text' },
    bool: { type: 'checkbox', checked: value() === true, value: null },
    int4: { type: 'text' },
  };

  return (
    <td
      classList={{
        'hover:cursor-text': !props.column.isDisabled,
        'hover:cursor-not-allowed': props.column.isDisabled,
      }}
      onClick={() => {
        inputRef.focus();
      }}
    >
      <input
        ref={inputRef!}
        value={inputStringFromValue(value(), props.column)}
        onInput={onInput}
        classList={{
          'bg-orange-100': hasChanges(),
          'pointer-events-none': props.column.dataType === 'bool' ? false : !editing(),
        }}
        disabled={props.column.isDisabled}
        onFocus={() => {
          setEditing(true);
          inputRef.reportValidity();
        }}
        onBlur={() => {
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            inputRef.blur();
          }
          if (e.key === 'Enter') {
            inputRef.blur();
          }
        }}
        placeholder={value() === null ? 'NULL' : undefined}
        {...extraProps[props.column.dataType]}
      />
    </td>
  );
};
