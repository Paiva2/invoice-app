"use client"

import {
  Dispatch,
  SetStateAction,
  createContext,
  useLayoutEffect,
  useState,
} from "react"
import { JWTPayload, decodeJwt } from "jose"
import Cookies from "js-cookie"
import { InvoiceItemList, InvoiceSchema } from "../../../types"
import { usePathname } from "next/navigation"

interface Props {
  children: React.ReactNode
}

interface GlobalContextInterface {
  userInformations: {
    id: string | JWTPayload
    authorized: boolean
  }
  setUserInformations: Dispatch<
    SetStateAction<{
      id: JWTPayload | string
      authorized: boolean
    }>
  >

  itemFromListValues: InvoiceItemList[]
  setItemFromListValues: Dispatch<SetStateAction<InvoiceItemList[]>>

  itemListSchema: InvoiceItemList

  selectedFilters: string[]
  setSelectedFilter: Dispatch<SetStateAction<string[]>>

  invoiceBeingVisualized: InvoiceSchema
  setInvoiceBeingVisualized: Dispatch<SetStateAction<InvoiceSchema>>

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
    authorized: boolean
  }>({
    id: "",
    authorized: false,
  })

  const [itemFromListValues, setItemFromListValues] = useState([itemListSchema])
  const [openInvoiceForm, setOpenInvoiceForm] = useState(false)
  const [selectedFilters, setSelectedFilter] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [invoiceBeingVisualized, setInvoiceBeingVisualized] = useState(
    {} as InvoiceSchema
  )

  const currentPage = usePathname()
  const authToken = Cookies.get("invoice-app-auth")

  function getUserToken() {
    if (!authToken) return

    const claimUserId = decodeJwt(authToken)

    const userId = claimUserId.id as string

    setUserInformations({ id: userId, authorized: true })
  }

  useLayoutEffect(() => {
    getUserToken()
  }, [currentPage])

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
