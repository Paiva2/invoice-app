import { JWTPayload } from "jose"

export interface InvoiceSchema {
  id: string
  createdAt?: Date
  cityFrom: string
  cityTo: string
  clientEmailTo: string
  clientNameTo: string
  countryFrom: string
  countryTo: string
  invoiceDateTo: Date
  postalCodeFrom: string
  postalCodeTo: string
  projectDescriptionTo: string
  streetFrom: string
  streetTo: string
  status?: string
  itemList: Array<InvoiceItemList>
}

export interface InvoiceItemList {
  id: string
  name: string
  quantity: string
  price: number
  invoiceId?: string
}

export interface UserProfileSchema {
  id: string | JWTPayload
  email?: string
  image: string
  name?: string
  totalBalance?: string
}

export interface LoginSchemaInterface {
  email: string
  password: string | null
  provider?: string
}

export interface RegisterSchemaInterface {
  email: string
  username: string
  password: string | null
  provider?: string
}

interface UserInvoice {
  userInformations: {
    userInvoices: Array<InvoiceSchema>
    informations: string
  }
}
