/** Invoice Middleware ***/
exports.createTransaction = function (req, res, request) {

    logger = require('./selog.js');
    logger.createLogger('invoice');

    let wixParams = req.body;
    let $params = {}; //our params
    let $buyerInfo = {};
    //console.log('wixParams',wixParams)

    //extract what we need for the BitPay API
    $params.token = wixParams.merchantCredentials.contractCode;
    $params.orderId = wixParams.order.id;
    $params.extension_version = 'Wix_2.0.0';
    $params.price = wixParams.order.description.totalAmount;
    $params.currency = wixParams.order.description.currency;

    //default for sandbox
    $invoiceUrl = 'https://test.bitpay.com/invoices';
    var logEnabled = true

    if (wixParams.mode === 'live') {
        $invoiceUrl = 'https://bitpay.com/invoices'
        logEnabled = false
    }
    //for testing hardcode the parameter



    if (this.currencyCheck($params.currency) == '2') {
        $params.price = $params.price / 100
        $params.price = $params.price.toFixed(2)
    }

    if (logEnabled) {
        console.log('$params.price', $params.price)
        console.log('$params.currency', $params.currency)
    }
    //buyer info`
    try {
        //wix may or may not send this info
        $buyerInfo.name = wixParams.order.description.billingAddress.firstName + ' ' + wixParams.order.description.billingAddress.lastName;
        $buyerInfo.email = wixParams.order.description.billingAddress.email;
        $params.buyer = $buyerInfo;
    } catch (ivErr) {
        //dont do anything,
    }

    //map back to local node for field mapping and detect https or http
    let host = 'https://'
    if (!req.secure) {
        host = 'http://'
    }
    $params.notificationURL = host + req.headers.host + '/api/plugin/v1/ipn';
    $params.posData =
        'https://cashier-services.wix.com/api/plugin/v1|' + $params.notificationURL + '|' + wixParams.wixTransactionId

    //redirect after checkout    
    $params.redirectURL = wixParams.order.returnUrls.successUrl;
    $params.extendedNotifications = true;
    $params.acceptanceWindow = 1200000;

    //send to BitPay, demo code

    try {

        request.post($invoiceUrl, {
            json: $params
        }, (bperror, bpres, bpbody) => {
            if (bperror) {
                if (logEnabled) {
                    logger.error("==========");
                    logger.error(bperror);
                    logger.error("==========");
                }
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
                let wixResponse = {}

                wixResponse.redirectUrl = bpbody.data.url
                wixResponse.pluginTransactionId = bpbody.data.orderId

                res.status(201).send(wixResponse)
            }
        })
    } catch (seErr) {
        
        res.json({
            status: seErr.name,
            message: seErr.message
        })
    }
};

exports.sendIpn = function (res, $params) {
   

}

exports.ipnMap = function (req, res, request) {
    

};
