import { SignUpSchema } from "@/src/schemas/form.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();
        const zodTest = SignUpSchema.safeParse({ email, password });

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        if (!zodTest.success) {
            return NextResponse.json({ error: zodTest.error.errors }, { status: 400 });
        }

        // authentication logic here
        const insert = await fetch(`${process.env.API_URL!}/add-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ADMIN_API_KEY! || "1gjonypg3igrpg8ul13mnh",
            },
            body: JSON.stringify(zodTest.data),
        });
        
        const resData = await insert.json();

        

        if (resData.error) {
            return NextResponse.json({ error: resData.error }, { status: 400 });
        }

        const token = resData.user.token;
        const tokenExpiry = resData.user.tokenExpiry ? new Date(resData.user.tokenExpiry) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        (await cookies()).set("session", token, {
            httpOnly: true,
            expires: tokenExpiry,
            priority: "high",
        });

        return NextResponse.json({ message: "User created successfully", data: resData.user }, { status: 201 });


    }catch (error) {
        console.error("Error in POST /api/user/auth:", error);
        return NextResponse.json({ error: "Une erreur est survenue lors de la request server" }, { status: 500 });
    }
}