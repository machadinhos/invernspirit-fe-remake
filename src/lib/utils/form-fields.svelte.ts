import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

export interface FormFieldConfig {
  id: HTMLInputAttributes['id'];
  autocomplete: HTMLInputAttributes['autocomplete'];
  type: HTMLInputTypeAttribute | 'textarea';
  name: HTMLInputAttributes['name'];
  label: string;
  invalidText: string;
  validate: (value: string) => boolean;
}

export class FormField {
  value = $state('');
  isValid = $state(true);

  declare id: HTMLInputAttributes['id'];
  declare autocomplete: HTMLInputAttributes['autocomplete'];
  declare type: HTMLInputTypeAttribute | 'textarea';
  declare name: HTMLInputAttributes['name'];
  declare label: string;
  declare invalidText: string;
  declare validate: (value: string) => boolean;

  constructor(config: FormFieldConfig) {
    Object.assign(this, config);
  }
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

export function generateFormFieldOnblurCallback(formField: FormField) {
  return () => {
    formField.isValid = formField.validate(formField.value);
  };
}
