import React from "react"

interface CustomPropsInterface {
  label: string
  inputType: string
}

const CustomInput = ({ label, inputType }: CustomPropsInterface) => {
  return (
    <label className="[&>input]:border [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0">
      {label}
      <input type={inputType} />
    </label>
  )
}

export default CustomInput
