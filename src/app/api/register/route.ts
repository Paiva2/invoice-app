import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface RegisterRequestBody {
  email: string
  password: string
  username: string
  provider?: string
  image?: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RegisterRequestBody

  if (!res.email) {
    return NextResponse.json(
      { error: "E-mail can't be empty!" },
      { status: 422 }
    )
  }

  if (!res?.username) {
    return NextResponse.json(
      { error: "Username can't be empty!" },
      { status: 422 }
    )
  }

  if (!res?.password && !res.provider) {
    return NextResponse.json(
      { error: "Password can't be empty!" },
      { status: 422 }
    )
  }

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

  let passwordToHash = ""
  let saltRounds = 10
  let hashedPassword: string | null = null

  if (res.password && !res.provider) {
    passwordToHash = res.password

    hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)
  }

  const newUser = await prisma.user.create({
    data: {
      name: res.username,
      email: res.email,
      password: hashedPassword,
      image: res.provider
        ? res.image
        : "https://i.postimg.cc/0NhyFYLj/transferir.jpg",
    },
  })

  return new NextResponse(
    JSON.stringify({
      status: "success",
      data: { user: { ...newUser, password: null } },
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  )
}
