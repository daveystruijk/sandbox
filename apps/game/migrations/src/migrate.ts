import dotenv from 'dotenv';
import { join } from 'path';
import { migrate } from 'postgres-migrations';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_HOST: z.string().nonempty(),
});

const env = envSchema.parse(process.env);

const dbConfig = {
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  host: env.POSTGRES_HOST,
  port: 5432,
  ensureDatabaseExists: true,
};

await migrate(dbConfig, join('src', 'migrations'));
