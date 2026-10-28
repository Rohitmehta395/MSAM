/**
 * Supported field control types for configuration-driven forms.
 */
export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'consent'
  | 'checkbox-group'
  | 'radio-group'
  | 'chip-toggle'
  | 'file';

/**
 * Option descriptor for select, choice, radio, or chip controls.
 */
export interface FieldOption<TValue = string> {
  value: TValue;
  label: string;
  description?: string;
  disabled?: boolean;
}

/**
 * Configuration contract for an individual form field in a configuration-driven form.
 * Generically typed on field name keys and field value type to prevent divergence from Zod schemas.
 */
export interface FieldConfig<TFieldName extends string = string, TValue = unknown> {
  name: TFieldName;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  options?: readonly FieldOption<unknown>[];
  colSpan?: 1 | 2;
  defaultValue?: TValue;
}

/**
 * Complete form configuration definition for config-driven forms (e.g. PathwayForm).
 */
export interface FormConfig<TFieldName extends string = string> {
  id: string;
  title: string;
  description?: string;
  fields: readonly FieldConfig<TFieldName, unknown>[];
  submitLabel?: string;
  successMessage?: string;
}

/**
 * Helper type to represent form values keyed by form field names.
 */
export type FormValues<TFieldName extends string> = Record<TFieldName, unknown>;
