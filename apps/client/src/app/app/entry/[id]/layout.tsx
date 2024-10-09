import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full w-full flex flex-col items-center justify-start">
            <main className="w-full relative flex justify-center w-full max-w-4xl py-10 px-3 lg:px-5">
                {children}
            </main>
        </div>
    )
}
