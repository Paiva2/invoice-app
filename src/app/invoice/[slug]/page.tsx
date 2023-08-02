import InvoiceTypePin from "@/components/InvoiceTypePin"
import PagesContainer from "@/components/PagesContainer"
import ArrowLeft from "@/icons/ArrowLeft"
import Link from "next/link"
import React from "react"

const InvoiceInformations = () => {
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

        <div className="flex flex-col gap-2.5">
          <div className="bg-dark-blue p-8 rounded-lg flex justify-between items-center">
            <div className="flex items-baseline gap-8">
              <p className="text-sm">Status</p>

              <InvoiceTypePin type="paid" />
            </div>

            <div className="flex items-center gap-2.5">
              <button
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
      </div>
    </PagesContainer>
  )
}

export default InvoiceInformations
