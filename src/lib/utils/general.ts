export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email !== "" ? regex.test(email) : true;
}

export interface passwordErrors {
  length?: boolean;
  uppercaseLetter?: boolean;
  specialCharacters?: boolean;
}

export function validatePassword(password: string) {
  const errors: passwordErrors = {};

  if (password.length < 10) {
    errors.length = true;
  }
  if (!/[A-Z]/.test(password)) {
    errors.uppercaseLetter = true;
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
    errors.specialCharacters = true;
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    hasErrors,
    errors
  };
}
