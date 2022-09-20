import CryptoJS from 'crypto-js';
import got from 'got';
import { CreateInvoiceBody, CheckInvoiceBody } from './interfaces';
import { prodUrl, devUrl } from './url';

export const createInvoice = async (
  secretKey: string,
  requestBody: CreateInvoiceBody,
  isProd: boolean
) => {
  const url = isProd ? prodUrl : devUrl;

  const hash = CryptoJS.SHA256(
    JSON.stringify(requestBody) + secretKey
  ).toString(CryptoJS.enc.Hex);

  const response = await got
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
) => {
  const url = isProd ? prodUrl : devUrl;

  const hash = CryptoJS.SHA256(
    JSON.stringify(requestBody) + secretKey
  ).toString(CryptoJS.enc.Hex);

  const response = await got
    .post(url + 'api/CheckInvoiceStatus?hash=' + hash, {
      json: requestBody,
    })
    .json();

  return response;
};
