"use client"

import React, { useContext, useState } from "react"
import InvoiceTypePin from "../InvoiceTypePin"
import { GlobalContext } from "@/context/GlobalContext"
import { InvoiceSchema } from "../../../types"
import { useMutation, useQueryClient } from "react-query"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { tv } from "tailwind-variants"

const invoiceTopbarTheme = tv({
  base: "shadowForLight p-8 rounded-lg flex justify-between items-center",
  variants: {
    theme: {
      dark: "bg-strong-blue",
      light: "bg-pure-white",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

const confirmDeleteModalTheme = tv({
  base: "shadowForLight w-[40%] relative h-[35%] rounded-lg transition-all delay-100 ease-in-out overflow-y-auto animate-open-edit lg:w-[50%] md:w-[80%!important] sm:h-[auto]",
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

interface InvoiceInformationProps {
  invoice: InvoiceSchema
}

const InvoiceInformationTopBar = ({ invoice }: InvoiceInformationProps) => {
  const {
    openInvoiceForm,
    setOpenInvoiceForm,
    userInformations,
    colorTheme,
    userTotalBalance,
  } = useContext(GlobalContext)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const isLightTheme = colorTheme === "light"

  const queryClient = useQueryClient()
  const router = useRouter()

  const editInvoice = useMutation({
    mutationFn: (editInvoice: InvoiceSchema) => {
      return api.patch("/edit-invoice", {
        invoice: editInvoice,
        userId: userInformations.id,
        action: "mark-as-paid",
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries("singleInvoice")

      queryClient.invalidateQueries("getUserInformations")

      queryClient.invalidateQueries("getUserHomeInformations")

      setOpenInvoiceForm(false)
    },
  })

  const deleteInvoice = useMutation({
    mutationFn: (invoiceId: string) => {
      return api.delete("/delete-invoice", { data: { invoiceId: invoiceId } })
    },

    onSuccess: () => {
      queryClient.invalidateQueries("getUserHomeInformations")

      router.push("/invoices")

      setOpenInvoiceForm(false)
    },
  })

  async function handleMarkAsPaid() {
    editInvoice.mutateAsync(invoice)
  }

  async function handleOpenConfirmDelete() {
    setOpenDeleteModal(!openDeleteModal)
  }

  async function handleDeleteInvoice() {
    deleteInvoice.mutateAsync(invoice.id)
  }

  const totalInvoiceValue = invoice.itemList.reduce((acc, invoice) => {
    return (acc += Number(invoice.price))
  }, 0)

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className={invoiceTopbarTheme({
          theme: isLightTheme ? "light" : "dark",
        })}
      >
        <div className="flex items-baseline gap-8 sm:w-full sm:justify-between">
          <p
            className={`text-sm text-${
              isLightTheme ? "dark-blue" : "pure-white"
            }`}
          >
            Status
          </p>

          <InvoiceTypePin type={invoice.status ?? "draft"} />
        </div>

        <div className="flex items-center gap-2.5 sm:absolute sm:bottom-[.3125rem] sm:w-full sm:justify-center sm:right-0">
          <button
            onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
            className="bg-dark-blue px-6 py-[.7rem] pt-[1rem] rounded-full transition duration-300 ease-in-out font-semibold hover:bg-pure-white hover:text-strong-blue"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={handleOpenConfirmDelete}
            className="bg-light-red px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-fade-red"
            type="button"
          >
            Delete
          </button>

          {invoice.status !== "paid" && (
            <div className="flex flex-col">
              <button
                disabled={totalInvoiceValue > userTotalBalance}
                onClick={handleMarkAsPaid}
                className="bg-light-purple px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-hover-purple disabled:bg-slate-500"
                type="button"
              >
                Mark as Paid
              </button>
            </div>
          )}
        </div>
      </div>
      {openDeleteModal && (
        <div
          onClick={() => setOpenInvoiceForm(!openDeleteModal)}
          className="absolute flex items-center justify-center z-20 w-[calc(100vw-6.75rem)] h-full left-[6.75rem] inset-0 bg-[rgba(0,0,0,0.6)] lg:left-0 lg:w-screen lg:z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={confirmDeleteModalTheme({
              theme: isLightTheme ? "light" : "dark",
            })}
          >
            <div className="w-full p-6 gap-7 flex flex-col px-10  py-10">
              <h2 className="text-4xl font-semibold text-center sm:text-2xl">
                Confirm Delete
              </h2>

              <p className="text-[#888eb0] sm:text-sm">
                Are you sure you want to delete invoice #{invoice.id}? This
                action cannot be undone.
              </p>

              <div className="flex self-end gap-5 sm:self-center text-pure-white">
                <button
                  onClick={() => setOpenDeleteModal(!openDeleteModal)}
                  className="bg-dark-blue px-6 py-[.7rem] pt-[1rem] rounded-full transition duration-300 ease-in-out font-semibold hover:bg-pure-white hover:text-strong-blue"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteInvoice}
                  className="bg-light-red leading-[1.8125rem] px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-fade-red"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceInformationTopBar
