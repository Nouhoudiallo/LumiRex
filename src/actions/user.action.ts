"use server";

import { cookies } from "next/headers";
import { User } from "../generated/prisma";
import { prisma } from "../lib/db";
import { JwtUtil } from "@/src/lib/jwt";

type GetUserProps = {
  error: boolean;
  message?: string;
  user: User | null;
  error_message?: string;
};

export async function getUser(): Promise<GetUserProps> {
  const cookieStore = await cookies();
  try {
    const userToken = cookieStore.get("session_token");

    if (!userToken || !userToken.value) {
      return {
        error: true,
        user: null,
        message: "Utilisateur non connecter",
      };
    }

    const isValidToken = JwtUtil.verifyToken(userToken.value);

    if (!isValidToken) {
      return {
        error: true,
        user: null,
        message: "Invalid Token",
      };
    }
    // Try to find the user in the database with prisma
    const user = await prisma.user.findUnique({
      where: {
        token: userToken.value as string
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      error: false,
      message: "Utilisateur récupéré avec succès",
      user: user as User,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      error: true,
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
      user: null,
    };
  }
}
