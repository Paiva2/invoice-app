import React from "react"
import { tv } from "tailwind-variants"

export const typePin = tv({
  base: "flex justify-center items-baseline capitalize gap-2 py-1.5 pt-2.5 px-2.5 min-w-[6.25rem] rounded-md font-semibold before:inline-block before:w-2 before:h-2",
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

interface Props {
  type: string
}

const InvoiceTypePin = ({ type }: Props) => {
  return (
    <span
      className={typePin({
        type: type as "pending" | "draft" | "paid",
      })}
    >
      {type}
    </span>
  )
}

export default InvoiceTypePin
