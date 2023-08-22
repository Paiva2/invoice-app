"use client"

import React, { Fragment, useContext, useEffect } from "react"
import CustomInput from "../CustomInput"
import InvoiceItemList from "../InvoiceItemList"
import DatePicker from "react-datepicker"
import { GlobalContext } from "@/context/GlobalContext"
import { usePathname } from "next/navigation"
import { tv } from "tailwind-variants"

const datePickerTheme = tv({
  base: "rounded p-3 w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0",
  variants: {
    theme: {
      dark: "bg-dark-blue text-pure-white",
      light: "bg-pure-white text-dark-blue",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

const InvoiceForm = () => {
  const {
    openInvoiceForm,
    dueDate,
    colorTheme,
    itemListSchema,
    setOpenInvoiceForm,
    setDueDate,
    setItemFromListValues,
  } = useContext(GlobalContext)

  const currentPage = usePathname()

  const isAllInvoicesPage = currentPage.startsWith("/invoices")

  useEffect(() => {
    setItemFromListValues([itemListSchema])
  }, [openInvoiceForm])

  const isLightTheme = colorTheme === "light"

  return (
    <Fragment>
      <div>
        <p className="text-light-purple font-semibold">Bill From</p>

        <CustomInput
          registerName="streetFrom"
          label="Street Address"
          inputType="text"
        />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] ">
          <CustomInput registerName="cityFrom" label="City" inputType="text" />
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

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] ">
          <CustomInput registerName="cityTo" label="City" inputType="text" />

          <CustomInput
            registerName="postalCodeTo"
            label="Postal Code"
            inputType="text"
          />

          <CustomInput
            registerName="countryTo"
            label="Country"
            inputType="text"
          />
        </div>

        <div className="w-full flex-col flex">
          <span>Invoice Date</span>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            minDate={new Date()}
            showIcon
            className={datePickerTheme({
              theme: isLightTheme ? "light" : "dark",
            })}
          />
        </div>

        <CustomInput
          registerName="projectDescriptionTo"
          label="Project Description"
          inputType="text"
        />
      </div>

      <InvoiceItemList />

      {!isAllInvoicesPage && (
        <div className="flex flex-row justify-between">
          <div>
            <button
              onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
              type="button"
              className="bg-dark-blue rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
            >
              Discard
            </button>
          </div>
          <div className="self-end">
            <div className="flex gap-2.5">
              <button
                type="submit"
                className="bg-light-purple transition duration-150 ease-in-out rounded-3xl py-1.5 px-5 font-semibold hover:bg-hover-purple leading-9"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default InvoiceForm
