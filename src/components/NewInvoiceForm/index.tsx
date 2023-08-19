import React, { useContext } from "react"
import InvoiceForm from "../InvoiceForm"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { z } from "zod"
import { tv } from "tailwind-variants"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "react-query"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GlobalContext } from "@/context/GlobalContext"
import { InvoiceSchema } from "../../../types"
import { generateRandomID } from "@/utils/randomId"

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

export type NewInvoiceType = z.infer<typeof invoiceSchema>

export const paymentsVisibility = tv({
  base: "absolute top-[3.4375rem] transition-all delay-70 ease-in-out py-2 flex flex-col gap-2 bg-dark-blue z-10 w-full left-0 rounded font-semibold [&>li:last-child]:border-transparent",
  variants: {
    visibility: {
      visible: "opacity-100 visible",
      hidden: "opacity-0 invisible",
    },
    arrowRotate: {
      rotate: "rotate-180",
      normal: "rotate-0",
    },
  },
  defaultVariants: {
    visibility: "hidden",
  },
})

const NewInvoiceForm = () => {
  const {
    itemFromListValues,
    userInformations,
    itemListSchema,
    dueDate,
    setItemFromListValues,
  } = useContext(GlobalContext)

  if (!userInformations.id) return

  const methods = useForm<NewInvoiceType>({
    resolver: zodResolver(invoiceSchema),
  })

  const queryClient = useQueryClient()

  const createNewInvoice = useMutation({
    mutationFn: (newInvoice: InvoiceSchema) => {
      return api.post("/new-invoice", {
        userId: userInformations.id,
        invoice: newInvoice,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries("getUserHomeInformations")

      methods.reset()

      setItemFromListValues([itemListSchema])
    },
  })

  const handleSubmitInvoice = async (data: NewInvoiceType) => {
    const newInvoice = {
      id: generateRandomID(),
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
    }

    await createNewInvoice.mutateAsync(newInvoice)
  }

  const handleSaveDraft = async (data: NewInvoiceType) => {
    const newInvoice = {
      id: generateRandomID(),
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
      status: "draft",
    }

    await createNewInvoice.mutateAsync(newInvoice)
  }

  function saveDraftExecution() {
    methods?.handleSubmit(handleSaveDraft)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods?.handleSubmit(handleSubmitInvoice)}
        className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col  [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded"
      >
        <InvoiceForm handleSaveDraft={saveDraftExecution} />
      </form>
    </FormProvider>
  )
}

export default NewInvoiceForm
