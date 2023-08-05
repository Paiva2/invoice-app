import PlusIcon from "@/icons/PlusIcon"
import TrashIcon from "@/icons/TrashIcon"
import React from "react"
import CustomInput from "../CustomInput"
import ItemList from "./ItemList"

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

      <ItemList />

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
