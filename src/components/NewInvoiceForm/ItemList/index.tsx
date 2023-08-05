import CustomInput from "@/components/CustomInput"
import PlusIcon from "@/icons/PlusIcon"
import TrashIcon from "@/icons/TrashIcon"
import { priceFormatter } from "@/utils/priceFormatter"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const ItemList = () => {
  const itemListSchema = {
    id: "1",
    name: "New Item",
    quantity: 1,
    price: 0,
  }

  const [itemFromListValues, setItemFromListValues] = useState([itemListSchema])

  function handleAddNewItemToItemList() {
    setItemFromListValues((oldValue) => [
      ...oldValue,
      {
        ...itemListSchema,
        id: uuidv4(),
      },
    ])
  }

  function handleRemoveNewItemFromList(itemToRemove: typeof itemListSchema) {
    if (itemFromListValues.length === 1) return

    const itemListWithouthItemToRemove = itemFromListValues.filter(
      (items) => items.id !== itemToRemove.id
    )

    setItemFromListValues(itemListWithouthItemToRemove)
  }

  function handleEditValueFromInput(
    indexOfInput: number,
    inputToEdit: string,
    newValue: string
  ) {
    const editedInput = itemFromListValues.map((items, idx) => {
      if (idx === indexOfInput) {
        return {
          ...items,
          [inputToEdit]: newValue,
        }
      }

      return items
    })

    setItemFromListValues(editedInput)
  }

  function getTotalPrice(itemIndex: number) {
    const getTotal =
      itemFromListValues[itemIndex].quantity * itemFromListValues[itemIndex].price

    return priceFormatter.format(getTotal)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#777f98]">Item List</h2>
      <div className="flex flex-col">
        {itemFromListValues.map((item, idx) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-2.5 justify-between [&>label>input]:bg-dark-blue [&>label>input]:p-2.5 [&>label>input]:rounded [&>input]:border [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0"
            >
              <label className="w-[35%] [&>input]:border min-h-[5.625rem] [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0">
                Item Name
                <input
                  onChange={({ target }) =>
                    handleEditValueFromInput(idx, "name", target.value)
                  }
                  defaultValue={item.name}
                  className="w-full font-semibold"
                />
              </label>

              <label className="flex-1 [&>input]:border min-h-[5.625rem] [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0">
                Qty
                <input
                  onChange={({ target }) =>
                    handleEditValueFromInput(idx, "quantity", target.value)
                  }
                  defaultValue={item.quantity}
                  className="w-full font-semibold"
                />
              </label>

              <label className="flex-1 [&>input]:border min-h-[5.625rem] [&>input]:border-transparent [&>input]:hover:border-light-purple [&>input]:transition [&>input]:duration-150 [&>input]:ease-in-out [&>input:focus]:outline-0">
                Price
                <input
                  onChange={({ target }) =>
                    handleEditValueFromInput(idx, "price", target.value)
                  }
                  defaultValue={item.price}
                  className="w-full font-semibold"
                />
              </label>
              <label className="flex-1 min-h-[5.625rem]">
                <p>Total</p>

                <div className="flex justify-between items-center p-2.5">
                  <span className="flex items-center h-full w-full font-bold">
                    {getTotalPrice(idx)}
                  </span>
                  <button
                    onClick={() => handleRemoveNewItemFromList(item)}
                    className="[&>svg]:transition [&>svg]:duration-200 [&>svg]:ease-in-out [&>svg]:fill-hash-blue hover:[&>svg]:fill-light-red"
                    type="button"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </label>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={handleAddNewItemToItemList}
        className="flex items-baseline gap-1 w-full justify-center bg-dark-blue rounded-3xl p-3 transition duration-150 ease-in-out [&>svg]:fill-pure-white border border-transparent hover:border-light-purple"
      >
        <PlusIcon />
        Add new Item
      </button>
    </div>
  )
}

export default ItemList
