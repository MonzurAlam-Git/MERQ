import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define protected route prefixes
const PROTECTED_PATHS = ["/wishlist", "/account", "/checkout", "/admin"];
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/shop",
  "/about",
  "/search",
  "/order-confirmation",
  "/api/auth",
  "/_next",
  "/static",
  "/favicon.ico",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is public
  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // If public, allow through
  if (isPublicPath) return NextResponse.next();

  // Check if path is protected
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // If not protected, allow through (e.g., product pages, blog posts)
  if (!isProtectedPath) return NextResponse.next();

  // Protected route: verify auth
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Optional: role-based checks
  // if (pathname.startsWith("/admin") && token.role !== "admin") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
