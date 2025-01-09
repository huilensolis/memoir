import localFont from "next/font/local";

import type { Metadata } from "next";
import "./globals.css";
import { ServerStatus } from "@/components/feature/server-status";
import { Toaster } from "@/components/feature/sonner";

const satoshi = localFont({
    src: [
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-LightItalic.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Medium.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-MediumItalic.woff2",
            weight: "600",
            style: "italic",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/satoshi/Fonts/WEB/fonts/Satoshi-BoldItalic.woff2",
            weight: "800",
            style: "italic",
        },
    ],
});

const projectURL =
    process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://localhost:3000";

export const metadata: Metadata = {
    title: "Memoir",
    description: "Rich and encrypted web document editor.",
    metadataBase: new URL(projectURL),
    openGraph: {
        title: "Memoir",
        description: "Rich and encrypted web document editor.",
        images: ["/"],
        type: "website",
        locale: "en-US",
    },
    twitter: {
        title: "Memoir",
        description: "Rich and encrypted web document editor.",
        images: ["/"],
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${satoshi.className} bg-neutral-50 flex flex-col items-center justify-center `}
            >
                {children}
                <Toaster />
                <ServerStatus />
            </body>
        </html>
    );
}
