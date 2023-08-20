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
  postalCodeFrom: z
    .string()
    .min(1, { message: "Can't be empty!" })
    .regex(/^[0-9-]+$/, { message: "Invalid postal code!" }),
  countryFrom: z.string().min(1, { message: "Can't be empty!" }),
  clientNameTo: z.string().min(1, { message: "Can't be empty!" }),
  clientEmailTo: z.string().min(1, { message: "Can't be empty!" }).email(),
  streetTo: z.string().min(1, { message: "Can't be empty!" }),
  cityTo: z.string().min(1, { message: "Can't be empty!" }),
  countryTo: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeTo: z
    .string()
    .min(1, { message: "Can't be empty!" })
    .regex(/^[0-9-]+$/, { message: "Invalid postal code!" }),
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
    openInvoiceForm,
    setItemFromListValues,
    setOpenInvoiceForm,
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

      setOpenInvoiceForm(false)
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
      postalCodeTo: data.postalCodeTo,
      countryTo: data.countryTo,
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
      postalCodeTo: data.postalCodeTo,
      countryTo: data.countryTo,
      projectDescriptionTo: data.projectDescriptionTo,
      invoiceDateTo: dueDate,
      itemList: itemFromListValues,
      status: "draft",
    }

    await createNewInvoice.mutateAsync(newInvoice)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods?.handleSubmit(handleSubmitInvoice)}
        className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col  [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded"
      >
        <InvoiceForm />

        <div className="flex flex-row justify-between md:flex-col md:items-center">
          <div className="md:w-full">
            <button
              onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
              type="button"
              className="bg-dark-blue rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue md:w-full"
            >
              Discard
            </button>
          </div>
          <div className="self-end md:self-center md:w-full md:justify-center md:flex">
            <div className="flex gap-2.5 md:flex-col md:gap-5 md:w-full">
              <button
                type="submit"
                onClick={methods?.handleSubmit(handleSaveDraft)}
                className="bg-strong-blue rounded-3xl  transition duration-150 ease-in-out py-1.5 px-6 font-semibold leading-9 hover:bg-dark-blue"
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className="bg-light-purple transition duration-150 ease-in-out rounded-3xl py-1.5 px-5 font-semibold hover:bg-hover-purple leading-9"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default NewInvoiceForm
