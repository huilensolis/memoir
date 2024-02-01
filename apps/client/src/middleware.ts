import { NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./services/routing/client";

export default function middleware(request: NextRequest) {
  const cookies = request.cookies.get("token");

  if (!cookies) {
    const url = request.nextUrl.clone();

    url.pathname = new ClientRoutingService().auth.signIn;

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
