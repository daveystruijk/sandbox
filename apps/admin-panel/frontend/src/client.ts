import { createTRPCProxyClient, httpLink } from '@trpc/client';
import superjson from 'superjson';

import type { Router } from '@sandbox/admin-panel-backend/src/router';

export const client = createTRPCProxyClient<Router>({
  transformer: superjson,
  links: [
    httpLink({
      url: `http://localhost:2022`,
    }),
  ],
});
