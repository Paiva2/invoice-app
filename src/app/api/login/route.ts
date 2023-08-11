import { prisma } from "@/lib/prisma"
import { signJWT } from "@/lib/token"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface RequestLoginBody {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RequestLoginBody

  if (!res.email)
    return NextResponse.json({ error: "E-mail can't be empty!" }, { status: 422 })

  if (!res?.password)
    return NextResponse.json({ error: "Password can't be empty!" }, { status: 422 })

  const findUserOnDatabase = await prisma.user.findUnique({
    where: {
      email: res.email,
    },
  })

  if (!findUserOnDatabase) {
    return NextResponse.json({ error: "E-mail not found!" }, { status: 409 })
  }

  const passwordMatches = bcrypt.compare(res.password, findUserOnDatabase.password)

  if (!passwordMatches) {
    return NextResponse.json({ error: "Invalid password!" }, { status: 409 })
  }

  const JWTExpiration = 1000 * 60 * 60 * 24 * 7 // 7 days

  const JWTToken = await signJWT(
    { sub: findUserOnDatabase.id },
    { exp: `${JWTExpiration}s` }
  )

  const cookieOptions = {
    name: "invoice-app-auth",
    value: JWTToken,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    maxAge: JWTExpiration,
  }

  const response = new NextResponse(
    JSON.stringify({
      status: "success",
      JWTToken,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )

  response.cookies.set(cookieOptions)

  return response
}
