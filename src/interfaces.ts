export interface CreateInvoiceBody {
  apiKey: string;
  edahabNumber: string;
  amount: number;
  currency?: string;
  agentCode: string;
  ReturnUrl: string;
}

export interface CheckInvoiceBody {
  apiKey: string;
  invoiceId: number;
}
