import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface ChangePasswordRequestBody {
  email: string
  password: string
  username: string
}

export async function PATCH(request: NextRequest) {
  const res = (await request.json()) as ChangePasswordRequestBody

  if (!res.email)
    return NextResponse.json(
      { error: "E-mail can't be empty!" },
      { status: 422 }
    )

  if (!res?.password)
    return NextResponse.json(
      { error: "Password can't be empty!" },
      { status: 422 }
    )

  const isUserOnDatabase = await prisma.user.findUnique({
    where: {
      email: res.email,
    },
  })

  if (!isUserOnDatabase) {
    return NextResponse.json({ error: "E-mail not found!" }, { status: 409 })
  }

  const saltRounds = 10
  const passwordToHash = res.password

  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  await prisma.user.update({
    where: {
      id: isUserOnDatabase.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  return new NextResponse(
    JSON.stringify({
      status: "Password successfully changed!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
