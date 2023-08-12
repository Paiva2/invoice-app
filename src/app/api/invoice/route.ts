import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RegisterRequestBody {
  id: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RegisterRequestBody

  const getInvoiceAccorgingToId = await prisma.invoice.findUnique({
    where: {
      id: res.id,
    },
    include: {
      itemList: true,
    },
  })

  if (!getInvoiceAccorgingToId) {
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 })
  }

  return new NextResponse(
    JSON.stringify({
      status: "success",
      data: getInvoiceAccorgingToId,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
