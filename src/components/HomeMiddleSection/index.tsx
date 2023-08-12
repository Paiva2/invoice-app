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
  } = useQuery<UserInvoice>(
    "userInvoices",
    async () => {
      const response = await api.post("/invoices", { id: userInformations.id })

      return response.data
    },

    { enabled: !!userInformations.id }
  )

  if (isLoading || isError) return

  return (
    <PagesContainer>
      <FilterBar />

      <div className="flex flex-col w-[45%] gap-3.5">
        {invoices?.userInvoices?.map((invoice) => {
          return <Invoice key={invoice.id} userInvoice={invoice} />
        })}
      </div>
    </PagesContainer>
  )
}

export default HomeMiddleSection
