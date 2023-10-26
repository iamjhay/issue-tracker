import { userRegisterSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = userRegisterSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // check if user with email already exist
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  // if the email exist throw an error
  if (user)
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  // if user does not exist, then create the user in db
  // *** First hash the password
  const hashPassword = await hash(body.password, 12);
  // *** Add user to db
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashPassword,
    },
  });

  const { password, ...info } = newUser;

  return NextResponse.json(info, { status: 201 });
}
