"use client"

import React, { useLayoutEffect } from "react"
import { RedirectIcon } from "@/icons/RedirectIcon"
import Link from "next/link"
import { api } from "@/lib/api"
import triggerToastSucess, {
  triggerToastError,
  triggerToastWarning,
} from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AxiosError } from "axios"
import ToastifyContainer from "../ToastifyContainer"
import { signIn, signOut, useSession } from "next-auth/react"
import { RegisterSchemaInterface } from "../../../types"

const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid e-mail type!" })
      .min(1, { message: "Can't be empty!" }),
    password: z.string().min(1, { message: "Can't be empty!" }),
    username: z.string().min(1, { message: "Can't be empty!" }),
    confirmPassword: z.string().min(1, { message: "Can't be empty!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  })

export type NewRegisterType = z.infer<typeof registerSchema>

const RegisterModal = () => {
  const session = useSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewRegisterType>({
    resolver: zodResolver(registerSchema),
  })

  async function handleFetchRegister(registerBody: RegisterSchemaInterface) {
    try {
      await api.post("/register", registerBody)

      triggerToastSucess("Register successfull!")

      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          triggerToastError("All fields must be filled!")
        } else if (error.response?.status === 409) {
          triggerToastWarning("E-mail already registered!")
        }
      }

      console.error("There was an error logging in...")
    } finally {
      signOut({
        redirect: false,
      })
    }
  }

  async function handleRegisterNewUser(data: NewRegisterType) {
    const registerBody = {
      email: data.email,
      username: data.username,
      password: data.password,
    }

    handleFetchRegister(registerBody)
  }

  async function handleRegisterWithProvider() {
    const registerBody = {
      email: session.data?.user?.email as string,
      username: session?.data?.user?.name as string,
      image: session.data?.user?.image,
      provider: "github",
      password: null,
    }

    handleFetchRegister(registerBody)
  }

  useLayoutEffect(() => {
    if (session.status === "authenticated") {
      handleRegisterWithProvider()
    }
  }, [session])

  return (
    <div className="w-full h-screen flex items-center justify-center lg:pt-5 lg:pb-5 md:overflow-auto">
      <div className="w-2/5 bg-strong-blue p-8 rounded-xl transition-all delay-100 ease-in-out lg:w-[90%] md:px-10 md:py-10 md:overflow-auto md:h-full">
        <h1 className="text-4xl font-medium text-pure-white md:text-[1.5rem]">
          Register
        </h1>
        <p className="text-hash-blue">Welcome!</p>

        <div className="my-5">
          <button
            onClick={() => signIn("github")}
            className="w-full py-3 my-3 border flex space-x-2 items-center justify-center border-light-purple rounded-lg transition delay-70 ease-in-out text-pure-white  hover:bg-hover-purple"
          >
            <img
              src="https://www.svgrepo.com/show/361182/github-inverted.svg"
              className="w-7 h-7"
              alt=""
            />{" "}
            <span className="font-semibold mt-1">Sign up with Github</span>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleRegisterNewUser)} className="mt-10">
          <div className="flex flex-col space-y-5">
            <label>
              <p className="font-medium text-pure-white pb-2">Email address</p>
              <input
                {...register("email", { required: true })}
                type="email"
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
              <p className="font-medium text-pure-white pb-2">Username</p>
              <input
                {...register("username", { required: true })}
                type="text"
                className="w-full py-3 text-pure-white border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-sm text-light-red mt-1">
                  {errors.username.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-medium text-pure-white pb-2">Password</p>
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-light-red mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>
            <label>
              <p className="font-medium text-pure-white pb-2">
                Confirm password
              </p>
              <input
                {...register("confirmPassword", { required: true })}
                type="password"
                className="w-full text-pure-white py-3 border border-transparent hover:border-light-purple bg-dark-blue rounded-lg px-3 focus:outline-none focus:border-light-purple"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-light-red mt-1">
                  {errors.confirmPassword.message}
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
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center disabled:bg-dark-blue"
            >
              <span>Register</span>
            </button>
            <p className="text-center text-pure-white md:mt-[40px!important]">
              Already registered?{" "}
              <a
                href="/login"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                SignIn
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

export default RegisterModal
