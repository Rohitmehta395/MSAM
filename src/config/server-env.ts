import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
  SUBMISSION_SINK: z.string().min(1).default('console'),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function formatErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join('.') || 'variable'}: ${issue.message}`)
    .join('\n');
}

function parseServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse({
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || undefined,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || undefined,
    SUBMISSION_SINK: process.env.SUBMISSION_SINK || undefined,
  });

  if (!result.success) {
    const message = `\n❌ Invalid server environment configuration:\n${formatErrors(result.error)}`;
    console.error(message);
    throw new Error(message);
  }

  return result.data;
}

/**
 * Validated server-only environment variables.
 * Protected by 'server-only' package import to prevent client bundling.
 */
export const serverEnv: ServerEnv = parseServerEnv();
