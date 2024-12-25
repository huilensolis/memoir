"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input/label";
import { TextInput } from "@/components/ui/input/text";
import { CryptographyCustomApi } from "@/models/cryptography";
import { ClientRoutingService } from "@/models/routing/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type TKeyInputForm = {
  key: string;
};

export default function KeyInputPage() {
  const { register, formState, handleSubmit } = useForm<TKeyInputForm>({
    mode: "all",
  });

  async function saveKey(data: TKeyInputForm) {
    if (!data.key) return;

    const cryptoApi = new CryptographyCustomApi();

    // import key
    await cryptoApi.importBase64Key(data.key);
  }

  return (
    <div className="flex items-center justify-center h-full min-h-screen w-full">
      <form
        className="flex flex-col gap-5 will-change-contents"
        onSubmit={handleSubmit(saveKey)}
      >
        <fieldset className="flex flex-col">
          <Label htmlFor="key"> Key</Label>
          <TextInput
            type="password"
            {...register("key", {
              minLength: { value: 44, message: "key must be 44 characters" },
              maxLength: { value: 44, message: "key must be 44 characters" },
              required: true,
            })}
            id="key"
            error={formState.errors.key?.message || null}
            correct={Boolean(formState.errors.key) || false}
          />
        </fieldset>
        <div>
          {" "}
          {!formState.isSubmitted && !formState.isSubmitSuccessful && (
            <Button
              disabled={!formState.isValid || formState.isSubmitting}
              loading={formState.isSubmitting}
            >
              {" "}
              Save key
            </Button>
          )}{" "}
          {formState.isSubmitted && formState.isSubmitSuccessful && (
            <Link
              href={ClientRoutingService.app.home}
              className="w-max flex items-end justify-center underline"
            >
              Continue <ArrowUpRight className="w-5 h-5" />
            </Link>
          )}{" "}
        </div>
      </form>
    </div>
  );
}
