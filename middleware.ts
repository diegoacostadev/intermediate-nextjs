import { COOKIE_NAME } from "@/lib/constants";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!req.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (req.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/'
  ]
}
