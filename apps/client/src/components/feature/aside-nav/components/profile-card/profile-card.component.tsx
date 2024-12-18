"use client";

import { SignOutBtn } from "@/components/feature/auth/sign-out";
import { AccordionRoot } from "@/components/ui/accordion";
import { Box } from "@/components/ui/box";
import { NavLink } from "@/components/ui/nav-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { ClientRoutingService } from "@/models/routing/client";
import { type User } from "@/types/user";
import { Bolt, ChevronsUpDown, CircleUserRound, Key } from "lucide-react";
import { useEffect, useState } from "react";

export function ProfileCard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { getUser } = useSession();

    useEffect(() => {
        async function syncUser() {
            const { user } = await getUser();

            if (user) setUser(user);

            setLoading(false);
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        syncUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AccordionRoot.Provider type="single" collapsible className="w-full">
            <AccordionRoot.Item value="user-card" className="relative w-full">
                <AccordionRoot.Trigger className="w-full py-2 flex border border-neutral-300 rounded-md hover:bg-zinc-200">
                    <article className="w-full flex items-center justify-between gap-2 p-1 px-2">
                        <section className="flex gap-2 items-center">
                            <CircleUserRound className="w-5 h-5" />
                            {loading && <Skeleton className="w-32 h-4" />}
                            {!loading && user && (
                                <span className="font-semibold text-sm">{user.name}</span>
                            )}
                        </section>
                        <ChevronsUpDown />
                    </article>
                </AccordionRoot.Trigger>
                <AccordionRoot.Content className="absolute top-full left-0 w-full mt-2">
                    <Box className="rounded-md">
                        <ul className="flex flex-col gap-2 p-1">
                            <li>
                                <NavLink
                                    icon={Key}
                                    href={ClientRoutingService.app.keys.home}
                                    title="Manage encryption key"
                                />
                            </li>
                            <li>
                                <NavLink icon={Bolt} href=" " title="settings" />
                            </li>
                            <li>
                                <SignOutBtn />
                            </li>
                        </ul>
                    </Box>
                </AccordionRoot.Content>
            </AccordionRoot.Item>
        </AccordionRoot.Provider>
    );
}
