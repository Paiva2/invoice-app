import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/token"

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string
  }
}

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
      const { sub } = await verifyJWT<{ sub: string }>(token)

      response.headers.set("X-USER-ID", sub)

      return ((req as AuthenticatedRequest).user = { id: sub })
    }
  } catch (error) {
    redirectToLogin = true

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "noauth" })}`, req.url)
    )
  }

  const authUser = (req as AuthenticatedRequest).user

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "noauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    )
  }

  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/invoices", req.url))
  }

  return response
}

export const config = {
  matcher: ["/api", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
