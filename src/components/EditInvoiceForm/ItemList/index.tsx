import CustomInput from "@/components/CustomInput"
import PlusIcon from "@/icons/PlusIcon"
import TrashIcon from "@/icons/TrashIcon"
import React from "react"

const ItemList = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#777f98]">Item List</h2>
      <div className="flex items-center gap-2.5 justify-between [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded [&>input]:border [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0">
        <CustomInput customClass={"w-[35%]"} label="Item Name" inputType="text" />

        <CustomInput customClass={"flex-1"} label="Qty" inputType="text" />

        <CustomInput customClass={"flex-1"} label="Price" inputType="text" />

        <div className="flex flex-1 justify-evenly h-full">
          <div className="h-full flex flex-col items-center">
            <p className="self-start">Total</p>
            <span className="flex justify-center items-center h-full w-full font-bold">
              $156.00
            </span>
          </div>
          <button
            className="[&>svg]:transition [&>svg]:duration-200 [&>svg]:ease-in-out [&>svg]:fill-hash-blue hover:[&>svg]:fill-light-red"
            type="button"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="flex items-baseline gap-1 w-full justify-center bg-dark-blue rounded-3xl p-3 transition duration-150 ease-in-out [&>svg]:fill-pure-white border border-transparent hover:border-light-purple"
      >
        <PlusIcon />
        Add new Item
      </button>
    </div>
  )
}

export default ItemList
