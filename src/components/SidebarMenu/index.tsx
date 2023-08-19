"use client"

import { GlobalContext } from "@/context/GlobalContext"
import LightIcon from "@/icons/LightIcon"
import Logo from "@/icons/Logo"
import { api } from "@/lib/api"
import axios from "axios"
import React, { FormEvent, useContext, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { UserProfileSchema } from "../../../types"
import { Image as ImageIcon } from "@phosphor-icons/react"

const SidebarMenu = () => {
  const { userInformations } = useContext(GlobalContext)

  const [openProfile, setOpenProfile] = useState(false)

  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  const [imagePreview, setImagePreview] = useState<File | null>(null)

  const { data: userData } = useQuery({
    queryKey: ["getUserInformations"],

    queryFn: async () => {
      const response = await api.post("/user-informations", {
        id: userInformations.id,
      })

      return response.data
    },

    enabled: !!userInformations.id,
  })

  const queryClient = useQueryClient()

  const editUserProfile = useMutation({
    mutationFn: async (actionAndData: {
      data: UserProfileSchema
      action: string
    }) => {
      const response = await api.patch("/edit-profile", {
        data: actionAndData.data,
        action: actionAndData.action,
      })

      return response
    },

    onSuccess: () => {
      queryClient.invalidateQueries("getUserInformations")

      setImagePreview(null)
    },
  })

  const handleChangeProfile = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", fileToUpload ?? "")

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_SECRET_WORD ?? ""
    )

    const responseUpload = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME}/image/upload`,
      formData
    )

    const newUserData = {
      id: userInformations.id,
      image: responseUpload.data.url,
    }

    editUserProfile.mutateAsync({ action: "edit-image", data: newUserData })
  }

  if (!userData || editUserProfile.isLoading) return <></>

  return (
    <>
      <div className="h-screen z-50 flex flex-col rounded-r-[20px] border-s-red-700 bg-strong-blue justify-between">
        <button
          type="button"
          className="group/logo p-[2.5rem] relative bg-light-purple flex items-center justify-center w-full rounded-r-[20px] overflow-hidden [&>svg]:z-20"
        >
          <Logo />
          <div className="w-full absolute bottom-0 bg-[#cabff7] h-[50%] opacity-[.3] rounded-tl-[20px] rounded-br-[20px] duration-[.3s] ease-in-out group-hover/logo:h-[90%]" />
        </button>
        <div className="flex flex-col gap-[1.875rem] items-center justify-center ">
          <button className="[&>svg]:transition duration-150 ease-in-out fill-[#858BB2] hover:[&>svg]:fill-[#fff]">
            <LightIcon />
          </button>
          <div className="w-full border-t border-[#494e6e] py-[1.5625rem] flex items-center justify-center">
            <button onClick={() => setOpenProfile(!openProfile)} type="button">
              <img
                className="w-[2.5rem] h-[2.5rem] border-[3px] border-transparent rounded-full transition duration-150 ease-in-out cursor-pointer hover:border-light-purple"
                src={userData.user.image}
              />
            </button>
          </div>
        </div>
      </div>
      {openProfile && (
        <div
          onClick={() => setOpenProfile(!openProfile)}
          className={`absolute w-[calc(100%-6.875rem)] h-full left-[6.875rem] top-0 bg-[rgba(0,0,0,0.6)]`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-purple w-[40%] h-full overflow-y-auto animate-open-edit"
          >
            <div className="w-full p-6 gap-7 flex flex-col">
              <h2 className="text-3xl font-semibold text-pure-white">
                Edit{" "}
                <span className="text-hash-blue">{userData.user.name}</span>{" "}
                Profile
              </h2>
              <form
                className="flex flex-col gap-5 items-center justify-center"
                onSubmit={handleChangeProfile}
              >
                <label className="w-[12.5rem] h-[12.5rem] rounded-full overflow-hidden cursor-pointer relative">
                  <div className="absolute flex items-center justify-center bg-[rgba(0,0,0,0.3)] transition-all delay-75 ease-in-out right-0 left-0 w-full h-[12.5rem] hover:bg-[rgba(0,0,0,0.6)]">
                    <ImageIcon size={60} color="#c4c4c4" weight="regular" />
                  </div>
                  <img
                    className="w-full h-full object-cover"
                    src={
                      imagePreview
                        ? URL.createObjectURL(imagePreview)
                        : userData.user.image
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
                <div>
                  <button
                    className="bg-light-purple text-pure-white transition-all delay-75 ease-in-out py-2 px-10 font-semibold hover:bg-hover-purple"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SidebarMenu
