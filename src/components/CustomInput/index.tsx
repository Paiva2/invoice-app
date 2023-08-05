import React from "react"

interface CustomPropsInterface {
  label: string
  inputType: string
  customClass?: string
}

const CustomInput = ({
  label,
  inputType,
  customClass = "",
}: CustomPropsInterface) => {
  return (
    <label
      className={`${
        customClass && customClass
      } [&>input]:border [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0`}
    >
      {label}
      <input type={inputType} className="w-full" />
    </label>
  )
}

export default CustomInput
