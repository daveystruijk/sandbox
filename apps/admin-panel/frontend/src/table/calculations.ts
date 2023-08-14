import { max } from 'lodash';

import { Column, Row } from '@sandbox/admin-panel-backend/src/router';

import { inputStringFromValue } from './transformations';

const stringLengthToWidthFactor = 8;

export const columnWidth = (rows: Row[], column: Column) => {
  const stringLengths = rows
    .map((row) => row[column.name])
    .map((value) => inputStringFromValue(value, column.dataType) || '')
    .map((s: string) => s.length);
  const fittingWidth = 20 + max(stringLengths) * stringLengthToWidthFactor;
  return fittingWidth;
};
