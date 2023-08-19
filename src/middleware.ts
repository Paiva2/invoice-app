import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/token"

let redirectToLogin = false

export async function middleware(req: NextRequest) {
  let token: string | undefined

  if (req.cookies.has("invoice-app-auth")) {
    token = req.cookies.get("invoice-app-auth")?.value
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7)
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return

  if (!token && req.nextUrl.pathname.startsWith("/invoice")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token && req.nextUrl.pathname.startsWith("/invoices")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const response = NextResponse.next()

  try {
    if (token) {
      const { id } = await verifyJWT<{ id: string }>(token)

      response.headers.set("X-USER-ID", id)
    }
  } catch (error) {
    redirectToLogin = true

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "noauth" })}`, req.url)
    )
  }

  if (req.url.includes("/login") && token) {
    return NextResponse.redirect(new URL("/invoices", req.url))
  }

  return response
}

export const config = {
  matcher: [
    "/invoice/:slug*",
    "/login",
    "/register",
    "/forgot-password",
    "/invoices",
  ],
}
