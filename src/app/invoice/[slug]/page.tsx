"use client"

import AmountTable from "@/components/AmountTable"
import EditInvoiceForm from "@/components/EditInvoiceForm"
import InvoiceInformationTopBar from "@/components/InvoiceInformationTopBar"
import PagesContainer from "@/components/PagesContainer"
import ArrowLeft from "@/icons/ArrowLeft"
import Link from "next/link"
import React, { useState } from "react"

const InvoiceInformations = () => {
  const [openEditInvoice, setOpenEditInvoice] = useState(false)

  return (
    <PagesContainer>
      <div className="flex flex-col w-[45%] justify-center gap-5">
        <Link
          href="/"
          className="flex items-baseline gap-3 cursor-pointer font-semibold text-base hover:text-[#888eb0]"
        >
          <ArrowLeft />
          <p>Go back</p>
        </Link>

        <InvoiceInformationTopBar
          openEditInvoice={openEditInvoice}
          setOpenEditInvoice={setOpenEditInvoice}
          type="paid"
        />

        <div className="bg-dark-blue p-8 rounded-lg flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="text-sm">
              <p className="font-bold">
                <span className="text-hash-blue">#</span>XM9141
              </p>
              <p>Graphic Design</p>
            </div>

            <div className="flex flex-col text-sm">
              <p>19 Union Terrace</p>
              <p>London</p>
              <p>E1 3EZ</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div className="flex gap-10 justify-between flex-wrap">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <p className="text-sm">Invoice Date</p>
                <h2 className="font-bold text-xl">20 Aug 2021</h2>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Payment Due</p>
                <h2 className="font-bold text-xl">19 Sep 2021</h2>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <p className="text-sm">Bill To</p>
                <h2 className="font-bold text-xl">Alex Grim</h2>
              </div>
              <div className="flex flex-col text-sm">
                <p>84 Church Way</p>
                <p>Bradford</p>
                <p>BD1 9PB</p>
                <p>United Kingdom</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm">Sent To</p>
              <h2 className="font-bold text-xl">alexgrim@mail.com</h2>
            </div>
          </div>
          <AmountTable />
        </div>
      </div>
      {openEditInvoice && (
        <div
          onClick={() => setOpenEditInvoice(!openEditInvoice)}
          className={`absolute w-[calc(100%-6.875rem)] h-full left-[6.875rem] top-0 bg-[rgba(0,0,0,0.6)]`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[40%] h-full overflow-y-auto animate-open-edit"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold">
                Edit <span className="text-hash-blue">#</span>XM9141
              </h2>
              <EditInvoiceForm
                openEditInvoice={openEditInvoice}
                setOpenEditInvoice={setOpenEditInvoice}
              />
            </div>
          </div>
        </div>
      )}
    </PagesContainer>
  )
}

export default InvoiceInformations
