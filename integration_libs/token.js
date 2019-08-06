/** Onboard Middleware ***/
exports.tokenCheck = function (req, res) {
    const request = require('request');
    const fetch = require('node-fetch');

    let token = req.query.token;

    function isTestApi(isTest) {
        if (isTest) {
            return 'http://test.bitpay.com'
        } else {
            return 'http://bitpay.com'
        }
    }

    async function checkToken(req, res, token) {
        let response = await fetch(isTestApi(req.query.test) + '/invoices/1?token=' + token);
        let dataV2 = await response.json();
        if (dataV2.error === 'Object not found') {
            res.code = 200;
            res.json({
                status: 200,
                apiVersion: 'v2',
                message: 'This token is for v2',
                resourceUrl: isTestApi(req.query.test) + '/invoices'
            });
            return;
        }

        //check v1
        checkV1Token(req, res, token)
    }

    async function checkV1Token(req, res, token) {
        let request = require('request');

        let headers = {
            'content-type': 'application/json'
        };

        let options = {
            url: isTestApi(req.query.test) + '/api/invoice/1',
            headers: headers,
            auth: {
                'user': token,
                'pass': ''
            }
        };

        let callback = function(error, response) {
            let dataV2 = JSON.parse(response.body);
            if (dataV2.error.type === 'notFound') {
                //good api key
                res.code = 200;
                res.json({
                    status: 200,
                    apiVersion: 'v1',
                    message: 'This token is for v1',
                    resourceUrl: isTestApi(req.query.test) + '/api/invoice'
                });

                return;
            }
            res.status(403);
            res.json({
                status: 403,
                error: {
                    message: dataV2.error.message
                }
            })
        };

        request(options, callback)
    }

    checkToken(req, res, token)
};
