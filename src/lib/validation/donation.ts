import { z } from 'zod';

export const donationFrequencySchema = z.enum(['once', 'monthly']);

export const donationDesignationSchema = z.enum([
  'where-needed-most',
  'groceries',
  'operational-support',
]);

/**
 * Validation schema for donation intent selection and checkout hand-off.
 * Target: POST /api/donate/intent
 */
export const donationIntentSchema = z.object({
  amount: z
    .number({ message: 'Donation amount is required' })
    .positive('Donation amount must be greater than zero')
    .max(100000, 'Donation amount exceeds standard online processing limit'),
  frequency: donationFrequencySchema,
  designation: donationDesignationSchema.optional().default('where-needed-most'),
  donorName: z.string().trim().max(100).optional(),
  donorEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase()
    .optional()
    .or(z.literal('')),
});

export type DonationFrequency = z.infer<typeof donationFrequencySchema>;
export type DonationDesignation = z.infer<typeof donationDesignationSchema>;
export type DonationIntentInput = z.infer<typeof donationIntentSchema>;
