import DOMPurify from 'dompurify';

export function containsXSSPatterns(input: string): boolean {
  return input !== DOMPurify.sanitize(input);
}

export function validateEmail(email: string) {
  if (containsXSSPatterns(email)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email !== '' ? regex.test(email) : false;
}

export interface PasswordErrors {
  missingRequiredLengthError?: boolean;
  missingUppercaseLetterError?: boolean;
  missingSpecialCharactersError?: boolean;
}

export function validatePassword(password: string) {
  const errors: PasswordErrors = {};

  if (password.length < 10 || password.length > 128) {
    errors.missingRequiredLengthError = true;
  }
  if (!/[A-Z]/.test(password)) {
    errors.missingUppercaseLetterError = true;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,./?]+/.test(password)) {
    errors.missingSpecialCharactersError = true;
  }

  return {
    isValid: Object.keys(errors).length === 0 && !containsXSSPatterns(password),
    errors
  };
}
