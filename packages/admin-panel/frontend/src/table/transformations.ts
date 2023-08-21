import { Column, DataType } from '@sandbox/admin-panel-backend/src/router';

export const inputStringFromValue = (value: unknown, column: Column) => {
  if (value === null || value === undefined) {
    return undefined;
  }

  const mapping: Record<DataType, (v: unknown) => string> = {
    varchar: (v) => (v as string).toString(),
    timestamp: (v) => (v as Date).toISOString(),
    timestamptz: (v) => (v as Date).toISOString(),
    boolean: (v) => (v as boolean).toString(),
    int4: (v) => (v as number).toString(),
    json: (v) => JSON.stringify(v as string),
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
    timestamptz: (s) => new Date(s),
    bool: (s) => {
      return s === 'true';
    },
    int4: (s) => {
      const result = Number(s);
      if (Number.isNaN(result)) {
        throw new Error('IsNaN');
      }
      return result;
    },
    json: (s) => JSON.parse(s),
  };

  const value = mapping[column.dataType] ? mapping[column.dataType](inputString) : inputString;
  return value;
};
