"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { JWTPayload, decodeJwt } from "jose"
import Cookies from "js-cookie"
import { InvoiceItemList, InvoiceSchema } from "../../../types"

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

  invoiceBeingVisualized: InvoiceSchema[]
  setInvoiceBeingVisualized: Dispatch<SetStateAction<InvoiceSchema[]>>

  openInvoiceForm: boolean
  setOpenInvoiceForm: Dispatch<SetStateAction<boolean>>

  dueDate: Date
  setDueDate: Dispatch<SetStateAction<Date>>
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
  const [openInvoiceForm, setOpenInvoiceForm] = useState(false)
  const [selectedFilters, setSelectedFilter] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [invoiceBeingVisualized, setInvoiceBeingVisualized] = useState([
    {},
  ] as InvoiceSchema[])

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
        invoiceBeingVisualized,
        openInvoiceForm,
        dueDate,
        setDueDate,
        setOpenInvoiceForm,
        setInvoiceBeingVisualized,
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
