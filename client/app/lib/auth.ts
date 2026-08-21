import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NODE_ENV !== "production" ? "http://localhost:8000" : undefined;

export const authClient = createAuthClient({
  baseURL
})