import 'server-only';
import { serverEnv } from '@/config/server-env';
import { maskIp } from './ip';
import type { SubmissionPayload, SubmissionResult, SubmissionSink } from './types';

/**
 * Development & Testing Submission Sink.
 * Logs privacy-sanitized metadata to the console without printing sensitive PII.
 *
 * In production:
 * Explicitly rejects delivery if no production sink (email, CRM, database)
 * is configured, preventing silent dropping of critical user inquiries or intake data.
 */
export class ConsoleSink implements SubmissionSink {
  async deliver(payload: SubmissionPayload): Promise<SubmissionResult> {
    const isProduction = process.env.NODE_ENV === 'production';

    // Explicit production guard:
    // Never report success in production if a real delivery sink is not wired.
    if (isProduction) {
      console.error(
        `[SubmissionSink] Configuration Error: Attempted to deliver a submission to ConsoleSink in production mode for endpoint '${payload.endpoint}'. A production delivery sink (email, CRM, or database) must be configured.`,
      );
      return {
        success: false,
        message: 'Submission service is not configured for production delivery.',
      };
    }

    // Safe, privacy-preserving logging in development:
    const maskedIp = maskIp(payload.meta.ip);
    const summary = this.buildSafeSummary(payload);

    console.warn(
      `[ConsoleSink] Valid submission received | endpoint: ${payload.endpoint} | receivedAt: ${payload.meta.receivedAt} | ip: ${maskedIp} | ${summary}`,
    );

    return {
      success: true,
      message: 'Submission received successfully.',
    };
  }

  /**
   * Sanitizes payload data for logging, ensuring names, demographic data,
   * household details, and sensitive health info are strictly omitted.
   */
  private buildSafeSummary(payload: SubmissionPayload): string {
    const data =
      payload.data && typeof payload.data === 'object'
        ? (payload.data as Record<string, unknown>)
        : {};

    switch (payload.endpoint) {
      case 'newsletter': {
        const email = typeof data.email === 'string' ? data.email : '';
        const maskedEmail = email.replace(/^(.{2})(.*)(@.*)$/, '$1***$3');
        return `email: ${maskedEmail}`;
      }
      case 'contact': {
        const kind = data.kind || 'unknown';
        return `kind: ${kind}`;
      }
      case 'intake': {
        const peopleCount =
          data.peopleCount ||
          (Array.isArray(data.familyMembers) ? data.familyMembers.length : 'unspecified');
        const city =
          data.city ||
          (typeof data.address === 'object' && data.address !== null && 'city' in data.address
            ? (data.address as { city?: string }).city
            : 'unspecified');
        const mode = data.householdName ? 'household' : 'lite';
        return `mode: ${mode}, householdSize: ${peopleCount}, city: ${city} (sensitive PII omitted)`;
      }
      case 'donate-intent': {
        const amount = data.amount;
        const frequency = data.frequency;
        const designation = data.designation;
        return `amount: $${amount}, frequency: ${frequency}, designation: ${designation}`;
      }
      default:
        return 'data: [sanitized]';
    }
  }
}

/**
 * Retrieves the active SubmissionSink based on environment configuration.
 */
export function getSubmissionSink(): SubmissionSink {
  const configured = serverEnv.SUBMISSION_SINK.toLowerCase();

  switch (configured) {
    case 'console':
      return new ConsoleSink();
    default:
      // In development or if unrecognized, fallback to ConsoleSink
      return new ConsoleSink();
  }
}
