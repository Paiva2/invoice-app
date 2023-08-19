import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface RequestInvoiceBody {
  invoiceId: string
}

export async function DELETE(req: NextRequest) {
  const res = (await req.json()) as RequestInvoiceBody

  await prisma.invoiceItemList.deleteMany({
    where: {
      invoiceId: res.invoiceId,
    },
  })

  await prisma.invoice.delete({
    where: {
      id: res.invoiceId,
    },
  })

  return new NextResponse(
    JSON.stringify({
      message: "Deleted successfully!",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  )
}
