import 'server-only';
import { handleSubmission } from '@/lib/api';
import { newsletterSchema, type NewsletterInput } from '@/lib/validation';

export async function POST(req: Request) {
  return handleSubmission<NewsletterInput>(req, {
    endpoint: 'newsletter',
    schema: newsletterSchema,
    successMessage: 'Thank you for subscribing to Manna updates and community stories!',
    rateLimit: {
      limit: 10,
      windowMs: 60_000, // 10 subscriptions per minute per IP
    },
  });
}
