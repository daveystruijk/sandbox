import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
});

const config = configSchema.parse(process.env);

export default config;
export type ConfigSchema = z.infer<typeof configSchema>;
