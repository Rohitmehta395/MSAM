import 'server-only';
import { z } from 'zod';
import { handleSubmission } from '@/lib/api';
import {
  householdIntakeSchema,
  intakeLiteSchema,
  type HouseholdIntakeInput,
  type IntakeLiteInput,
} from '@/lib/validation';

/**
 * Composite intake schema supporting both lightweight single-page intake
 * and the complete multi-step household intake wizard.
 */
const intakeSubmissionSchema = z.union([householdIntakeSchema, intakeLiteSchema]);

export type IntakeSubmissionInput = HouseholdIntakeInput | IntakeLiteInput;

export async function POST(req: Request) {
  return handleSubmission<IntakeSubmissionInput>(req, {
    endpoint: 'intake',
    schema: intakeSubmissionSchema,
    successMessage:
      'Your intake request has been submitted. Our team will prepare your groceries and reach out.',
    rateLimit: {
      limit: 5,
      windowMs: 60_000, // 5 requests per minute per IP
    },
  });
}
