import DOMPurify from 'dompurify';

export function containsXSSPatterns(input: string): boolean {
  return input !== DOMPurify.sanitize(input);
}

export function validateRequiredInput(value: string) {
  return value !== '' && !containsXSSPatterns(value);
}

export function validateEmail(email: string) {
  if (!validateRequiredInput(email)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email !== '' ? regex.test(email) : false;
}

export class PasswordErrors {
  missingRequiredLengthError: boolean = false;
  missingUppercaseLetterError: boolean = false;
  missingSpecialCharactersError: boolean = false;

  constructor(allInvalid?: boolean) {
    if (allInvalid) {
      this.missingRequiredLengthError = true;
      this.missingUppercaseLetterError = true;
      this.missingSpecialCharactersError = true;
    }
  }
}

export function validatePassword(password: string): { isValid: boolean; errors: PasswordErrors } {
  if (!password) return { isValid: false, errors: new PasswordErrors(true) };
  const errors = new PasswordErrors();
  let hasErrors = containsXSSPatterns(password);

  if (password.length < 10 || password.length > 128) {
    errors.missingRequiredLengthError = true;
    hasErrors = true;
  }
  if (!/[A-Z]/.test(password)) {
    errors.missingUppercaseLetterError = true;
    hasErrors = true;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,./?]+/.test(password)) {
    errors.missingSpecialCharactersError = true;
    hasErrors = true;
  }

  return {
    isValid: !hasErrors,
    errors,
  };
}
