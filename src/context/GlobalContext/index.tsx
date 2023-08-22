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
import { InvoiceItemList, InvoiceSchema, UserInvoice } from "../../../types"
import { usePathname } from "next/navigation"
import { api } from "@/lib/api"
import { useQuery } from "react-query"

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

  colorTheme: string
  setColorTheme: Dispatch<SetStateAction<string>>

  userTotalBalance: number
  setUserTotalBalance: Dispatch<SetStateAction<number>>

  loadingInvoices: boolean

  isLoading: boolean
  invoices:
    | {
        invoices: InvoiceSchema[]
        userTotalBalance: string
      }
    | undefined
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
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [userTotalBalance, setUserTotalBalance] = useState(0)

  const currentPage = usePathname()
  const authToken = Cookies.get("invoice-app-auth")

  const [colorTheme, setColorTheme] = useState("")

  function getUserToken() {
    if (!authToken) return

    const claimUserId = decodeJwt(authToken)

    const userId = claimUserId.id as string

    setUserInformations({ id: userId, authorized: true })
  }

  useLayoutEffect(() => {
    getUserToken()
  }, [currentPage])

  useLayoutEffect(() => {
    if (!localStorage) return

    const isThemeAlreadyChosen =
      localStorage.getItem("invoice-app-theme") ?? "dark"

    setColorTheme(isThemeAlreadyChosen)

    if (colorTheme === "dark") {
      document.body.style.backgroundColor = "#141625"
    } else {
      document.body.style.backgroundColor = "#f8f8fb"
    }
  }, [currentPage, colorTheme])

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["getUserHomeInformations"],

    queryFn: async () => {
      setLoadingInvoices(true)

      const response = await api.post<UserInvoice>("/invoices", {
        id: userInformations.id,
      })

      const sortInvoicesByDate =
        response.data?.userInformations.userInvoices.sort((a, b) => {
          return +new Date(b.invoiceDateTo) - +new Date(a.invoiceDateTo)
        })

      setLoadingInvoices(false)

      return {
        invoices: sortInvoicesByDate,
        userTotalBalance: response.data?.userInformations.informations,
      }
    },

    enabled: userInformations.authorized,
  })

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
        invoices,
        isLoading,
        loadingInvoices,
        colorTheme,
        userTotalBalance,
        setUserTotalBalance,
        setColorTheme,
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
