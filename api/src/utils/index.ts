import { ofetch } from "ofetch";
import { z } from "zod";

export async function fetcher(url: string, options?: RequestInit) {
  try {
    const data = await ofetch(url, options);
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
}

export function zodErrorFormatter(errors: z.ZodError): { [key: string]: string } {
  const errorMap: { [key: string]: string } = {};

  errors.issues.forEach((issue: z.core.$ZodIssue) => {
    errorMap[issue.path.join(".")] = issue.message;
  });

  return errorMap;
}
