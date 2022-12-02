export interface Invoice {
  InvoiceStatus?: string;
  TransactionId?: string;
  InvoiceId: number;
  StatusCode: number;
  RequestId: number;
  StatusDescription: string;
  ValidationErrors?: string;
}
