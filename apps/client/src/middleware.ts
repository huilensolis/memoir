import { NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./models/routing/client";

import { cookies } from "next/headers";
import { AuthService } from "./models/api/auth";
import { API_CONFIG } from "./config/api/api.config";

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = ClientRoutingService.auth.signIn;
  const urlSignInPath = url;

  const cookieStore = cookies();

  const access_token = cookieStore.get(API_CONFIG.cookieName);

  if (!access_token || !access_token.value || !access_token.name) {
    console.log(
      `no cookies found in middleware request. redirecting to ${url.pathname}`,
    );

    return NextResponse.redirect(urlSignInPath);
  }

  try {
    const { isTokenValid } = await AuthService.checkToken({
      cookies: access_token.value,
    });

    if (!isTokenValid) throw new Error("token invalid");
  } catch (error) {
    console.log(`token is invalid, redirecting to ${urlSignInPath}`);
    return NextResponse.redirect(urlSignInPath);
  }
}

export const config = {
  matcher: ["/app/:path*"],
};
