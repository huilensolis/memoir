"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input/text";
import { signUpFormModels } from "../../sign-in.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";

export function SignInForm() {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields, isValidating },
    register,
  } = useForm<signUpFormModels>({ mode: "onChange" });

  function signIn(data: signUpFormModels) {}

  return (
    <form
      onSubmit={handleSubmit(signIn)}
      className="w-full flex flex-col gap-3"
    >
      <Input
        type="email"
        id="email"
        placeholder="Email"
        error={errors.email?.message ?? null}
        correct={!errors.email?.message && dirtyFields.email ? true : false}
        {...register("email", {
          required: { value: true, message: "email is required" },
          minLength: { value: 5, message: "email min characteres is 5" },
          maxLength: {
            message: "email max length is 20 characteres",
            value: 20,
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "email does not match email format",
          },
        })}
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        error={errors.password?.message ?? null}
        correct={
          !errors.password?.message && dirtyFields.password ? true : false
        }
        {...register("password", {
          required: { value: true, message: "password is required" },
          minLength: { value: 14, message: "password min characteres is 14" },
          maxLength: {
            value: 20,
            message: "password max length is 20 characteres",
          },
        })}
      />
      <div className="mt-4">
        <PrimaryButton
          type="submit"
          disabled={!isValid || isValidating || isSubmitting}
        >
          Sign In
        </PrimaryButton>
      </div>
    </form>
  );
}
