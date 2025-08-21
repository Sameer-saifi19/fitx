import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, dateOfBirth, gender } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name and email are required" },
        { status: 400 }
      );
    }

    const member = await prisma.member.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        gender,
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
