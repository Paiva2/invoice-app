"use client"

import React, { useContext } from "react"
import FilterBar from "../FilterBar"
import Invoice from "./Invoice"
import PagesContainer from "../PagesContainer"
import { GlobalContext } from "@/context/GlobalContext"
import { priceFormatter } from "@/utils/priceFormatter"
import LoadingCircle from "../LoadingCircle"
import Placeholder from "@/icons/Placeholder"
import { Helmet } from "react-helmet"

const HomeMiddleSection = () => {
  const { selectedFilters, invoices, loadingInvoices, isLoading, colorTheme } =
    useContext(GlobalContext)

  const isLightTheme = colorTheme === "light"

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
      <Helmet>
        <title>Home | Invoices</title>
      </Helmet>
      <FilterBar />
      <div className="flex flex-col w-[75%] gap-3.5 max-w-[55rem] h-[80vh] overflow-y-auto pr-3 md:w-[90%] lg:h-auto md:pr-0">
        {renderFilteredInvoices?.map((invoice) => {
          return <Invoice key={invoice.id} userInvoice={invoice} />
        })}
        {!renderFilteredInvoices.length && (
          <div className="flex flex-col w-full items-center justify-center h-full gap-5">
            <Placeholder />
            <p className="text-[1.5625rem] text-pure-white font-semibold">
              There is nothing here
            </p>

            <p className="text-[#888eb0] text-center text-sm">
              Create an invoice by clicking the
              <br /> <span className="font-semibold">New Invoice</span> button
              and get started
            </p>
          </div>
        )}
        <div
          className={`text-center  text-${
            isLightTheme ? "dark-blue" : "pure-white"
          } flex gap-5 self-end`}
        >
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
