"use client"

import InvoiceTypePin from "@/components/InvoiceTypePin"
import ArrowRight from "@/icons/ArrowRight"
import React from "react"
import dayjs from "dayjs"
import getInvoiceTotalSum from "@/utils/getInvoiceTotalSum"
import { InvoiceSchema } from "../../../../types"
import { useRouter } from "next/navigation"

interface Props {
  userInvoice: InvoiceSchema
}

const Invoice = ({ userInvoice }: Props) => {
  const dueDate = new Date(userInvoice?.invoiceDateTo)

  const formatDate = dayjs(dueDate).format("DD/MMM/YYYY").split("/")

  const route = useRouter()

  const handleGoToFeedback = (id: string) => {
    route.push(`/invoice/${id}`)
  }

  return (
    <div
      onClick={() => handleGoToFeedback(userInvoice.id)}
      className="w-[100%] flex flex-col bg-dark-blue rounded-lg p-4 cursor-pointer border-[1px] border-transparent transition duration-300 ease-in-out hover:border-light-purple"
    >
      <div className="w-full flex justify-between items-center p-2.5 gap-2.5 [&>div]:w-[calc(100%/3)]">
        <div className="flex items-center gap-5 text-base">
          <p className="font-bold flex-1">
            <span className="text-hash-blue">#</span>
            {userInvoice.id}
          </p>
          <span className="text-sm w-[50%]">
            Due{" "}
            {formatDate.map((date, idx) => (
              <span key={idx}>{date} </span>
            ))}
          </span>
        </div>

        <div className="text-base break-words text-center">
          {userInvoice?.clientNameTo}
        </div>

        <div className="flex gap-5 items-center">
          <span className="text-xl font-semibold w-[50%] break-words">
            {getInvoiceTotalSum(userInvoice.itemList)}
          </span>
          <InvoiceTypePin type={userInvoice.status ?? "pending"} />
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Invoice
