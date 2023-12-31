"use client"

import { GlobalContext } from "@/context/GlobalContext"
import LightIcon from "@/icons/LightIcon"
import Logo from "@/icons/Logo"
import { api } from "@/lib/api"
import axios from "axios"
import React, {
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { UserProfileSchema } from "../../../types"
import { Image as ImageIcon, SignOut } from "@phosphor-icons/react"
import NumberFormatInput from "../NumberFormatInput"
import LoadingCircle from "../LoadingCircle"
import Cookies from "js-cookie"
import { signOut } from "next-auth/react"
import MoonIcon from "@/icons/MoonIcon"
import { tv } from "tailwind-variants"

export const profileThemeColor = tv({
  base: "w-[40%] relative transition-all delay-100 ease-in-out h-full overflow-y-auto animate-open-edit lg:w-[100%]",
  variants: {
    theme: {
      dark: "bg-dark-purple",
      light: "bg-light-bg",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

export const inputsProfileThemeColor = tv({
  base: "flex text-lg flex-col text-pure-white [&>input]:p-2.5 [&>input]:rounded",
  variants: {
    theme: {
      dark: "text-pure-white [&>input]:bg-dark-blue",
      light:
        "text-dark-blue [&>input]:bg-pure-white [&>input]:border [&>input]:border-gray-300",
    },
  },
  defaultVariants: {
    theme: "dark",
  },
})

const SidebarMenu = () => {
  const {
    userInformations,
    colorTheme,
    setUserTotalBalance,
    setColorTheme,
    setUserInformations,
  } = useContext(GlobalContext)

  const [openProfile, setOpenProfile] = useState(false)
  const [totalBalance, setTotalBalance] = useState("")
  const [username, setUsername] = useState("")

  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const [imagePreview, setImagePreview] = useState<File | null>(null)

  const { data: userData, isLoading: loadingProfile } = useQuery({
    queryKey: ["getUserInformations"],

    queryFn: async () => {
      const response = await api.post("/user-informations", {
        id: userInformations.id,
      })

      setUserTotalBalance(response.data.user.totalBalance)

      return response.data
    },

    enabled: !!userInformations.id || openProfile,
  })

  const queryClient = useQueryClient()

  const editUserProfile = useMutation({
    mutationFn: async (data: UserProfileSchema) => {
      const response = await api.patch("/edit-profile", {
        data,
      })

      return response
    },

    onSuccess: async () => {
      queryClient.invalidateQueries("getUserInformations")

      queryClient.invalidateQueries("getUserHomeInformations")

      setImagePreview(null)
    },
  })

  const handleChangeProfile = async (e: FormEvent) => {
    e.preventDefault()

    let responseUpload = null

    if (fileToUpload && imagePreview) {
      const formData = new FormData()
      formData.append("file", fileToUpload ?? "")

      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_WORD ?? ""
      )

      responseUpload = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME}/image/upload`,
        formData
      )
    }

    const newUserData = {
      id: userInformations.id,
      image: responseUpload?.data.url || userData.user.image,
      totalBalance: totalBalance || userData.user.totalBalance,
      username: username || userData.user.username,
    }

    editUserProfile.mutateAsync(newUserData)
  }

  useEffect(() => {
    setTotalBalance(userData?.user?.totalBalance)
    setUsername(userData?.user?.name)
  }, [userData, openProfile])

  function handleLogout() {
    if (!userInformations.authorized && userInformations.id) return

    Cookies.remove("invoice-app-auth")

    setOpenProfile(false)

    setUserInformations({ id: "", authorized: false })

    signOut({
      redirect: true,
      callbackUrl: "/",
    })
  }

  const isAllFieldsFilled = Boolean(totalBalance && username)

  function handleChangeTheme() {
    if (colorTheme === "dark") {
      localStorage.setItem("invoice-app-theme", "light")

      setColorTheme("light")
    } else {
      localStorage.setItem("invoice-app-theme", "dark")

      setColorTheme("dark")
    }
  }

  const isLightTheme = colorTheme === "light"

  return (
    <Fragment>
      <div className="z-50 flex flex-col rounded-r-[20px] border-s-red-700 bg-strong-blue justify-between lg:flex-row lg:h-auto lg:rounded-none">
        <button
          type="button"
          className="group/logo p-[2.5rem] relative bg-light-purple flex items-center justify-center w-full rounded-r-[20px] overflow-hidden [&>svg]:z-20 lg:w-auto sm:p-[1.375rem]"
        >
          <Logo />
          <div className="w-full absolute bottom-0 bg-[#cabff7] h-[50%] opacity-[.3] rounded-tl-[20px] rounded-br-[20px] duration-[.3s] ease-in-out group-hover/logo:h-[90%]" />
        </button>
        <div
          className={`flex ${
            !userInformations.authorized && "pb-10"
          } flex-col gap-[1.875rem] items-center justify-center lg:flex-row lg:w-[20%] sm:w-[35%!important] lg:pb-0`}
        >
          <button
            onClick={handleChangeTheme}
            className="[&>svg]:transition duration-150 ease-in-out fill-[#858BB2] hover:[&>svg]:fill-[#fff] hover:[&>svg>path]:fill-[#fff]"
          >
            {colorTheme === "dark" ? <LightIcon /> : <MoonIcon />}
          </button>
          {userInformations.authorized && (
            <div className="w-full gap-5 flex-col border-t border-[#494e6e] py-[1.5625rem] flex items-center justify-center lg:border-t-0 lg:border-l lg:p-0 lg:h-full lg:gap-3">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                type="button"
              >
                <img
                  className="w-[2.5rem] h-[2.5rem] border-[3px] border-transparent rounded-full transition duration-150 ease-in-out cursor-pointer hover:border-light-purple"
                  src={userData?.user.image}
                />
              </button>
              <button
                onClick={handleLogout}
                type="button"
                className="flex gap-2 sm:hidden"
              >
                <p className="text-light-red hover:underline">Logout</p>
                <span>
                  <SignOut size={20} className="text-light-red" weight="bold" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {openProfile && (
        <div
          onClick={() => setOpenProfile(!openProfile)}
          className="absolute z-20 w-[calc(100vw-6.75rem)] h-full left-[6.75rem] inset-0 bg-[rgba(0,0,0,0.6)] lg:left-0 lg:w-screen lg:z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={profileThemeColor({
              theme: isLightTheme ? "light" : "dark",
            })}
          >
            {loadingProfile && <LoadingCircle />}

            {!loadingProfile && (
              <div className="w-full p-6 gap-7 flex flex-col h-full justify-between">
                <h2
                  className={`text-3xl font-semibold text-${
                    isLightTheme ? "dark-blue" : "pure-white"
                  }`}
                >
                  Edit{" "}
                  <span className="text-hash-blue">{userData?.user.name}</span>{" "}
                  Profile
                </h2>
                <form
                  className="flex flex-col gap-5 justify-between h-full pb-10"
                  onSubmit={handleChangeProfile}
                >
                  <label className="w-[12.5rem] h-[12.5rem] rounded-full self-center overflow-hidden cursor-pointer relative sm:w-[8rem] sm:h-[8rem]">
                    <div className="translateCenter absolute flex items-center justify-center sm:left-[50%] sm:top-[50%] bg-[rgba(0,0,0,0.3)] transition-all delay-75 ease-in-out right-0 left-0 w-full h-[12.5rem] hover:bg-[rgba(0,0,0,0.6)] ">
                      <ImageIcon size={60} color="#c4c4c4" weight="regular" />
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={
                        imagePreview
                          ? URL.createObjectURL(imagePreview)
                          : userData?.user.image
                      }
                    />
                    <input
                      className="hidden"
                      onChange={(e) => {
                        if (!e.target.files) return

                        setFileToUpload(e.target.files[0])

                        setImagePreview(e.target.files[0])
                      }}
                      type="file"
                    />
                  </label>

                  <label
                    className={inputsProfileThemeColor({
                      theme: isLightTheme ? "light" : "dark",
                    })}
                  >
                    E-mail
                    <input
                      disabled
                      defaultValue={userData?.user.email}
                      type="text"
                      className="customInput"
                    />
                  </label>

                  <label
                    className={inputsProfileThemeColor({
                      theme: isLightTheme ? "light" : "dark",
                    })}
                  >
                    Username
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      defaultValue={userData?.user.name}
                      type="text"
                      className="customInput"
                    />
                  </label>

                  <label
                    className={inputsProfileThemeColor({
                      theme: isLightTheme ? "light" : "dark",
                    })}
                  >
                    Manage your total balance
                    <NumberFormatInput
                      onValueChange={(e) => {
                        setTotalBalance(e.formattedValue)
                      }}
                      allowNegative={true}
                      defaultValue={Number(userData?.user.totalBalance)}
                      className={`customInput ${
                        +totalBalance < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    />
                  </label>
                  <div className="hidden w-full items-center justify-center sm:flex">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="flex gap-2"
                    >
                      <p className="text-light-red hover:underline">Logout</p>
                      <span>
                        <SignOut
                          size={20}
                          className="text-light-red"
                          weight="bold"
                        />
                      </span>
                    </button>
                  </div>
                  <div className="w-full flex-col gap-3 flex items-center justify-center">
                    <button
                      disabled={editUserProfile.isLoading || !isAllFieldsFilled}
                      className="bg-light-purple w-full text-lg min-h-[48px] rounded-3xl text-pure-white transition-all delay-75 ease-in-out py-1.5 leading-9 px-6 font-semibold hover:bg-hover-purple disabled:bg-dark-blue"
                      type="submit"
                    >
                      {!editUserProfile.isLoading ? (
                        "Save changes"
                      ) : (
                        <LoadingCircle loadingType="buttonLoading" />
                      )}
                    </button>
                    <button
                      disabled={editUserProfile.isLoading}
                      onClick={() => setOpenProfile(!openProfile)}
                      className="bg-dark-blue w-full text-pure-white text-lg rounded-3xl transition px-6 duration-150 ease-in-out py-1.5 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
                      type="button"
                    >
                      Discard changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default SidebarMenu
