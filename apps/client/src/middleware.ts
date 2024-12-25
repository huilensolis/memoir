import { type NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./models/routing/client";

import { cookies } from "next/headers";
import { AuthService } from "./models/api/auth";
import { API_CONFIG } from "./config/api/api.config";

export default async function middleware(request: NextRequest) {
    const urlClone = request.nextUrl.clone();
    urlClone.pathname = ClientRoutingService.auth.signIn;
    const signInUrl = urlClone;

    const urlClone2 = request.nextUrl.clone()
    urlClone2.pathname = "/"
    const homeUrl = urlClone2

    const cookieStore = cookies();

    const accessToken = cookieStore.get(API_CONFIG.cookieName);

    if (!accessToken?.value || !accessToken.name) {
        return NextResponse.redirect(signInUrl);
    }

    try {
        const { isTokenValid, isServerUp } = await AuthService.checkToken({
            cookies: accessToken.value,
        });

        if (!isServerUp) {
            return NextResponse.redirect(homeUrl);
        }

        if (!isTokenValid) {
            const response = NextResponse.redirect(signInUrl)
            response.cookies.delete(API_CONFIG.cookieName)
            return response
        }
    } catch (error) {
        return NextResponse.redirect(signInUrl);
    }
}

export const config = {
    matcher: ["/app/:path*"],
};
