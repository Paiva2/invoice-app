import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestEditProfileBody {
  action: string
  data: {
    id: string
    image: string
    totalBalance: string
  }
}

export async function PATCH(req: NextRequest) {
  const res = (await req.json()) as RequestEditProfileBody

  switch (res.action) {
    case "edit-image":
      const getUserWithId = await prisma.user.update({
        where: {
          id: res.data.id,
        },
        data: {
          image: res.data.image,
        },
      })

      if (!getUserWithId) {
        return NextResponse.json({ error: "User not found." }, { status: 404 })
      }
      return new NextResponse(
        JSON.stringify({
          status: "Profile image edited successfully!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )

    default:
      new NextResponse(
        JSON.stringify({
          status: "Undefined action!",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
  }
}
