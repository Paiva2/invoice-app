import React from "react"
import FilterBar from "../FilterBar"
import ArrowRight from "@/icons/ArrowRight"
import { tv as tailwindVariants } from "tailwind-variants"
import Invoice from "./Invoice"

const HomeMiddleSection = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center text-pure-white">
      <FilterBar />

      <div className="flex flex-col w-[45%] gap-3.5">
        <Invoice type="paid" />
        <Invoice type="pending" />
        <Invoice type="draft" />
      </div>
    </div>
  )
}

export default HomeMiddleSection
