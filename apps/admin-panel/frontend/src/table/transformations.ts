import { parseInt } from 'lodash';

import { DataType } from '@sandbox/admin-panel-backend/src/router';

export const inputStringFromValue = (value: unknown, dataType: DataType) => {
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
  const str = mapping[dataType] ? mapping[dataType](value) : value.toString();
  return str;
};

export const valueFromInputString = (inputString: string, dataType: DataType) => {
  if (inputString === null) {
    return null;
  }

  const mapping: Record<DataType, (s: string) => unknown> = {
    varchar: (s) => s,
    timestamp: (s) => new Date(s),
    boolean: (s) => s,
    int4: (s) => parseInt(s),
    json: (s) => JSON.parse(s),
  };

  const value = mapping[dataType] ? mapping[dataType](inputString) : inputString;
  return value;
};
