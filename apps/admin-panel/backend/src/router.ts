import { t } from './trpc';

export const router = t.router({
  getText: t.procedure.query(async () => {
    return ['hi'];
  }),
});

export type Router = typeof router;
