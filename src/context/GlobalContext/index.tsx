"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { JWTPayload, decodeJwt } from "jose"
import Cookies from "js-cookie"
import { InvoiceItemList } from "../../../types"

interface Props {
  children: React.ReactNode
}

interface GlobalContextInterface {
  userInformations: {
    id: string | JWTPayload
  }
  setUserInformations: Dispatch<
    SetStateAction<{
      id: JWTPayload | string
    }>
  >
  itemFromListValues: InvoiceItemList[]
  setItemFromListValues: Dispatch<SetStateAction<InvoiceItemList[]>>

  itemListSchema: InvoiceItemList

  selectedFilters: string[]
  setSelectedFilter: Dispatch<SetStateAction<string[]>>
}

export const GlobalContext = createContext<GlobalContextInterface>({} as any)

const itemListSchema = {
  id: "1",
  name: "New Item",
  quantity: "1",
  price: 0,
}

const GlobalStorage = ({ children }: Props) => {
  const [userInformations, setUserInformations] = useState<{
    id: JWTPayload | string
  }>({
    id: "",
  })

  const [itemFromListValues, setItemFromListValues] = useState([itemListSchema])
  const [selectedFilters, setSelectedFilter] = useState<string[]>([])

  useEffect(() => {
    const authToken = Cookies.get("invoice-app-auth")

    if (authToken) {
      const claimUserId = decodeJwt(authToken)

      const userId = claimUserId.id as string

      setUserInformations({ id: userId })
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        userInformations,
        itemFromListValues,
        itemListSchema,
        selectedFilters,
        setSelectedFilter,
        setUserInformations,
        setItemFromListValues,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStorage
