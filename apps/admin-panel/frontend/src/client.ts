import { createTRPCProxyClient, httpLink, splitLink, wsLink } from '@trpc/client';

import type { AppRouter } from '@sandbox/admin-panel-backend/src/index';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // call subscriptions through websockets and the rest over http
    httpLink({
      url: `http://localhost:2022`,
    }),
  ],
});

async function main() {
  const helloResponse = await trpc.userById.query();
}

void main();
