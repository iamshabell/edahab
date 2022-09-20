import CryptoJS from 'crypto-js';
import got from 'got';
import {
  CreateInvoiceBody,
  CheckInvoiceBody,
  CreateInvoice,
  CheckInvoice,
} from './interfaces';
import { prodUrl, devUrl } from './url';

export const createInvoice = async (
  secretKey: string,
  requestBody: CreateInvoiceBody,
  isProd: boolean
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

export const checkInvoice = async (
  secretKey: string,
  requestBody: CheckInvoiceBody,
  isProd: boolean
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
