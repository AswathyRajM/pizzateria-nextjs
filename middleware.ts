import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// ✅ Only these two require authentication
const private_routes = ["/account", "/orders"];

export function isPrivateRoute(path: string) {
  return private_routes.includes(path);
}

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const path = request.nextUrl.pathname;

  // If route is private and user not logged in → redirect to /sign-in
  if (isPrivateRoute(path) && (!user || user.is_anonymous)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If logged-in user tries to visit /sign-in or /sign-up, send them home
  if (
    user &&
    !user.is_anonymous &&
    ["/auth/login", "/auth/register"].includes(path)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
