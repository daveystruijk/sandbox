import PgPromise from 'pg-promise';

import config from './config';

const pgPromise = PgPromise();

export const pg = pgPromise({
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
});

export const helpers = pgPromise.helpers;
