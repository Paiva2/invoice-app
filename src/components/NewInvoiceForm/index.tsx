import React, { useContext } from "react"
import CustomInput from "../CustomInput"
import ItemList from "./ItemList"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { z } from "zod"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ArrowDown from "@/icons/ArrowDown"
import { tv } from "tailwind-variants"
import { arrowRotation } from "@/utils/tailwindVariants"
import { useMutation, useQuery } from "react-query"
import { api } from "@/lib/api"
import { GlobalContext } from "@/context/GlobalContext"
import { InvoiceSchema } from "../../../types"
import { generateRandomID } from "@/utils/randomId"
interface NewInvoiceProps {
  openNewInvoice: boolean
  setOpenNewInvoice: React.Dispatch<React.SetStateAction<boolean>>
}

const newInvoiceSchema = z.object({
  streetAddressFrom: z.string().min(1, { message: "Can't be empty!" }),
  city: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeFrom: z.string().min(1, { message: "Can't be empty!" }),
  countryFrom: z.string().min(1, { message: "Can't be empty!" }),
  clientName: z.string().min(1, { message: "Can't be empty!" }),
  clientEmail: z.string().min(1, { message: "Can't be empty!" }).email(),
  streetAddressTo: z.string().min(1, { message: "Can't be empty!" }),
  cityTo: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeTo: z.string().min(1, { message: "Can't be empty!" }),
  countryTo: z.string().min(1, { message: "Can't be empty!" }),
  projectDescription: z.string(),
})

export type NewInvoiceType = z.infer<typeof newInvoiceSchema>

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

const NewInvoiceForm = ({ openNewInvoice, setOpenNewInvoice }: NewInvoiceProps) => {
  const { itemFromListValues, userInformations } = useContext(GlobalContext)

  if (!userInformations.id) return

  const methods = useForm<NewInvoiceType>({
    resolver: zodResolver(newInvoiceSchema),
  })

  const paymentTerms = ["1", "7", "14", "30"]

  const [paymentTermWatcher, setPaymentTermWatcher] = useState(paymentTerms[0])
  const [openPaymentTerms, setOpenPaymentTerms] = useState(false)

  const [DueDate, setDueDate] = useState<Date>(new Date())

  const createNewInvoice = useMutation({
    mutationFn: (newInvoice: InvoiceSchema) => {
      return api.post("/new-invoice", {
        invoice: newInvoice,
        userId: userInformations.id,
      })
    },
  })

  const handleSubmitInvoice = (data: NewInvoiceType) => {
    const newInvoiceSchema = {
      id: generateRandomID(),
      streetFrom: data.streetAddressFrom,
      cityFrom: data.city,
      postalCodeFrom: data.postalCodeFrom,
      countryFrom: data.countryFrom,
      clientNameTo: data.clientName,
      clientEmailTo: data.clientEmail,
      streetTo: data.streetAddressTo,
      cityTo: data.cityTo,
      postalCodeTo: data.postalCodeTo,
      countryTo: data.countryTo,
      projectDescriptionTo: data.projectDescription,
      invoiceDateTo: DueDate,
      paymentTermsTo: paymentTermWatcher,
      itemList: itemFromListValues,
    }

    createNewInvoice.mutateAsync(newInvoiceSchema)
  }

  const handleSaveDraft = (data: NewInvoiceType) => {
    console.log(data, "draft")
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods?.handleSubmit(handleSubmitInvoice)}
        className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col  [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded"
      >
        <div>
          <p className="text-light-purple font-semibold">Bill From</p>

          <CustomInput
            registerName="streetAddressFrom"
            label="Street Address"
            inputType="text"
          />

          <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
            <CustomInput registerName="city" label="City" inputType="text" />

            <CustomInput
              registerName="postalCodeFrom"
              label="Postal Code"
              inputType="text"
            />

            <CustomInput
              registerName="countryFrom"
              label="Country"
              inputType="text"
            />
          </div>
        </div>

        <div>
          <p className="text-light-purple font-semibold">Bill To</p>
          <CustomInput
            registerName="clientName"
            label="Client's Name"
            inputType="text"
          />
          <CustomInput
            registerName="clientEmail"
            label="Client's e-mail"
            inputType="text"
          />
          <CustomInput
            registerName="streetAddressTo"
            label="Street Address"
            inputType="text"
          />
          <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
            <CustomInput registerName="cityTo" label="City" inputType="text" />

            <CustomInput
              registerName="postalCodeTo"
              label="Postal Code"
              inputType="text"
            />

            <CustomInput registerName="countryTo" label="Country" inputType="text" />
          </div>
          <div className="w-full flex-col flex">
            <span>Invoice Date</span>
            <DatePicker
              selected={DueDate}
              onChange={(date: Date) => setDueDate(date)}
              minDate={new Date()}
              showIcon
              className="bg-dark-blue text-pure-white rounded p-3 w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0"
            />
          </div>
          <div>
            <span>Payment Terms</span>
            <div className="bg-dark-blue relative text-pure-white rounded w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0">
              <button
                onClick={() => setOpenPaymentTerms(!openPaymentTerms)}
                className="flex p-3 h-full justify-between w-full items-baseline"
                type="button"
              >
                Net {paymentTermWatcher} day{+paymentTermWatcher > 1 && "s"}
                <span
                  className={arrowRotation({
                    arrowRotate: openPaymentTerms ? "rotate" : "normal",
                  })}
                >
                  <ArrowDown />
                </span>
              </button>
              <ul
                className={paymentsVisibility({
                  visibility: openPaymentTerms ? "visible" : "hidden",
                })}
              >
                {paymentTerms.map((days) => {
                  return (
                    <li
                      key={days}
                      onClick={() => {
                        setPaymentTermWatcher(days),
                          setOpenPaymentTerms(!openPaymentTerms)
                      }}
                      className="border-b cursor-pointer px-2.5 py-2.5 transition border-strong-blue hover:text-light-purple"
                    >
                      Net {days} Day{+days > 1 && "s"}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <CustomInput
            registerName="projectDescription"
            label="Project Description"
            inputType="text"
          />
        </div>

        <ItemList />

        <div className="flex flex-row justify-between">
          <button
            onClick={() => setOpenNewInvoice(!openNewInvoice)}
            type="button"
            className="bg-dark-blue rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
          >
            Discard
          </button>
          <div className="self-end">
            <div className="flex gap-2.5">
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
