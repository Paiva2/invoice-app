"use client"

import ArrowDown from "@/icons/ArrowDown"
import PlusSymbol from "@/icons/PlusSymbol"
import React, { MouseEvent, useState } from "react"
import NewInvoiceForm from "../NewInvoiceForm"
import { tv as tailwindVariants } from "tailwind-variants"

const filterVisibility = tailwindVariants({
  base: "absolute bg-strong-blue rounded-lg gap-2.5 flex flex-col transition-all delay-100 ease-in-out left-[-15%] top-full py-5 px-7 w-[65%] [&>li>label]:flex [&>li>label]:gap-3 [&>li>label]:items-baseline font-semibold shadow-[0px_10px_20px_0px_rgba(0,0,0,.25)]",
  variants: {
    visibility: {
      visible: "opacity-100 visible",
      hidden: "opacity-0 invisible",
    },
  },
  defaultVariants: {
    visibility: "hidden",
  },
})

const FilterBar = () => {
  const [openNewInvoice, setOpenNewInvoice] = useState(false)
  const [openFilterBar, setOpenFilterBar] = useState(false)
  const [selectedFilters, setSelectedFilter] = useState<string[]>([])
  const filtersTypes = ["Draft", "Pending", "Paid"]

  const getSelectedFilters = (e: MouseEvent<HTMLInputElement>) => {
    const filterValue = e.currentTarget.value

    if (e.currentTarget.checked) {
      setSelectedFilter((oldValue) => [...oldValue, filterValue])
    } else {
      const removeFilter = selectedFilters.filter(
        (filters) => filters !== filterValue
      )

      setSelectedFilter(removeFilter)
    }
  }

  return (
    <div className="flex flex-col w-[45%]">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Invoices</h1>
          <p className="text-sm font-light">There are 7 total invoices</p>
        </div>
        <div className="flex items-center gap-5 relative">
          <button
            type="button"
            onClick={() => setOpenFilterBar(!openFilterBar)}
            className={`flex items-baseline [&>svg]:transition [&>svg]:delay-100 [&>svg]:ease-in-out gap-2.5 font-bold text-sm [&>svg]:${
              openFilterBar ? "rotate-180" : "rotate-0"
            }`}
          >
            Filter by status <ArrowDown />
          </button>

          <ul
            className={filterVisibility({
              visibility: openFilterBar ? "visible" : "hidden",
            })}
          >
            {filtersTypes.map((filter) => {
              return (
                <li key={filter}>
                  <label>
                    <input
                      onClick={getSelectedFilters}
                      className="w-4 h-4 accent-light-purple cursor-pointer"
                      type="checkbox"
                      value={filter}
                    />
                    {filter}
                  </label>
                </li>
              )
            })}
          </ul>
          <button
            onClick={() => setOpenNewInvoice(!openNewInvoice)}
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
      {openNewInvoice && (
        <div
          onClick={() => setOpenNewInvoice(!openNewInvoice)}
          className="absolute w-[calc(100%-6.875rem)] h-full left-[6.875rem] top-0 bg-[rgba(0,0,0,0.6)]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[40%] h-full overflow-y-auto animate-open-edit"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold">New Invoice</h2>
              <NewInvoiceForm
                openNewInvoice={openNewInvoice}
                setOpenNewInvoice={setOpenNewInvoice}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
