import { z } from 'zod';

/**
 * Supported inquiry kinds corresponding to community and partnership pathways.
 * Target: POST /api/contact
 */
export const inquiryKindSchema = z.enum([
  'food_provider',
  'volunteer',
  'partner',
  'funding',
  'general',
  'pathway',
]);

export type InquiryKind = z.infer<typeof inquiryKindSchema>;

/**
 * 1. Food Provider inquiry schema (farms, grocers, restaurants, distributors).
 * Grounded in Figma frame: `design-reference/Community Page/1-Food Providers/3-Food Provider Form - updated.png`.
 */
export const foodProviderInquirySchema = z.object({
  kind: z.literal('food_provider').default('food_provider'),
  nameAndOrg: z.string().trim().min(2, 'Please enter your name, title, and organization').max(150),
  foodType: z
    .string()
    .trim()
    .min(2, 'Please specify the type of food (e.g. fresh produce, prepared meals)')
    .max(200),
  quantityAndFrequency: z
    .string()
    .trim()
    .min(
      5,
      'Please share approximate volume, frequency, and handling notes (at least 5 characters)',
    )
    .max(2000),
  contactDetails: z
    .string()
    .trim()
    .min(5, 'Please provide your email or phone and best time to discuss')
    .max(200),
  consent: z.literal(true, {
    message: 'You must agree to be contacted about this request',
  }),
});

/**
 * 2. Volunteer inquiry schema (individual or group volunteers).
 */
export const volunteerInquirySchema = z.object({
  kind: z.literal('volunteer'),
  name: z.string().trim().min(1, 'Full name is required').max(100),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
  interests: z.array(z.string().trim()).min(1, 'Please select at least one area of interest'),
  availability: z.array(z.string().trim()).min(1, 'Please select your general availability'),
  isGroup: z.boolean().optional().default(false),
  groupSize: z.number().int().min(1).max(500).optional(),
  organizationName: z.string().trim().max(150).optional(),
  message: z.string().trim().max(1000).optional(),
});

/**
 * 3. Distribution Partner inquiry schema (churches, agencies, community centers).
 */
export const partnerInquirySchema = z.object({
  kind: z.literal('partner'),
  name: z.string().trim().min(1, 'Contact name is required').max(100),
  organizationName: z.string().trim().min(1, 'Organization name is required').max(150),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
  partnerType: z.enum(
    [
      'faith-based',
      'community-center',
      'shelter',
      'school-or-youth',
      'healthcare',
      'civic-group',
      'other',
    ],
    { message: 'Please select your organization type' },
  ),
  hostDistribution: z.boolean().optional().default(false),
  address: z.string().trim().min(1, 'Address is required').max(200),
  city: z.string().trim().min(1, 'City is required').max(50),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid 5-digit ZIP code'),
  message: z.string().trim().max(1000).optional(),
});

/**
 * 4. Funding & Sponsorship inquiry schema (grants, corporate sponsorships, major gifts).
 */
export const fundingInquirySchema = z.object({
  kind: z.literal('funding'),
  name: z.string().trim().min(1, 'Contact name is required').max(100),
  organizationName: z.string().trim().max(150).optional(),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  areaOfInterest: z.string().trim().max(150).optional(),
  fundingApproach: z.string().trim().max(500).optional(),
  estimatedAmount: z.number().positive().optional(),
  message: z.string().trim().max(2000).optional(),
  agreedToContact: z.literal(true, {
    message: 'You must agree to be contacted about this request',
  }),
});

/**
 * 5. General inquiry schema (questions, feedback, community inquiries).
 */
export const generalInquirySchema = z.object({
  kind: z.literal('general'),
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(2000),
});

/**
 * 6. Mission pathway contact inquiry schema (Give Food, Serve, Give Funds).
 * Grounded in design-reference/Mission Page/Contact pathways-updated.png.
 */
export const pathwayInquirySchema = z.object({
  kind: z.literal('pathway').default('pathway'),
  pathway: z.enum(['give-food', 'serve', 'give-funds']),
  nameAndOrg: z.string().trim().min(2, 'Please enter your name and organization').max(150),
  areaOfInterest: z.string().trim().min(2, 'Please enter your area of interest').max(150),
  tellUsMore: z
    .string()
    .trim()
    .min(5, 'Please share a few details (at least 5 characters)')
    .max(2000),
  contactDetails: z.string().trim().min(5, 'Please enter your email or phone number').max(200),
  consent: z.literal(true, {
    message: 'You must agree to be contacted about this request',
  }),
});

/**
 * Combined discriminated union of all inquiry kinds.
 */
export const inquirySchema = z.discriminatedUnion('kind', [
  foodProviderInquirySchema,
  volunteerInquirySchema,
  partnerInquirySchema,
  fundingInquirySchema,
  generalInquirySchema,
  pathwayInquirySchema,
]);

export type FoodProviderInquiry = z.infer<typeof foodProviderInquirySchema>;
export type VolunteerInquiry = z.infer<typeof volunteerInquirySchema>;
export type PartnerInquiry = z.infer<typeof partnerInquirySchema>;
export type FundingInquiry = z.infer<typeof fundingInquirySchema>;
export type GeneralInquiry = z.infer<typeof generalInquirySchema>;
export type PathwayInquiry = z.infer<typeof pathwayInquirySchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
