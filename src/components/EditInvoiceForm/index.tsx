"use client"

import React, { useContext, useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { z } from "zod"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GlobalContext } from "@/context/GlobalContext"
import InvoiceForm from "../InvoiceForm"

const invoiceSchema = z.object({
  streetFrom: z.string().min(1, { message: "Can't be empty!" }),
  cityFrom: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeFrom: z.string().min(1, { message: "Can't be empty!" }),
  countryFrom: z.string().min(1, { message: "Can't be empty!" }),
  clientNameTo: z.string().min(1, { message: "Can't be empty!" }),
  clientEmailTo: z.string().min(1, { message: "Can't be empty!" }).email(),
  streetTo: z.string().min(1, { message: "Can't be empty!" }),
  cityTo: z.string().min(1, { message: "Can't be empty!" }),
  countryTo: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeTo: z.string().min(1, { message: "Can't be empty!" }),
  projectDescriptionTo: z.string(),
})

export type InvoiceType = z.infer<typeof invoiceSchema>

const EditInvoiceForm = () => {
  const { invoiceBeingVisualized, setItemFromListValues } = useContext(GlobalContext)

  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  const methods = useForm<InvoiceType>({
    resolver: zodResolver(invoiceSchema),
  })

  useEffect(() => {
    if (!invoiceBeingVisualized) return

    Object.keys(invoiceBeingVisualized)?.map((information) => {
      if (information === "itemList") return

      methods.setValue(
        information,
        invoiceBeingVisualized[information as keyof typeof invoiceBeingVisualized]
      )
    })

    setDueDate(new Date(invoiceBeingVisualized?.invoiceDateTo))

    setItemFromListValues(invoiceBeingVisualized?.itemList)
  }, [invoiceBeingVisualized])

  console.log(invoiceBeingVisualized)

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-7 [&>div]:flex [&>div]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col [&>div>label]:gap-2 [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded">
        <InvoiceForm />
      </form>
    </FormProvider>
  )
}

export default EditInvoiceForm
