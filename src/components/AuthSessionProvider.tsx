"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useCookie } from "@/src/hooks/use-cookie";

interface AuthSessionProviderProps {
  children: ReactNode;
  cookieName?: string;
  redirectTo?: string;
  requireSession?: boolean; // true: redirige si pas de session, false: redirige si session
}

/**
 * Provider qui surveille la présence du cookie de session et redirige automatiquement
 * - requireSession=true (par défaut) : redirige vers login si cookie supprimé
 * - requireSession=false : redirige vers dashboard si cookie créé (ex: sur /auth)
 */
export function AuthSessionProvider({
  children,
  cookieName = "session",
  redirectTo = "/auth",
  requireSession = true,
}: AuthSessionProviderProps) {
  const router = useRouter();
  const { exists } = useCookie(cookieName);

  useEffect(() => {
    if (requireSession && !exists) {
      router.replace(redirectTo);
    }
    if (!requireSession && exists) {
      router.replace("/chat");
    }
  }, [exists, requireSession, redirectTo, router]);

  return <>{children}</>;
}
