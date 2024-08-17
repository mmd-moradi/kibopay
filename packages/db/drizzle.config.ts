import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";


config({ path: '.env' });

export default defineConfig({
  dialect: "postgresql",
  out: "./src/migrations",
  migrations: {
    table: "drizzle_migrations",
    schema: "public",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: "./src/schemas",
});
