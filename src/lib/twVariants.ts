import { tv } from "tailwind-variants"

export const registerModalTheme = tv({
  base: "w-2/5 p-8 rounded-xl transition-all delay-100 ease-in-out lg:w-[90%] md:px-10 md:py-10 md:overflow-auto md:h-full",
  variants: {
    theme: {
      light: "bg-pure-white",
      dark: "bg-strong-blue",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

export const outSignInLabelsTheme = tv({
  base: "font-medium text-pure-white pb-2",
  variants: {
    theme: {
      light: "text-dark-blue",
      dark: "text-pure-white",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

export const outSignInTitleTheme = tv({
  base: "text-4xl font-medium md:text-[1.5rem]",
  variants: {
    theme: {
      light: "text-dark-blue",
      dark: "text-pure-white",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

export const inputTheme = tv({
  base: "w-full py-3 text-pure-white border hover:border-light-purple rounded-lg px-3 focus:outline-none focus:border-light-purple",
  variants: {
    theme: {
      light: "bg-pure-white text-dark-blue",
      dark: "bg-dark-blue border-transparent text-pure-white",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

export const loginGithubTheme = tv({
  base: "w-full py-3 my-3 flex space-x-2 text-pure-white items-center justify-center rounded-lg transition delay-70 ease-in-out hover:bg-hover-purple",
  variants: {
    theme: {
      light: "bg-light-purple",
      dark: "bg-light-purple",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})
