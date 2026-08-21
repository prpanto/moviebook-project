import { drizzle } from "drizzle-orm/neon-http";
export * as schema from "./schema";

export const database = drizzle(process.env.DATABASE_URL!);
