# eDahab API User Guide

This is edahab API package for node with TypeScript.

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Installing

To install edahab-api, use:

```bash
npm intall edahab # or yarn add edahab
```

There are generally two available methods in the edahab api, _Generating invoices_ and _Checking Invoices_

## Generating Invoices

In order to generate invoices, you need to have two things available, _Your Secret Key_, _Your API-KEY_ and _Request Body as JSON_. The secret key and API-key are already given you by the edahab team.

To achieve that we are using _createInvoice_. And it takes, `SECRET-KEY`, `REQ_BODY` and `IS_PRODUCTION`.

#### An example of create an Invoices with express:

```typescript
...
import { eDahabApi } from "edahab";

const app: Express = express();
const port = 3001;

const YOUR_SECRET_KEY = "your_secret_key";
const DAHAB_API = eDahabAPI(
  YOUR_SECRET_KEY,
  true, // -> IS_PRODUCTION
  );

const createInvoice = DAHAB_API.createInvoice;

app.post("/generate", async (req: Request, res: Response, next) => {
  try {
    const apiKey = "your_api_Key";
    const response = await createInvoice({
      ...req.body,
      apiKey,
    });

    console.log("result: " + JSON.stringify(response));
    res.status(200).json(response);
  } catch (e) {
    console.log(e);

    res.status(400).send(e);
  }
});

...
```

And here is an example of the request body:

```javascript
{
    "edahabNumber": "62XXXXXXX",
    "amount": 1,
    "currency": "SLSH", // -> Optional (Default USD)
    "agentCode": "12345",
    "ReturnUrl": "https://www.facebook.com" // -> must start with https://
}
```

When it is done, it will return this:

```javascript
{
    "InvoiceId": 1122334,
    "StatusCode": 0,
    "RequestId": 33112,
    "StatusDescription": "Success",
    "ValidationErrors": null
}
```

If you did correct, the secret key or the api-key it will probably go through success. _StatusCode_ is in 0 to 6, here is what they are:

```
0 : Success
1 : Api Error
2 : Invalid Json
3 : Validation_Error
4 : Invalid_Api_Credentials
5 : Insufficient_Customer_Balance
6 : Invoice_Not_Found
```

There are probably two ways so the payment will be made, it is either WEB or Pop-UP. in WEB, The _invoiceId_ is the one that you'd use for the edahab's web payment. e.g in browser type this url:

```bash
https://edahab.net/API/Payment?invoiceId={{invoiceId}} #-> change with generated invoiceId from the response
```

then you'll the see eDahab's payment website with an order, saying enter the PIN number. When its done, it will redirect to _returnUrl_ as we already entered, for now it is _Facebook.com_

## Checking Invoices

To check if the invoice is in pending, or success we are using _checkInvoice_. And it takes, `SECRET-KEY`, `REQ_BODY` and `IS_PRODUCTION`.

#### An example of check an Invoice:

```typescript
...
import { eDahabApi } from "edahab";

const app: Express = express();
const port = 3001;

const YOUR_SECRET_KEY = "your_secret_key";
const DAHAB_API = eDahabAPI(
  YOUR_SECRET_KEY,
  true, // -> IS_PRODUCTION
  );

const checkInvoice = DAHAB_API.checkInvoice;

app.post("/check", async (req: Request, res: Response, next) => {
  try {
    console.log(req.body);

    const apiKey = "your_api_key";
    const response = await checkInvoice({
      ...req.body,
      apiKey,
    });

    console.log("result: " + JSON.stringify(response));
    res.status(200).json(response);
  } catch (e) {
    console.log(e);

    res.status(400).send(e);
  }
});

...
```

And here is an example of the body:

```javascript
{
  "invoiceId": 1489147
}
```

When it is done the operation, it will return this:

```javascript
{
    "InvoiceStatus": "Pending",
    "TransactionId": null,
    "InvoiceId": 0,
    "StatusCode": 0,
    "RequestId": 33198,
    "StatusDescription": "Success",
    "ValidationErrors": null
}
```

If the invoiceId is correct, it is either pending or success. Otherwise it will return InvoiceId not found.

## Support

This packages will be open source, feel free to contribute.
