import type {
  HTMLInputAttributes,
  HTMLInputTypeAttribute
} from 'svelte/elements';

export interface FormField {
  value: string;
  autocomplete: HTMLInputAttributes['autocomplete'];
  type: HTMLInputTypeAttribute;
  name: HTMLInputAttributes['name'];
  label: string;
  isValid: boolean;
  invalidText: string;
  validate: (value: string) => boolean;
}

export function validateFormFields(formFields: FormField[]) {
  let hasError = false;

  for (const field of formFields) {
    const isValid = field.validate(field.value);
    field.isValid = isValid;
    if (!isValid) hasError = true;
  }

  return !hasError;
}

export function generateOnblurCallback(formField: FormField) {
  return () => {
    formField.isValid = formField.validate(formField.value);
  };
}
