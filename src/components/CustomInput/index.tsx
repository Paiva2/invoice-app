import { GlobalContext } from "@/context/GlobalContext"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { tv } from "tailwind-variants"

const invoiceLabelTheme = tv({
  base: "min-h-[6.875rem] gap-2 flex flex-col",
  variants: {
    theme: {
      dark: "text-pure-white",
      light: "text-dark-blue",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

const invoiceFormThemeInput = tv({
  base: "border p-3 rounded text-pure-white border-transparent hover:border-light-purple transition duration-150 ease-in-out focus:outline-0",
  variants: {
    theme: {
      dark: "bg-dark-blue text-pure-white",
      light: "bg-pure-white text-dark-blue border border-gray-300",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

interface CustomPropsInterface {
  label: string
  inputType: string
  registerName: string
}

const CustomInput = ({
  label,
  inputType,
  registerName,
}: CustomPropsInterface) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const { colorTheme } = useContext(GlobalContext)

  const isLightTheme = colorTheme === "light"

  return (
    <label
      className={invoiceLabelTheme({
        theme: isLightTheme ? "light" : "dark",
      })}
    >
      {label}
      <input
        {...register(registerName)}
        type={inputType}
        className={invoiceFormThemeInput({
          theme: isLightTheme ? "light" : "dark",
          className: "w-full",
        })}
      />
      {errors[registerName] && (
        <p className="text-xs text-light-red mt-1">
          {errors[registerName]?.message?.toString()}
        </p>
      )}
    </label>
  )
}

export default CustomInput
