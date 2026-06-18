// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const authHandlers = handlers;

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const segments = url.pathname.split("/");
    const isCallback = segments.includes("callback");

    if (isCallback) {
      const state = url.searchParams.get("state");
      if (state && state.length > 2048) {
        console.error("[Auth] State parameter exceeds expected length, likely corrupted");
        return NextResponse.redirect(new URL("/login?error=InvalidState", request.url));
      }
    }

    return authHandlers.GET(request);
  } catch (error) {
    console.error("[Auth] GET callback error:", error);
    return NextResponse.redirect(new URL("/login?error=AuthCallback", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    return authHandlers.POST(request);
  } catch (error) {
    console.error("[Auth] POST callback error:", error);
    return NextResponse.redirect(new URL("/login?error=AuthCallback", request.url));
  }
}
