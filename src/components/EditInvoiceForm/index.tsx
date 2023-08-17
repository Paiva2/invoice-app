"use client"

import React, { useContext, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { z } from "zod"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GlobalContext } from "@/context/GlobalContext"
import InvoiceForm from "../InvoiceForm"
import { useMutation, useQueryClient } from "react-query"
import { api } from "@/lib/api"
import { InvoiceSchema } from "../../../types"

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
  const {
    dueDate,
    invoiceBeingVisualized,
    itemFromListValues,
    setOpenInvoiceForm,
    setItemFromListValues,
    setDueDate,
  } = useContext(GlobalContext)

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
  }, [])

  const queryClient = useQueryClient()

  const editInvoice = useMutation({
    mutationFn: (editInvoice: InvoiceSchema) => {
      return api.patch("/edit-invoice", {
        invoice: editInvoice,
        action: "edit-invoice"
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries("singleInvoice")

      setOpenInvoiceForm(false)
    },
  })

  async function handleEditInvoice(data: InvoiceType) {
    const editedInvoice = {
      id: invoiceBeingVisualized.id,
      streetFrom: data.streetFrom,
      cityFrom: data.cityFrom,
      postalCodeFrom: data.postalCodeFrom,
      countryFrom: data.countryFrom,
      clientNameTo: data.clientNameTo,
      clientEmailTo: data.clientEmailTo,
      streetTo: data.streetTo,
      cityTo: data.cityTo,
      postalCodeTo: data.countryTo,
      countryTo: data.postalCodeTo,
      projectDescriptionTo: data.projectDescriptionTo,
      invoiceDateTo: dueDate,
      itemList: itemFromListValues,
      /* status: "draft", */
    }

    editInvoice.mutateAsync(editedInvoice)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleEditInvoice)}
        className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col [&>div>label]:gap-2 [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded"
      >
        <InvoiceForm />
      </form>
    </FormProvider>
  )
}

export default EditInvoiceForm
