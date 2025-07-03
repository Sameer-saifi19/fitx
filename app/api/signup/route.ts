import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = signupSchema.parse(body);

    const { firstName, lastName = "", email, password } = parsedData;

    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Account already exist",
        },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 12);

    const admin = await prisma.admin.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Account Created Successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("signup error ", error);
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
