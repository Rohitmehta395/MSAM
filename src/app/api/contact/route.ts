import 'server-only';
import { handleSubmission } from '@/lib/api';
import { inquirySchema, type InquiryInput } from '@/lib/validation';

export async function POST(req: Request) {
  return handleSubmission<InquiryInput>(req, {
    endpoint: 'contact',
    schema: inquirySchema,
    successMessage:
      'Thank you for reaching out! A member of the Manna team will connect with you soon.',
    rateLimit: {
      limit: 5,
      windowMs: 60_000, // 5 submissions per minute per IP
    },
  });
}
