import { InvoiceItemList } from "../../types"
import { priceFormatter } from "./priceFormatter"

export default function getInvoiceTotalSum(itemList: InvoiceItemList[]) {
  const invoiceTotal = itemList.reduce(
    (acc, item) => (acc += item.price * +item.quantity),
    0
  )

  return priceFormatter.format(invoiceTotal)
}
