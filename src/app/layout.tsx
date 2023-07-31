import "./globals.css"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  )
}
