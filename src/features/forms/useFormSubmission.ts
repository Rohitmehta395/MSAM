'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { ApiResponse } from '@/lib/api/types';

export type FormSubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseFormSubmissionOptions<
  TFieldValues extends FieldValues = FieldValues,
  TResponseData = unknown,
> {
  /** Target API endpoint to POST data (e.g. '/api/contact', '/api/newsletter') */
  endpoint: string;
  /** Zod validation schema for client-side validation */
  schema?: ZodType<TFieldValues>;
  /** Initial form values */
  defaultValues?: DefaultValues<TFieldValues>;
  /** Optional form configuration mode for react-hook-form */
  formProps?: Omit<UseFormProps<TFieldValues>, 'resolver' | 'defaultValues'>;
  /** Whether to reset form fields on successful submission. Default: false (preserves entered context unless requested) */
  resetOnSuccess?: boolean;
  /** Callback fired upon verified successful submission */
  onSuccess?: (response: ApiResponse<TResponseData>, values: TFieldValues) => void;
  /** Callback fired upon submission error (validation, network, rate-limit, server error) */
  onError?: (error: { message: string; errors?: Record<string, string[]> }) => void;
}

export interface UseFormSubmissionReturn<
  TFieldValues extends FieldValues = FieldValues,
  TResponseData = unknown,
> {
  /** React Hook Form instance with full registration, control, and state access */
  form: UseFormReturn<TFieldValues, unknown, TFieldValues>;
  /** Current submission lifecycle state */
  status: FormSubmissionStatus;
  /** Convenience boolean for status === 'submitting' */
  isSubmitting: boolean;
  /** Convenience boolean for status === 'success' */
  isSuccess: boolean;
  /** Convenience boolean for status === 'error' */
  isError: boolean;
  /** Accessible success or error message for display */
  message: string | null;
  /** Server-returned field validation errors dictionary */
  serverErrors: Record<string, string[]> | null;
  /** Wrapped submission handler to bind to form onSubmit */
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** Resets submission lifecycle status and messages to idle */
  resetSubmission: () => void;
  /** Clears any active error message and status */
  clearError: () => void;
  /** Raw response data returned by the server on success */
  responseData: TResponseData | null;
}

/**
 * Reusable client-side form submission hook integrating React Hook Form,
 * Zod validation, anti-spam tokens, and the MSAM standard API response envelope.
 */
export function useFormSubmission<
  TFieldValues extends FieldValues = FieldValues,
  TResponseData = unknown,
>({
  endpoint,
  schema,
  defaultValues,
  formProps,
  resetOnSuccess = false,
  onSuccess,
  onError,
}: UseFormSubmissionOptions<TFieldValues, TResponseData>): UseFormSubmissionReturn<
  TFieldValues,
  TResponseData
> {
  const [status, setStatus] = useState<FormSubmissionStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
  const [responseData, setResponseData] = useState<TResponseData | null>(null);

  // Anti-spam mount time tracking for minimum fill-time checks
  const mountTimeRef = useRef<number | null>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Initialize React Hook Form with Zod resolver when schema is provided
  const form = useForm<TFieldValues>({
    resolver: schema
      ? (zodResolver(
          schema as unknown as Parameters<typeof zodResolver>[0],
        ) as unknown as Resolver<TFieldValues>)
      : undefined,
    defaultValues,
    mode: 'onTouched',
    ...formProps,
  });

  const resetSubmission = useCallback(() => {
    setStatus('idle');
    setMessage(null);
    setServerErrors(null);
    setResponseData(null);
  }, []);

  const clearError = useCallback(() => {
    if (status === 'error') {
      setStatus('idle');
      setMessage(null);
      setServerErrors(null);
    }
  }, [status]);

  const executeSubmission = useCallback(
    async (values: TFieldValues) => {
      // Prevent concurrent duplicate submissions
      if (status === 'submitting') {
        return;
      }

      setStatus('submitting');
      setMessage(null);
      setServerErrors(null);

      // Construct anti-spam payload (hidden honeypot and interaction timestamp)
      const payload = {
        _hp: '',
        ...values,
        _t: mountTimeRef.current ?? Date.now(),
      };

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        let jsonBody: ApiResponse<TResponseData> | null = null;
        try {
          jsonBody = (await response.json()) as ApiResponse<TResponseData>;
        } catch {
          // Response body was not valid JSON
          jsonBody = null;
        }

        // 1. Success check: status 2xx and envelope ok === true
        if (response.ok && jsonBody && jsonBody.ok) {
          setStatus('success');
          const successMsg = jsonBody.message || 'Thank you! Your submission has been received.';
          setMessage(successMsg);
          setResponseData(jsonBody.data ?? null);
          setServerErrors(null);

          // Reset mount time for potential subsequent submissions
          mountTimeRef.current = Date.now();

          if (resetOnSuccess) {
            form.reset();
          }

          onSuccess?.(jsonBody, values);
          return;
        }

        // 2. Failure handling
        setStatus('error');
        const errorMsg =
          jsonBody?.message ||
          (response.status === 429
            ? 'Too many requests. Please wait a moment before trying again.'
            : response.status === 503
              ? 'Submission service temporarily unavailable. Please try again later or call our community line.'
              : 'An error occurred while processing your request. Please check your inputs and try again.');

        setMessage(errorMsg);

        // Map server validation errors back to specific form fields
        if (jsonBody?.errors) {
          setServerErrors(jsonBody.errors);
          for (const [field, fieldErrorList] of Object.entries(jsonBody.errors)) {
            if (Array.isArray(fieldErrorList) && fieldErrorList.length > 0) {
              form.setError(field as Path<TFieldValues>, {
                type: 'server',
                message: fieldErrorList[0],
              });
            }
          }
        }

        onError?.({ message: errorMsg, errors: jsonBody?.errors });
      } catch {
        // Network failure / connection drop
        setStatus('error');
        const netMsg = 'Network error. Please check your internet connection and try again.';
        setMessage(netMsg);
        onError?.({ message: netMsg });
      }
    },
    [endpoint, form, onError, onSuccess, resetOnSuccess, status],
  );

  const submit = useCallback(
    (e?: React.BaseSyntheticEvent) => {
      return form.handleSubmit((values) => executeSubmission(values as TFieldValues))(e);
    },
    [form, executeSubmission],
  );

  return {
    form,
    status,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error',
    message,
    serverErrors,
    submit,
    resetSubmission,
    clearError,
    responseData,
  };
}
