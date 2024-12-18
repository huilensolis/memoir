"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CryptographyCustomApi } from "@/models/cryptography";
import { ClientRoutingService } from "@/models/routing/client";
import { ArrowUpRight, FileDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KeyPage() {
  const [key, setKey] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCurrentKey() {
      const keyService = new CryptographyCustomApi();

      try {
        const { base64key } = await keyService.getBase64Key();

        setKey(base64key);
      } catch (error) {
        setKey(null);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCurrentKey();
  }, []);

  function downloadKeyInFile() {
    if (!key) return;

    const fileContent = key;
    const blob = new Blob([fileContent], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = "memoir-encryption-key.txt";

    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center flex-col">
      <article className="prose prose-neutral mb-10 prose-strong:font-bold">
        <h1>Encrypt your data!</h1>
        <p>
          Secure your data with encryption. Generete or input a key for
          encrypting & decrypting your documents.{" "}
        </p>
        {!loading && !key && (
          <>
            <p>First time using the site? generate a key</p>
            <p>Already have a key? input a key</p>
          </>
        )}
      </article>
      <footer className="flex flex-col gap-8 items-center">
        <div className="flex gap-8 justify-center">
          {loading ? (
            <Spinner />
          ) : key ? (
            <>
              <Button
                disabled={true}
                className={`flex gap-2 disabled:opacity-100 bg-purple-700`}
              >
                key generated successfuly <ShieldCheck className="w-5 h-5" />
              </Button>
              <Button onClick={downloadKeyInFile} className="flex gap-2 w-max">
                Download key <FileDown className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <>
              <Link
                href={ClientRoutingService.app.keys.generate}
                className="flex justify-center items-center underline"
              >
                Generate key{" "}
                <ArrowUpRight strokeWidth={1} className="w-5 h-5" />
              </Link>
              <Link
                href={ClientRoutingService.app.keys.input}
                className="flex justify-center items-center underline"
              >
                Input key <ArrowUpRight strokeWidth={1} className="w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
