import { expect, test } from 'vitest';
import { Column } from '@sandbox/admin-panel-backend/src/router';
import { inputStringFromValue, valueFromInputString } from './transformations';

const makeColumn = (overrides: Partial<Column>): Column => ({
  name: 'colname',
  dataType: 'varchar',
  isNullable: true,
  isDisabled: false,
  ...overrides,
});

test('varchar', () => {
  const column = makeColumn({ dataType: 'varchar' });
  const inputString = 'Some input string';

  const value = valueFromInputString(inputString, column);
  const inputStringAgain = inputStringFromValue(value, column);

  expect(value).toEqual(inputString);
  expect(inputStringAgain).toEqual(inputString);
});

test('timestamp', () => {
  const column = makeColumn({ dataType: 'timestamp' });
  const inputString = '2023-07-03T13:41:06.541Z';

  const value = valueFromInputString(inputString, column);
  const inputStringAgain = inputStringFromValue(value, column);

  expect(inputStringAgain).toEqual(inputString);
});

test('boolean', () => {
  const column = makeColumn({ dataType: 'boolean' });

  const value = true;

  const inputString = inputStringFromValue(value, column);
  const valueAgain = valueFromInputString(inputString, column);

  expect(valueAgain).toEqual(value);
});
