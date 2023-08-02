import React from "react"

const AmountTable = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-strong-blue pt-10 px-2 pb-10 w-full flex-col rounded-t-lg">
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
            <tr className="[&>td]:border-0 [&>td]:text-center [&>td]:w-1/4 [&>td]:font-semibold [&>td]:break-all  [&>td]:pt-5">
              <td>Banner Design</td>
              <td>1</td>
              <td>$156.00</td>
              <td>$156.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-spacial-dark p-6 rounded-b-lg">
        <div className="w-full h-full flex items-center justify-between">
          <span className="text-sm">Amount Due</span>
          <h2 className="font-bold text-3xl">$556.00</h2>
        </div>
      </div>
    </div>
  )
}

export default AmountTable
