import ArrowRight from "@/icons/ArrowRight"
import React from "react"
import { tv as tailwindVariants } from "tailwind-variants"

interface Props {
  type: "pending" | "draft" | "paid"
}

const typePin = tailwindVariants({
  base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
  variants: {
    type: {
      paid: "before:bg-strong-emerald before:rounded-full bg-transparent-emerald text-strong-emerald",
      pending:
        "before:bg-strong-orange before:rounded-full bg-transparent-orange text-strong-orange",
      draft:
        "before:bg-pure-white before:rounded-full bg-transparent-white text-pure-white",
    },
  },
  defaultVariants: {
    type: "pending",
  },
})

const Invoice = ({ type }: Props) => {
  return (
    <div className="w-[100%] flex flex-col bg-strong-blue rounded-lg p-5 cursor-pointer border-[1px] border-transparent transition duration-300 ease-in-out hover:border-light-purple">
      <div className="w-full flex justify-between items-baseline p-2.5 gap-2.5">
        <div className="flex items-center gap-5 text-base">
          <p className="font-bold">
            <span className="text-[#7e88c3]">#</span>XM9141
          </p>
          <span className="text-sm">Due 31 july 2023</span>
        </div>

        <div className="text-base">Alex Grim</div>

        <div className="flex gap-5 items-baseline">
          <span className="text-xl font-semibold">$556.00</span>
          <p
            className={typePin({
              type: type,
              className:
                "flex justify-center items-baseline gap-2 py-1.5 pt-2.5 px-2.5 min-w-[6.25rem] rounded-md font-semibold before:inline-block before:w-2 before:h-2",
            })}
          >
            Paid
          </p>
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Invoice
