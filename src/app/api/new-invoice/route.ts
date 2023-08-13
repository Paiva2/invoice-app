import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { InvoiceSchema } from "../../../../types"

interface RegisterRequestBody {
  invoice: InvoiceSchema
  userId: string
}

export async function POST(request: NextRequest) {
  const res = (await request.json()) as RegisterRequestBody

  console.log(res.invoice.itemList)

  /*   if (!res.userId)
    return NextResponse.json({ error: "Id not found." }, { status: 401 }) */

  /*   const getUserById = await prisma.user.findUnique({
    where: {
      id: res.userId,
    },
  }) */

  /*   if (!getUserById) {
    return NextResponse.json({ error: "User not found." }, { status: 401 })
  } */

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
    paymentTermsTo: res.invoice.paymentTermsTo,
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
    await prisma.invoiceItemList.createMany({
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
