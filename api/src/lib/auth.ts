import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { database, schema } from "./database";

const baseURL = process.env.APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:8000";

export const auth = betterAuth({
  baseURL,
  secret: process.env.APP_KEY,
  database: drizzleAdapter(database, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
