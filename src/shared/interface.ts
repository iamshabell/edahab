export interface Invoice {
  InvoiceStatus?: string;
  TransactionId?: string;
  InvoiceId: number;
  StatusCode: number;
  RequestId: number;
  StatusDescription: string;
  ValidationErrors?: string;
}

export class Credit {
  TransactionStatus!: string;
  TransactionMesage!: string;
  PhoneNumber!: string;
  TransactionId?: string;
}
