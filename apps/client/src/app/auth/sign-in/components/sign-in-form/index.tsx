"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input/text";
import { signUpFormModels } from "../../sign-in.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClientRoutingService } from "@/services/routing/client";
import { AuthService } from "@/services/api/auth";
import { useCookies } from "@/hooks/use-cookies";

export function SignInForm() {
  const [error, setError] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, dirtyFields, isValidating },
    register,
  } = useForm<signUpFormModels>({ mode: "onChange" });

  const router = useRouter();

  const { createCookie } = useCookies({ name: "access_token" });

  async function signIn(data: signUpFormModels) {
    if (!data.password || !data.email) return;

    const { email, password } = data;

    const { token, error } = await AuthService.signIn({
      email,
      password,
    });

    if (error || !token) {
      setError(true);
      return;
    }

    createCookie({ value: token });
    router.push(new ClientRoutingService().app.home);
  }

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
            message: "email max length is 100 characteres",
            value: 100,
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
      {error && <span className="text-red-500">something went wrong</span>}
    </form>
  );
}
