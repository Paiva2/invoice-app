"use client"

import React, { useContext } from "react"
import FilterBar from "../FilterBar"
import Invoice from "./Invoice"
import PagesContainer from "../PagesContainer"
import { GlobalContext } from "@/context/GlobalContext"
import { api } from "@/lib/api"
import { useQuery } from "react-query"
import { InvoiceSchema } from "../../../types"
interface UserInvoice {
  status: string
  userInvoices: Array<InvoiceSchema>
}

const HomeMiddleSection = () => {
  const { userInformations } = useContext(GlobalContext)

  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<UserInvoice>({
    queryKey: ["getUserInvoices"],

    queryFn: async () => {
      const response = await api.post("/invoices", { id: userInformations.id })

      return response.data
    },

    enabled: !!userInformations.id,
  })

  if (isLoading || isError) return

  return (
    <PagesContainer>
      <FilterBar />
      <div className="flex flex-col w-[75%] gap-3.5 max-w-[55rem] h-[80vh] overflow-y-auto pr-3">
        {invoices?.userInvoices?.map((invoice) => {
          return <Invoice key={invoice.id} userInvoice={invoice} />
        })}
        <div className="text-center flex gap-5 self-end">
          <div>
            <h1 className="text-xl font-bold">Total balance</h1>
            <p className="text-[1.25rem] font-light">$100.00</p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Total pending</h1>
            <p className="text-[1.25rem] font-light">-$100.00</p>
          </div>
        </div>
      </div>
    </PagesContainer>
  )
}

export default HomeMiddleSection
