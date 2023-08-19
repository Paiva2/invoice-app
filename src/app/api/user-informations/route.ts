import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestEditProfileBody {
  id: string
}

export async function POST(req: NextRequest) {
  const res = (await req.json()) as RequestEditProfileBody

  const getUserWithId = await prisma.user.findUnique({
    where: {
      id: res.id,
    },
    select: {
      email: true,
      image: true,
      totalBalance: true,
      name: true,
    },
  })

  if (!getUserWithId) {
    return NextResponse.json({ error: "User not found." }, { status: 404 })
  }

  return new NextResponse(
    JSON.stringify({
      status: "success",
      user: getUserWithId,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
