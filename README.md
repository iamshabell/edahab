# eDahab API User Guide

This is edahab API package for node with TypeScript.

> If you’re new to TypeScript, checkout [this handy cheatsheet](https://devhints.io/typescript)

## Installing

To install edahab-api, use:

```bash
npm intall edahab-sdk # or yarn add edahab
```

There are three available methods in the edahab api, _Generating invoices_, _Checking Invoices_ and _Crediting Account_

## Generating Invoices

In order to generate invoices, you need to have two things available, _Your Secret Key_, _Your API-KEY_ and _Request Body as JSON_. The secret key and API-key are already given you by the edahab team.

To achieve that we are using _createInvoice_. And it takes, `SECRET-KEY`, `REQ_BODY` and `IS_PRODUCTION`.

#### An example of create an Invoices with express:

```typescript
...
import { eDahabAPI } from "edahab-sdk";

const app: Express = express();
const port = 3001;

const YOUR_SECRET_KEY = "your_secret_key";
const DAHAB_API = new eDahabAPI(
  YOUR_SECRET_KEY,
  true, // -> IS_PRODUCTION
  );

app.post("/generate", async (req: Request, res: Response, next) => {
  try {
    const apiKey = "your_api_Key";
    const response = await DAHAB_API.createInvoice({
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
    "currency": "SLSH", // -> Optional (Default USD), also accepts SLSH
    "agentCode": "12345",
    "ReturnUrl": "https://www.facebook.com" // -> must start with https://
}
```

When it is done, it will return this:

```javascript
{
    "InvoiceId": 1122334,
    "StatusCode": 0,
    "RequestId": 332211,
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

There are probably two ways for the payment go through success, it is either WEB or Pop-UP. In POP-UP, you don't have to do nothing, it will send a pop-up to phone number holder and it'll listen the response from the action the user, is it cancelled?, is it success?, probably status code will told you that as we mentioned before. in WEB, The _invoiceId_ is the one that you'd use for the edahab's web payment portal. e.g in browser type this url:

```bash
https://edahab.net/API/Payment?invoiceId={{invoiceId}} #-> change with generated invoiceId from the response
```

then you'll the see eDahab's payment website with an order, saying enter the PIN number. When its done, it will redirect to _returnUrl_ as we already entered, for now it is _Facebook.com_

## Checking Invoices

To check if the invoice is in pending, or success we are using _checkInvoice_. And it takes, `SECRET-KEY`, `REQ_BODY` and `IS_PRODUCTION`.

#### An example of check an Invoice:

```typescript
...

app.post("/check", async (req: Request, res: Response, next) => {
  try {
    const apiKey = "your_api_key";
    const { invoiceId } = req.body;
    const response = await DAHAB_API.checkInvoice({
      apiKey,
      invoiceId,
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
  "invoiceId": 1122334
}
```

When it is done the operation, it will return this:

```javascript
{
    "InvoiceStatus": "Pending",
    "TransactionId": null,
    "InvoiceId": 0,
    "StatusCode": 0,
    "RequestId": 33221,
    "StatusDescription": "Success",
    "ValidationErrors": null
}
```

If the invoiceId is correct, it is either pending or success. Otherwise it will return InvoiceId not found.

## Credit to Account

This method is for when you want to withdraw your money from `Edahab API` to your account. Your account is either regular account or merchant account

#### An example of crediting to an account:

```typescript
...

app.post("/credit", async (req: Request, res: Response, next) => {
  try {
    const apiKey = "your_api_key";
    const { phoneNumber, transactionAmount, currency } = req.body;
    const response = await DAHAB_API.creditAccount({
      apiKey,
      phoneNumber,
      transactionAmount,
      currency
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
  "phoneNumber": "62XXXXXXX",
  "transactionAmount": 1,
  "currency": "USD" //-> optional, it also accepts SLSH
}
```

When it is done the operation, it will return this:

```javascript
{
    "TransactionStatus": "Approved",
    "TransactionMesage": "...", //-> SMS, look alike text
    "PhoneNumber": "62XXXXXXX",
    "TransactionId": "CX23322.4444.S22222"
}
```

## Support

This packages will be open source, feel free to contribute.
