"use client"

import React, { useContext, useLayoutEffect } from "react"
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
import {
  inputTheme,
  loginGithubTheme,
  outSignInLabelsTheme,
  outSignInTitleTheme,
  registerModalTheme,
} from "@/lib/twVariants"
import { GlobalContext } from "@/context/GlobalContext"
import GithubIcon from "@/icons/GithubIcon"

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
  const { colorTheme } = useContext(GlobalContext)

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

  const isLightTheme = colorTheme === "light"

  return (
    <div className="w-full h-screen flex items-center justify-center lg:pt-5 lg:pb-5 md:overflow-auto">
      <div
        className={registerModalTheme({
          theme: isLightTheme ? "light" : "dark",
        })}
      >
        <h1
          className={outSignInTitleTheme({
            theme: isLightTheme ? "light" : "dark",
          })}
        >
          Register
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
            <span className="font-semibold mt-1">Sign up with Github</span>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleRegisterNewUser)} className="mt-10">
          <div className="flex flex-col space-y-5">
            <label>
              <p
                className={outSignInLabelsTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
              >
                Email address
              </p>
              <input
                {...register("email", { required: true })}
                type="email"
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
                className={outSignInLabelsTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
              >
                Username
              </p>
              <input
                {...register("username", { required: true })}
                type="text"
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-sm text-light-red mt-1">
                  {errors.username.message}
                </p>
              )}
            </label>
            <label>
              <p
                className={outSignInLabelsTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
              >
                Password
              </p>
              <input
                {...register("password", { required: true })}
                type="password"
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
            <label>
              <p
                className={outSignInLabelsTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
              >
                Confirm password
              </p>
              <input
                {...register("confirmPassword", { required: true })}
                type="password"
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
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
            <p
              className={`text-center text-${
                isLightTheme ? "dark-blue" : "pure-white"
              } md:mt-[40px!important]`}
            >
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
