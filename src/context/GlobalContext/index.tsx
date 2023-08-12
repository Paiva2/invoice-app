"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { decodeJwt } from "jose"
import Cookies from "js-cookie"

interface Props {
  children: React.ReactNode
}

interface GlobalContextInterface {
  userInformations: {
    id: string
  }
  setUserInformations: Dispatch<
    SetStateAction<{
      id: string
    }>
  >
}

export const GlobalContext = createContext<GlobalContextInterface>({} as any)

const GlobalStorage = ({ children }: Props) => {
  const [userInformations, setUserInformations] = useState({
    id: "",
  })

  useEffect(() => {
    const authToken = Cookies.get("invoice-app-auth")

    if (authToken) {
      const claims = decodeJwt(authToken)

      console.log(claims)
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        userInformations,
        setUserInformations,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStorage
