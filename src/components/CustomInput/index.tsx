import React from "react"
import { useFormContext } from "react-hook-form"
interface CustomPropsInterface {
  label: string
  inputType: string
  customClass?: string
  registerName: string
}

const CustomInput = ({
  label,
  inputType,
  customClass = "",
  registerName,
}: CustomPropsInterface) => {
  const { register } = useFormContext()

  return (
    <label
      className={`${
        customClass && customClass
      } [&>input]:border [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0`}
    >
      {label}
      <input {...register(registerName)} type={inputType} className="w-full" />
    </label>
  )
}

export default CustomInput
