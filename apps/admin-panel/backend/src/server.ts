import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import config from './config';
import { router } from './router';

const server = createHTTPServer({
  router,
  middleware: config.NODE_ENV === 'development' ? cors() : undefined,
  onError: (opts) => {
    const { error } = opts;
    console.error(error);
  },
});

server.listen(2022);
