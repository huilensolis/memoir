import { NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./services/routing/client";

export default function middleware(request: NextRequest) {
  const cookies = request.cookies.get("access_token");

  if (!cookies) {
    const url = request.nextUrl.clone();

    url.pathname = ClientRoutingService.auth.signIn;

    console.log(
      `no cookies found in middleware request. redirecting to ${url.pathname}`,
    );

    return NextResponse.redirect(url);
  }

  // we check if the token is valid
  // if(token is not valid){
  // return redirect to login
  // }
  // else {
  // return;
  // }
}

export const config = {
  matcher: ["/app/:path*"],
};
