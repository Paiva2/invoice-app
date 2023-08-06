import { tv as tailwindVariants } from "tailwind-variants"

export const arrowRotation = tailwindVariants({
  base: "transition delay-70 ease-in-out",
  variants: {
    arrowRotate: {
      rotate: "rotate-180",
      normal: "rotate-0",
    },
  },
  defaultVariants: {
    arrowRotate: "normal",
  },
})
