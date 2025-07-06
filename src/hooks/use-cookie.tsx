"use client"

import { useEffect, useState } from "react"

/**
 * Hook pour gérer un cookie simple et détecter sa présence

 * @param value Valeur du cookie (optionnel)
 * @param days Nombre de jours avant expiration (défaut: 7)
 */
export function useCookie(value?: string, days: number = 7) {
  // S'assurer que le code ne s'exécute que côté client
  const isClient = typeof window !== "undefined" && typeof document !== "undefined";

  const getCookie = () => {
    if (!isClient) return undefined;
    const match = document.cookie.match(new RegExp('(^| )' + "session_token" + '=([^;]+)'));
    return match ? match[2] : undefined;
  };

  const [cookieValue, setCookieValue] = useState<string | undefined>(isClient ? getCookie() : undefined);
  const [exists, setExists] = useState<boolean>(isClient ? !!getCookie() : false);

  // Setter pour créer ou mettre à jour le cookie
  const updateCookie = (val: string) => {
    if (!isClient) return;
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `session_token=${val}; path=/; expires=${expires.toUTCString()}`;
    setCookieValue(val);
    setExists(true);
  };

  // Supprimer le cookie
  const removeCookie = () => {
    if (!isClient) return;
    document.cookie = `session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    setCookieValue(undefined);
    setExists(false);
  };

  // Surveiller la présence du cookie (polling)
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      const val = getCookie();
      setCookieValue(val);
      setExists(!!val);
    }, 1000); // Vérifie toutes les secondes
    return () => clearInterval(interval);
  }, ["session_token", isClient]);

  // Si value fourni, créer/mettre à jour le cookie
  useEffect(() => {
    if (!isClient) return;
    if (value !== undefined) {
      updateCookie(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isClient]);

  return { cookieValue, setCookieValue: updateCookie, exists, removeCookie };
}