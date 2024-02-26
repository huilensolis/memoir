import { type NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./models/routing/client";

import { cookies } from "next/headers";
import { AuthService } from "./models/api/auth";
import { API_CONFIG } from "./config/api/api.config";

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = ClientRoutingService.auth.signIn;
  const urlSignInPath = url;

  const cookieStore = cookies();

  const accessToken = cookieStore.get(API_CONFIG.cookieName);

  if (!accessToken?.value || !accessToken.name) {
    console.log(
      `no cookies found in middleware request. redirecting to ${url.pathname}`,
    );

    return NextResponse.redirect(urlSignInPath);
  }

  try {
    const { isTokenValid } = await AuthService.checkToken({
      cookies: accessToken.value,
    });

    if (!isTokenValid) throw new Error("token invalid");
  } catch (error) {
    return NextResponse.redirect(urlSignInPath);
  }
}

export const config = {
  matcher: ["/app/:path*"],
};
