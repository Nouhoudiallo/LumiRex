"use server";

import { cookies } from "next/headers";
import { User } from "../generated/prisma";
import { hashPassword } from "../lib/bcrypt";
import { prisma } from "../lib/db";
import { JwtUtil } from "../lib/jwt";
import { SignUpSchema, SignUpSchemaType } from "../schemas/form.schema";

import { serialize } from 'cookie';


type GetUserProps = {
  error: boolean;
  message?: string;
  user: User | null;
  error_message?: string;
};

export async function getUser(email: string): Promise<GetUserProps> {
  try {
    if (!email) {
      return { error: true, message: "L'email est obligatoir", user: null };
    }

    // Try to find the user in the database with prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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

export async function addUser(values: SignUpSchemaType): Promise<GetUserProps> {
    const cookieStore = await cookies();
    try {
        const testEntries = SignUpSchema.safeParse(values);

        // Validate input
        if (!testEntries.success) {
            return {
                error: true,
                message: "Les données fournies ne sont pas valides",
                user: null,
            };
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: testEntries.data.email,
            },
        });

        if (existingUser) {
            return {
                error: true,
                message: "Cet utilisateur existe déjà",
                user: null,
            };
        }

        const hashPass = await hashPassword(testEntries.data.password);

        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                email: testEntries.data.email,
                password: hashPass,
                token: "",
            },
        });

        const generateToken = JwtUtil.generateToken(newUser, "7d")

        const updateUser = await prisma.user.update({
            where: {
                id: newUser.id,
            },
            data: {
                token: generateToken,
            },
        });

        const tokenExpiry = updateUser.tokenExpiry
      ? new Date(updateUser.tokenExpiry)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Set the cookie with the token
        const resCookie = cookieStore.set("session", JSON.stringify(updateUser.token), {
            httpOnly: true,
            secure: true,
            expires: tokenExpiry,
            path: "/",
        })

        console.log("Cookie set:", resCookie);
        
        
        return {
            error: false,
            message: "Utilisateur ajouté avec succès",
            user: updateUser as User,
        };
        
    } catch (error) {
        console.error("Error adding user:", error);
        return {
            error: true,
            message: "Une erreur est survenue lors de l'ajout de l'utilisateur",
            user: null,
        };
    }
}