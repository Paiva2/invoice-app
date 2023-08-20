"use client"

import { RedirectIcon } from "@/icons/RedirectIcon"
import { AxiosError } from "axios"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { triggerToastError } from "@/utils/toast"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { api } from "@/lib/api"

const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid e-mail type!" })
    .min(1, { message: "Can't be empty!" }),
  password: z.string().min(1, { message: "Can't be empty!" }),
})

export type NewLoginType = z.infer<typeof loginFormSchema>

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewLoginType>({
    resolver: zodResolver(loginFormSchema),
  })

  const route = useRouter()

  async function handleLogin(data: NewLoginType) {
    const loginSchema = {
      email: data.email,
      password: data.password,
    }

    try {
      const response = await api.post("/api/login", loginSchema)

      if (response.status === 200) {
        route.push("/invoices")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          triggerToastError("Invalid username or password!")
        }
      }
      console.error("There was an error logging in...")
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-2/5 bg-strong-blue p-8 rounded-xl">
        <h1 className="text-4xl font-medium text-pure-white">Login</h1>
        <p className="text-hash-blue">Welcome!</p>

        <div className="my-5">
          <button className="w-full py-3 my-3 border flex space-x-2 items-center justify-center border-light-purple rounded-lg transition delay-70 ease-in-out text-pure-white  hover:bg-hover-purple">
            <img
              src="https://www.svgrepo.com/show/361182/github-inverted.svg"
              className="w-7 h-7"
              alt=""
            />{" "}
            <span className="font-semibold mt-1">Login with Github</span>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="my-10">
          <div className="flex flex-col space-y-5">
            <label>
              <p className="font-medium text-pure-white pb-2">Email address</p>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="w-full py-3 text-pure-white border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-light-red mt-1">
                  {errors.email.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-medium text-pure-white pb-2">Password</p>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-light-red mt-1">
                  Password can't be empty.
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
              className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center"
            >
              <span>Login</span>
            </button>
            <p className="text-center text-pure-white">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                <span>Register now</span>
                <span>
                  <RedirectIcon />
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginModal
