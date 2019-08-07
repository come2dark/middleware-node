/** Invoice Middleware ***/
exports.createTransaction = function (req, res, request) {
    const fetch = require('node-fetch');
    const {
        dev_endpoint,
        prod_endpoint,
        dev_token,
        prod_token,
        is_production,
        port
    } = require('./config')

    //set the endpoint to dev by default 
    let endpoint = dev_endpoint
    let token = dev_token
    if (is_production == true) {
        token = prod_token
        endpoint = prod_endpoint
    }


    let $postParams = req.body;
    let $params = {}; //our params
    let $buyerInfo = {};

    /*what BitPay expects, map accordingly*/
    /*
    {
        "extendedNotifications":"true",
        "extension_version":"Plugin_Version_1.0",
        "price":5.00,
        "orderId":"123456",
        "currency":"USD",
        "buyer":{
            "name":"josh",
            "email":"joshlewis@gmail.com",
            "notify":true

        },
        "redirectURL":"<where to redirect users after a purchase>",
        "notificationURL":"<your ipn service></your>"
        }
    */
    /*end sample*/

    //extract what we need for the BitPay API, example mapping
    $params.token = token
    $params.orderId = $postParams.orderID
    $params.extension_version = 'Plugin_Version'
    $params.price = $postParams.price
    $params.currency = $postParams.currency

    //default for sandbox
    $invoiceUrl = endpoint + '/invoices'

    //buyer info`
    try {
        //wix may or may not send this info
        $buyerInfo.name = $postParams.buyer.name
        $buyerInfo.email = $postParams.buyer.email
        $params.buyer = $buyerInfo;
    } catch (ivErr) {
        //dont do anything,
    }

    //change this to your ipn
    // $params.notificationURL = $postParams.redirectURL
    $params.notificationURL = '<https://your-ipn-service.com>';

    //redirect after checkout    
    $params.redirectURL = $postParams.redirectURL
    $params.extendedNotifications = true;
    $params.acceptanceWindow = 1200000;
    //send to BitPay, demo code

    try {

        request.post($invoiceUrl, {
            json: $params
        }, (bperror, bpres, bpbody) => {
            if (bperror) {

                res.send(bperror);

                return
            }
            if (bpbody.hasOwnProperty('error')) {

                res.json({
                    status: 'error',
                    message: bpbody.error + ' token: ' + $params.token
                })
            } else {

                //remap for Wix response
                let bitpayResponse = bpbody
                res.status(200).send(bitpayResponse)
            }
        })
    } catch (seErr) {
        res.status(403)
        res.json({
            status: seErr.name,
            message: seErr.message
        })
    }
};
