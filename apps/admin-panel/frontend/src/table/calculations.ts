import { max } from 'lodash';
import { Column, Row } from '@sandbox/admin-panel-backend/src/router';
import { inputStringFromValue } from './transformations';

const stringLengthToWidthFactor = 8;

export const pixelWidthFromStringLength = (length: number) => {
  return 20 + length * stringLengthToWidthFactor;
};

export const columnWidth = (rows: Row[], column: Column) => {
  const stringLengths = rows
    .map((row) => row[column.name])
    .map((value) => inputStringFromValue(value, column) || '')
    .map((s: string) => s.length);
  return pixelWidthFromStringLength(max(stringLengths));
};
