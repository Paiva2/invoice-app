export interface InvoiceSchema {
  id: string
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
  status: "pending" | "draft" | "paid"
  itemList: Array<{
    id: string
    invoiceId: string
    name: string
    quantity: string
    total: number
  }>
}
