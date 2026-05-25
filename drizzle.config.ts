import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Charger les variables du fichier .env
dotenv.config();

export default defineConfig({
  out: "./drizzle", // Où seront sauvegardés les fichiers de migration
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});