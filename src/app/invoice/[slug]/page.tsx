"use client"

import AmountTable from "@/components/AmountTable"
import EditInvoiceForm from "@/components/EditInvoiceForm"
import InvoiceInformationTopBar from "@/components/InvoiceInformationTopBar"
import PagesContainer from "@/components/PagesContainer"
import ArrowLeft from "@/icons/ArrowLeft"
import Link from "next/link"
import React, { useContext, useState } from "react"
import { InvoiceSchema } from "../../../../types"
import { useQuery } from "react-query"
import { api } from "@/lib/api"
import dayjs from "dayjs"
import { GlobalContext } from "@/context/GlobalContext"
import LoadingCircle from "@/components/LoadingCircle"
import { Helmet } from "react-helmet"

interface SingleInvoice {
  params: {
    slug: string
  }
}

const InvoiceInformations = ({ params }: SingleInvoice) => {
  const { setInvoiceBeingVisualized, setOpenInvoiceForm, openInvoiceForm } =
    useContext(GlobalContext)

  const [singleInvoiceLoading, setSingleInvoiceLoading] = useState(true)

  const {
    data: invoice = {} as InvoiceSchema,
    isLoading,
    isError,
  } = useQuery(
    "singleInvoice",
    async () => {
      setSingleInvoiceLoading(true)

      const response = await api.post("/invoice", { id: params.slug })

      setInvoiceBeingVisualized(response.data.data)

      setSingleInvoiceLoading(false)

      return response.data.data
    },

    { enabled: !!params.slug }
  )

  if (isLoading || isError) return

  const dueDate = new Date(invoice.invoiceDateTo)
  const creationDate = new Date(invoice.createdAt)

  const formatDueDate = dayjs(dueDate).format("DD/MMM/YYYY").split("/")
  const formatCreationDate = dayjs(creationDate)
    .format("DD/MMM/YYYY")
    .split("/")

  if (singleInvoiceLoading || isLoading) {
    return (
      <PagesContainer>
        <LoadingCircle />
      </PagesContainer>
    )
  }

  return (
    <PagesContainer>
      <Helmet>
        <title>Invoice | {invoice.id}</title>
      </Helmet>
      <div className="flex flex-col w-[65%] justify-center gap-5 lg:w-[90%]">
        <Link
          href="/"
          className="flex items-baseline gap-3 cursor-pointer font-semibold text-base hover:text-[#888eb0]"
        >
          <ArrowLeft />
          <p>Go back</p>
        </Link>

        <InvoiceInformationTopBar invoice={invoice} />

        <div className="bg-dark-blue p-8 rounded-lg flex flex-col gap-8 md:overflow-x-auto">
          <div className="flex justify-between">
            <div className="text-sm">
              <p className="font-bold">
                <span className="text-hash-blue">#</span>
                {invoice?.id}
              </p>
              <p>{invoice?.projectDescriptionTo}</p>
            </div>

            <div className="flex flex-col text-sm">
              <p>{invoice.streetFrom}</p>
              <p>{invoice.countryFrom}</p>
              <p>{invoice.postalCodeFrom}</p>
              <p>{invoice.cityFrom}</p>
            </div>
          </div>

          <div className="flex gap-10 justify-between flex-wrap break-words md:flex-col md:break-all">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <p className="text-sm">Invoice Date</p>
                <h2 className="font-bold text-xl">
                  {formatCreationDate.map((date, idx) => (
                    <span key={idx}>{date} </span>
                  ))}
                </h2>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Payment Due</p>
                <h2 className="font-bold text-xl">
                  {" "}
                  {formatDueDate.map((date, idx) => (
                    <span key={idx}>{date} </span>
                  ))}
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <p className="text-sm">Bill To</p>
                <h2 className="font-bold text-xl">{invoice?.clientNameTo}</h2>
              </div>
              <div className="flex flex-col text-sm">
                <p>{invoice.streetTo}</p>
                <p>{invoice.countryTo}</p>
                <p>{invoice.postalCodeTo}</p>
                <p>{invoice.cityTo}</p>
              </div>
            </div>

            <div className="flex flex-col max-w[12.5rem]">
              <p className="text-sm">Sent To</p>
              <h2 className="font-bold text-xl">{invoice?.clientEmailTo}</h2>
            </div>
          </div>
          <AmountTable itemList={invoice.itemList} />
        </div>
      </div>
      {openInvoiceForm && (
        <div
          onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
          className="absolute z-20 w-[calc(100vw-6.75rem)] h-full left-[6.75rem] inset-0 bg-[rgba(0,0,0,0.6)] lg:left-0 lg:w-screen lg:z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[40%] relative transition-all delay-100 ease-in-out h-full overflow-y-auto animate-open-edit lg:w-[100%]"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold">
                Edit <span className="text-hash-blue">#</span>
                {invoice.id}
              </h2>
              <EditInvoiceForm />
            </div>
          </div>
        </div>
      )}
    </PagesContainer>
  )
}

export default InvoiceInformations
