import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestInvoiceBody {
  id: string
}

export async function POST(req: NextRequest) {
  const res = (await req.json()) as RequestInvoiceBody

  const findUserOnDatabase = await prisma.user.findUnique({
    where: {
      id: res.id,
    },
    select: {
      invoices: { include: { itemList: true } },
    },
  })

  if (!findUserOnDatabase) {
    return NextResponse.json({ error: "User not found." }, { status: 401 })
  }

  return new NextResponse(
    JSON.stringify({
      status: "success",
      userInvoices: findUserOnDatabase?.invoices,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
