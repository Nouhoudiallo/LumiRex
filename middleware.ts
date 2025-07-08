import { NextRequest, NextResponse } from "next/server";
import { JwtUtil } from "@/src/lib/jwt";
import { parse } from "cookie";

const publicRoutes = ["/", "/auth", "/about", "/contact"];
const protectedPrefixes = ["/chat", "admin"];
const adminPrefixes = ["/admin"]; // Ajoute ici tous les préfixes admin si besoin

function isProtectedRoute(path: string) {
  return (
    protectedPrefixes.some((prefix) => path.startsWith(prefix)) ||
    isAdminRoute(path)
  );
}

function isAdminRoute(path: string) {
  return adminPrefixes.some((prefix) => path.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si c'est une route publique, autoriser
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Si ce n'est pas une route protégée, ne rien faire
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Lecture du cookie
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.session_token;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const session = await JwtUtil.verifyToken(token);

  if (!session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Vérification du rôle ADMIN pour les routes admin
  if (isAdminRoute(pathname) && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
