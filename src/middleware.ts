import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isCheckEmail = req.nextUrl.pathname === "/admin/check-email";

  // Don't protect login and check-email pages
  if (isLoginPage || isCheckEmail) {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (isAdminRoute && !req.auth) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
