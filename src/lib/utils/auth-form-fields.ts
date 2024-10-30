export interface FormFields {
  [key: string]: {
    value: string;
    label: string;
    isValid: boolean;
    invalidText: string;
    validate: (value: string) => boolean;
  };
}

export function validateFormFields(formFields: FormFields) {
  let hasError = false;

  for (const [, field] of Object.entries(formFields)) {
    const isValid = field.validate(field.value);
    field.isValid = isValid;
    if (!isValid) hasError = true;
  }

  return !hasError;
}

export function generateOnblurCallback(formFields: FormFields, field: string) {
  return () => {
    formFields[field].isValid = formFields[field].validate(
      formFields[field].value
    );
  };
}
