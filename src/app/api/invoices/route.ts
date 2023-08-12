import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestInvoiceBody {
  id: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RequestInvoiceBody

  const findUserOnDatabase = await prisma.user.findUnique({
    where: {
      id: res.id,
    },
    include: {
      invoices: true,
    },
  })

  if (findUserOnDatabase === null) {
    return NextResponse.json({ error: "User not found." }, { status: 401 })
  }

  const response = new NextResponse(
    JSON.stringify({
      status: "success",
      userInvoices: findUserOnDatabase?.invoices,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )

  return response
}
