"use client"

import InvoiceTypePin from "@/components/InvoiceTypePin"
import ArrowRight from "@/icons/ArrowRight"
import React from "react"
import { InvoiceSchema } from "../../../../types"
import { priceFormatter } from "@/utils/priceFormatter"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import getInvoiceTotalSum from "@/utils/getInvoiceTotalSum"

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
      <div className="w-full flex justify-between items-center p-2.5 gap-2.5">
        <div className="flex items-center gap-5 text-base">
          <p className="font-bold">
            <span className="text-hash-blue">#</span>
            {userInvoice.id}
          </p>
          <span className="text-sm">
            Due{" "}
            {formatDate.map((date) => (
              <span>{date} </span>
            ))}
          </span>
        </div>

        <div className="text-base">{userInvoice?.clientNameTo}</div>

        <div className="flex gap-5 items-center">
          <span className="text-xl font-semibold">
            {getInvoiceTotalSum(userInvoice.itemList)}
          </span>
          <InvoiceTypePin type={userInvoice.status} />
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Invoice
