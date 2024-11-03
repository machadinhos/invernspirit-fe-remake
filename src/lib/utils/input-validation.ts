export function containsXSSPatterns(input: string): boolean {
  const xssPatterns = [
    /<[^>]*>/g, // HTML tags
    /&lt;|&gt;|&quot;|&#x27;|&#x2F;|&#\d+;|&#x[A-Fa-f0-9]+;/g, // HTML entities
    /javascript:/gi, // JavaScript protocol
    /data:/gi, // Data protocol
    /vbscript:/gi, // VBScript protocol
    /on\w+\s*=/gi // Event handlers
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}

export function validateEmail(email: string) {
  if (containsXSSPatterns(email)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email !== '' ? regex.test(email) : false;
}

export interface PasswordErrors {
  length?: boolean;
  uppercaseLetter?: boolean;
  specialCharacters?: boolean;
}

export function validatePassword(password: string) {
  const errors: PasswordErrors = {};

  if (password.length < 10 || password.length > 128) {
    errors.length = true;
  }
  if (!/[A-Z]/.test(password)) {
    errors.uppercaseLetter = true;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,./?]+/.test(password)) {
    errors.specialCharacters = true;
  }

  return {
    isValid: Object.keys(errors).length === 0 && !containsXSSPatterns(password),
    errors
  };
}
