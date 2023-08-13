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
  paymentTermsTo: string
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
