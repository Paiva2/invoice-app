import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { InvoiceSchema } from "../../../../types";

interface RequestInvoiceBody {
  invoice: InvoiceSchema;
  action: string;
}

export async function PATCH(req: NextRequest) {
  const res = (await req.json()) as RequestInvoiceBody;

  switch (res.action) {
    case "edit-invoice":
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
        status: res.invoice.status,
      };

      await prisma.invoice.update({
        where: {
          id: res.invoice.id,
        },
        data: newInvoice,
      });

      await prisma.invoiceItemList.deleteMany({
        where: {
          invoiceId: res.invoice.id,
        },
      });

      res.invoice.itemList.forEach(async (itemList) => {
        await prisma.invoiceItemList.create({
          data: {
            invoiceId: res.invoice.id,
            name: itemList.name,
            price: String(itemList.price),
            quantity: itemList.quantity,
          },
        });
      });

      return new NextResponse(
        JSON.stringify({
          message: "Edited successfully!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

    case "mark-as-paid":
      await prisma.invoice.update({
        where: {
          id: res.invoice.id,
        },
        data: {
          status: "paid",
        },
      });

      return new NextResponse(
        JSON.stringify({
          message: "Edited successfully!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

    default:
      return null;
  }
}
