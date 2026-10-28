import { z } from 'zod';

/**
 * Validation schema for newsletter email subscription submissions.
 * Target: POST /api/newsletter
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  source: z.string().trim().optional().default('footer'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
