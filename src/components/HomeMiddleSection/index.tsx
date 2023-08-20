"use client"

import React, { useContext, useState } from "react"
import FilterBar from "../FilterBar"
import Invoice from "./Invoice"
import PagesContainer from "../PagesContainer"
import { GlobalContext } from "@/context/GlobalContext"
import { api } from "@/lib/api"
import { useQuery } from "react-query"
import { InvoiceSchema } from "../../../types"
import { priceFormatter } from "@/utils/priceFormatter"
import LoadingCircle from "../LoadingCircle"

interface UserInvoice {
  userInformations: {
    userInvoices: Array<InvoiceSchema>
    informations: string
  }
}

const HomeMiddleSection = () => {
  const { userInformations, selectedFilters } = useContext(GlobalContext)
  const [loadingInvoices, setLoadingInvoices] = useState(true)

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["getUserHomeInformations"],

    queryFn: async () => {
      setLoadingInvoices(true)

      const response = await api.post<UserInvoice>("/invoices", {
        id: userInformations.id,
      })

      const sortInvoicesByDate =
        response.data?.userInformations.userInvoices.sort((a, b) => {
          return +new Date(b.invoiceDateTo) - +new Date(a.invoiceDateTo)
        })

      setLoadingInvoices(false)

      return {
        invoices: sortInvoicesByDate,
        userTotalBalance: response.data?.userInformations.informations,
      }
    },

    enabled: userInformations.authorized,
  })

  if (!invoices || isLoading) return

  const filteredInvoices = invoices.invoices?.filter((invoice) => {
    return selectedFilters.includes(invoice.status ?? "")
  })

  let renderFilteredInvoices = []

  if (selectedFilters.length) {
    renderFilteredInvoices = filteredInvoices
  } else {
    renderFilteredInvoices = invoices.invoices
  }

  const totalPending = invoices.invoices.reduce((acc, invoice) => {
    invoice.itemList.forEach((item) => {
      if (invoice.status === "pending") {
        return (acc += Number(item.price))
      }
    })

    return acc
  }, 0)

  if (loadingInvoices)
    return (
      <PagesContainer>
        <LoadingCircle />
      </PagesContainer>
    )

  return (
    <PagesContainer>
      <FilterBar />
      <div className="flex flex-col w-[75%] gap-3.5 max-w-[55rem] h-[80vh] overflow-y-auto pr-3">
        {renderFilteredInvoices?.map((invoice) => {
          return <Invoice key={invoice.id} userInvoice={invoice} />
        })}
        <div className="text-center flex gap-5 self-end">
          <div>
            <h1 className="text-xl font-bold">Total balance</h1>
            <p
              className={`text-[1.25rem] font-light ${
                +invoices?.userTotalBalance < 0
                  ? "text-red-500"
                  : "text-green-500"
              } `}
            >
              {priceFormatter.format(Number(invoices?.userTotalBalance))}
            </p>
          </div>
          <div>
            <h1 className="text-xl font-bold">Total pending</h1>
            <p className="text-[1.25rem] font-light text-red-500">
              {priceFormatter.format(totalPending)}
            </p>
          </div>
        </div>
      </div>
    </PagesContainer>
  )
}

export default HomeMiddleSection
