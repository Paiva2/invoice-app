"use client"

import React, { useContext } from "react"
import FilterBar from "../FilterBar"
import Invoice from "./Invoice"
import PagesContainer from "../PagesContainer"
import { GlobalContext } from "@/context/GlobalContext"

const HomeMiddleSection = () => {
  const { setUserInformtions, userInformations } = useContext(GlobalContext)

  return (
    <PagesContainer>
      <FilterBar />

      <div className="flex flex-col w-[45%] gap-3.5">
        <Invoice type="paid" />
        <Invoice type="pending" />
        <Invoice type="draft" />
      </div>
    </PagesContainer>
  )
}

export default HomeMiddleSection
