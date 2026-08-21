import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ofetch } from "ofetch";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `/api${path}`;

  try {
    const data = await ofetch<T>(url, options);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
}
