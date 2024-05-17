import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function middleware(request: NextRequest) {
  const redirectFlag = request.cookies.get("redirectFlag");

  if (!request.cookies.has("token") && !redirectFlag) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (redirectFlag) {
    const response = NextResponse.next();
    response.cookies.delete("redirectFlag");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!signup|login|api|_next/static|_next/image|favicon.ico).*)"],
};
