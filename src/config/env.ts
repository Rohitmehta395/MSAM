import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid URL')
    .default('http://localhost:3000'),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  NEXT_PUBLIC_DONATION_URL: z
    .string()
    .url('NEXT_PUBLIC_DONATION_URL must be a valid URL')
    .optional()
    .or(z.literal('')),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

function formatErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join('.') || 'variable'}: ${issue.message}`)
    .join('\n');
}

function parsePublicEnv(): PublicEnv {
  const result = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || undefined,
    NEXT_PUBLIC_DONATION_URL: process.env.NEXT_PUBLIC_DONATION_URL || undefined,
  });

  if (!result.success) {
    const message = `\n❌ Invalid public environment configuration:\n${formatErrors(result.error)}`;
    console.error(message);
    throw new Error(message);
  }

  return result.data;
}

/**
 * Validated public environment variables (NEXT_PUBLIC_*).
 * Client-safe for consumption across both Server and Client Components.
 */
export const publicEnv: PublicEnv = parsePublicEnv();

/**
 * Default alias for public environment configuration.
 */
export const env: PublicEnv = publicEnv;
