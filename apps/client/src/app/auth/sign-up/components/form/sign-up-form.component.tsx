"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input/text/";
import { type signUpFormModels } from "../../sign-up.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { ClientRoutingService } from "@/models/routing/client";
import { useSession } from "@/hooks/use-session";

export function SignUpForm() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isDirty, isValidating },
    register,
  } = useForm<signUpFormModels>({ mode: "onChange" });

  const { signUp } = useSession();

  const router = useRouter();

  async function handleSignUp(data: signUpFormModels) {
    if (!data.name || !data.password || !data.email) return;

    try {
      setLoading(true);

      const { name, email, password } = data;
      const { error } = await signUp({ name, email, password });

      if (error) {
        console.log({ error });
        throw new Error("error signing in");
      }

      router.push(ClientRoutingService.app.home);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="w-full flex flex-col gap-3"
    >
      <Input
        type="text"
        id="name"
        placeholder="Name"
        error={errors.name?.message ?? null}
        correct={!(errors.name?.message && dirtyFields.name)}
        {...register("name", {
          required: { value: true, message: "name is required" },
          minLength: { value: 3, message: "name min characteres is 3" },
          maxLength: {
            value: 20,
            message: "name max length is 20 characteres",
          },
        })}
      />
      <Input
        type="email"
        id="email"
        placeholder="Email"
        error={errors.email?.message ?? null}
        correct={!(errors.email?.message && dirtyFields.email)}
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
        correct={!(errors.password?.message && dirtyFields.password)}
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
          disabled={!isValid || isValidating || loading || !isDirty}
          isLoading={loading}
        >
          Sign Up
        </PrimaryButton>
      </div>
      {error && <span className="text-red-500">something went wrong</span>}
    </form>
  );
}
