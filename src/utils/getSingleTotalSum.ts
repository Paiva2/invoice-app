import { priceFormatter } from "./priceFormatter"

export default function getSingleTotalSum(quantity: number, price: number) {
  return priceFormatter.format(price * quantity)
}
