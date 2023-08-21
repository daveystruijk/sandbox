import { createTRPCProxyClient, httpLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@sandbox/admin-panel-backend/src/router';

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpLink({
      url: `http://localhost:2022`,
    }),
  ],
});
