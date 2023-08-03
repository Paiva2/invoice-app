import LightIcon from "@/icons/LightIcon"
import Logo from "@/icons/Logo"
import React from "react"

const SidebarMenu = () => {
  return (
    <div className="h-screen flex flex-col rounded-r-[20px] border-s-red-700 bg-strong-blue justify-between z-50">
      <button
        type="button"
        className="group/logo p-[2.5rem] relative bg-light-purple flex items-center justify-center w-full rounded-r-[20px] overflow-hidden [&>svg]:z-20"
      >
        <Logo />
        <div className="w-full absolute z-10 bottom-0 bg-[#cabff7] h-[50%] opacity-[.3] rounded-tl-[20px] rounded-br-[20px] duration-[.3s] ease-in-out group-hover/logo:h-[90%]" />
      </button>
      <div className="flex flex-col gap-[1.875rem] items-center justify-center ">
        <button className="[&>svg]:transition duration-150 ease-in-out fill-[#858BB2] hover:[&>svg]:fill-[#fff]">
          <LightIcon />
        </button>
        <div className="w-full border-t border-[#494e6e] py-[1.5625rem] flex items-center justify-center">
          <button type="button">
            <img
              className="w-[2.5rem] h-[2.5rem] border-[3px] border-transparent rounded-full transition duration-150 ease-in-out cursor-pointer hover:border-light-purple"
              src="https://i.postimg.cc/Y9qvvybG/21430510-680977128777457-2422235984997179527-n.jpg"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
