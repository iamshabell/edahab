import CryptoJS from 'crypto-js';
import got from 'got';
import {
  CreateInvoiceBody,
  CheckInvoiceBody,
  CreateInvoice,
  CheckInvoice,
} from './interfaces';
import { prodUrl, devUrl } from './url';

export const eDahabApi = (secretKey: string, isProd: boolean) => {
  const createInvoice = async (
    requestBody: CreateInvoiceBody
  ): Promise<CreateInvoice> => {
    const url = isProd ? prodUrl : devUrl;

    const hash = CryptoJS.SHA256(
      JSON.stringify(requestBody) + secretKey
    ).toString(CryptoJS.enc.Hex);

    const response: CreateInvoice = await got
      .post(url + 'api/issueinvoice?hash=' + hash, {
        json: requestBody,
      })
      .json();

    return response;
  };

  const checkInvoice = async (
    requestBody: CheckInvoiceBody
  ): Promise<CheckInvoice> => {
    const url = isProd ? prodUrl : devUrl;

    const hash = CryptoJS.SHA256(
      JSON.stringify(requestBody) + secretKey
    ).toString(CryptoJS.enc.Hex);

    const response: CheckInvoice = await got
      .post(url + 'api/CheckInvoiceStatus?hash=' + hash, {
        json: requestBody,
      })
      .json();

    return response;
  };

  return {
    createInvoice,
    checkInvoice,
  };
};
