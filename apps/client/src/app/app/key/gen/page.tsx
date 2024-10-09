"use client";

import { Button } from "@/components/ui/button";
import { CryptographyCustomApi } from "@/models/cryptography";
import { useEffect, useState } from "react";

export default function GenKeyPage() {
  const [key, setKey] = useState<string | null>(null);

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function getCurrentKey() {
      const keyService = new CryptographyCustomApi();

      try {
        const { base64key } = await keyService.getBase64Key();

        console.log({ base64key });

        setKey(base64key);

        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCurrentKey();
  }, []);

  async function generateKey() {
    setIsloading(true);

    const keyService = new CryptographyCustomApi();

    try {
      await keyService.createNewKey();

      const { base64key } = await keyService.getBase64Key();

      setKey(base64key);

      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  }

  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center flex-col">
      {key && <p>{key}</p>}
      <Button
        onClick={generateKey}
        loading={isLoading}
        disabled={isLoading || Boolean(key)}
      >
        generate key
      </Button>
    </div>
  );
}
