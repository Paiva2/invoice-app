import React from "react"
import CustomInput from "../CustomInput"
import ItemList from "./ItemList"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { z } from "zod"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
  clientEmail: z.string().min(1, { message: "Can't be empty!" }),
  streetAddressTo: z.string().min(1, { message: "Can't be empty!" }),
  cityTo: z.string().min(1, { message: "Can't be empty!" }),
  postalCodeTo: z.string().min(1, { message: "Can't be empty!" }),
  countryTo: z.string().min(1, { message: "Can't be empty!" }),
  paymentTerms: z.string().min(1, { message: "Can't be empty!" }),
  projectDescription: z.string(),
  itemName: z.string().min(1, { message: "Can't be empty!" }),
  itemQuantity: z.string().min(1, { message: "Can't be empty!" }),
  itemPrice: z.string().min(1, { message: "Can't be empty!" }),
})

export type NewInvoiceType = z.infer<typeof newInvoiceSchema>

const NewInvoiceForm = ({ openNewInvoice, setOpenNewInvoice }: NewInvoiceProps) => {
  const methods = useForm<NewInvoiceType>({
    resolver: zodResolver(newInvoiceSchema),
  })

  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const handleSubmitInvoice = (data: NewInvoiceType) => {
    console.log(data, "normal invoice")
  }

  const handleSaveDraft = (data) => {
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

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            showIcon
            className="bg-dark-blue text-pure-white rounded p-3 w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0"
          />

          <CustomInput
            registerName="paymentTerms"
            label="Payment Terms"
            inputType="text"
          />

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
