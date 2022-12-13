import CryptoJS from 'crypto-js';
import got from 'got';
import { CheckInvoiceDTO } from './Dto/checkInvoiceDto';
import { CreateInvoiceDTO } from './Dto/createInvoiceDto';
import { CreditAccountDTO } from './Dto/creditAccountDto';
import { DEVELOPEMENT_URL, PRODUCTION_URL } from './shared/config';
import { Credit, Invoice } from './shared/interface';

export class eDahabAPI {
  private url: string = '';
  private secretKey: string = '';

  constructor(secretKey: string, isProd: boolean) {
    this.secretKey = secretKey;
    this.url = isProd ? PRODUCTION_URL : DEVELOPEMENT_URL;
  }

  public async createInvoice(data: CreateInvoiceDTO): Promise<Invoice> {
    const hash = this.hashSecret(data);

    const response = (await got
      .post(this.url + 'api/issueinvoice?hash=' + hash, {
        json: data,
      })
      .json()) as Invoice;

    return response;
  }

  public async checkInvoice(data: CheckInvoiceDTO): Promise<Invoice> {
    const hash = this.hashSecret(data);

    const response = (await got
      .post(this.url + 'api/CheckInvoiceStatus?hash=' + hash, {
        json: data,
      })
      .json()) as Invoice;

    return response;
  }

  public async creditCompanyAccount(data: CreditAccountDTO): Promise<Credit> {
    const hash = this.hashSecret(data);

    const response = (await got
      .post(this.url + 'api/agentPayment?hash=' + hash, {
        json: data,
      })
      .json()) as Credit;

    return response;
  }

  private hashSecret(data: any): string {
    return CryptoJS.SHA256(JSON.stringify(data) + this.secretKey).toString(
      CryptoJS.enc.Hex
    );
  }
}
