"use client"

import React, { Fragment, useContext, useState } from "react"
import CustomInput from "../CustomInput"
import InvoiceItemList from "../InvoiceItemList"
import DatePicker from "react-datepicker"
import { GlobalContext } from "@/context/GlobalContext"

const InvoiceForm = () => {
  const { openInvoiceForm, setOpenInvoiceForm } = useContext(GlobalContext)

  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  console.log(openInvoiceForm)

  return (
    <Fragment>
      <div>
        <p className="text-light-purple font-semibold">Bill From</p>

        <CustomInput
          registerName="streetFrom"
          label="Street Address"
          inputType="text"
        />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <CustomInput registerName="cityFrom" label="City" inputType="text" />

          <CustomInput
            registerName="postalCodeFrom"
            label="Postal Code"
            inputType="text"
          />

          <CustomInput registerName="countryFrom" label="Country" inputType="text" />
        </div>
      </div>

      <div>
        <p className="text-light-purple font-semibold">Bill To</p>

        <CustomInput
          registerName="clientNameTo"
          label="Client's Name"
          inputType="text"
        />

        <CustomInput
          registerName="clientEmailTo"
          label="Client's e-mail"
          inputType="text"
        />

        <CustomInput
          registerName="streetTo"
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
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            minDate={new Date()}
            showIcon
            className="bg-dark-blue text-pure-white rounded p-3 w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0"
          />
        </div>

        <CustomInput
          registerName="projectDescriptionTo"
          label="Project Description"
          inputType="text"
        />
      </div>

      <InvoiceItemList />

      <div className="flex flex-row justify-between">
        <button
          onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
          type="button"
          className="bg-dark-blue rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
        >
          Discard
        </button>
        <div className="self-end">
          <div className="flex gap-2.5">
            <button
              type="submit"
              /* onClick={methods?.handleSubmit(handleSaveDraft)} */
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
    </Fragment>
  )
}

export default InvoiceForm
