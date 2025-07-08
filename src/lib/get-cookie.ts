"use server";
import { cookies } from "next/headers";

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(name);
  
  if (cookieValue) {
    return cookieValue.value;
  }
  
  return undefined;
}