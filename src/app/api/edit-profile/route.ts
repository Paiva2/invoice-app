import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestEditProfileBody {
  data: {
    id: string
    image: string
    totalBalance: string
    username: string
  }
}

export async function PATCH(req: NextRequest) {
  const res = (await req.json()) as RequestEditProfileBody

  if (
    !res.data ||
    !res.data.image ||
    !res.data.totalBalance ||
    !res.data.username
  )
    return NextResponse.json(
      { error: "Invalid informations." },
      { status: 404 }
    )

  const getUserWithId = await prisma.user.update({
    where: {
      id: res.data.id,
    },
    data: {
      totalBalance: res.data.totalBalance
        .replaceAll("$", "")
        .replaceAll(".", "")
        .replaceAll(",", ""),
      image: res.data.image,
      name: res.data.username,
    },
  })

  if (!getUserWithId) {
    return NextResponse.json({ error: "User not found." }, { status: 404 })
  }
  return new NextResponse(
    JSON.stringify({
      status: "Profile edited successfully!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
