import { API_CONFIG } from "@/config/api/api.config";
import { AuthService } from "@/models/api/auth";
import { ClientRoutingService } from "@/models/routing/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function WithUserNotAuthenticated({
  children,
  redirectUrl = ClientRoutingService.app.home,
}: {
  children: React.ReactNode;
  redirectUrl: string;
}) {
  const cookieStore = cookies();

  const cookieToken = cookieStore.get(API_CONFIG.cookieName);

  if (cookieToken && cookieToken.value && cookieToken.name) {
    const { isTokenValid } = await AuthService.checkToken({
      cookies: cookieToken.value,
    });
    if (isTokenValid) return redirect(redirectUrl);
  }

  return <>{children}</>;
}
