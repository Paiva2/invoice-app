import React, { useContext } from "react"
import InvoiceTypePin from "../InvoiceTypePin"
import { GlobalContext } from "@/context/GlobalContext"
import { InvoiceSchema } from "../../../types"
import { useMutation, useQueryClient } from "react-query"
import { api } from "@/lib/api"

interface InvoiceInformationProps {
  invoice: InvoiceSchema
}

const InvoiceInformationTopBar = ({ invoice }: InvoiceInformationProps) => {
  const { openInvoiceForm, setOpenInvoiceForm } = useContext(GlobalContext)

  const queryClient = useQueryClient()

  const editInvoice = useMutation({
    mutationFn: (editInvoice: InvoiceSchema) => {
      return api.patch("/edit-invoice", {
        invoice: editInvoice,
        action: "mark-as-paid"
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries("singleInvoice")

      setOpenInvoiceForm(false)
    },
  })

  async function handleMarkAsPaid() {
    editInvoice.mutateAsync(invoice)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="bg-dark-blue p-8 rounded-lg flex justify-between items-center">
        <div className="flex items-baseline gap-8">
          <p className="text-sm">Status</p>

          <InvoiceTypePin type={invoice.status ?? "draft"} />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
            className="bg-strong-blue px-6 py-[.7rem] pt-[1rem] rounded-full transition duration-300 ease-in-out font-semibold hover:bg-pure-white hover:text-strong-blue"
            type="button"
          >
            Edit
          </button>
          <button
            className="bg-light-red px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-fade-red"
            type="button"
          >
            Delete
          </button>

          {invoice.status !== "paid" && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-light-purple px-6 py-[.7rem] rounded-full transition duration-300 ease-in-out font-semibold flex text-center hover:bg-hover-purple"
              type="button"
            >
              Mark as Paid
            </button>

          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceInformationTopBar
