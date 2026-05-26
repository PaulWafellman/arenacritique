import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import pg from "pg";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL n'est pas définie. Vérifie ton fichier .env ou ta configuration Docker.");
}

const initDb = () => {
  if (connectionString.includes("neon.tech")) {
    const client = neon(connectionString);
    return drizzleNeon({ client, schema });
  } 
  
  const pool = new pg.Pool({ connectionString });
  return drizzle({ client: pool, schema });
};

export const db = initDb();