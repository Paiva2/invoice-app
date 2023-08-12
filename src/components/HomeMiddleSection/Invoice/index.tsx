import InvoiceTypePin from "@/components/InvoiceTypePin"
import ArrowRight from "@/icons/ArrowRight"
import React from "react"
import { InvoiceSchema } from "../../../../types"
import { priceFormatter } from "@/utils/priceFormatter"

interface Props {
  userInvoice: InvoiceSchema
}

const Invoice = ({ userInvoice }: Props) => {
  const dueDate = new Date(userInvoice?.invoiceDateTo)

  const totalPrice = userInvoice.itemList.reduce(
    (acc, item) => (acc += item.total),
    0
  )

  const dueDay = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    month: "short",
    year: "numeric",
  }).format(dueDate)

  return (
    <div className="w-[100%] flex flex-col bg-dark-blue rounded-lg p-4 cursor-pointer border-[1px] border-transparent transition duration-300 ease-in-out hover:border-light-purple">
      <div className="w-full flex justify-between items-center p-2.5 gap-2.5">
        <div className="flex items-center gap-5 text-base">
          <p className="font-bold">
            <span className="text-hash-blue">#</span>XM9141
          </p>
          <span className="text-sm">Due {dueDay}</span>
        </div>

        <div className="text-base">{userInvoice?.clientNameTo}</div>

        <div className="flex gap-5 items-center">
          <span className="text-xl font-semibold">
            {priceFormatter.format(totalPrice)}
          </span>
          <InvoiceTypePin type={userInvoice.status} />
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Invoice
