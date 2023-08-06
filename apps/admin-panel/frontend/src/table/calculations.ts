import { max } from 'lodash';

import { Column, Entry } from '@sandbox/admin-panel-backend/src/router';

import { valueToInputString } from './transformations';

const stringLengthToWidthFactor = 7.5;

export const columnWidth = (entries: Entry[], column: Column) => {
  const stringLengths = entries
    .map((row) => row[column.column_name])
    .map((value) => valueToInputString(value, column.data_type))
    .map((s: string) => s.length);
  const fittingWidth = max(stringLengths) * stringLengthToWidthFactor;
  return fittingWidth;
};
