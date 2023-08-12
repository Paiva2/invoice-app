"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { JWTPayload, decodeJwt } from "jose"
import Cookies from "js-cookie"

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
}

export const GlobalContext = createContext<GlobalContextInterface>({} as any)

const GlobalStorage = ({ children }: Props) => {
  const [userInformations, setUserInformations] = useState<{
    id: JWTPayload | string
  }>({
    id: "",
  })

  useEffect(() => {
    const authToken = Cookies.get("invoice-app-auth")

    if (authToken) {
      const claimUserId = decodeJwt(authToken)

      setUserInformations({ id: claimUserId })
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
