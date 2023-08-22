"use client"

import { RedirectIcon } from "@/icons/RedirectIcon"
import { api } from "@/lib/api"
import triggerToastSucess, {
  triggerToastError,
  triggerToastWarning,
} from "@/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import Link from "next/link"
import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ToastifyContainer from "../ToastifyContainer"
import { GlobalContext } from "@/context/GlobalContext"
import {
  inputTheme,
  outSignInLabelsTheme,
  outSignInTitleTheme,
} from "@/lib/twVariants"

const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Can't be empty!" })
      .email({ message: "Invalid e-mail type!" }),
    password: z.string().min(1, { message: "Can't be empty!" }),
    confirmPassword: z.string().min(1, { message: "Can't be empty!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  })

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordModal = () => {
  const { colorTheme } = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleChangePassword = async (data: ForgotPasswordType) => {
    try {
      const updatePasswordResponse = await api.patch("/forgot-password", {
        email: data.email,
        password: data.password,
      })

      if (updatePasswordResponse.status === 200) {
        triggerToastSucess("Password updated successfully!")

        reset()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          triggerToastError("All fields must be filled!")
        } else if (error.response?.status === 409) {
          triggerToastWarning("E-mail not found!")
        }
      }
    }
  }

  const isLightTheme = colorTheme === "light"

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
          Forgot your Password?
        </h1>

        <form onSubmit={handleSubmit(handleChangePassword)} className="my-10">
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
                className={outSignInLabelsTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
              >
                New Password
              </p>
              <input
                type="password"
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
                placeholder="Enter your password"
                {...register("password", { required: true })}
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
                Confirm new password
              </p>
              <input
                type="password"
                className={inputTheme({
                  theme: isLightTheme ? "light" : "dark",
                })}
                placeholder="Confirm your password"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-light-red mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 transition delay-70 ease-in-out font-medium text-pure-white bg-light-purple hover:bg-hover-purple rounded-lg inline-flex space-x-2 items-center justify-center disabled:bg-dark-blue"
            >
              <span>Send</span>
            </button>

            <p
              className={`text-center text-${
                isLightTheme ? "dark-blue" : "pure-white"
              }`}
            >
              Already registered?{" "}
              <Link
                href="/login"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                SignIn
                <span>
                  <RedirectIcon />
                </span>
              </Link>
            </p>

            <p
              className={`text-center text-${
                isLightTheme ? "dark-blue" : "pure-white"
              }`}
            >
              Not registered yet?{" "}
              <Link
                href="/register"
                className="text-light-purple font-medium inline-flex space-x-1 items-center hover:text-hover-purple"
              >
                Register now
                <span>
                  <RedirectIcon />
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastifyContainer />
    </div>
  )
}

export default ForgotPasswordModal
