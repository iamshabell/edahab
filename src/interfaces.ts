export interface CreateInvoiceBody {
  apiKey: string;
  edahabNumber: string;
  amount: number;
  currency?: string;
  agentCode: string;
  ReturnUrl?: string;
}

export interface CheckInvoiceBody {
  apiKey: string;
  invoiceId: number;
}

export interface CreateInvoice {
  InvoiceStatus?: string;
  TransactionId?: string;
  InvoiceId: number;
  StatusCode: number;
  RequestId: number;
  StatusDescription: string;
  ValidationErrors?: string;
}

export interface CheckInvoice {
  InvoiceStatus: string;
  TransactionId: string;
  InvoiceId: number;
  StatusCode: number;
  RequestId: number;
  StatusDescription: string;
  ValidationErrors: string;
}
