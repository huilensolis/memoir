import validate from "deep-email-validator";

export async function validateEmail(
  email: string,
): Promise<{ isEmailValid: boolean }> {
  const res = await validate(email);
  return { isEmailValid: Boolean(res.valid) };
}
