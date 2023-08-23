import { expect, test } from 'vitest';
import { getIndex } from './index';

test('Api connection', async () => {
  const index = await getIndex();
  expect(await index.json()).toEqual([]);
});
