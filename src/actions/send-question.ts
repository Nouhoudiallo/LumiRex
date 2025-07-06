"use server";

import { Discussion } from "../generated/prisma";
import { prisma } from "../lib/db";

interface CreateDiscussionInterface {
  error: boolean;
  message?: string;
  discussion: Discussion | null;
  error_message?: string;
}
export async function createDiscussion(
  userId: string,
  question: string
): Promise<CreateDiscussionInterface> {
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!checkUser) {
      return {
        error: true,
        discussion: null,
        message: "Utilisateur non valide ou trouver",
      };
    }

    const createDiscu = await prisma.discussion.create({
      data: {
        title: question,
        authorId: checkUser?.id as string,
      },
    });

    return {
      error: false,
      discussion: createDiscu,
    };
  } catch (error) {
    return {
      error: true,
      discussion: null,
      message: "Une erreur est suvenue",
      error_message: error as string,
    };
  }
}
