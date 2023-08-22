"use client"

import ArrowDown from "@/icons/ArrowDown"
import PlusSymbol from "@/icons/PlusSymbol"
import React, { MouseEvent, useContext, useState } from "react"
import NewInvoiceForm from "../NewInvoiceForm"
import { tv as tailwindVariants } from "tailwind-variants"
import { GlobalContext } from "@/context/GlobalContext"

const filterVisibility = tailwindVariants({
  base: "absolute rounded-lg gap-2.5 flex flex-col transition-all delay-100 ease-in-out w-[60%] left-0 md:left-[-50px] top-[60px] py-5 px-7 md:w-full [&>li>label]:flex [&>li>label]:gap-3 [&>li>label]:items-baseline font-semibold shadowForLight",
  variants: {
    visibility: {
      visible: "opacity-100 visible",
      hidden: "opacity-0 invisible",
    },
    theme: {
      dark: "bg-strong-blue text-pure-white",
      light: "bg-pure-white text-dark-blue",
    },
  },
  defaultVariants: {
    visibility: "hidden",
  },
})

export const arrowRotation = tailwindVariants({
  base: "transition delay-70 ease-in-out",
  variants: {
    arrowRotate: {
      rotate: "rotate-180",
      normal: "rotate-0",
    },
  },
  defaultVariants: {
    arrowRotate: "normal",
  },
})

export const filterTextTheme = tailwindVariants({
  base: "flex items-baseline [&>svg]:transition [&>svg]:delay-100 [&>svg]:ease-in-out gap-2.5 font-bold text-sm",
  variants: {
    theme: {
      dark: "text-pure-white",
      light: "text-dark-blue",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

const FilterBar = () => {
  const {
    selectedFilters,
    openInvoiceForm,
    invoices,
    colorTheme,
    setSelectedFilter,
    setOpenInvoiceForm,
  } = useContext(GlobalContext)

  const [openFilterBar, setOpenFilterBar] = useState(false)
  const isLightTheme = colorTheme === "light"

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
    <div className="flex flex-col w-[75%] max-w-[55rem] md:w-[90%]">
      <div className="flex items-baseline justify-between w-full">
        <div
          className={`flex flex-col gap-2 md:gap-0 text-${
            isLightTheme ? "dark-blue" : "pure-white"
          }`}
        >
          <h1 className="text-4xl font-bold md:text-[1.25rem]">Invoices</h1>
          <p className="text-sm font-light">
            <span className="md:hidden">There are</span>{" "}
            {invoices?.invoices.length} total invoices
          </p>
        </div>

        <div className="flex items-center gap-5 relative">
          <button
            type="button"
            onClick={() => setOpenFilterBar(!openFilterBar)}
            className={filterTextTheme({
              theme: isLightTheme ? "light" : "dark",
            })}
          >
            Filter <span className="md:hidden">by status</span>{" "}
            <span
              className={arrowRotation({
                arrowRotate: openFilterBar ? "rotate" : "normal",
              })}
            >
              <ArrowDown />
            </span>
          </button>

          <ul
            className={filterVisibility({
              visibility: openFilterBar ? "visible" : "hidden",
              theme: isLightTheme ? "light" : "dark",
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
                      value={filter.toLowerCase()}
                    />
                    {filter}
                  </label>
                </li>
              )
            })}
          </ul>
          <button
            onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
            type="button"
            className="shadowForLight flex items-baseline gap-3 bg-light-purple py-2 px-3 duration-[.3s] ease-in-out rounded-full hover:bg-hover-purple"
          >
            <span className="bg-pure-white grid items-center p-3 rounded-full">
              <PlusSymbol />
            </span>
            <span>
              New <span className="md:hidden">invoice</span>
            </span>
          </button>
        </div>
      </div>
      {openInvoiceForm && (
        <div
          onClick={() => setOpenInvoiceForm(!openInvoiceForm)}
          className="absolute w-[calc(100%-6.875rem)] h-full left-[6.875rem] top-0 bg-[rgba(0,0,0,0.6)] lg:w-full lg:left-0 lg:z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[50%] h-full overflow-y-auto animate-open-edit lg:w-full"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold">New Invoice</h2>
              <NewInvoiceForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
