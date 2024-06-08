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

export const metadata: Metadata = {
  title: "Memoir",
  description: "A new way to write your joruanl",
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
