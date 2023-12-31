import getInvoiceTotalSum from "@/utils/getInvoiceTotalSum"
import getSingleTotalSum from "@/utils/getSingleTotalSum"
import { priceFormatter } from "@/utils/priceFormatter"
import React from "react"

interface AmountTableProps {
  itemList: {
    id: string
    invoiceId: string
    name: string
    quantity: string
    price: number
  }[]
}

const AmountTable = ({ itemList }: AmountTableProps) => {
  return (
    <div className="flex flex-col md:min-w-[350px]">
      <div className="flex items-center justify-center bg-dark-blue max-h-[15rem] overflow-y-auto pt-10 px-2 pb-10 w-full flex-col rounded-t-lg text-white">
        <table className="border-0 border-collapse border-spacing-[3px] w-full">
          <thead className="[&>th]:border-0 [&>th]:p-10">
            <tr className="[&>th]:font-normal">
              <th>Item name</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="[&>td]:border-0 [&>td]:text-center [&>td]:w-1/4 [&>td]:font-semibold [&>td]:break-all [&>td]:pt-5"
                >
                  <td>{item.name}</td>
                  <td>{Number(item.quantity)}</td>
                  <td>{priceFormatter.format(Number(item.price))}</td>
                  <td>
                    {getSingleTotalSum(Number(item.quantity), item.price ?? 0)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-spacial-dark p-6 rounded-b-lg text-white">
        <div className="w-full h-full flex items-center justify-between break-all">
          <span className="text-sm">Amount Due</span>
          <h2 className="font-bold text-3xl">{getInvoiceTotalSum(itemList)}</h2>
        </div>
      </div>
    </div>
  )
}

export default AmountTable
