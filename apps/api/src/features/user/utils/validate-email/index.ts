import validate from "deep-email-validator";

export async function validateEmail(email: string) {
  return {
    isEmailValid: Boolean(email.includes("@") && email.includes(".com")),
  };
}
