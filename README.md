# Custom API Integrations for BitPay

This node service is a custom middleware layer for 3rd-party integrations who can't modify outgoing data.  This middleware layer will map variables as needed.  

## Setup
run `npm install`

Start the service with `nodemon`

## Wix

#### integration_libs/wix.js

Maps the following Wix parameters to BitPays expected data format

```
{
  "wixTransactionId": "3cba7c81-3b37-4621-a83c-a041549bc82c",
  "paymentMethod": "wallet",
  "merchantCredentials": {
    "contractCode": "<bitpay POS token>",
    "clientId": "merchant.a@provider.com"
    },
  "order": {
    "id": "9d1f4e08-475a-4c7e-8182-fdf3168c5944",
    "description": {
      "totalAmount": 1,
      "currency": "USD",
      "items": [], 
      "charges": {
        "tax": 2,
        "shipping": 10,
        "discount": 10
      },
      "billingAddress": {
        "firstName": "Thomas",
        "lastName": "Anderson",
        "company": "Meta Cortex",
        "address": "965 Hubbard St, Jacksonville",
        "street": "Hubbard St, Jacksonville",
        "houseNumber": "965",
        "city": "Washington, D.C.",
        "state": "Washington",
        "zipCode": "61451",
        "countryCode": "US",
        "phone": "+1-202-555-0190",
        "fax": "+1-202-555-0190",
        "email": "thomas.anderson@mail.com",
        "taxIdentifier": {
          "id": "01-2354678",
          "type": "EIN"
        }
      },
      "shippingAddress": {
        "firstName": "Thomas",
        "lastName": "Anderson",
        "company": "Meta Cortex",
        "address": "965 Hubbard St, Jacksonville",
        "street": "Hubbard St, Jacksonville",
        "houseNumber": "965",
        "city": "Washington, D.C.",
        "state": "Washington",
        "zipCode": "61451",
        "countryCode": "US",
        "phone": "+1-202-555-0190",
        "fax": "+1-202-555-0190",
        "email": "thomas.anderson@mail.com",
        "taxIdentifier": {
          "id": "01-2354678",
          "type": "EIN"
        }
      },
      "buyerInfo": {
        "buyerId": "ffc0a971-60cb-4c63-8016-39b1bce41e8d",
        "buyerLanguage": "en"
      }
    },
    "returnUrls": {
      "successUrl": "https://shop.merchant.a@wix.com/successful?orderId=4e87a0bf-2231-4bac-9cf4-cd5cf1330293",
      "errorUrl": "https://shop.merchant.a@wix.com/error?orderId=4e87a0bf-2231-4bac-9cf4-cd5cf1330293",
      "cancelUrl": "https://shop.merchant.a@wix.com/cancelled?orderId=4e87a0bf-2231-4bac-9cf4-cd5cf1330293",
      "pendingUrl": "https://shop.merchant.a@wix.com/pending?orderId=4e87a0bf-2231-4bac-9cf4-cd5cf1330293"
    }
  },
  "installments": 3,
  "mode": "live"
}
```

## Logging
#### integration_libs/selog.js

Modified version of `simple-node-logger` to auto-create directories and files as needed

#### Usage
Create the logger 

`logger = require('./selog.js')`

Choose the type (`onboard`,`invoice`)
`logger.createLogger('onboard')`

Create a log

`logger.info("your message goes here")`
`logger.error("your error message goes here")`