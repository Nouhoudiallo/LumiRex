import { comparePassword } from "@/src/lib/bcrypt";
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

    if (!existingUser) {
      return {
        error: true,
        message: "Cet utilisateur n'existe pas",
        user: null,
      };
    }

    const isPasswordValid = await comparePassword(isValid.data.password, existingUser.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = existingUser.token


    const veryToken = JwtUtil.verifyToken(token)

    if(!veryToken){
      return NextResponse.json({
        error: "Something went wrong"
      })
    }

    const tokenExpiry = 604800 // 7d

    const response = NextResponse.json({
      message: "SignIn successfuly",
      user: existingUser,
    });
    response.cookies.set("session_token", token, {
      path: "/",
      maxAge: tokenExpiry,
      httpOnly: true
    });

    return response;
  } catch (error) {
    console.error("Error in signIn route:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
