"use client"

import { RedirectIcon } from "@/icons/RedirectIcon"
import { AxiosError } from "axios"
import Link from "next/link"
import React, { useContext, useLayoutEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { triggerToastError } from "@/utils/toast"
import { api } from "@/lib/api"
import ToastifyContainer from "../ToastifyContainer"
import { useSession, signIn, signOut } from "next-auth/react"
import { LoginSchemaInterface } from "../../../types"
import { GlobalContext } from "@/context/GlobalContext"
import {
  inputTheme,
  loginGithubTheme,
  outSignInTitleTheme,
} from "@/lib/twVariants"
import GithubIcon from "@/icons/GithubIcon"

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty!" })
    .email({ message: "Invalid e-mail type!" }),
  password: z.string().min(1, { message: "Can't be empty!" }),
})

export type NewLoginType = z.infer<typeof loginFormSchema>

const LoginModal = () => {
  const session = useSession()

  const { colorTheme } = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewLoginType>({
    resolver: zodResolver(loginFormSchema),
  })

  const route = useRouter()

  async function fetchLogin(loginSchema: LoginSchemaInterface) {
    try {
      const response = await api.post("/login", loginSchema)

      if (response.status === 200) {
        route.push("/invoices")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          triggerToastError("Invalid username or password!")

          signOut({
            redirect: false,
          })
        }
      }
      console.error("There was an error logging in...")
    }
  }

  function handleLogin(data: NewLoginType) {
    const loginSchema = {
      email: data.email,
      password: data.password,
    }

    fetchLogin(loginSchema)
  }

  function handleLoginWithProvider() {
    const loginSchemaWithProvider = {
      email: session.data?.user?.email as string,
      password: null,
      provider: "github",
    }

    fetchLogin(loginSchemaWithProvider)
  }

  useLayoutEffect(() => {
    if (session.status === "authenticated") {
      handleLoginWithProvider()
    }
  }, [session])

  const isLightTheme = colorTheme === "light"

  return (
    <div className="w-full h-screen flex items-center justify-center shadowForLight">
      <div
        className={`shadowForLight w-2/5 bg-${
          isLightTheme ? "pure-white" : "strong-blue"
        } p-8 rounded-xl lg:w-[90%]`}
      >
        <h1
          className={outSignInTitleTheme({
            theme: isLightTheme ? "light" : "dark",
          })}
        >
          Login
        </h1>
        <p className="text-hash-blue">Welcome!</p>

        <div className="my-5">
          <button
            onClick={() => signIn("github")}
            className={loginGithubTheme({
              theme: isLightTheme ? "light" : "dark",
            })}
          >
            <GithubIcon />
            <span className="font-semibold mt-1 text-pure-white">
              Login with Github
            </span>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="my-10">
          <div className="flex flex-col space-y-5">
            <label>
              <p
                className={`font-medium text-${
                  isLightTheme ? "dark-blue" : "pure-white"
                } pb-2`}
              >
                Email address
              </p>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-light-red mt-1">
                  {errors.email.message}
                </p>
              )}
            </label>
            <label>
              <p
                className={`font-medium text-${
                  isLightTheme ? "dark-blue" : "pure-white"
                } pb-2`}
              >
                Password
              </p>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-light-red mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>
            <div>
              <Link
                href="/forgot-password"
                className="font-medium text-light-purple"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              disabled={isSubmitting}
              className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center disabled:bg-dark-blue"
            >
              <span>Login</span>
            </button>
            <p
              className={`text-center text-${
                isLightTheme ? "dark-blue" : "pure-white"
              }`}
            >
              Not registered yet?{" "}
              <a
                href="/register"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                <span>Register now</span>
                <span>
                  <RedirectIcon />
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastifyContainer />
    </div>
  )
}

export default LoginModal
