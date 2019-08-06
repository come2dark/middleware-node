# Custom API Integrations for BitPay

This node service is a custom middleware layer for 3rd-party integrations who can't modify outgoing data.  This middleware layer will map variables as needed.  

## Setup
run `npm install`

Copy the `sample_env.env` file to `.env`

Modify  `.env` as needed.  You will need an account on [test.bitpay.com](test.bitpay.com) for sandbox testing, and [bitpay.com](bitpy.com) for production.

Change any routes in `app.js`.  This **README** will refer to the default settings.

Modify `config.js` if you would like to customize variables.  These all map to the `.env` file.

Start the service with `nodemon`.

**note:** For this **README** all urls will refer to `test.bitpay.com`

--
### Testing API Tokens

To verify your API token, send a `GET` request.
`http://<your server>:<your port>/api/version`

##### Valid response for V1 Token
```
{
    "status": 200,
    "apiVersion": "v1",
    "message": "This token is for v1",
    "resourceUrl": "http://test.bitpay.com/api/invoice"
}
```

##### Valid response for V2 Token
```
{
    "status": 200,
    "apiVersion": "v2",
    "message": "This token is for v2",
    "resourceUrl": "http://test.bitpay.com/invoices"
}
```

##### Error Response 
```
{
    "status": 403,
    "error": {
        "message": "invalid api key"
    }
}
```