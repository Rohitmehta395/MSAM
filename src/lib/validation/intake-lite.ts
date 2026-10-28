import { z } from 'zod';

export const packagePreferenceSchema = z.enum([
  'fresh-produce',
  'family-staples',
  'prepared-meals',
  'infant-supplies',
  'elderly-pack',
  'hygiene-kit',
]);

/**
 * Validation schema for lightweight food support requests (e.g. assistance request on How It Works).
 * Target: POST /api/intake (mode: 'lite')
 */
export const intakeLiteSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase()
    .optional()
    .or(z.literal('')),
  peopleCount: z
    .number({ message: 'Number of people in household is required' })
    .int('Household size must be a whole number')
    .min(1, 'Household size must be at least 1')
    .max(20, 'For households larger than 20, please contact our community line'),
  city: z.string({ message: 'City is required' }).trim().min(1, 'City is required').max(50),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid 5-digit ZIP code')
    .optional()
    .or(z.literal('')),
  packagePreferences: z
    .array(z.string().trim())
    .min(1, 'Please select at least one package preference'),
  dietaryRestrictions: z.array(z.string().trim()).optional().default([]),
  notes: z.string().trim().max(1000).optional(),
  // Sensitive intake fields subject to client confirmation:
  biologicalSex: z.enum(['female', 'male', 'prefer-not-to-say']).optional(),
  photoAttachmentUrl: z.string().url().optional().or(z.literal('')),
});

export type PackagePreference = z.infer<typeof packagePreferenceSchema>;
export type IntakeLiteInput = z.infer<typeof intakeLiteSchema>;
