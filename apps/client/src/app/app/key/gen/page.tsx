"use client";

import { Button } from "@/components/ui/button";
import { CryptographyCustomApi } from "@/models/cryptography";
import { FileDown, Key } from "lucide-react";
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
        if (!key) return

        const fileContent = key
        const blob = new Blob([fileContent], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        link.download = 'memoir-encryption-key.txt';

        link.click();
        URL.revokeObjectURL(link.href);
    }

    return (
        <div className="h-full min-h-screen w-full flex items-center justify-center flex-col">
            <article className="prose prose-neutral mb-10 prose-strong:font-bold">
                <h1>Encrypt your data!</h1>
                <p>
                    Secure your data with encryption. Genereate a key, wich will server for encrypting & decrypting your documents. {" "}
                </p>
                <strong>
                    Do not lose your key, as it will be necessary to authenticate you in the future. Save it in a secure place, download it as a file, write it dawn in paper, save it to your password-manager or whatever you find useful.
                </strong>
                <strong>If you loose your key, in the future, when youre asked for the key, you will lose acccess to your documents.</strong>
            </article>
            {key &&
                <div className="bg-neutral-200 rounded-md p-3 mb-2">
                    <p>{key}</p>
                </div>
            }
            <footer className="flex gap-2">
                <Button
                    onClick={generateKey}
                    loading={isLoading}
                    disabled={isLoading || Boolean(key)}
                    className="flex gap-2"
                >
                    generate key <Key className="w-5 h-5" />
                </Button>
                {key &&

                    <Button
                        onClick={downloadKeyInFile}
                        className="flex gap-2"
                    >
                        download key <FileDown className="w-5 h-5" />
                    </Button>
                }
            </footer>
        </div>
    );
}
