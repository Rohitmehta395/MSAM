import 'server-only';
import { publicEnv } from '@/config/env';
import { handleSubmission } from '@/lib/api';
import { donationIntentSchema, type DonationIntentInput } from '@/lib/validation';

export interface DonationIntentResponse {
  redirectUrl: string | null;
  amount: number;
  frequency: string;
  designation: string;
}

export async function POST(req: Request) {
  const isDonationUrlConfigured = Boolean(
    publicEnv.NEXT_PUBLIC_DONATION_URL && publicEnv.NEXT_PUBLIC_DONATION_URL.trim().length > 0,
  );

  return handleSubmission<DonationIntentInput, DonationIntentResponse>(req, {
    endpoint: 'donate-intent',
    schema: donationIntentSchema,
    successMessage: isDonationUrlConfigured
      ? 'Donation intent received. Proceed to secure checkout.'
      : 'Online checkout is not yet configured. No payment or checkout was initiated.',
    rateLimit: {
      limit: 15,
      windowMs: 60_000,
    },
    onSuccess: (donation) => {
      const baseUrl = publicEnv.NEXT_PUBLIC_DONATION_URL?.trim();

      // If no approved donation URL is configured, return null for redirectUrl.
      // Never fabricate a checkout URL or assume a payment has occurred.
      if (!baseUrl) {
        return {
          redirectUrl: null,
          amount: donation.amount,
          frequency: donation.frequency,
          designation: donation.designation,
        };
      }

      let redirectUrl: string | null = null;
      try {
        const url = new URL(baseUrl);
        url.searchParams.set('amount', String(donation.amount));
        url.searchParams.set('frequency', donation.frequency);
        if (donation.designation) {
          url.searchParams.set('designation', donation.designation);
        }
        if (donation.donorEmail) {
          url.searchParams.set('email', donation.donorEmail);
        }
        redirectUrl = url.toString();
      } catch {
        // Safe fallback if configured URL is unparseable
        redirectUrl = null;
      }

      return {
        redirectUrl,
        amount: donation.amount,
        frequency: donation.frequency,
        designation: donation.designation,
      };
    },
  });
}
