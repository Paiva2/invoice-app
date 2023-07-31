import ArrowDown from "@/icons/ArrowDown"
import PlusSymbol from "@/icons/PlusSymbol"
import React from "react"

const FilterBar = () => {
  return (
    <div className="flex flex-col w-[40%] py-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Invoices</h1>
          <p className="text-sm font-light">There are 7 total invoices</p>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex items-baseline gap-2.5 font-bold text-sm"
          >
            Filter by status <ArrowDown />
          </button>
          <button
            type="button"
            className="flex items-baseline gap-3 bg-light-purple py-2 px-3 duration-[.3s] ease-in-out rounded-full hover:bg-hover-purple"
          >
            <span className="bg-pure-white grid items-center p-3 rounded-full">
              <PlusSymbol />
            </span>
            <span>New invoice</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
