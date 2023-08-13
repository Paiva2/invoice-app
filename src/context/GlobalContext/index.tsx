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
  itemFromListValues: InvoiceItemList[]
  setItemFromListValues: Dispatch<SetStateAction<InvoiceItemList[]>>

  setUserInformations: Dispatch<
    SetStateAction<{
      id: JWTPayload | string
    }>
  >
  itemListSchema: InvoiceItemList
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

  useEffect(() => {
    const authToken = Cookies.get("invoice-app-auth")

    if (authToken) {
      const claimUserId = decodeJwt(authToken)

      setUserInformations({ id: claimUserId.id })
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        userInformations,
        itemFromListValues,
        itemListSchema,
        setUserInformations,
        setItemFromListValues,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStorage
