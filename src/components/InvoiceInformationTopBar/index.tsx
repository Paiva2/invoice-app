import React, { useContext } from "react"
import InvoiceTypePin from "../InvoiceTypePin"
import { GlobalContext } from "@/context/GlobalContext"

interface InvoiceInformationProps {
  type: "paid" | "pending" | "draft"
}

const InvoiceInformationTopBar = ({ type }: InvoiceInformationProps) => {
  const { openInvoiceForm, setOpenInvoiceForm } = useContext(GlobalContext)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="bg-dark-blue p-8 rounded-lg flex justify-between items-center">
        <div className="flex items-baseline gap-8">
          <p className="text-sm">Status</p>

          <InvoiceTypePin type={type} />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
            className="bg-strong-blue px-6 py-[.7rem] pt-[1rem] rounded-full transition duration-300 ease-in-out font-semibold hover:bg-pure-white hover:text-strong-blue"
            type="button"
          >
            Edit
          </button>
          <button
            className="bg-light-red px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-fade-red"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceInformationTopBar
