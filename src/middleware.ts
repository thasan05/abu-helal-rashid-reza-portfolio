import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "reza_admin_session";
const SESSION_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ||
    "c28f6e87a53e4b17b8f99e43b91a7d6e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and public assets
  if (pathname === "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, SESSION_SECRET);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Token invalid, proceed to login page
      }
    }
    return NextResponse.next();
  }

  // Intercept all administrative paths
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isValid = false;
    if (token) {
      try {
        await jwtVerify(token, SESSION_SECRET);
        isValid = true;
      } catch {
        isValid = false;
      }
    }

    if (!isValid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { error: "Authentication required for administrative operations." },
          { status: 401 }
        );
      }

      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
