"use client"

import SidebarMenu from "@/components/SidebarMenu"
import "./globals.css"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { NextAuthProvider } from "./providers"
import GlobalStorage from "@/context/GlobalContext"
import { QueryClient, QueryClientProvider } from "react-query"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  fallback: ["system-ui", "Roboto", "Helvetica", "Arial"],
  variable: "--font-spartan",
  weight: ["400", "500", "600", "700"],
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: true,
    },
  },
})

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Invoice App Home",
}

interface RootLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang="en-US">
      <body
        suppressHydrationWarning
        className={`${leagueSpartan.className} flex`}
      >
        <GlobalStorage>
          <SessionProvider>
            <QueryClientProvider client={queryClient}>
              <div className="flex w-full lg:flex-col relative h-screen">
                <SidebarMenu />
                <NextAuthProvider>{children}</NextAuthProvider>
              </div>
            </QueryClientProvider>
          </SessionProvider>
        </GlobalStorage>
      </body>
    </html>
  )
}
