"use client"
import SidebarMenu from "@/components/SidebarMenu"
import "./globals.css"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { NextAuthProvider } from "./providers"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  fallback: ["system-ui", "Roboto", "Helvetica", "Arial"],
  variable: "--font-spartan",
  weight: ["400", "500", "600", "700"],
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
      <body suppressHydrationWarning className={`${leagueSpartan.className} flex`}>
        <SessionProvider>
          <SidebarMenu />
          <NextAuthProvider>{children}</NextAuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
