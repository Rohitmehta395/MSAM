import { z } from 'zod';

export const incomeRangeSchema = z.enum([
  'under-15k',
  '15k-25k',
  '25k-40k',
  '40k-60k',
  '60k-plus',
  'prefer-not-to-say',
]);

export const memberRelationshipSchema = z.enum([
  'head',
  'spouse',
  'child',
  'parent',
  'grandparent',
  'other-relative',
  'non-relative',
]);

export const genderSchema = z.enum(['female', 'male', 'other', 'prefer-not-to-say']);

/**
 * Step 1: Head of household and primary metrics.
 */
export const householdStep1Schema = z.object({
  householdName: z.string().trim().min(1, 'Household name is required').max(100),
  peopleCount: z
    .number({ message: 'Number of people in household is required' })
    .int('Household size must be a whole number')
    .min(1, 'Household size must be at least 1')
    .max(20, 'For households larger than 20, please contact our community line'),
  headOfHousehold: z.object({
    firstName: z.string().trim().min(1, 'First name is required').max(50),
    lastName: z.string().trim().min(1, 'Last name is required').max(50),
    phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
    email: z
      .string()
      .trim()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address')
      .toLowerCase(),
  }),
  // Sensitive field: annual income range (kept optional per privacy guidelines)
  annualIncomeRange: incomeRangeSchema.optional(),
});

/**
 * Family member profile for Step 2 of the wizard.
 */
export const familyMemberSchema = z.object({
  id: z.string().trim().min(1, 'Member ID is required'),
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().min(1, 'Last name is required').max(50),
  relationship: memberRelationshipSchema,
  birthdate: z.string().trim().optional(),
  age: z.number().int().min(0).max(125).optional(),
  // Demographics kept optional / adjustable
  gender: genderSchema.optional(),
  nationality: z.string().trim().max(100).optional(),
  raceEthnicity: z.string().trim().max(100).optional(),
  statusTags: z.array(z.string().trim()).optional().default([]),
  notes: z.string().trim().max(500).optional(),
  isComplete: z.boolean().default(true),
});

/**
 * Step 2: Family members list.
 */
export const householdStep2Schema = z.object({
  familyMembers: z
    .array(familyMemberSchema)
    .min(1, 'At least the head of household must be added as a member'),
});

/**
 * Step 3: Address, food preferences, and review confirmation.
 */
export const householdStep3Schema = z.object({
  address: z.object({
    street: z.string().trim().min(1, 'Street address is required').max(150),
    unit: z.string().trim().max(30).optional(),
    city: z.string().trim().min(1, 'City is required').max(50),
    state: z.string().trim().length(2, 'State must be a 2-letter abbreviation').default('FL'),
    zipCode: z
      .string()
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid 5-digit ZIP code'),
  }),
  dietaryPreferences: z.array(z.string().trim()).optional().default([]),
  dietaryNotes: z.string().trim().max(1000).optional(),
  deliveryNotes: z.string().trim().max(1000).optional(),
  consentConfirmed: z.literal(true, {
    message: 'You must confirm that the provided information is accurate',
  }),
});

/**
 * Full composite Household Intake Schema for final submission.
 * Target: POST /api/intake (mode: 'household')
 */
export const householdIntakeSchema = householdStep1Schema
  .merge(householdStep2Schema)
  .merge(householdStep3Schema);

export type IncomeRange = z.infer<typeof incomeRangeSchema>;
export type MemberRelationship = z.infer<typeof memberRelationshipSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type HouseholdStep1Input = z.infer<typeof householdStep1Schema>;
export type FamilyMember = z.infer<typeof familyMemberSchema>;
export type HouseholdStep2Input = z.infer<typeof householdStep2Schema>;
export type HouseholdStep3Input = z.infer<typeof householdStep3Schema>;
export type HouseholdIntakeInput = z.infer<typeof householdIntakeSchema>;
