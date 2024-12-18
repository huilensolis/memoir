"use client";

import { Button } from "@/components/ui/button";
import { CryptographyCustomApi } from "@/models/cryptography";
import { FileDown, Key, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function GenKeyPage() {
    const [key, setKey] = useState<string | null>(null);

    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        async function getCurrentKey() {
            const keyService = new CryptographyCustomApi();

            try {
                const { base64key } = await keyService.getBase64Key();

                setKey(base64key);

                setIsloading(false);
            } catch (error) {
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
            setIsloading(false);
        }
    }

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
                <h1>Generate an encryption key</h1>
                <p>
                    Secure your data with encryption. Generete a key, wich will server
                    for encrypting & decrypting your documents.{" "}
                </p>
                <p>
                    <strong>Do not lose your key, as it will be necessary to authenticate you in
                        the future </strong>. Save it in a secure place, download it as a file, write it
                    dawn in paper, save it to your password-manager or save wherever you wish.
                </p>
                {" "}
                <p>
                    <strong> When logging in again, you will be asked for your key to decrypt your documents; if you lose your key, you wont be able to read old documents anymore. Not even administrators can access encrypted documents </strong>.
                </p>
            </article>
            <footer className="flex gap-2">
                <Button
                    onClick={generateKey}
                    loading={isLoading}
                    disabled={isLoading || Boolean(key)}
                    className={`flex gap-2 disabled:opacity-100 ${key && "bg-purple-700"}`}
                >
                    {key ? <>key generated successfuly <ShieldCheck className="w-5 h-5" /> </> : (
                        <>    generate key <Key className="w-5 h-5" /> </>
                    )}
                </Button>
                {key && (
                    <Button onClick={downloadKeyInFile} className="flex gap-2">
                        download key <FileDown className="w-5 h-5" />
                    </Button>
                )}
            </footer>
        </div>
    );
}
