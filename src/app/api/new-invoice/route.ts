import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { InvoiceSchema } from "../../../../types"

interface RegisterRequestBody {
  invoice: InvoiceSchema
  userId: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RegisterRequestBody

  const newInvoice = {
    id: res.invoice.id,
    streetFrom: res.invoice.streetFrom,
    cityFrom: res.invoice.cityFrom,
    postalCodeFrom: res.invoice.postalCodeFrom,
    countryFrom: res.invoice.countryFrom,
    clientNameTo: res.invoice.clientNameTo,
    clientEmailTo: res.invoice.clientEmailTo,
    streetTo: res.invoice.streetTo,
    cityTo: res.invoice.cityTo,
    postalCodeTo: res.invoice.postalCodeTo,
    countryTo: res.invoice.countryTo,
    invoiceDateTo: res.invoice.invoiceDateTo,
    projectDescriptionTo: res.invoice.projectDescriptionTo,
    status: res.invoice.status ?? "pending",
  }

  await prisma.user.update({
    where: {
      id: res.userId,
    },
    data: {
      invoices: {
        create: newInvoice,
      },
    },
  })

  res.invoice.itemList.forEach(async (itemList) => {
    await prisma.invoiceItemList.create({
      data: {
        invoiceId: res.invoice.id,
        name: itemList.name,
        price: String(itemList.price),
        quantity: itemList.quantity,
      },
    })
  })

  return NextResponse.json(
    { error: "New invoice created with success!" },
    { status: 201 }
  )
}
