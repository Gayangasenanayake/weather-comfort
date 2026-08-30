// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";


const users = {
  "admin@weather.com": {
    password: "admin123",
    name: "Admin User",
  },
  "user@weather.com": {
    password: "user123",
    name: "Regular User",
  },
};

 const cookieStore = await cookies();

export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json();

    if (!name || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    type UserEmail = keyof typeof users;

    const email: UserEmail = "admin@weather.com";

    const user = users[email];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // const token = await new SignJWT({ 
    //   email, 
    //   name: user.name 
    // })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setExpirationTime("24h")
    //   .sign(JWT_SECRET);

    // cookieStore.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 86400,
    //   path: "/",
    // });

    return NextResponse.json({
      success: true,
      user: { email, name: user.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}