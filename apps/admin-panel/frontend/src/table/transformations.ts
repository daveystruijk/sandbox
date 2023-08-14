import { parseInt } from 'lodash';

import { Column, DataType } from '@sandbox/admin-panel-backend/src/router';

export const inputStringFromValue = (value: unknown, column: Column) => {
  if (value === null) {
    return null;
  }

  const mapping: Record<DataType, (v: unknown) => string> = {
    varchar: (v) => v.toString(),
    timestamp: (v: Date) =>
      v
        .toLocaleString('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(' ', 'T'),
    boolean: (v) => '',
    int4: (v) => v.toString(),
    json: (v) => (v ? JSON.stringify(v) : ''),
  };
  const str = mapping[column.dataType] ? mapping[column.dataType](value) : value.toString();
  return str;
};

export const valueFromInputString = (inputString: string, column: Column) => {
  if (inputString === null) {
    return null;
  }

  // If the table is nullable, an empty string will convert to NULL values
  if (inputString === '' && column.isNullable) {
    return null;
  }

  const mapping: Record<DataType, (s: string) => unknown> = {
    varchar: (s) => s,
    timestamp: (s) => new Date(s),
    boolean: (s) => s,
    int4: (s) => {
      // TODO: strip chars
      return parseInt(s);
    },
    json: (s) => JSON.parse(s),
  };

  const value = mapping[column.dataType] ? mapping[column.dataType](inputString) : inputString;
  return value;
};
