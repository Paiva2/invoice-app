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
  postalCodeFrom: z
    .string()
    .min(1, { message: "Can't be empty!" })
    .regex(/^[0-9-]+$/, { message: "Invalid postal code!" }),
  countryFrom: z.string().min(1, { message: "Can't be empty!" }),
  clientNameTo: z.string().min(1, { message: "Can't be empty!" }),
  clientEmailTo: z.string().min(1, { message: "Can't be empty!" }).email(),
  streetTo: z.string().min(1, { message: "Can't be empty!" }),
  cityTo: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeTo: z
    .string()
    .min(1, { message: "Can't be empty!" })
    .regex(/^[0-9-]+$/, { message: "Invalid postal code!" }),
  countryTo: z.string().min(1, { message: "Can't be empty!" }),
  projectDescriptionTo: z.string(),
})

export type InvoiceType = z.infer<typeof invoiceSchema>

const EditInvoiceForm = () => {
  const {
    dueDate,
    invoiceBeingVisualized,
    itemFromListValues,
    setDueDateError,
    setOpenInvoiceForm,
    setItemFromListValues,
    setDueDate,
  } = useContext(GlobalContext)

  const methods = useForm<InvoiceType>({
    resolver: zodResolver(invoiceSchema),
  })

  useEffect(() => {
    if (!invoiceBeingVisualized) return

    Object.keys(invoiceBeingVisualized)?.forEach((information) => {
      if (information === "itemList") return

      methods.setValue(
        information as keyof InvoiceType,
        invoiceBeingVisualized[information as keyof InvoiceType]
      )
    })

    setDueDate(new Date(invoiceBeingVisualized?.invoiceDateTo))

    setItemFromListValues(invoiceBeingVisualized?.itemList)
  }, [])

  const queryClient = useQueryClient()

  const editInvoice = useMutation({
    mutationFn: async (editInvoice: InvoiceSchema) => {
      const response = api.patch("/edit-invoice", {
        invoice: editInvoice,
        action: "edit-invoice",
      })

      return response
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
      postalCodeTo: data.postalCodeTo,
      countryTo: data.countryTo,
      projectDescriptionTo: data.projectDescriptionTo,
      invoiceDateTo: dueDate,
      itemList: itemFromListValues,
    }

    if (!dueDate) {
      setDueDateError(true)
    } else {
      setDueDateError(false)
    }

    await editInvoice.mutateAsync(editedInvoice)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleEditInvoice)}
        className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5"
      >
        <InvoiceForm />
      </form>
    </FormProvider>
  )
}

export default EditInvoiceForm
