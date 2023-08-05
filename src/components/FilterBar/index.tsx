"use client"

import ArrowDown from "@/icons/ArrowDown"
import PlusSymbol from "@/icons/PlusSymbol"
import React, { useState } from "react"
import NewInvoiceForm from "../NewInvoiceForm"

const FilterBar = () => {
  const [openNewInvoice, setOpenNewInvoice] = useState(false)

  return (
    <div className="flex flex-col w-[45%]">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Invoices</h1>
          <p className="text-sm font-light">There are 7 total invoices</p>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex items-baseline gap-2.5 font-bold text-sm"
          >
            Filter by status <ArrowDown />
          </button>
          <button
            onClick={() => setOpenNewInvoice(!openNewInvoice)}
            type="button"
            className="flex items-baseline gap-3 bg-light-purple py-2 px-3 duration-[.3s] ease-in-out rounded-full hover:bg-hover-purple"
          >
            <span className="bg-pure-white grid items-center p-3 rounded-full">
              <PlusSymbol />
            </span>
            <span>New invoice</span>
          </button>
        </div>
      </div>
      {openNewInvoice && (
        <div
          onClick={() => setOpenNewInvoice(!openNewInvoice)}
          className={`absolute w-[calc(100%-6.875rem)] h-full left-[6.875rem] top-0 bg-[rgba(0,0,0,0.6)]`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[40%] h-full overflow-y-auto animate-open-edit"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold">New Invoice</h2>
              <NewInvoiceForm
                openNewInvoice={openNewInvoice}
                setOpenNewInvoice={setOpenNewInvoice}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
