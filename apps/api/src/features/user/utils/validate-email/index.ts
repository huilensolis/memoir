import EmailValidator from "email-validator";

export async function validateEmail(email: string) {
  const emailValidation = EmailValidator.validate(email);

  return {
    isEmailValid: Boolean(emailValidation),
  };
}
