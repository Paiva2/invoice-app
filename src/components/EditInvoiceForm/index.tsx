import PlusIcon from "@/icons/PlusIcon"
import TrashIcon from "@/icons/TrashIcon"
import React from "react"
import CustomInput from "../CustomInput"

interface EditFormProps {
  openEditInvoice: boolean
  setOpenEditInvoice: React.Dispatch<React.SetStateAction<boolean>>
}

const EditInvoiceForm = ({ openEditInvoice, setOpenEditInvoice }: EditFormProps) => {
  return (
    <form className="flex flex-col gap-7 [&>div]:flex [&>div]:flex-col [&>div]:gap-5 [&>div>label]:flex [&>div>label]:flex-col [&>div>label]:gap-2 [&>div>label>input]:bg-dark-blue [&>div>label>input]:p-3 [&>div>label>input]:rounded">
      <div>
        <p className="text-light-purple font-semibold">Bill From</p>

        <CustomInput label="Street Address" inputType="text" />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <CustomInput label="City" inputType="text" />

          <CustomInput label="Postal Code" inputType="text" />

          <CustomInput label="Country" inputType="text" />
        </div>
      </div>

      <div>
        <p className="text-light-purple font-semibold">Bill To</p>

        <CustomInput label="Client's Name" inputType="text" />

        <CustomInput label="Client's e-mail" inputType="text" />

        <CustomInput label="Street Address" inputType="text" />

        <div className="flex gap-2 items-center [&>label]:flex [&>label]:flex-col [&>label]:w-[calc(100%/3)] [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <CustomInput label="City" inputType="text" />

          <CustomInput label="Postal Code" inputType="text" />

          <CustomInput label="Country" inputType="text" />
        </div>

        <CustomInput label="Invoice Date" inputType="text" />

        <CustomInput label="Payment Terms" inputType="text" />

        <CustomInput label="Project Description" inputType="text" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-[#777f98]">Item List</h2>
        <div className="flex items-center gap-2.5 justify-between [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded">
          <label className="w-[35%]">
            Item Name
            <input className="w-[100%]" type="text" />
          </label>

          <label className="flex-1">
            Qty
            <input type="text" className="w-[100%]" />
          </label>

          <label className="flex-1">
            Price
            <input type="text" className="w-[100%]" />
          </label>

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

      <div className="self-end">
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setOpenEditInvoice(!openEditInvoice)}
            className="bg-dark-blue rounded-3xl  transition duration-150 ease-in-out py-1.5 px-6 font-semibold leading-9 hover:bg-pure-white hover:text-dark-blue"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-light-purple transition duration-150 ease-in-out rounded-3xl py-1.5 px-5 font-semibold hover:bg-hover-purple leading-9"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditInvoiceForm
