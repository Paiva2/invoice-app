import InvoiceTypePin from "@/components/InvoiceTypePin"
import ArrowRight from "@/icons/ArrowRight"
import React from "react"

interface Props {
  type: "pending" | "draft" | "paid"
}

const Invoice = ({ type }: Props) => {
  return (
    <div className="w-[100%] flex flex-col bg-strong-blue rounded-lg p-4 cursor-pointer border-[1px] border-transparent transition duration-300 ease-in-out hover:border-light-purple">
      <div className="w-full flex justify-between items-center p-2.5 gap-2.5">
        <div className="flex items-center gap-5 text-base">
          <p className="font-bold">
            <span className="text-[#7e88c3]">#</span>XM9141
          </p>
          <span className="text-sm">Due 31 july 2023</span>
        </div>

        <div className="text-base">Alex Grim</div>

        <div className="flex gap-5 items-center">
          <span className="text-xl font-semibold">$556.00</span>
          <InvoiceTypePin type={type} />
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Invoice
