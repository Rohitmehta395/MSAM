import { z } from 'zod';

export const dietaryPreferenceOptions = [
  'Dairy-free',
  'Gluten-free',
  'No preference',
  'Vegetarian',
  'Vegan',
] as const;

export type DietaryPreferenceOption = (typeof dietaryPreferenceOptions)[number];

export const dietaryPreferenceSchema = z.enum(dietaryPreferenceOptions);

export const dietaryPreferencesSchema = z
  .array(dietaryPreferenceSchema)
  .refine((items) => new Set(items).size === items.length, {
    message: 'Duplicate dietary preferences are not allowed',
  })
  .optional()
  .default([]);

/** @deprecated Obsolete in updated design; replaced by DietaryPreferenceOption */
export const packagePreferenceSchema = z.enum([
  'fresh-produce',
  'family-staples',
  'prepared-meals',
  'infant-supplies',
  'elderly-pack',
  'hygiene-kit',
]);
export type PackagePreference = z.infer<typeof packagePreferenceSchema>;

/**
 * Validation schema for lightweight food support requests (e.g. assistance request on How It Works).
 * Target: POST /api/intake (mode: 'lite')
 */
export const intakeLiteSchema = z.object({
  householdName: z.string().trim().min(1, 'Household name is required').max(100),
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
  peopleCount: z.coerce
    .number({ message: 'Number of people in household is required' })
    .int('Household size must be a whole number')
    .min(1, 'Household size must be at least 1')
    .max(20, 'For households larger than 20, please contact our community line'),
  city: z.string().trim().max(50).optional().default('Broward County'),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid 5-digit ZIP code')
    .optional()
    .or(z.literal('')),
  dietaryPreferences: dietaryPreferencesSchema,
  dietaryRestrictions: z.array(z.string().trim()).optional().default([]),
  notes: z.string().trim().max(1000).optional(),
  // Deprecated/optional backward-compatibility fields:
  packagePreferences: z.array(z.string().trim()).optional(),
  biologicalSex: z.enum(['female', 'male', 'prefer-not-to-say']).optional(),
  photoAttachmentUrl: z.string().url().optional().or(z.literal('')),
});

export type IntakeLiteInput = z.infer<typeof intakeLiteSchema>;

/** Alias for Part 6.3 Family Intake Form */
export const familyIntakeSchema = intakeLiteSchema;
export type FamilyIntakeInput = IntakeLiteInput;
