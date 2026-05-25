import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import pg from "pg";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

// Fonction pour initialiser la bonne instance de base de données
const initDb = () => {
    // Si on est en production ou que l'URL contient l'hôte de Neon
    // On regarde UNIQUEMENT si l'URL contient "neon.tech"
  if (connectionString.includes("neon.tech")) {
    const client = neon(connectionString);
    return drizzleNeon({ client, schema });
  } else {
    // Si c'est localhost (Docker), on utilise le client standard, 
    // PEU IMPORTE si l'application est en mode dev ou production !
    const pool = new pg.Pool({ connectionString });
    return drizzle({ client: pool, schema });
  }
  
  //if (process.env.NODE_ENV === "production" || connectionString.includes("neon.tech")) {
  //  const client = neon(connectionString);
  //  return drizzleNeon({ client, schema });
  //} 
  //
  //// Sinon, on utilise le client standard pour Docker en local
  //const pool = new pg.Pool({
  //  connectionString: connectionString,
  //});
  //return drizzle({ client: pool, schema });
};

export const db = initDb();