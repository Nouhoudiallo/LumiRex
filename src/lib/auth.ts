// src/lib/auth.ts
import { cookies } from "next/headers";
import { JwtUtil } from "./jwt";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  const session = JwtUtil.verifyToken(token);
  return session || null;
}
