import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");

  const redirectFlag = cookies.redirectFlag;
  const token = cookies.token;

  if (!token && !redirectFlag) {
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
