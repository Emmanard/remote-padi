export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceDraft {
  id: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  currency: string;
  createdAt: number;
  updatedAt: number;
}
