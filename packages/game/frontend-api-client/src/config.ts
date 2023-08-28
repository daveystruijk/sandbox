// import dotenv from 'dotenv';
import { z } from 'zod';

// TODO: Use process.env in both native and web

// dotenv.config();

const configSchema = z.object({
  BACKEND_URL: z.string().default('http://0.0.0.0:4001'),
  WEBSOCKET_URL: z.string().default('ws://0.0.0.0:4001/ws'),
});

const config = configSchema.parse({});

export default config;
export type ConfigSchema = z.infer<typeof configSchema>;
