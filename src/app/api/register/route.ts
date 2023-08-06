import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

interface RequestBody {
  body: {
    email: string
    password: string
    username: string
  }
  method: string
}

export async function POST(request: Request) {
  const res = await request.json()

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

  await prisma.user.create({
    data: {
      name: res.username,
      email: res.email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: "Register successful!" }, { status: 201 })
}
