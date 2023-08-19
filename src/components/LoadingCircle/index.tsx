import React from "react"
import { tv } from "tailwind-variants"

export const circleSize = tv({
  base: "loader animate-loading-circle rounded-full w-10 h-10",
  variants: {
    visibility: {
      buttonLoading: "w-[25px] h-[25px] border-pink-200",
      screenLoading: "w-10 h-10",
    },
  },
})

const LoadingCircle = ({
  loadingType = "screenLoading",
}: {
  loadingType?: "screenLoading" | "buttonLoading"
}) => {
  return (
    <div className="flex items-center w-full h-full inset-0 z-100">
      <div
        className={circleSize({
          visibility: loadingType,
        })}
      />
    </div>
  )
}

export default LoadingCircle
