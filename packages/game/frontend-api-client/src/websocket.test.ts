import { expect, test } from 'vitest';
import { connectWebsocket } from './websocket';

test('Websocket connection', async () => {
  const ws = await connectWebsocket();
});
