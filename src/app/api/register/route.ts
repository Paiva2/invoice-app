import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface RegisterRequestBody {
  email: string
  password: string
  username: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RegisterRequestBody

  if (!res.email)
    return NextResponse.json({ error: "E-mail can't be empty!" }, { status: 422 })

  if (!res?.username)
    return NextResponse.json({ error: "Username can't be empty!" }, { status: 422 })

  if (!res?.password)
    return NextResponse.json({ error: "Password can't be empty!" }, { status: 422 })

  const isEmailAlreadyRegistered = await prisma.user.findUnique({
    where: {
      email: res.email,
    },
  })

  if (isEmailAlreadyRegistered) {
    return NextResponse.json(
      { error: "This e-mail is already registered!" },
      { status: 409 }
    )
  }

  const saltRounds = 10
  const passwordToHash = res.password

  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  const newUser = await prisma.user.create({
    data: {
      name: res.username,
      email: res.email,
      password: hashedPassword,
    },
  })

  return new NextResponse(
    JSON.stringify({
      status: "success",
      data: { user: { ...newUser, password: undefined } },
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  )
}
