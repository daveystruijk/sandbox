import { Column, DataType } from '@sandbox/admin-panel-backend/src/router';

export const inputStringFromValue = (value: unknown, column: Column) => {
  if (value === null) {
    return null;
  }

  const mapping: Record<DataType, (v: unknown) => string> = {
    varchar: (v) => v.toString(),
    timestamp: (v: Date) => v.toISOString(),
    timestamptz: (v: Date) => v.toISOString(),
    boolean: (v) => v.toString(),
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

  const _xyz = '';

  const mapping: Record<DataType, (s: string) => unknown> = {
    varchar: (s) => s,
    timestamp: (s) => new Date(s),
    timestamptz: (s) => new Date(s),
    boolean: (s) => {
      if (s !== 'true' && s !== 'false') {
        throw new Error('Not a boolean');
      }
      return s === 'true';
    },
    int4: (s) => {
      const result = Number(s);
      if (isNaN(result)) {
        throw new Error('IsNaN');
      }
      return result;
    },
    json: (s) => JSON.parse(s),
  };

  const value = mapping[column.dataType] ? mapping[column.dataType](inputString) : inputString;
  return value;
};
