import React, { useEffect } from "react"
import CustomInput from "../CustomInput"
import ItemList from "./ItemList"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"

interface NewInvoiceProps {
  openNewInvoice: boolean
  setOpenNewInvoice: React.Dispatch<React.SetStateAction<boolean>>
}

const NewInvoiceForm = ({ openNewInvoice, setOpenNewInvoice }: NewInvoiceProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <form className="flex flex-col gap-7 [&>div]:flex [&>div:not(:last-child)]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col [&>div>label]:gap-2 [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded">
      <div>
        <p className="text-light-purple font-semibold">Bill From</p>

        <CustomInput label="Street Address" inputType="text" />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <CustomInput label="City" inputType="text" />

          <CustomInput label="Postal Code" inputType="text" />

          <CustomInput label="Country" inputType="text" />
        </div>
      </div>

      <div>
        <p className="text-light-purple font-semibold">Bill To</p>

        <CustomInput label="Client's Name" inputType="text" />

        <CustomInput label="Client's e-mail" inputType="text" />

        <CustomInput label="Street Address" inputType="text" />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <CustomInput label="City" inputType="text" />

          <CustomInput label="Postal Code" inputType="text" />

          <CustomInput label="Country" inputType="text" />
        </div>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          showIcon
          className="bg-dark-blue text-pure-white rounded p-3 w-full border border-transparent hover:border-light-purple transition duration-150 ease-in-out outline-0"
        />

        <CustomInput label="Payment Terms" inputType="text" />

        <CustomInput label="Project Description" inputType="text" />
      </div>

      <ItemList />
      <div className="flex flex-row justify-between">
        <button
          type="button"
          className="bg-dark-blue rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
        >
          Discard
        </button>
        <div className="self-end">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setOpenNewInvoice(!openNewInvoice)}
              className="bg-strong-blue rounded-3xl  transition duration-150 ease-in-out py-1.5 px-6 font-semibold leading-9 hover:bg-dark-blue"
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="bg-light-purple transition duration-150 ease-in-out rounded-3xl py-1.5 px-5 font-semibold hover:bg-hover-purple leading-9"
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewInvoiceForm
