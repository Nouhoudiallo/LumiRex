import { hashPassword } from "@/src/lib/bcrypt";
import { prisma } from "@/src/lib/db";
import { JwtUtil } from "@/src/lib/jwt";
import { SignUpSchema } from "@/src/schemas/form.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const isValid = SignUpSchema.safeParse(body);
    if (!isValid.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: isValid.data.email,
      },
    });

    if (existingUser) {
      return {
        error: true,
        message: "Cet utilisateur existe déjà",
        user: null,
      };
    }

    const hashPass = await hashPassword(isValid.data.password);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: isValid.data.email,
        password: hashPass,
        token: "",
      },
    });

    const generateToken = JwtUtil.generateToken(newUser, "7d");

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

    const response = NextResponse.json({
      message: "Signup successful",
      user: updateUser,
    });
    response.cookies.set("session_token", generateToken, {
      path: "/",
      maxAge: 129782
    });

    return response;
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
