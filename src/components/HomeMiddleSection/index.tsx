"use client"

import React, { useContext, useEffect } from "react"
import FilterBar from "../FilterBar"
import Invoice from "./Invoice"
import PagesContainer from "../PagesContainer"
import { GlobalContext } from "@/context/GlobalContext"
import axios from "axios"

const HomeMiddleSection = () => {
  const { setUserInformations, userInformations } = useContext(GlobalContext)

  useEffect(() => {
    console.log(userInformations.id)
    axios
      .post("/api/invoices", { id: userInformations.id })
      .then((response) => console.log(response.data))
  }, [userInformations])

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
