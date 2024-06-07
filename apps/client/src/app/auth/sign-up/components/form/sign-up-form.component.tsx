"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TextInput } from "@/components/ui/input/text/";
import { Label } from "@/components/ui/input/label";
import { type signUpFormModels } from "../../sign-up.models";
import { ClientRoutingService } from "@/models/routing/client";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Spinner } from "@/components/ui/spinner";
import { BadgeCheck } from "lucide-react";

export function SignUpForm() {
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [validatingEmail, setValidatingEmail] = useState<boolean>(false);

  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isDirty, isValidating },
    register,
    setError,
    getFieldState,
  } = useForm<signUpFormModels>({ mode: "onChange" });

  const { signUp, checkEmailAvailability } = useSession();

  const router = useRouter();

  const { debouncedValue: debouncedEmailValue } = useDebounce({
    value: emailInputValue,
    delay: 500,
  });

  async function handleSignUp(data: signUpFormModels) {
    if (!data.name || !data.password || !data.email) return;

    try {
      setLoading(true);

      const { name, email, password } = data;
      const { error } = await signUp({ name, email, password });

      if (error) {
        throw new Error("error signing in");
      }

      router.push(ClientRoutingService.app.home);
    } catch (error) {
      setLoading(false);
      setErrorSubmitting(true);
    }
  }

  async function checkIfEmailInputIsAvailable(email: string) {
    setValidatingEmail(true);

    const { isEmailAvailable } = await checkEmailAvailability({ email });
    setValidatingEmail(false);

    if (!isEmailAvailable) {
      setIsEmailAvailable(false);
      setError("email", { message: "email already in use" });
      return;
    }

    setIsEmailAvailable(true);
  }

  useEffect(() => {
    if (
      debouncedEmailValue.length > 0 &&
      getFieldState("email").isDirty &&
      !getFieldState("email").error?.message
    ) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      checkIfEmailInputIsAvailable(debouncedEmailValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEmailValue]);

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="w-full flex flex-col gap-3"
      autoComplete="off"
    >
      <fieldset>
        <Label htmlFor="name">Name</Label>
        <TextInput
          type="text"
          id="name"
          placeholder="Cesar"
          error={errors.name?.message ?? null}
          autoFocus
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
      </fieldset>
      <fieldset>
        <Label htmlFor="email">Email</Label>
        <TextInput
          type="email"
          id="email"
          placeholder="anemail@gmail.com"
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
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (
                getFieldState("email").error?.message ||
                e.target.value.length === 0 ||
                isValidating ||
                loading
              ) {
                return;
              }

              const emailFromInput = e.target.value;

              setEmailInputValue(emailFromInput);
            },
          })}
        />
        <div className="flex items-center gap-1">
          {validatingEmail && (
            <>
              <Spinner className="w-4 h-4 text-neutral-950 p-0" />
              <span>validating email</span>
            </>
          )}
          {getFieldState("email").isDirty && isEmailAvailable && (
            <>
              <BadgeCheck className="w-4 h-4 text-neutral-950" />
              <span>Email is available</span>
            </>
          )}
        </div>
      </fieldset>
      <fieldset>
        <Label htmlFor="password">Password</Label>
        <TextInput
          type="password"
          id="password"
          placeholder="********"
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
      </fieldset>
      <div className="mt-4">
        <Button
          variant="default"
          type="submit"
          disabled={
            !isValid ||
            isValidating ||
            loading ||
            !isDirty ||
            !isEmailAvailable ||
            validatingEmail
          }
          loading={loading}
          className="w-full"
        >
          Sign Up
        </Button>
      </div>
      {errorSubmitting && (
        <span className="text-red-500">something went wrong</span>
      )}
    </form>
  );
}
