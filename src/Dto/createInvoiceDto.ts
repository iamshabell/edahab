export class CreateInvoiceDTO {
  apiKey!: string;
  edahabNumber!: string;
  amount!: number;
  currency?: string;
  agentCode!: string;
  ReturnUrl?: string;
}
