"use client"

import InvoiceTypePin from "@/components/InvoiceTypePin"
import ArrowRight from "@/icons/ArrowRight"
import React, { useContext } from "react"
import dayjs from "dayjs"
import getInvoiceTotalSum from "@/utils/getInvoiceTotalSum"
import { InvoiceSchema } from "../../../../types"
import { useRouter } from "next/navigation"
import { tv } from "tailwind-variants"
import { GlobalContext } from "@/context/GlobalContext"

const invoiceThemeColor = tv({
  base: "shadowForLight w-[100%] flex flex-col bg-dark-blue rounded-lg p-4 cursor-pointer border-[1px] border-transparent transition duration-300 ease-in-out hover:border-light-purple",
  variants: {
    theme: {
      dark: "bg-strong-blue text-pure-white",
      light: "bg-pure-white text-dark-blue",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

interface Props {
  userInvoice: InvoiceSchema
}

const Invoice = ({ userInvoice }: Props) => {
  const { colorTheme } = useContext(GlobalContext)

  const dueDate = new Date(userInvoice?.invoiceDateTo)

  const formatDate = dayjs(dueDate).format("DD/MMM/YYYY").split("/")

  const route = useRouter()

  const handleGoToFeedback = (id: string) => {
    route.push(`/invoice/${id}`)
  }

  const isLightTheme = colorTheme === "light"

  return (
    <div
      onClick={() => handleGoToFeedback(userInvoice.id)}
      className={invoiceThemeColor({
        theme: isLightTheme ? "light" : "dark",
      })}
    >
      <div className="w-full flex justify-between items-center p-2.5 gap-2.5 [&>div]:w-[calc(100%/3)] md:[&>div]:w-[calc(100%/2)]">
        <div className="flex items-center gap-5 text-base md:flex-col md:w-full sm:gap-2.5">
          <p className="font-bold flex-1 md:w-full sm:text-sm">
            <span className="text-hash-blue">#</span>
            {userInvoice.id}
          </p>
          <span className="text-sm w-[50%] md:w-full sm:text-sm">
            Due{" "}
            {formatDate.map((date, idx) => (
              <span key={idx}>{date} </span>
            ))}
          </span>

          <span className="hidden text-xl font-semibold w-[50%] break-words md:flex md:w-full">
            {getInvoiceTotalSum(userInvoice.itemList)}
          </span>
        </div>

        <div className="text-base break-words text-center md:hidden">
          {userInvoice?.clientNameTo}
        </div>

        <div className="flex gap-5 items-center md:flex-col md:w-[30%!important] md:h-full md:justify-between">
          <span className="text-xl font-semibold w-[50%] break-words md:hidden">
            {getInvoiceTotalSum(userInvoice.itemList)}
          </span>
          <div className="hidden text-base break-words text-center md:flex sm:text-sm">
            {userInvoice?.clientNameTo}
          </div>
          <span>
            <InvoiceTypePin type={userInvoice.status ?? "pending"} />
          </span>
          <span className="md:hidden">
            <ArrowRight />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Invoice
