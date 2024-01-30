import { NextRequest, NextResponse } from "next/server";
import { ClientRoutingService } from "./services/routing/client";

export default function middleware(request: NextRequest) {
  const cookies = request.cookies.get("token");

  if (!cookies)
    return NextResponse.redirect(new ClientRoutingService().auth.signIn);

  // we check if the token is valid
  // if(token is not valid){
  // return redirect to login
  // }
  // else {
  // return;
  // }
}
