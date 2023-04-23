import ws from "ws";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
neonConfig.webSocketConstructor = ws;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool);
