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

--

### Creating BitPay Invoice

BitPay expects an order to be sent using the following format.  If your POS system has different fields, you will need to customize the mapping in the `invoice.js` file.  Below are example fields, our API can be reviewd at [bitpay.com/api](bitpay.com/api)

```
{
    "orderID": 000001,
    "notificationURL": "<provided in this server, config example in next section>",
    "redirectURL": "<where to redirect on YOUR website after a successful payment>",
    "price": 5.00,
    "currency": "USD",
    "extendedNotifications": "true",
	"buyer":{
		"name":"<buyer name>",
		"email":"<buyer email>",
		"notify":true

	},
	"token":"<api token handled from this implementation>"
}
```